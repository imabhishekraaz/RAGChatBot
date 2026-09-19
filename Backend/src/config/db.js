import mongoose from "mongoose";

let database;

export const ConnectDatabase = async () => {

    if (database) {
        return database;
    }

    await mongoose.connect(process.env.DB_STR);

    database = mongoose.connection.db;

    console.log("Database Connected...");

    return database;
};


export const getDB = () => {

    if (!database) {
        throw new Error("Database is not connected");
    }

    return database;
};