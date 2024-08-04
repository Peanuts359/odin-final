import "../styles/Feed.css";
import Post from "./Post";
import NewPost from "./NewPost";
import SpinThrobber from "./SpinThrobber";

function Feed({ feed, newPostBtnHidden, setFeedComments, isLoading, setFeed }) {
  return (
    <div className="Feed">
      {newPostBtnHidden ? null : <NewPost setFeed={setFeed} />}
      {feed.length || isLoading ? (
        feed.map(
          (post, idx) =>
            post && (
              <Post
                post={post}
                key={post._id}
                setFeedComments={setFeedComments}
                setFeed={setFeed}
              />
            )
        )
      ) : (
        <div className="no-posts-msg">No posts found</div>
      )}
      {isLoading ? <SpinThrobber /> : null}
    </div>
  );
}

export default Feed;