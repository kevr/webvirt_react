import { useSelector } from "react-redux";
import Login from "../pages/Login";

const Authenticated = ({ children }) => {
  const session = useSelector((state) => state.session);
  const authenticated = session.access;

  if (!authenticated) {
    return <Login />;
  }

  return <div className="content">{children}</div>;
};

export default Authenticated;
