import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Authenticated from "../layouts/Authenticated";

const Layout = ({ children }) => {
  const title = useSelector((state) => state.app.title);
  return (
    <div className="flex flex-display flex-col">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Authenticated>
        <div className="layout flex flex-display flex-col">
          <Navbar />
          <div className="content flex flex-display flex-col">{children}</div>
        </div>
      </Authenticated>
    </div>
  );
};

export default Layout;
