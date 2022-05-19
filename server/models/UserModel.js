// User Schema for Mongoose
const mongoose = require("mongoose");

const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      index: { unique: true },
      minlength: 3,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
      validate: {
        validator: emailValidator.validate,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      require: true,
      trim: true,
      index: { unique: true },
      minlength: 8,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

// //this method will available with every document that comes
// //from the database
UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// UserSchema.pre("save", async function preSave(next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   try {
//     const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
//     user.password = hash;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = mongoose.model("User", UserSchema);
