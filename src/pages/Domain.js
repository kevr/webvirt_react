import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../layouts";
import { FlexCentered, Loader } from "../components";
import { apiRequest } from "../API";
import { setAppTitle, setVirtDomain } from "../store/Actions";

const Domain = () => {
  const { name } = useParams();
  const session = useSelector((state) => state.session);
  const domains = useSelector((state) => state.virt.domains || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hasDomain = domains.hasOwnProperty(name);
  const hasDomainInfo = hasDomain && domains[name].info !== undefined;
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => {
    dispatch(setAppTitle(`Domain: ${name}`));

    if (!hasDomainInfo) {
      apiRequest(`domains/${name}`, "get", session).then((json) => {
        if (!json.detail) {
          dispatch(setVirtDomain(json));
          setInfoLoading(false);
        } else {
          console.error(json.detail);
          navigate("/");
        }
      });
    }
  }, [dispatch, hasDomainInfo, name, navigate, session]);

  const label = hasDomain ? <h2>{domains[name].name}</h2> : <span />;

  const state = hasDomain ? (
    <div className="card" style={{ width: "300px" }}>
      <div className="card-content">
        <span className="card-title">State</span>
        <p>{domains[name].state.string}</p>
      </div>
    </div>
  ) : (
    <span />
  );

  const info = hasDomainInfo ? (
    <div className="card" style={{ width: "300px" }}>
      <div className="card-content">
        <span className="card-title">Resources</span>
        <table>
          <tbody>
            <tr>
              <td>{"CPUs"}</td>
              <td>{domains[name].info.cpus}</td>
            </tr>
            <tr>
              <td>{"Memory (max)"}</td>
              <td>{domains[name].info.maxMemory / 1024} MB</td>
            </tr>
            <tr>
              <td>{"Memory (allocated)"}</td>
              <td>{domains[name].info.memory / 1024} MB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <span />
  );

  return (
    <Layout>
      <div className="container">
        {Object.keys(domains).length > 0 && label}
        <FlexCentered>
          <Loader label={`Fetching details...`} loading={infoLoading}>
            {state}
            {info}
          </Loader>
        </FlexCentered>
      </div>
    </Layout>
  );
};

export default Domain;
