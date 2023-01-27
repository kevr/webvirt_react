import FlexCentered from "./FlexCentered";

const Loader = ({ label, loading, children }) => {
  if (loading) {
    return (
      <FlexCentered>
        <p className="text-center">{label}</p>
        <div className="progress red lighten-3" style={{ width: "150px" }}>
          <div className="indeterminate red lighten-1"></div>
        </div>
      </FlexCentered>
    );
  }

  return <div className="flex flex-display flex-col">{children}</div>;
};

Loader.defaultProps = {
  loading: true,
  label: "",
};

export default Loader;
