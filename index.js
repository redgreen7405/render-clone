// const express = require('express');

// const app = express();
// const PORT = 8000;

// const unixTime = 1743313658000; // Given Unix timestamp
// const startTime = new Date(unixTime);

// // Extract hours, minutes, and seconds
// const hours = startTime.getHours();
// const minutes = startTime.getMinutes();
// const seconds = startTime.getSeconds();

// // Get current time
// const now = new Date();
// const startAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
// let delay = startAt.getTime() - now.getTime();

// // If the time has already passed today, start immediately
// if (delay < 0) {
//     delay = 0;
// }

// // Define the tasks for each cron job
// const task1Min = () => console.log('1-minute cron job executed at', new Date().toLocaleTimeString());
// const task3Min = () => console.log('3-minute cron job executed at', new Date().toLocaleTimeString());
// const task5Min = () => console.log('5-minute cron job executed at', new Date().toLocaleTimeString());
// const task10Min = () => console.log('10-minute cron job executed at', new Date().toLocaleTimeString());

// // Function to start cron jobs properly
// const startCronJobs = () => {
//     console.log(`Starting cron jobs at ${new Date().toLocaleTimeString()}`);

//     const now = new Date();
//     const currentSeconds = now.getSeconds();
//     const correctionDelay = (seconds - currentSeconds + 60) % 60 * 1000; // Ensure exact second execution

//     setTimeout(() => {
//         task1Min();
//         setInterval(task1Min, 60 * 1000); // Run every 1 min
//     }, 60 * 1000 + correctionDelay); // First execution after 1 min

//     setTimeout(() => {
//         task3Min();
//         setInterval(task3Min, 3 * 60 * 1000); // Run every 3 min
//     }, 3 * 60 * 1000 + correctionDelay); // First execution after 3 min

//     setTimeout(() => {
//         task5Min();
//         setInterval(task5Min, 5 * 60 * 1000); // Run every 5 min
//     }, 5 * 60 * 1000 + correctionDelay); // First execution after 5 min

//     setTimeout(() => {
//         task10Min();
//         setInterval(task10Min, 10 * 60 * 1000); // Run every 10 min
//     }, 10 * 60 * 1000 + correctionDelay); // First execution after 10 min
// };


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`Waiting ${delay / 1000} seconds to start cron jobs...`);
//     setTimeout(startCronJobs, delay); // Wait until the exact Unix time before starting jobs
// });

// const express = require('express');

// const app = express();
// const PORT = 8000;

// const targetSecond = 38; // Ensure execution at XX:38

// // Function to calculate delay until the next `XX:38`
// const getNextExecutionDelay = () => {
//     const now = new Date();
//     const nextExecution = new Date(now);

//     if (now.getSeconds() >= targetSecond) {
//         nextExecution.setMinutes(nextExecution.getMinutes() + 1); // Move to the next minute
//     }

//     nextExecution.setSeconds(targetSecond, 0); // Align to XX:38

//     return nextExecution.getTime() - now.getTime();
// };

// // Define the cron job tasks
// const task1Min = () => console.log('1-minute cron job executed at', new Date().toLocaleTimeString());
// const task3Min = () => console.log('3-minute cron job executed at', new Date().toLocaleTimeString());
// const task5Min = () => console.log('5-minute cron job executed at', new Date().toLocaleTimeString());
// const task10Min = () => console.log('10-minute cron job executed at', new Date().toLocaleTimeString());

// // Function to start cron jobs at `XX:38`
// const startCronJobs = () => {
//     console.log(`Starting cron jobs at ${new Date().toLocaleTimeString()}`); // ✅ Log when cron starts

//     setInterval(task1Min, 60 * 1000); // Run every 1 min at XX:38
//     setInterval(task3Min, 3 * 60 * 1000); // Run every 3 min at XX:38
//     setInterval(task5Min, 5 * 60 * 1000); // Run every 5 min at XX:38
//     setInterval(task10Min, 10 * 60 * 1000); // Run every 10 min at XX:38
// };

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT} at ${new Date().toLocaleTimeString()}`); // ✅ Log server start time

//     const delay = getNextExecutionDelay();
//     console.log(`Waiting ${delay / 1000} seconds to start cron jobs at XX:38...`);

//     setTimeout(() => {
//         startCronJobs(); // Start all cron jobs at the next `XX:38`

//         // Execute each job once at `XX:38` before intervals start
//         task1Min();
//         task3Min();
//         task5Min();
//         task10Min();
//     }, delay);
// });

const express = require('express');

const app = express();
const PORT = 8000;

const targetSecond = 38; // Ensure execution at XX:38

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
const task1Min = () => console.log('1-minute cron job executed at', new Date().toLocaleTimeString());
const task3Min = () => console.log('3-minute cron job executed at', new Date().toLocaleTimeString());
const task5Min = () => console.log('5-minute cron job executed at', new Date().toLocaleTimeString());
const task10Min = () => console.log('10-minute cron job executed at', new Date().toLocaleTimeString());

// Start a cron job after the calculated delay and schedule it properly
const startCronJob = (task, intervalMinutes) => {
    const delay = getNextExecutionDelay(intervalMinutes);
    console.log(`Waiting ${delay / 1000} seconds to start the ${intervalMinutes}-minute cron job at the next aligned XX:38...`);

    setTimeout(() => {
        task(); // Execute the first job at exact timing
        setInterval(task, intervalMinutes * 60 * 1000); // Continue at correct intervals
    }, delay);
};

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} at ${new Date().toLocaleTimeString()}`);

    startCronJob(task1Min, 1);  // Start 1-minute cron at next XX:38
    startCronJob(task3Min, 3);  // Start 3-minute cron at next aligned XX:38
    startCronJob(task5Min, 5);  // Start 5-minute cron at next aligned XX:38
    startCronJob(task10Min, 10); // Start 10-minute cron at next aligned XX:38
});
