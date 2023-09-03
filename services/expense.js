const db = require("../models");
const DbClient = require("../db/connect");
const Agrgt = require("../db/aggregates");
const moment = require("moment/moment");
const addExpense = async ({ amount, category, chatId, message }) => {
  chatId = chatId.toString();
  const resp = {};
  try {
    let user = await db.users.findOne({
      ChatId: chatId,
    });
    let userId = "";
    if (!user) {
      resp.status = 400;
      user = await db.users.create({
        ChatId: chatId,
        Username: `User_${Date.now().toString()}`,
      });
      userId = user?._doc?._id;
    } else {
      userId = user?._doc?._id;
    }
    const expense = {
      Amount: amount,
      Category: category,
      UserId: userId,
      Remarks: message,
    };
    await db.expenses.addExpense(expense);
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

const getExpensesByChatId = async (chatId, filters = {}) => {
  const pipeline = [
    {
      $lookup: Agrgt.EXPENSE_USER,
    },
  ];
  if (chatId) {
    pipeline.push({
      $match: {
        "user.ChatId": `${chatId}`,
      },
    });
  }
  pipeline.push({
    $project: {
      _id: 0,
      Category: 1,
      Amount: 1,
      Remarks: 1,
      createdAt: 1,
    },
  });
  const result  = await db.expenses.aggregate(pipeline)
  return result;
};
const toMessage = (txns) => {
  let msg = "";
  txns.forEach(txn =>{
    msg += '\n';
    msg += `${txn.Amount || ""} ${txn.Category || ""} ${txn.createdAt ? moment(txn.createdAt).format('DD MMM hh:mm a'): ""} ${txn.Remarks || ""}`;
  })
  return msg;
}
module.exports = {
  addExpense,
  getExpensesByChatId,
  toMessage
};
