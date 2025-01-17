import { useSelector, useDispatch } from "react-redux";
import { clearMe } from "../slices/meSlice";
import { Link } from "react-router-dom";
import { SignOut } from "phosphor-react";
import "../styles/NavBar.css";
import "../styles/ProfileBtn.css";
import blankUser from "../assets/blank-user.png";
import { media } from "../scripts/script";

function YourProfileBtn({ setHomeFeed, setFriendRequests }) {
  const me = useSelector((state) => state.me);
  const dispatch = useDispatch();

  function handleLogOutBtnClicked() {
    // clear me from state
    dispatch(clearMe());

    // clear home feed and friend requests
    setHomeFeed([]);
    setFriendRequests([]);

    // clear me from localstorage
    localStorage.removeItem("me");
  }

  return (
    <div className="ProfileBtn" tabIndex={-1}>
      <button className="has-tooltip">
        {media(me.user.pfp || blankUser, { size: "s" })}
      </button>
      <div className="window">
        <div className="user">
          <Link
            to={`/profile/${me.user._id}`}
            className="link"
            onClick={() => {
              document.activeElement.blur();
            }}
          >
            {media(me.user.pfp || blankUser, { size: "s" })}
            <div className="name">{`${me.user.first_name} ${me.user.last_name}`}</div>
          </Link>
        </div>
        <Link to="/" className="log-out-link" onClick={handleLogOutBtnClicked}>
          <div className="icon">
            <SignOut />
          </div>
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
}

export default ProfileBtn;