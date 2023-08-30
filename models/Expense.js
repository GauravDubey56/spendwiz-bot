const { Schema, model } = require("mongoose");
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
module.exports = Expense;
