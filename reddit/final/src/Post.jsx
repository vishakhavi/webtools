import CreatePosts from "./CreatePosts";
const Post = (
posts) => {

let postList =  Object.values(posts.topic);
const onCalculateDate = (date) => {
let result = new Date(date);
let today = new Date();
  return Math.ceil((today-result) / 8.64e7);
}
 const SHOW = {  // a constant used only in this component
    EMPTY: 'empty',
    POSTS: 'posts',
  };

  let show;
console.log(posts);
  if (!postList.length ) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.POSTS;
  }
  return (
<>
<div className="posts"> 
      { show === SHOW.EMPTY && (
        <p>No posts to display!</p>
      )}
  <div className ="posts__comments">Total {postList.length} comments</div>
   {show === SHOW.POSTS && (
        <div className="posts">
         
          { postList.map((post, key) => (
            <>
            <div className ={`post-${key} comments`} >
            <div class="comment-voting">
            <i class="gg-arrow-long-up"></i> 
            {post.votes}
            <i class="gg-arrow-long-down"></i>
            </div>
            <p key={key} className="post">{post.post }</p>
            </div>
           <div className="post__details">Submitted {onCalculateDate(post.time)} day(s) ago by  {post.username}</div>
            </>
          ))}
        </div>
      
      )}
<CreatePosts />
 
</div>
</>

);

};

export default Post;