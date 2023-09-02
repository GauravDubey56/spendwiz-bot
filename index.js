require("dotenv").config({ path: ".env" });
require("./db/connect").connectDB();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_ACCESS_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const config = require("./utils/config");
const BotServices = require("./services/commands");
const BotHandler = new BotServices(bot);

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg, msg.entities);
// });
const helpMessage = `${Object.keys(config.commands).map(
  (key) => `${key}-${config.commands[key].replace("_", " ")} \n`
)}`;
bot.onText(/\/hello/, BotHandler.registerUser);

bot.onText(/\/help/, (msg, match) => {
  bot.sendMessage(msg.chat.id, helpMessage);
});
bot.onText(/\/list/, BotHandler.getExpenses);
bot.onText(/\/spent(.+)/, BotHandler.recordSpend);
