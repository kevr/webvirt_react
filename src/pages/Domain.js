import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Layout } from "../layouts";
import { FlexCentered, Loader, StateControl } from "../components";
import { apiRequest } from "../API";
import { setAppTitle, setVirtDomain } from "../store/Actions";

const Domain = () => {
  const { name } = useParams();
  const session = useSelector((state) => state.session);
  const domain = useSelector((state) => state.virt.domains[name]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hasDomain = domain !== undefined;
  const hasDomainInfo = hasDomain && domain.info !== undefined;

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

  const state = hasDomain ? (
    <div className="card" style={{ width: "300px" }}>
      <div className="card-content">
        <span className="card-title">Overview</span>
        <table className="machine-state">
          <tbody>
            <tr>
              <td className="text-right">{"Name"}</td>
              <td className="overflow-ellipsis">{domain.name}</td>
            </tr>
            <tr>
              <td className="text-right">{"State"}</td>
              <td>{domain.state.string}</td>
            </tr>
          </tbody>
        </table>
        <StateControl domain={domain} />
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
              <td>{domain.info.cpus}</td>
            </tr>
            <tr>
              <td>{"Memory (max)"}</td>
              <td>{domain.info.maxMemory / 1024} MB</td>
            </tr>
            <tr>
              <td>{"Memory (allocated)"}</td>
              <td>{domain.info.memory / 1024} MB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <span />
  );

  const interfaces = hasDomainInfo ? (
    <div className="card" style={{ width: "300px" }}>
      <div className="card-content">
        <span className="card-title">Network Interfaces</span>
        <ul>
          {domain.info.devices.interfaces.map((iface, index) => (
            <li key={index}>
              <p>
                <span>
                  {iface.name} ({iface.model})
                </span>
                <span className="right">{iface.macAddress}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <span />
  );

  const disks = hasDomainInfo ? <span /> : <span />;

  return (
    <Layout>
      <div className="container">
        <FlexCentered>
          <Loader label={`Fetching details...`} loading={isLoading}>
            {state}
            {info}
            {interfaces}
            {disks}
          </Loader>
        </FlexCentered>
      </div>
    </Layout>
  );
};

export default Domain;
