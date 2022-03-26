const mongoose = require("mongoose");
const Question = require("./Question");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,

    required: [true, "Please provide a content"],
    minlength: [10, "Please provide a content at least 10 char"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User", //User modeline referans
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    return next();
  }
  try {
    const question = await Question.findById(this.question);
    question.answers.push(this._id);
    question.answerCount=question.answers.length;
    await question.save();
    next();
  } catch (err) {
    return next(err);
  }
});

AnswerSchema.virtual("likedByCurrentUser");

module.exports = mongoose.model("Answer", AnswerSchema);
