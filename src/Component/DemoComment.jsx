import React, {useState,useEffect} from 'react';
import '../CSS/Comment.css'
import imag from '../Image/account-icon-user-icon-vector-graphics_292645-552.avif'
const apikey = 'AIzaSyBzBR801HJyhItSElo3AvHpPWAvjeH9Ds0';
function DemoComment({videoID}) {
    const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Cid&videoId=${videoID}&key=${apikey}`
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
  }, []);

    return (
        <>
                  {comments.map(comment => (
                    <div key={comment.id} className='bv2_event'>
            <div className='bv2_event_img'>
                <img
                    src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl ? comment.snippet.topLevelComment.snippet.authorProfileImageUrl : imag}
                    className='bv2_event_img'
                />
            </div>
            <div className='bv2_content'>
                <h4 className='bv2'>
                    <span className='bv2_user_name'>{comment.snippet.topLevelComment.snippet.authorDisplayName
}</span>
                    <span className='bv2_info'>
                        {comment.snippet.topLevelComment.snippet.publishedAt}
                    </span>
                </h4>
            </div>
            <div className='bv2_msg critical-feature'>
                <div className='flex-kids-x space-between'>
                <div className='flex-kids-y flex-1-hemmed'>
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                </div>
                <div className='flex-kids-y justify-space-between'>

                </div>

                </div>
            </div>
        </div>
      ))}
      <div className='bv2_form'>
      <form>
        <textarea className='bv2_input' type='text' placeholder='Enter your comment'/>
        <div className='btn_div'>
        <button type='submit' className='bv2_btn'>Comment</button>

        </div>

        </form>
      </div>
        </>
    


    );
}

export default DemoComment;