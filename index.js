const express = require("express");
const app = express();

const startTime = 1743441000000; // 11:50:00 UTC (fixed start)
const now = Date.now();

// List of timer configs in seconds
const timers = [
    { period: 0, interval: 60 },   // 1 min
    { period: 1, interval: 180 },  // 3 min
    { period: 2, interval: 300 },  // 5 min
    { period: 3, interval: 600 }   // 10 min
];

// Helper: schedule each timer
timers.forEach(({ period, interval }) => {
    const intervalMs = interval * 1000;
    const triggerOffset = 4 * 1000; // Trigger 4 seconds early

    // How far into the current loop we are
    const elapsed = (now - startTime) % intervalMs;

    // Time to wait until the next aligned trigger
    const initialDelay = intervalMs - elapsed - triggerOffset;

    setTimeout(() => {
        // Trigger immediately after initial delay
        runTask(period);

        // Then run every intervalMs
        setInterval(() => runTask(period), intervalMs);
    }, initialDelay);
});

// Actual job logic
function runTask(period) {
    console.log(`Triggering ${period}-minute timer at ${new Date().toISOString()}`);
    fetch(`https://www.9bets.in/api/winner?period=${period}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is alive!" });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} at ${new Date().toLocaleTimeString()}`);
});
