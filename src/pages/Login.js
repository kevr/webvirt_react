import LoginComponent from "../components/Login";

const Login = () => {
  return (
    <div className="flex flex-display flex-col">
      <div className="flex"></div>
      <div className="flex-display flex-row">
        <div className="flex"></div>
        <div className="login-form-container">
          <LoginComponent />
        </div>
        <div className="flex"></div>
      </div>
      <div className="flex"></div>
    </div>
  );
};

export default Login;
