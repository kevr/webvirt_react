/*
 * Copyright 2023 Kevin Morris
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
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
        <img src="/images/logo.png" alt="Logo" width="180px" />
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
