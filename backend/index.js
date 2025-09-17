import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/validate-startup", async (req, res) => {
  try {
    const {
      businessName,
      industry,
      description,
      targetMarket,
      problemSolving,
      uniqueValue,
      businessModel,
      funding,
      timeline,
      experience,
    } = req.body;

    const prompt = `
You are a startup analyst. Evaluate the following startup and return a **JSON only**, matching this structure:

{
  "executiveOverviewData": {
    "summary": string,
    "highlights": [string]
  },
  "marketCompetitionData": {
    "summary": string,
    "stats": [{"name": string,"value": number}],
    "drivers": [string],
    "competitors": [{"name": string,"detail": string}],
    "radar": [{"aspect": string,"You": number,"Competitors": number}]
  },
  "productValidationData": {
    "features": [{"name": string,"score": number}],
    "testimonials": [{"user": string,"feedback": string}]
  },
  "financialsData": {
    "revenueProjections": [{"month": string,"You": number,"Competitors": number}],
    "costBreakdown": [{"category": string,"value": number}]
  },
  "recommendationsData": {
    "keyActions": [string],
    "risks": [string]
  }
}

Startup Details:
- Name: ${businessName}
- Industry: ${industry}
- Description: ${description}
- Target Market: ${targetMarket}
- Problem Solved: ${problemSolving}
- Unique Value: ${uniqueValue}
- Business Model: ${businessModel}
- Funding: ${funding}
- Timeline: ${timeline}
- Experience: ${experience}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean code fences if any
    text = text.replace(/```json|```/g, "").trim();

    // Parse JSON
    const data = JSON.parse(text);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate report", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  