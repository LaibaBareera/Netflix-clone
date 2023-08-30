import React, { useState, useEffect } from 'react';

const apikey = 'AIzaSyBzBR801HJyhItSElo3AvHpPWAvjeH9Ds0';

function Comment({ trailerUrl }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Cid&videoId=${trailerUrl}&key=${apikey}`
      );
      const data = await response.json();
      setComments(data.items);
      console.log(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [trailerUrl]);

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
        </div>
      ))}
    </div>
  );
}

export default Comment;
