const Users = require("./users.js");
const Expenses = require("./expense.js");
const config = require("../utils/config.js");
const CommandHelpers = require("../utils/commands.js");
class BotHandler {
  bot;
  constructor(bot) {
    this.bot = bot;
  }
  registerUser = async (msg, match) => {
    let chatId = msg.chat.id;
    let resp = match[1];
    Users.findOrCreateUser(chatId);
    console.log({ msg });
    console.log(msg.entities);
    this.bot.sendMessage(chatId, config.welcome);
  };
  recordSpend = async (msg, match) => {
    var chatId = msg.chat.id;
    let resp = match[1];
    try {
      const { status, amount, type, message } =
        CommandHelpers.findTypeAndAmount(resp);
      if (!status) {
        this.bot.sendMessage(
          chatId,
          message ? message : "Could not record spend"
        );
      } else {
        const response = await Expenses.addExpense({
          amount,
          category: type,
          chatId,
        });
        this.bot.sendMessage(
          chatId,
          response.message
            ? response.message
            : response.status
            ? "Recorded"
            : "Could not record activity"
        );
      }
    } catch (error) {
      console.error(error);
      this.bot.sendMessage(chatId, "Something went wrong");
    }
  };
}

module.exports = BotHandler;
