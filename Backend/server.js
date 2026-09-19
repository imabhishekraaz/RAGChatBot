import "dotenv/config";

import { ConnectDatabase } from "./src/config/db.js";
import { createChunking } from "./src/chunkings/chunking.js";
import { storeChunks } from "./src/vectorStore/store.js";

async function main() {
    try {

        console.log("1. Connecting database...");

        await ConnectDatabase();

        console.log("2. Creating chunks...");

        const chunks = await createChunking();

        console.log("3. Total chunks:", chunks.length);

        console.log("4. Starting embedding + storage...");

        await storeChunks(chunks);

        console.log("5. DONE - Data stored in MongoDB");

    } catch (error) {

        console.error("Server Error:", error);

    }
}

main();