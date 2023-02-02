import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoginComponent from "../components/Login";
import { setAppTitle } from "../store/Actions";

const Login = () => {
  const { next } = useSearchParams();
  const title = useSelector((state) => state.app.title);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppTitle("Login"));
  }, [dispatch]);

  return (
    <div className="flex flex-display flex-col">
      <Helmet>
        {/* <Login> does not use <Layout>, so set the page title here */}
        <title>{title}</title>
      </Helmet>
      <div className="flex"></div>
      <div className="text-center">
        <img src="/images/logo.png" alt="Logo" width="128px" />
      </div>
      <div className="flex-display flex-row">
        <div className="flex"></div>
        <div className="login-form-container">
          <LoginComponent next={next || "/"} />
        </div>
        <div className="flex"></div>
      </div>
      <div className="flex"></div>
    </div>
  );
};

export default Login;
