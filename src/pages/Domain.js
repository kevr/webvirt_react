import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../layouts";
import { FlexCentered, Loader } from "../components";
import { apiRequest } from "../API";
import { setAppTitle, setVirtDomains } from "../store/Actions";
import Error from "../components/Error";

const Domain = () => {
  const { name } = useParams();
  const session = useSelector((state) => state.session);
  const domains = useSelector((state) => state.virt.domains || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hasDomain = domains.hasOwnProperty(name);
  const [loading, setLoading] = useState(!hasDomain);
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => {
    dispatch(setAppTitle(`Domain: ${name}`));

    if (!loading && !hasDomain) {
      navigate("/");
      return;
    }

    if (!hasDomain) {
      apiRequest("domains", "get", session).then((json) => {
        if (!json.detail) {
          dispatch(setVirtDomains(json));
        }

        setLoading(false);
      });
    }
  }, [loading, session, hasDomain, dispatch]);

  const label = hasDomain ? domains[name].name : "";
  return (
    <Layout>
      <Loader label={`Fetching ${name}...`} loading={loading}>
        <h1>{Object.keys(domains).length > 0 && label}</h1>
      </Loader>
    </Layout>
  );
};

export default Domain;
