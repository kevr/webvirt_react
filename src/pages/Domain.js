import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Layout } from "../layouts";
import { Card, FlexCentered, Loader, StateControl } from "../components";
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

  console.log(domain);

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
    <Card title="Overview" style={{ height: "231px" }}>
      <table className="machine-state">
        <tbody>
          <tr>
            <th className="text-right">{"Name"}</th>
            <td className="overflow-ellipsis">{domain.name}</td>
          </tr>
          <tr>
            <th className="text-right">{"State"}</th>
            <td>{domain.state.string}</td>
          </tr>
        </tbody>
      </table>
      <StateControl domain={domain} />
    </Card>
  ) : (
    <span />
  );

  const info = hasDomainInfo ? (
    <Card title="Resources" style={{ height: "231px" }}>
      <table>
        <tbody>
          <tr>
            <th>{"CPUs"}</th>
            <th>{"Memory (used)"}</th>
            <th>{"Memory (total)"}</th>
          </tr>
          <tr>
            <td>{domain.info.cpus}</td>
            <td>{domain.info.memory / 1024} MB</td>
            <td>{domain.info.maxMemory / 1024} MB</td>
          </tr>
        </tbody>
      </table>
    </Card>
  ) : (
    <span />
  );

  const interfaces = hasDomainInfo ? (
    <Card title="Network Interfaces">
      <table>
        <thead>
          <tr>
            <th>{"Name"}</th>
            <th>{"Model"}</th>
            <th>{"Mac"}</th>
          </tr>
        </thead>

        <tbody>
          {domain.info.devices.interfaces.map((iface, index) => (
            <tr key={index}>
              <td>{iface.name}</td>
              <td>{iface.model}</td>
              <td>{iface.macAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  ) : (
    <span />
  );

  const disks = hasDomainInfo ? (
    <Card title="Disks">
      <table>
        <thead>
          <tr>
            <th>{"Target"}</th>
            <th>{"Source"}</th>
          </tr>
        </thead>
        <tbody>
          {domain.info.devices.disks
            .filter((disk) => disk.device === "disk")
            .map((disk, index) => (
              <tr key={index}>
                <td>/dev/{disk.target.dev}</td>
                <td>{disk.source.file.split("/").reverse()[0]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  ) : (
    <span />
  );

  return (
    <Layout>
      <div className="flex flex-display flex-col">
        <Loader label={`Fetching details...`} loading={isLoading}>
          <div className="row">
            <div className="col s6">{state}</div>
            <div className="col s6">{info}</div>
            <div className="col s12">{interfaces}</div>
            <div className="col s12">{disks}</div>
          </div>
        </Loader>
      </div>
    </Layout>
  );
};

export default Domain;
