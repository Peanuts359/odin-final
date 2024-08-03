import { useSelector } from "react-redux";
import "../styles/ContactSidebar.css";
import Contact from "./Contact";

function ContactSidebar() {
  const me = useSelector((state) => state.me);

  const sorted = [...me.contacts].sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1
  );

  return (
    <div className="ContactSidebar">
      <div className="title">Contacts</div>
      <div className="contacts">
        {sorted.length ? (
          sorted.map((user) => <Contact user={user} key={user._id} />)
        ) : (
          <div className="no-contacts-msg">No contacts found</div>
        )}
      </div>
    </div>
  );
}

export default ContactSidebar;