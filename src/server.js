const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3000;


const runServer = async () => {
    try {
        await connectDB();
        console.log("✅ Database connection successful");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
};

runServer();



