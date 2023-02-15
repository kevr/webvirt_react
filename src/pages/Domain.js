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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { setAppTitle, setVirtDomain } from "../store/Actions";
import { apiRequest } from "../API";
import { Layout } from "../layouts";
import { Error, Loader, Tab, Tabs } from "../components";
import { Overview, Networking, Storage } from "../components/domain";

const Domain = () => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name } = useParams();
  const domain = useSelector((state) => state.virt.domains[name]);
  console.log(domain);

  let title = name;
  if (domain.title) {
    title = domain.title.text;
  }

  const [isLoaded, setLoaded] = useState(false);
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["domain", name],
    () => apiRequest(`domains/${name}`, "get", session),
    { retry: 0 }
  );

  useEffect(() => {
    dispatch(setAppTitle(`Domain - ${title}`));

    if (!isLoading) {
      if (!isError) {
        setLoaded(true);
        dispatch(setVirtDomain(data));
      } else {
        navigate("/");
      }
    }
  }, [isLoaded, title, name, dispatch, navigate, data, isLoading, isError]);

  const tabs = (
    <Tabs id="domain-tabs">
      <Tab linkId="overview" title="Overview">
        <Overview domain={domain} refetch={refetch} />
      </Tab>
      <Tab linkId="networking" title="Networking">
        <Networking domain={domain} />
      </Tab>
      <Tab linkId="storage" title="Storage">
        <Storage domain={domain} />
      </Tab>
      <Tab title="Metrics" />
    </Tabs>
  );

  return (
    <Layout>
      <Loader width={160} label="Loading domain..." loading={isLoading}>
        <Error enabled={isError} error={error}>
          <div className="container-full">
            <div className="row">{tabs}</div>
          </div>
        </Error>
      </Loader>
    </Layout>
  );
};

export default Domain;
