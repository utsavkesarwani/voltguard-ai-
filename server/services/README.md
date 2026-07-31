# Gemini Vision Integration Service

This service connects VoltGuard AI to Google's Gemini Vision API (`gemini-2.0-flash`) to perform certified-electrician level analysis of uploaded electrical images.

## Prompt Design
The prompt is designed to instruct the Gemini model to behave like a certified electrical inspector and enforce strict structured JSON output format.
```text
You are an experienced certified electrical engineer. Analyze this uploaded electrical image. Identify any visible electrical faults. Return ONLY valid JSON with these fields: fault_name, confidence, risk_level, electrical_health_score, possible_cause, recommendation, estimated_cost, safety_tips. Return JSON only, no markdown formatting, no explanation text.
```

## Features
- **Key Mapping**: Translates Gemini snake_case output keys to camelCase keys expected by our Mongoose Report schema.
- **Robust Parsing**: Automatically strips markdown block fences (e.g. ` ```json `) before parsing the JSON response.
- **Validation & Normalization**: Clamps confidence/health score bounds (0-100), maps arbitrary risk level tags to our strict enum (`safe`, `low`, `medium`, `critical`), and coerces safety tips to a string array.
- **Fail-safe Error Handling**: Implements a 2-attempt retry loop on model timeouts or JSON parsing errors. Does not crash on API failures, returning a formatted client error.

## Model Swapping
To update or swap models (e.g. to a larger model like `gemini-1.5-pro` for higher accuracy or a newer flagship vision model), modify the `GEMINI_MODEL` constant in `server/services/geminiService.js`:
```javascript
const GEMINI_MODEL = 'gemini-1.5-pro'; // Or your target model identifier
```
Ensure your target model supports system instruction context and multimodal input.
