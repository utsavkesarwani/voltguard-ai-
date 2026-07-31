const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// ─── Constants ──────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an experienced certified electrical engineer. Analyze this uploaded electrical image. Identify any visible electrical faults. Return ONLY valid JSON with these fields: fault_name, confidence, risk_level, electrical_health_score, possible_cause, recommendation, estimated_cost, safety_tips. Return JSON only, no markdown formatting, no explanation text.`;

const GEMINI_MODEL = 'gemini-2.0-flash';

// Map snake_case Gemini response keys → camelCase Report schema keys
const FIELD_MAP = {
  fault_name: 'faultName',
  confidence: 'confidence',
  risk_level: 'riskLevel',
  electrical_health_score: 'healthScore',
  possible_cause: 'possibleCause',
  recommendation: 'recommendation',
  estimated_cost: 'estimatedCost',
  safety_tips: 'safetyTips',
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Strip markdown code fences (```json ... ```) that Gemini sometimes wraps
 * around the JSON response.
 */
function stripCodeFences(text) {
  let cleaned = text.trim();
  // Remove leading ```json or ``` and trailing ```
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  return cleaned.trim();
}

/**
 * Convert snake_case Gemini response to camelCase Report schema.
 */
function mapToCamelCase(raw) {
  const mapped = {};
  for (const [snakeKey, camelKey] of Object.entries(FIELD_MAP)) {
    if (raw[snakeKey] !== undefined) {
      mapped[camelKey] = raw[snakeKey];
    }
  }
  return mapped;
}

/**
 * Validate that all required fields are present and reasonable.
 */
function validateAnalysis(data) {
  const required = ['faultName', 'confidence', 'riskLevel', 'healthScore',
                    'possibleCause', 'recommendation', 'estimatedCost', 'safetyTips'];
  const missing = required.filter((k) => data[k] === undefined || data[k] === null);
  if (missing.length > 0) {
    throw new Error(`Gemini response missing fields: ${missing.join(', ')}`);
  }

  // Coerce confidence and healthScore to numbers
  data.confidence = Number(data.confidence);
  data.healthScore = Number(data.healthScore);

  // Clamp to 0-100
  data.confidence = Math.max(0, Math.min(100, data.confidence || 0));
  data.healthScore = Math.max(0, Math.min(100, data.healthScore || 0));

  // Normalize riskLevel to our enum
  const validRisks = ['safe', 'low', 'medium', 'critical'];
  const normalized = String(data.riskLevel).toLowerCase().trim();
  if (!validRisks.includes(normalized)) {
    // Best-effort mapping
    if (normalized.includes('safe') || normalized.includes('none') || normalized.includes('no')) {
      data.riskLevel = 'safe';
    } else if (normalized.includes('low')) {
      data.riskLevel = 'low';
    } else if (normalized.includes('high') || normalized.includes('critical') || normalized.includes('severe')) {
      data.riskLevel = 'critical';
    } else {
      data.riskLevel = 'medium';
    }
  } else {
    data.riskLevel = normalized;
  }

  // Ensure safetyTips is an array of strings
  if (!Array.isArray(data.safetyTips)) {
    data.safetyTips = typeof data.safetyTips === 'string' ? [data.safetyTips] : [];
  }

  return data;
}

/**
 * Read an image file from the uploads directory and return it as a
 * Gemini-compatible inline data part.
 */
function fileToGenerativePart(filePath) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(__dirname, '..', 'uploads', filePath);

  const imageData = fs.readFileSync(absolutePath);
  const base64 = imageData.toString('base64');

  // Determine MIME type from extension
  const ext = path.extname(absolutePath).toLowerCase();
  const mimeMap = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  };
  const mimeType = mimeMap[ext] || 'image/jpeg';

  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

// ─── Core Analysis Function ─────────────────────────────────────────────────────

/**
 * Send an uploaded image to Gemini Vision and return the parsed fault analysis.
 *
 * @param {string} imagePath — filename (or absolute path) of the uploaded image
 * @returns {Promise<object>} Parsed analysis in camelCase Report schema shape
 */
async function analyzeWithGemini(imagePath) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw Object.assign(
      new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in server/.env'),
      { statusCode: 500 }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  // Prepare the image part
  const imagePart = fileToGenerativePart(imagePath);

  let attempts = 0;
  const maxAttempts = 2; // try once, retry once on parse failure
  let lastError;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      console.log(`🤖 Gemini attempt ${attempts}: Analyzing image "${imagePath}"…`);

      const result = await model.generateContent([SYSTEM_PROMPT, imagePart]);
      const response = result.response;
      const text = response.text();

      console.log(`📦 Gemini raw response (attempt ${attempts}):`, text.substring(0, 300));

      // Parse JSON — strip any code fences first
      const cleaned = stripCodeFences(text);
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        throw new Error(`Gemini returned invalid JSON: ${parseErr.message}. Raw: ${cleaned.substring(0, 200)}`);
      }

      // Map to our schema and validate
      const mapped = mapToCamelCase(parsed);
      const validated = validateAnalysis(mapped);

      console.log(`✅ Gemini analysis success:`, validated.faultName, `(${validated.confidence}% confidence)`);
      return validated;

    } catch (err) {
      lastError = err;
      console.error(`⚠️  Gemini attempt ${attempts} failed:`, err.message);

      // Don't retry on auth/key errors
      if (err.message?.includes('API key') || err.statusCode === 401 || err.statusCode === 403) {
        break;
      }

      // On first failure, retry
      if (attempts < maxAttempts) {
        console.log('🔄 Retrying Gemini analysis…');
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  // All attempts failed — return a structured error
  throw Object.assign(
    new Error(
      `AI analysis failed after ${attempts} attempt(s): ${lastError?.message || 'Unknown error'}. ` +
      'Please try again with a clearer image of the electrical component.'
    ),
    { statusCode: 502 }
  );
}

module.exports = { analyzeWithGemini };
