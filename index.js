const cron = require("node-cron");

// Cron job for every minute at second 24
cron.schedule("24 * * * * *", () => {
  fetch("https://www.9bets.in/api/winner?period=0")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

// Cron job for every 3 minutes at second 24
cron.schedule("24 */3 * * * *", () => {
  fetch("https://www.9bets.in/api/winner?period=1")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

// Cron job for every 5 minutes at second 24
cron.schedule("24 */5 * * * *", () => {
  fetch("https://www.9bets.in/api/winner?period=2")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

// Cron job for every 10 minutes at second 24
cron.schedule("24 */10 * * * *", () => {
  fetch("https://www.9bets.in/api/winner?period=3")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
