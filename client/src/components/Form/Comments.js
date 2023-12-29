// Comments.js

import React, { useState } from 'react';

const CommentForm = ({ onCommentSubmit }) => {
  // const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !comment) {
      alert('Please enter both author and comment.');
      return;
    }

    onCommentSubmit({ comment });

    // Clear the form fields after submitting
    // setAuthor('');
    setComment('');
  };

  return (
    <div>
      <h5>Add a Comment</h5>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Name:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label> */}
        {/* <br /> */}
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

const Comments = ({ comments, onCommentSubmit }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            { <strong>{comment.comment}:</strong> 
            // {comment.author} 
          }
          </li>
        ))}
      </ul>
      <CommentForm onCommentSubmit={onCommentSubmit} />
    </div>
  );
};

export default Comments;
