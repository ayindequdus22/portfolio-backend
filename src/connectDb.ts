import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;
export const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "portfolioDB",
    password: process.env.DBPassword
});
const connectDb = async () => {
    try {
        await client.connect();
        console.log("Database connected successfully!");

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the application if the connection fails
    }

}
export default connectDb;
