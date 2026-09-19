import path from "node:path";
import { fileURLToPath } from "node:url";
import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

// file path where the '.txt' file save

// load the file and return the file
export const loadDirectory = async (directoryPath) => {
    const loader = new DirectoryLoader(directoryPath, {
        ".txt": (filePath) => new TextLoader(filePath),
    });

    return await loader.load();
};
