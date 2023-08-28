const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    ChatId: {
      type: String,
      required: true,
      unique: [true, "Chat Id already exists"],
    },
    Username: {
      type: String,
      unique: [true, "Username already exists"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
User.createUser = (user) => {
    return User.create(user)   
}
module.exports = User;
