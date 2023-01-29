import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
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

  const { isLoading, isError, data } = useQuery(
    ["domain", name],
    () => apiRequest(`domains/${name}`, "get", session),
    { retry: 0 }
  );

  useEffect(() => {
    dispatch(setAppTitle(`Domain: ${name}`));

    if (!isLoading) {
      if (!isError) {
        dispatch(setVirtDomain(data));
      } else {
        navigate("/");
      }
    }
  }, [isLoading, data, isError, dispatch, name, navigate, session]);

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
          <Loader label={`Fetching details...`} loading={isLoading}>
            {state}
            {info}
          </Loader>
        </FlexCentered>
      </div>
    </Layout>
  );
};

export default Domain;
