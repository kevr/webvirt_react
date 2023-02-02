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
