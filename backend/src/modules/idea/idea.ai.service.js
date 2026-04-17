require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const validateStartup = async (formData) => {
  const prompt = `
You are a startup evaluation AI.

Return ONLY valid JSON.
NO markdown.
NO explanation.
NO backticks.

Schema:
{
  "executiveOverview": {
    "summary": "string",
    "metrics": [{ "label": "string", "value": "string" }],
    "highlights": ["string"]
  },
  "financials": {
    "summary": "string",
    "revenue": [
      { "year": "Year 1", "Revenue": number },
      { "year": "Year 2", "Revenue": number },
      { "year": "Year 3", "Revenue": number }
    ],
    "kpis": [
      { "label": "CAC", "value": "string" },
      { "label": "LTV", "value": "string" },
      { "label": "Burn Rate", "value": "string" }
    ],
    "insights": ["string"]
  },
  "marketCompetition": { 
  "summary": "string",
  "stats": [
    { "name": "Competitor A", "value": number },
    { "name": "Competitor B", "value": number },
    { "name": "Competitor C", "value": number },
    { "name": "Others", "value": number }
  ],
  "drivers": ["string"],
  "competitors": [
    { "name": "string", "detail": "string" }
  ],
  "radar": [
    { "aspect": "Pricing", "You": number, "Competitors": number },
    { "aspect": "Innovation", "You": number, "Competitors": number },
    { "aspect": "Support", "You": number, "Competitors": number },
    { "aspect": "Scalability", "You": number, "Competitors": number }
  ],
  "insights": ["string"]
  },
  "productValidation": {"summary": "string",
  "metrics": [
    { "label": "string", "value": "string" }
  ],
  "trends": [
    { "month": "string", "MVP": number, "Advanced": number }
  ],
  "feedback": ["string"]
  },
  "recommendations": {
    "summary": "string",
    "actions": [{ "title": "string", "tasks": ["string"] }],
    "risks": [{ "risk": "string", "mitigation": "string" }],
    "finalNote": "string"
  },
  "score": 0,
  "status": "string"
}

Startup:
Name: ${formData.businessName}
Industry: ${formData.industry}
Description: ${formData.description}
Target Market: ${formData.targetMarket}
Problem: ${formData.problemSolving}
Unique Value: ${formData.uniqueValue}
Model: ${formData.businessModel}
Funding: ${formData.funding}
Timeline: ${formData.timeline}
Experience: ${formData.experience}
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log("🔥 RAW AI OUTPUT:\n", text);

    text = text.replace(/```json|```/g, "").trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");

    const data = JSON.parse(match[0]);

    data.score = data.score ?? 50;

    data.status =
      data.score > 80
        ? "excellent"
        : data.score > 60
        ? "good"
        : data.score > 40
        ? "average"
        : "poor";

    return data;

  } catch (err) {
    console.error("❌ GEMINI ERROR:", err.message);
    throw new Error("AI failed. Please try again.");
  }
};

module.exports = { validateStartup };