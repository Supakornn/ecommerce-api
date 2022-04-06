const mongoose = require("mongoose");
const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating is required"]
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxlength: 100
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: 100
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product"
    }
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  console.log("post remove");
});

module.exports = mongoose.model("Review", ReviewSchema);
