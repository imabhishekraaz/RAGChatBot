import { getDB } from "../config/db.js";
import { createEmbedding } from "../embeddings/embedding.js";

export async function searchSimilarDocuments(query) {

    const db = getDB();

    const collection = db.collection("documents");

    // User question → embedding
    const queryVector = await createEmbedding(query);

    const results = await collection.aggregate([

        {
            $vectorSearch: {

                index: "vector_index",

                path: "embedding",

                queryVector: queryVector,

                numCandidates: 100,

                limit: 5
            }
        },

        {
            $project: {

                _id: 0,

                text: 1,

                metadata: 1,

                score: {
                    $meta: "vectorSearchScore"
                }
            }
        }

    ]).toArray();

    return results;
}