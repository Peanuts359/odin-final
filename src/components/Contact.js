import { Link } from "react-router-dom";
import "../styles/Contact.css";
import blankUser from "../assets/blank-user.png";
import { media } from "../scripts/script";

function Contact({ user }) {
  return (
    <Link to={`/profile/${user._id}`} className="Contact">
      {media(user.pfp || blankUser, { className: "pfp", size: "s" })}
      <div className="full-name">{`${user.first_name} ${user.last_name}`}</div>
    </Link>
  );
}

export default Contact;