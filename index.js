const express = require('express');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 8000; // Use environment port if available

const targetSecond = 24 // Ensure execution at XX:38

// Function to calculate the delay until the next `XX:38` for each interval
const getNextExecutionDelay = (intervalMinutes) => {
    const now = new Date();
    let nextExecution = new Date(now);

    // Set the time to the next nearest XX:38
    if (now.getSeconds() >= targetSecond) {
        nextExecution.setMinutes(nextExecution.getMinutes() + 1);
    }
    nextExecution.setSeconds(targetSecond, 0);

    // Find the next XX:38 time that aligns with the interval
    while (nextExecution.getMinutes() % intervalMinutes !== 0) {
        nextExecution.setMinutes(nextExecution.getMinutes() + 1);
    }

    return nextExecution.getTime() - now.getTime();
};

// Define cron tasks
const task1Min = () => {
    console.log('1-minute cron job executed at,', new Date().toLocaleTimeString()); fetch(`https://www.9bets.in/api/winner?period=0`).then(res => res.json()).then(data => console.log(data)).catch(
        err => console.log(err));
}
const task3Min = () => {
    console.log('3-minute cron job executed at', new Date().toLocaleTimeString()); fetch(`https://www.9bets.in/api/winner?period=1`).then(res => res.json()).then(data => console.log(data)).catch(
        err => console.log(err));
};

const task5Min = () => {
    console.log('5-minute cron job executed at', new Date().toLocaleTimeString()); fetch(`https://www.9bets.in/api/winner?period=2`).then(res => res.json()).then(data => console.log(data)).catch(
        err => console.log(err));
};

const task10Min = () => {
    console.log('10-minute cron job executed at', new Date().toLocaleTimeString()); fetch(`https://www.9bets.in/api/winner?period=3`).then(res => res.json()).then(data => console.log(data)).catch(
        err => console.log(err));
};

// Start the cron jobs after the calculated delay
const startCronJob = (task, intervalMinutes) => {
    const delay = getNextExecutionDelay(intervalMinutes);
    console.log(`Waiting ${delay / 1000} seconds to start the ${intervalMinutes}-minute cron job at the next aligned XX:38...`);

    setTimeout(() => {
        // Set up cron job using node-cron
        cron.schedule(`24 */${intervalMinutes} * * * *`, task); // Runs at XX:38, XX:38 + interval, etc.
    }, delay);
};

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is alive!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} at ${new Date().toLocaleTimeString()}`);

    // Adding a small delay to ensure everything is initialized before starting cron jobs
    setTimeout(() => {
        startCronJob(task1Min, 1);  // Start 1-minute cron at next XX:38
        startCronJob(task3Min, 3);  // Start 3-minute cron at next aligned XX:38
        startCronJob(task5Min, 5);  // Start 5-minute cron at next aligned XX:38
        startCronJob(task10Min, 10); // Start 10-minute cron at next aligned XX:38
    }, 5000); // Small delay to allow server to fully start
});
