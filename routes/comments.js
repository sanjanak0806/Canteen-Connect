import express from "express";
import {createReview} from "./../controllers/review.js";

const router = express.Router();

router.post("/add-comment", createReview);

export default router;
