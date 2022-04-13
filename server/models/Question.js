const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");


const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [10, "Please provide a title at least 10 char"],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Please provide a content"],
      minlength: [20, "Please provide a content at least 20 char"],
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User", //User modeline referans
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User", //User modeline referans
      },
    ],
    answerCount: {
      type: Number,
      default: 0,
    },
    answers: [{ type: mongoose.Schema.ObjectId, ref: "Answer" }],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

QuestionSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});
QuestionSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // converst to lower case, defaults to `false`
  });
};
QuestionSchema.post("remove", async function(){
  await Answer.deleteMany({
    question:this._id
  })
})
QuestionSchema.virtual("likedByCurrentUser");

module.exports = mongoose.model("Question", QuestionSchema);


const Answer = require("./Answer");