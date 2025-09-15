import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js"
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute);

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
You are a top-tier startup analyst. 
Evaluate the startup below and generate a **strict JSON validation report**.
Do not include explanations, markdown, or extra text.

Startup Details:
- Business Name: ${businessName}
- Industry: ${industry}
- Description: ${description}
- Target Market: ${targetMarket}
- Problem Solved: ${problemSolving}
- Unique Value Proposition: ${uniqueValue}
- Business Model: ${businessModel}
- Funding Stage: ${funding}
- Timeline: ${timeline}
- Founders' Experience: ${experience}

**JSON FORMAT:**
{
  "overallScore": number,
  "verdict": string,
  "radarData": [
    { "metric": "Market Potential", "score": number },
    { "metric": "Scalability", "score": number },
    { "metric": "Team Strength", "score": number },
    { "metric": "Funding Readiness", "score": number },
    { "metric": "Competition Risk", "score": number }
  ],
  "competition": [
    { "name": string, "marketShare": number, "strength": string, "weakness": string }
  ],
  "financialProjection": [
    { "year": number, "revenue": number, "cost": number }
  ],
  "strengths": [string],
  "concerns": [string],
  "recommendations": [string],
  "nextSteps": [string]
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json|```/g, "").trim();
    let analysis = JSON.parse(text);

    const response = {
      score: analysis.overallScore,
      verdict: analysis.verdict,
      updatedAt: new Date().toISOString(),

      // keep raw radar data
      radarData: analysis.radarData || [],

      // map for Recharts Radar (A = startup, B = avg competitor)
      competitionData: analysis.radarData.map(r => ({
        subject: r.metric,
        A: r.score,
        B: Math.floor(r.score * 0.8 + Math.random() * 10) // simulate competitor average
      })),

      // competition table
      competition: analysis.competition || [],

      // keep financial projection separate
      financialProjection: analysis.financialProjection || [],

      // also map to line chart data
      marketData: (analysis.financialProjection || []).map(f => ({
        year: f.year,
        revenue: f.revenue,
        cost: f.cost
      })),

      strengths: analysis.strengths || [],
      concerns: analysis.concerns || [],
      recommendations: analysis.recommendations || [],
      nextSteps: analysis.nextSteps || []
    };

    res.json(response);
  } catch (error) {
    console.error("Validation error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
