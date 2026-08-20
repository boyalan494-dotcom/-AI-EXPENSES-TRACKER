const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AI Expense Tracker Backend is running"
    });
});

app.post("/api/expenses", (req, res) => {
    const { amount, category, description } = req.body;

    console.log("New Expense:");
    console.log("Amount:", amount);
    console.log("Category:", category);
    console.log("Description:", description);

    res.json({
        success: true,
        message: "Expense received successfully",
        expense: {
            amount,
            category,
            description
        }
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Expense Tracker Backend running at http://localhost:${PORT}`);
});