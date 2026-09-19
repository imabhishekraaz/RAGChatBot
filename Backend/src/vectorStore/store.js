import { getDB } from "../config/db.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GEMINI_API_KEY
});

export async function storeChunks(chunks) {

    console.log("STORE CHUNKS FUNCTION CALLED");

    const db = getDB();

    const collection = db.collection("documents");

    const texts = chunks.map(
        chunk => chunk.pageContent
    );

    console.log(`Creating embeddings for ${texts.length} chunks...`);

    const vectors = await embeddings.embedDocuments(texts);

    console.log("All embeddings created");

    const documents = chunks.map((chunk, index) => ({
        text: chunk.pageContent,

        embedding: vectors[index],

        metadata: chunk.metadata || {}
    }));

    if (documents.length > 0) {
        await collection.insertMany(documents);
    }

    console.log(
        `${documents.length} chunks stored in MongoDB`
    );
}