const axios = require("axios");
const baseUrl = "http://localhost:4001/api/bot";
const apiResponse = (res) => {
  if (!(res && res.meta)) {
    throw new Error("Received undefined response");
  }
  const { meta, data, token } = res;
  return {
    status: meta.status ? true : false,
    message: meta.message,
    data,
    token,
  };
};
const checkChatUser = async (chatId) => {
  try {
    var res = await axios
      .request({
        method: "post",
        url: baseUrl + "/user",
        data: {
          chatId: chatId.toString(),
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return apiResponse(res);
  } catch (error) {
    throw error;
  }
};

const recordSpend = async (chatId, data) => {
  try {
    var res = await axios
      .request({
        method: "post",
        url: baseUrl + "/spend",
        data: {
          chatId,
          ...data,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return apiResponse(res);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  checkChatUser,
  recordSpend,
};
