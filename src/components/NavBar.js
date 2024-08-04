import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import ProfileBtn from "./ProfileBtn";
import homeSelected from "../assets/home-selected.svg";
import homeUnselected from "../assets/home-unselected.svg";
import friendsSelected from "../assets/friends-selected.svg";
import friendsUnselected from "../assets/friends-unselected.svg";
import { smoothScrollToTop } from "../scripts/script";

function NavBar({ setHomeFeed, setFriendRequests }) {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (pathname === "/") {
      setSelected("home");
    } else if (pathname === "/friends") {
      setSelected("friends");
    } else {
      setSelected("");
    }
  }, [pathname]);

  const homeLink = (
    <Link
      to="/"
      className={
        "home-link has-tooltip" +
        (selected === "home" ? " selected" : " unselected")
      }
      onClick={smoothScrollToTop}
    >
      <div className="img-container">
        <img src={selected === "home" ? homeSelected : homeUnselected} alt="" />
      </div>
    </Link>
  );

  const friendsLink = (
    <Link
      to="/friends"
      className={
        "friends-link has-tooltip" +
        (selected === "friends" ? " selected" : " unselected")
      }
      onClick={smoothScrollToTop}
    >
      <div className="img-container">
        <img
          src={selected === "friends" ? friendsSelected : friendsUnselected}
          alt=""
        />
      </div>
    </Link>
  );

  return (
    <nav className="NavBar">
      <div className="left third">
        <Link to="/" className="logo-small" onClick={smoothScrollToTop}>
          v
        </Link>
        <SearchBar />
      </div>
      <div className="middle third">
        {homeLink}
        {friendsLink}
      </div>
      <div className="right third">
        <ProfileBtn
          setHomeFeed={setHomeFeed}
          setFriendRequests={setFriendRequests}
        />
      </div>
    </nav>
  );
}

export default NavBar;