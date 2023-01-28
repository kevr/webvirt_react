import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../API";
import { setVirtDomains, removeSession, setAppTitle } from "../store/Actions";
import { Layout } from "../layouts";
import { DomainCard, FlexCentered, Loader } from "../components";
import { navigateLogin, sortByName } from "../Util";

const Dashboard = () => {
  const session = useSelector((state) => state.session);
  const virt = useSelector((state) => state.virt);
  const dispatch = useDispatch();
  const apiLock = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setAppTitle("Dashboard"));

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

          if (json.status === 401) {
            dispatch(removeSession());
            navigateLogin(location, navigate);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [session, dispatch, location, navigate]);

  const domains = JSON.parse(JSON.stringify(virt.domains || {}));
  return (
    <Layout>
      <div className="domains container flex flex-display flex-col">
        <Loader label="Loading domains..." loading={loading}>
          <FlexCentered>
            <div className="row">
              {Object.keys(domains).length > 0 &&
                Object.values(domains)
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
