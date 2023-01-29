import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { apiRequest } from "../API";
import { setVirtDomains, removeSession, setAppTitle } from "../store/Actions";
import { Layout } from "../layouts";
import { DomainCard, Error, FlexCentered, Loader } from "../components";
import { navigateLogin, sortByName } from "../Util";

const Dashboard = () => {
  const session = useSelector((state) => state.session);
  const virt = useSelector((state) => state.virt);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery(
    "domains",
    () => apiRequest("domains", "get", session),
    { retry: 0 }
  );

  useEffect(() => {
    dispatch(setAppTitle("Dashboard"));

    if (!isLoading) {
      if (!isError) {
        dispatch(setVirtDomains(data));
      } else {
        dispatch(removeSession());
        navigateLogin(location, navigate);
      }
    }
  }, [data, isError, isLoading, session, dispatch, location, navigate]);

  const domains = JSON.parse(JSON.stringify(virt.domains || {}));
  return (
    <Layout>
      <div className="domains container flex flex-display flex-col">
        <Loader label="Fetching domains..." loading={isLoading}>
          <FlexCentered>
            <div className="row">
              {Object.keys(domains).length > 0 &&
                Object.values(domains)
                  .sort(sortByName)
                  .map((domain, idx) => (
                    <DomainCard key={idx} uuid={idx} domain={domain} />
                  ))}
              <Error enabled={!isLoading && isError} error={error} />
            </div>
          </FlexCentered>
        </Loader>
      </div>
    </Layout>
  );
};

export default Dashboard;
