require("dotenv").config({ path: ".env" });
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_ACCESS_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const botServices = require("./api");
const config = require("./config");
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  // console.log(msg, msg.entities);
});
const helpMessage = `${Object.keys(config.commands).map(
  (key) => `${key}-${config.commands[key].replace("_", " ")} \n`
)}`;
bot.onText(/\/hello/, (msg, match) => {
  let chatId = msg.chat.id;
  let resp = match[1];
  botServices.checkChatUser(chatId);
  console.log({ msg });
  console.log(msg.entities);
  bot.sendMessage(chatId, config.welcome);
});

bot.onText(/\/help/, (msg, match) => {
  bot.sendMessage(msg.chat.id, helpMessage);
});

bot.onText(/\/spent(.+)/, async (msg, match) => {
  var chatId = msg.chat.id;
  let resp = match[1];
  try {
    const { status, amount, type, message } = config.findTypeAndAmount(resp);
    if (!status) {
      bot.sendMessage(chatId, message ? message : "Could not record spend");
    } else {
      const response = await botServices.recordSpend(chatId, {
        amount,
        type,
      });
      bot.sendMessage(
        chatId,
        response.message
          ? response.message
          : response.status
          ? "Recorded"
          : "Could not record activity"
      );
    }
  } catch (error) {
    bot.sendMessage(chatId, "Something went wrong");
  }
});
