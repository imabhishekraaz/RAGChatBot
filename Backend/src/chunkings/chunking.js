import { fileURLToPath } from "node:url";
import path from "node:path";

import {
    RecursiveCharacterTextSplitter
} from "@langchain/textsplitters";

import { loadDirectory } from "../Load_data/loading_data.js";


const DIRECTORY = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../Data"
);


export async function chunks(LOADED_DATA) {

    const splitter =
        new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 50
        });

    const chunks =
        await splitter.splitDocuments(LOADED_DATA);

    return chunks;
}


export async function createChunking() {

    const LOADED_DATA =
        await loadDirectory(DIRECTORY);

    console.log(
        "Loaded documents:",
        LOADED_DATA.length
    );

    const res =
        await chunks(LOADED_DATA);

    console.log(
        "Total chunks:",
        res.length
    );

    return res;
}