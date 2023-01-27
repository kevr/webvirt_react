import Navbar from "../components/Navbar";
import Authenticated from "../layouts/Authenticated";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-display flex-col">
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
