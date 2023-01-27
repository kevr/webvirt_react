import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Authenticated = ({ children }) => {
  const session = useSelector((state) => state.session);
  const authenticated = session.access;

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      const next = encodeURIComponent(loc.pathname);
      navigate(`/login?next=${next}`);
    }
  });

  if (!authenticated) {
    return <span />;
  }

  return <div className="flex flex-display flex-col">{children}</div>;
};

export default Authenticated;
