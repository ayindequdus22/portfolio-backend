import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
export const client = new Pool({
    // host:  process.env.host,
    // user:  process.env.user,
    // port:  `${process.env.port}`,
    // database: process.env.database,
    // password: process.env.DBPassword
    connectionString: process.env.DATABASE_URL
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
