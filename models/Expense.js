const { Schema, model, Types } = require("mongoose");
const expenseSchema = new Schema(
  {
    Category: { type: String, required: true },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    Amount: { type: Number, required: true },
    Remarks: { type: String },
  },
  { timestamps: true }
);
const Expense = model("expenses", expenseSchema);
Expense.addExpense = async (data) => {
  data.UserId = new Types.ObjectId(data.UserId);
  return await Expense.create(data);
}
module.exports = Expense;
