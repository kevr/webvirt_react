import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Session from "./Session";
import SessionReducer from "./SessionRefresher";

const Navbar = () => {
  const title = useSelector((state) => state.app.title);

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container flex-display flex-row">
          <ul>
            <li>
              <Link id="dashboard-link" data-tooltip-content="Dashboard" to="/">
                <i className="material-icons">home</i>
              </Link>
            </li>
          </ul>
          <div className="brand-logo-wrapper overflow-ellipsis">
            <span className="title text-center">{title}</span>
          </div>
          <div className="flex"></div>
          <div className="auth-component-wrapper">
            <SessionReducer>
              <Session />
            </SessionReducer>
          </div>
        </div>
      </div>
      <Tooltip anchorId="dashboard-link" place="bottom" />
    </nav>
  );
};

export default Navbar;
