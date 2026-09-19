import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const ai = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
});

export async function createEmbedding(text) {
    return await ai.embedQuery(text);
}
