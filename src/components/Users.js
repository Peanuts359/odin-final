import { Link } from "react-router-dom";
import "../styles/Users.css";
import blankUser from "../assets/blank-user.png";
import { media } from "../scripts/script";
import Relationship from "./Relationship";

function Users({ user, setUserListShown }) {
  function handleLinkClicked() {
    // hide user list
    setUserListShown(false);
  }

  return (
    <div className="Users">
      <Link to={`/profile/${user._id}`} onClick={handleLinkClicked}>
        {media(user.pfp || blankUser, { className: "pfp", size: "s" })}
      </Link>
      <Link
        to={`/profile/${user._id}`}
        className="full-name"
        onClick={handleLinkClicked}
      >
        {`${user.first_name} ${user.last_name}`}
      </Link>
      {<Relationship userId={user._id} />}
    </div>
  );
}

export default Users;