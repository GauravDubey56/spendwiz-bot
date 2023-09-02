const config = require('./config')
exports.findTypeAndAmount = (msg) => {
  try {
    let words = msg.split(/\s/);
    let amt, type;
    let txnMsg = words.slice(0, 3);
    amt = txnMsg.find((ele) => ele && !isNaN(ele));
    // words = txnMsg.filter((ele) => isNaN(ele)).map((ele) => ele.toLowerCase());
    type = txnMsg[txnMsg.length-1];
    if (!amt || !type || !config.spendType.includes(type)) {
      return {
        status: false,
        message: "Invalid command to record transaction",
      };
    } else {
      let message = words.slice(3).join(" ")
      return {
        status: true,
        type,
        amount: amt,
        remarks: message

      };
    }
  } catch (error) {
    throw error;
  }
};
