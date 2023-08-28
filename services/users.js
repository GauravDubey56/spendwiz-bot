const db = require("../models");
const findOrCreateUser = async (chatId) => {
  chatId = chatId.toString();
  const resp = {};
  try {
    let user = await db.users.findOne({
      ChatId: chatId,
    });
    if (!user) {
      user = await db.users.createUser({
        ChatId: chatId,
        Username: `User_${Date.now().toString()}`,
      });
      resp.status = 200;
      resp.message = "User created";
    } else {
      resp.status = 400;
      resp.message = "User already exists";
    }
    return resp;
  } catch (error) {
    console.error(error);
    resp.status = 500;
    resp.message = "Internal server error occurred";
    return resp;
  }
};

module.exports = {
  findOrCreateUser,
};
