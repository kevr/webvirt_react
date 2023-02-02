import Session from "./Session";
import SessionReducer from "./SessionRefresher";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container flex-display flex-row">
          <div className="flex"></div>
          <div className="auth-component-wrapper">
            <SessionReducer>
              <Session />
            </SessionReducer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
