const cron = require("node-cron");
const express = require("express");

const app = express();

// Cron job for every minute at second 24
cron.schedule("54 * * * * *", () => {
    console.log("1min")
    fetch("https://www.9bets.in/api/winner?period=0")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
});

// Cron job for every 3 minutes at second 24
cron.schedule("54 */3 * * * *", () => {
    console.log("3min")

    fetch("https://www.9bets.in/api/winner?period=1")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
});

// Cron job for every 5 minutes at second 24
cron.schedule("54 */5 * * * *", () => {
    console.log("5min")

    fetch("https://www.9bets.in/api/winner?period=2")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
});

// Cron job for every 10 minutes at second 24
cron.schedule("54 */10 * * * *", () => {
    console.log("10min")

    fetch("https://www.9bets.in/api/winner?period=3")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
});


app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is alive!" });
});

const PORT = 8000
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} at ${new Date().toLocaleTimeString()}`);

});