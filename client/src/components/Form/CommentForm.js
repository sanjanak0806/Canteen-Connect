import React, { useState } from 'react';

const CommentForm = ({ onCommentSubmit }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !comment) {
      alert('Please enter both author and comment.');
      return;
    }

    // Pass the new comment to the parent component
    onCommentSubmit({ author, comment });

    // Clear the form fields after submitting
    setAuthor('');
    setComment('');
  };

  return (
    <div>
      <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
