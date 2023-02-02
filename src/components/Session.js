import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../store/Actions";
import M from "materialize-css";

const Session = ({ children }) => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    const elements = document.querySelectorAll(".dropdown-trigger");
    const options = {
      align: "right",
      coverTrigger: false,
    };

    M.Dropdown.init(elements, options);
  }, [session, dispatch]);

  const onLogout = (event) => {
    event.preventDefault();
    dispatch(removeSession());
  };

  return (
    <div>
      <ul id="auth-dropdown" className="dropdown-content">
        <li>
          <a href="#!" onClick={onLogout}>
            {"Logout"}
          </a>
        </li>
      </ul>

      <ul className="right">
        <li>
          <a className="dropdown-trigger" href="#!" data-target="auth-dropdown">
            <b>{session.user || "Logged In"}</b>{" "}
            <i className="material-icons right">arrow_drop_down</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Session;
