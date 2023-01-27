import Navbar from "../components/Navbar";
import Authenticated from "../layouts/Authenticated";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-display flex-col">
      <Authenticated>
        <div className="layout">
          <Navbar />
          <div className="content">{children}</div>
        </div>
      </Authenticated>
    </div>
  );
};

export default Layout;
