import Session from "./Session";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container flex-display flex-row">
          <div className="flex"></div>
          <div className="auth-component-wrapper">
            <Session />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
