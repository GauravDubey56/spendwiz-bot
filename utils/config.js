exports.welcome = `
Hello there! Welcome to our Telegram bot. 
We're excited to have you here and ready to assist you with anything you need. 
Whether you have a question, need help with something, or just want to chat, we're here for you. 
To get started, just type /help to see a list of commands you can use. 
If you have any feedback or suggestions for us, please don't hesitate to let us know. We hope you enjoy using our bot!
`;
exports.spendType = [
  "groceries",
  "party",
  "travel",
  "food",
  "health",
  "stay",
  "utilities",
  "monthly",
  "other",
  "misc",
  "shopping",
  "personal_supplies",
  "subscription",
];
exports.commands = {
  hello: "Register and get a username",
  spent: `Record a transaction, example- */spent 5000 groceries*
    Note- you can record your spends in the following categories
    (${this.spendType.join(", ")})
    `,
};
exports.MONGO_URI = process.env.MONGO_URI;
exports.DB_NAME = process.env.DB_NAME;
