import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NewPost.css";
import blankUser from "../assets/blank-user.png";
import ComposePostForm from "./ComposePostForm";
import { media } from "../scripts/script";

function NewPost({ setFeed }) {
  const me = useSelector((state) => state.me);
  const [newPostFormShown, setNewPostFormShown] = useState(false);

  function handleNewPostBtnClicked() {
    setNewPostFormShown(true);
  }

  return (
    <div className="NewPost">
      <Link to={`/profile/${me.user._id}`}>
        {media(me.user.pfp || blankUser, {
          className: "new-post-pfp",
          size: "s",
        })}
      </Link>
      <div className="new-post-form-container">
        <button
          type="button"
          className="new-post"
          onClick={handleNewPostBtnClicked}
        >
          {`What's on your mind, ${me.user.first_name}?`}
        </button>
        {newPostFormShown ? (
          <ComposePostForm
            setComposePostFormShown={setNewPostFormShown}
            setFeed={setFeed}
          />
        ) : null}
      </div>
    </div>
  );
}

export default NewPost;