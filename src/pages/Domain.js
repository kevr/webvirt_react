import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../layouts";

const Domain = () => {
  const { index } = useParams();
  const domains = useSelector((state) => state.virt.domains || []);
  const navigate = useNavigate();

  if (!domains.length) {
    return navigate("/");
  }

  const domain = domains[index];
  return (
    <Layout>
      <h1>{domain.name}</h1>
    </Layout>
  );
};

export default Domain;
