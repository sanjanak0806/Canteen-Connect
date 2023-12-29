// ProductDetails.js

import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";
// import Comments from '../components/Form/Comments';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(""); // Add this line
  // const[rating,setRating]=useState("");

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // const getRating = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/product/set-product/${params.rating}`
  //     );
  //     setRating(data?.rating);
  //     // getSimilarProduct(data?.product._id, data?.product.category._id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCommentSubmit = (newComment) => {
  //   setComments([...comments, newComment]);
  // };

  const handleCommentSubmit = async () => {
    try {
      // Create a new comment object
      const newComment = { text: commentText };

      const authUs = localStorage.getItem("auth");
      const auth2 = JSON.parse(authUs);
      console.log(auth2.user._id);

      // Update the local state immediately

      // Send the comment to the server for storage
      const response = await axios.post("/api/comments/add-comment", {
        review: {
          body: commentText,
        },
        productId: product._id,
      });

      console.log(response);

      if (response.status == 200) {
        // Optionally, update the local state again if needed
        // setComments([...comments, response.data.comment]);
        console.log("Mai");
        setComments([...comments, newComment]);
        setCommentText("");
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Dishes Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Canteen : {product?.category?.name}</h6>
          <h6>Ratings : 1 ⭐</h6>
          {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
        </div>
      </div>
      <hr />
      <div className="comment-section">
        <label htmlFor="commentText">Comment Section:</label>
        <textarea
          id="commentText"
          name="commentText"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={handleCommentSubmit}>
          Add Comment
        </button>
        {/* Display comments section */}
        <div className="comments-section">
          <h5>Reviews</h5>
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((comment, index) => (
            <div key={index} className="comment-box">
              {/* {comment.text} */}
              <div className="user-info">
                <span className="user-icon">👤</span>
                <span className="user-heading">User{index + 1}:</span>
              </div>
              <div className="comment-text">{comment.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="row container similar-products">
        <h4>Similar Dishes ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Dishes found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                className="btn btn-dark ms-1"
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, p])
                  );
                  toast.success("Item Added to cart");
                }}
              >
                ADD TO CART
              </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display comments section */}
      {/* <hr /> */}
      <hr />

      {/* <Comments comments={comments} onCommentSubmit={handleCommentSubmit} /> */}
    </Layout>
  );
};

export default ProductDetails;
