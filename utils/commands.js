const config = require('./config')
exports.findTypeAndAmount = (msg) => {
  try {
    let words = msg.split(/\s/);
    let amt, type;
    amt = words.find((ele) => ele && !isNaN(ele));
    words = words.filter((ele) => isNaN(ele)).map((ele) => ele.toLowerCase());
    type = words.join("_");
    if (!amt || !type || !config.spendType.includes(type)) {
      return {
        status: false,
        message: "Invalid command to record transaction",
      };
    } else {
      return {
        status: true,
        type,
        amount: amt,
      };
    }
  } catch (error) {
    throw error;
  }
};
