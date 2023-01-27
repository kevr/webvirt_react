import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import { apiRequest } from "../API";
import { setVirtDomains } from "../store/Actions";
import { Layout } from "../layouts";
import Loader from "../components/Loader";
import FlexCentered from "../components/FlexCentered";
import DomainCard from "../components/DomainCard";

const Dashboard = () => {
  const session = useSelector((state) => state.session);
  const virt = useSelector((state) => state.virt);
  const dispatch = useDispatch();
  const apiLock = useRef(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have a valid session and we haven't queried yet
    if (session.access && !apiLock.current) {
      apiLock.current = true;

      apiRequest("domains", "get", session)
        .then((json) => {
          if (!json.detail) {
            dispatch(setVirtDomains(json));
            setError(false);
          } else {
            setError(json.detail);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [session, dispatch]);

  const sortByName = (a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;

    return 0;
  };

  const domains = JSON.parse(JSON.stringify(virt.domains || []));
  return (
    <Layout>
      <div className="domains container flex flex-display flex-col">
        <Loader label="Loading domains..." loading={loading}>
          <FlexCentered>
            <div className="row">
              {domains.length &&
                domains
                  .sort(sortByName)
                  .map((domain, idx) => (
                    <DomainCard key={idx} uuid={idx} domain={domain} />
                  ))}
              {error && (
                <div className="red-text text-lighten-1 text-center">
                  <div>
                    <i className="material-icons medium">error</i>
                  </div>
                  <div className="error">{error}</div>
                </div>
              )}
            </div>
          </FlexCentered>
        </Loader>
      </div>
    </Layout>
  );
};

export default Dashboard;
