import Product from "./../models/productModel.js";
import Review from "./../models/review.js";

export const createReview = async (req, res) => {
  const review = new Review(req.body.review);
  review.author = req.body.id;
  await review.save();
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  product.reviews.push(review);
  await product.save();

  res.status(200).send(product);

  // req.flash('success', 'Review Added SuccessFully !!!');

  // res.redirect(`/lodges/${id}`);
};

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Lodge.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted SuccessFully !!!");

  res.redirect(`/lodges/${id}`);
};
