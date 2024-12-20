import "dotenv/config";
import pg from "pg";
import logger from "./logger";
const { Pool } = pg;
export const client = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "portfolioDB",
    password: process.env.DBPassword
});
const connectDb = async () => {
    try {
        await client.connect();
        logger.debug("Database connected successfully!");

    } catch (error) {
        logger.error("Database connection failed:", error);
        process.exit(1); // Exit the application if the connection fails
    }

}
export default connectDb;
