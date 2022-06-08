import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";

export const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    var URL = "http://localhost:8080/comments";
    var token = window.localStorage.getItem("user");
    console.log("t1:" + token);
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    });

    const comments = await response.json();
    setComments(comments);
  }

  async function addComment(newComment) {
    var URL = "http://localhost:8080/comments";
    var token = window.localStorage.getItem("user");
    console.log("t2:" + token);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify({username: "jeremy", body: newComment})
    });

    getComments();
    setComment('');
  }

  const [comment, setComment] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log( 'Comment:', comment);
    addComment(comment);
  }

  return (
    <>
      <div>
        {comments.map(c => (
          <div key={c.id} dangerouslySetInnerHTML={{__html:c.body}}/>
        ))}
      </div>
      <form onSubmit={handleSubmit} >
        <TextField 
          id="outlined-basic" 
          label="New Comment" 
          variant="outlined"
          value={comment}
          onInput={ e=>setComment(e.target.value) }
        />
      </form>
    </>
  );
};
