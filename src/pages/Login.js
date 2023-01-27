import { useSearchParams } from "react-router-dom";
import LoginComponent from "../components/Login";

const Login = () => {
  const { next } = useSearchParams();

  return (
    <div className="flex flex-display flex-col">
      <div className="flex"></div>
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
