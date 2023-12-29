import mongoose from 'mongoose';
// const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

export default mongoose.model('Review', reviewSchema);