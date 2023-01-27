import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import { apiRequest } from "../API";
import { setVirtDomains } from "../store/Actions";
import { Layout } from "../layouts";

const Dashboard = () => {
  const session = useSelector((state) => state.session);
  const virt = useSelector((state) => state.virt);
  const dispatch = useDispatch();
  const apiLock = useRef(false);

  useEffect(() => {
    // If we have a valid session and we haven't queried yet
    if (session.access && !apiLock.current) {
      apiLock.current = true;

      apiRequest("domains", "get", session)
        .then((json) => {
          dispatch(setVirtDomains(json));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [session, dispatch]);

  return (
    <Layout>
      <div className="domains container">
        <div className="row">
          {virt.domains &&
            virt.domains.map((domain, idx) => (
              <div key={idx} className="col domain card">
                <div
                  id={`domain-tooltip-${idx}`}
                  data-tooltip-content={`${domain.name}: ${domain.state.string}`}
                >
                  <div className="card-content">
                    <span className="card-title">{domain.name}</span>
                    <p>State: {domain.state.string}</p>
                  </div>
                </div>
                <Tooltip anchorId={`domain-tooltip-${idx}`} place="bottom" />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
