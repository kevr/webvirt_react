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
import { useDispatch } from "react-redux";
import M from "materialize-css";
import { setAppTitle } from "../store/Actions";
import { Layout } from "../layouts";
import { Tabs, Tab } from "../components/Tabs";
import Networks from "../components/host/Networks";
import Overview from "../components/host/Overview";

const Host = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppTitle("Host Dashboard"));

    const el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);
  });

  return (
    <Layout>
      <Tabs id="host-dashboard">
        <Tab title="Overview" linkId="host-dashboard-overview" index={0}>
          <Overview />
        </Tab>
        <Tab title="Networks" linkId="host-dashboard-networks" index={1}>
          <Networks />
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default Host;
