const db = require("../models");
const addExpense = async ({ amount, category, chatId }) => {
  chatId = chatId.toString();
  const resp = {};
  try {
    let user = await db.users.findOne({
      ChatId: chatId,
    });
    let userId = ""
    if (!user) {
      resp.status = 400;
      user = await db.users.create({
        ChatId: chatId,
        Username: `User_${Date.now().toString()}`,
      });
      userId = user?._doc?._id
    } else {
        userId = user?._doc?._id;
    }
    const expense = {
      Amount: amount,
      Category: category,
      UserId: userId
    };
    await db.expenses.create(expense);
    resp.status = 200;
    resp.message = "New expense recorded";
    return resp;
  } catch (error) {
    console.error(error);
    resp.status = 500;
    resp.message = "Internal server error occurred";
    return resp;
  }
};

module.exports = {
  addExpense,
};
