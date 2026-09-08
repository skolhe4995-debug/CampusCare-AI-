import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client securely server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "CampusCare", timestamp: new Date().toISOString() });
  });

  // 1. AI Health & Hygiene Assistant Endpoint
  app.post("/api/ai/assistant", async (req, res) => {
    try {
      const { question, language = "en" } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          answer: `[Educational Response - Offline Mode] Handwashing with soap for 20 seconds removes bacteria. Drink 6-8 glasses of water daily. If you feel unwell or have a fever/headache, please visit the school nurse or tell a teacher immediately.`,
          disclaimer: "Always inform a school nurse or teacher if you are feeling sick.",
        });
      }

      const languageInstruction =
        language === "hi"
          ? "Respond in clear, encouraging Hindi language."
          : language === "mr"
          ? "Respond in clear, encouraging Marathi language."
          : "Respond in friendly, clear English language.";

      const prompt = `You are CampusCare AI, a friendly and empathetic school health and hygiene assistant for students aged 6-18. 
${languageInstruction}

Question from student: "${question}"

Provide a safe, age-appropriate, educational, and supportive answer (max 150 words). 
Structure your answer with:
1. Immediate simple advice/explanation.
2. 2-3 practical tips or steps.
3. A mandatory gentle reminder to talk to a school nurse, teacher, or parent if they are experiencing physical discomfort, illness, or distress.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({
        answer: response.text || "Thank you for asking! Remember to wash your hands regularly and speak with your teacher if you feel sick.",
        disclaimer: "Always inform a school nurse or teacher if you are feeling sick.",
      });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({
        error: "Failed to fetch response from AI Assistant.",
        answer: "We encountered an issue processing your health query. Remember to wash hands frequently and consult the school nurse for any health concerns!",
      });
    }
  });

  // 2. AI Complaint Analysis Endpoint
  app.post("/api/ai/analyze-complaint", async (req, res) => {
    try {
      const { title, category, location, description } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          priority: "medium",
          detectedCategory: category || "General Maintenance",
          safetyAdvice: "Please avoid the affected area until school maintenance arrives. Inform a teacher immediately if there is active leakage, glass hazard, or hygiene risk.",
          responsibleDept: category?.includes("water") || category?.includes("toilet") ? "Sanitation & Facilities Dept" : "School Maintenance Dept",
          estimatedHours: category?.includes("Emergency") ? 1 : 12,
        });
      }

      const prompt = `Analyze this school complaint submitted by a student for CampusCare:
Title: ${title}
Category Selected: ${category}
Location: ${location}
Description: ${description}

Classify priority as one of: ["low", "medium", "high", "urgent"].
Identify the responsible department (e.g. Sanitation & Facilities, Infrastructure & Carpentry, Health & Nurse Office, Disciplinary/Counseling, Campus Maintenance).
Provide brief, action-oriented immediate student safety advice (1-2 sentences).
Estimate realistic school resolution time in hours (number).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              priority: { type: Type.STRING, description: "low, medium, high, or urgent" },
              detectedCategory: { type: Type.STRING },
              safetyAdvice: { type: Type.STRING },
              responsibleDept: { type: Type.STRING },
              estimatedHours: { type: Type.NUMBER },
            },
            required: ["priority", "safetyAdvice", "responsibleDept", "estimatedHours"],
          },
        },
      });

      let parsed = {
        priority: "medium",
        detectedCategory: category,
        safetyAdvice: "Exercise caution in this area and alert nearby school staff.",
        responsibleDept: "Facilities & Sanitation",
        estimatedHours: 8,
      };

      if (response.text) {
        try {
          parsed = JSON.parse(response.text);
        } catch (e) {
          console.warn("JSON parse error from complaint analysis", e);
        }
      }

      res.json(parsed);
    } catch (error: any) {
      console.error("AI Complaint Analysis Error:", error);
      res.status(500).json({
        priority: "medium",
        detectedCategory: req.body.category || "General Hygiene",
        safetyAdvice: "Be careful around the area and report directly to your class teacher.",
        responsibleDept: "School Administration",
        estimatedHours: 12,
      });
    }
  });

  // 3. AI School Health Inspector Endpoint
  app.post("/api/ai/inspector-report", async (req, res) => {
    try {
      const { complaints = [], cleanlinessScores = [] } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          overallStatus: "Good - Minor Attention Required",
          keyHotspots: ["Second Floor Restroom", "Canteen Handwash Station"],
          recurringIssues: ["Slow drainage in washrooms", "Drinking water filter replacement overdue"],
          preventiveRecommendations: [
            "Schedule automated daily sanitization checks for second floor restrooms.",
            "Inspect and clean water filters on a bi-weekly preventive maintenance schedule.",
            "Deploy hygiene reminder infographics near the main canteen."
          ],
          seasonalRiskAlert: "Monsoon Humidity Risk: Ensure damp areas are ventilated to prevent slippery floors and mold growth.",
        });
      }

      const prompt = `You are the "AI School Health & Hygiene Inspector" evaluating a school's overall cleanliness and health infrastructure.
Here is the current complaints data: ${JSON.stringify(complaints.slice(0, 15))}
Here are the location cleanliness scores: ${JSON.stringify(cleanlinessScores)}

Generate a detailed, authoritative executive report for school administrators. Include:
1. Overall Campus Health Status
2. Identified High-Risk Hotspots (locations with multiple complaints or low scores)
3. Recurring Systematic Issues
4. Actionable Preventive Recommendations for school staff
5. Seasonal Health/Hygiene Risk Alert based on typical school risks`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallStatus: { type: Type.STRING },
              keyHotspots: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recurringIssues: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              preventiveRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              seasonalRiskAlert: { type: Type.STRING },
            },
            required: ["overallStatus", "keyHotspots", "recurringIssues", "preventiveRecommendations", "seasonalRiskAlert"],
          },
        },
      });

      let result = {
        overallStatus: "Satisfactory with Moderate Vulnerabilities",
        keyHotspots: ["Washrooms Block B", "Science Wing Water Cooler"],
        recurringIssues: ["Frequent water spills", "Towel replenishment delay"],
        preventiveRecommendations: [
          "Increase custodial checks in high-footfall washrooms during lunch hours.",
          "Install anti-slip mats around water stations."
        ],
        seasonalRiskAlert: "Keep playground drains clear during heavy rainfall to avoid mosquito breeding ground.",
      };

      if (response.text) {
        try {
          result = JSON.parse(response.text);
        } catch (e) {
          console.warn("JSON parse error from AI Inspector", e);
        }
      }

      res.json(result);
    } catch (error: any) {
      console.error("AI Inspector Error:", error);
      res.status(500).json({
        overallStatus: "Analysis Completed (Default Assessment)",
        keyHotspots: ["Restrooms Block A", "Canteen Area"],
        recurringIssues: ["Trash bin overflow", "Water pressure fluctuations"],
        preventiveRecommendations: [
          "Routine hourly inspection during break times.",
          "Check water filtration cartridges."
        ],
        seasonalRiskAlert: "Maintain dry classroom entrances during wet weather.",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CampusCare server running on http://localhost:${PORT}`);
  });
}

startServer();
