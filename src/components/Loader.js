import PropTypes from "prop-types";
import FlexCentered from "./FlexCentered";

const getLoaderByType = (type) => {
  switch (type) {
    default:
      return (
        <div className="progress red lighten-3" style={{ width: "100px" }}>
          <div className="indeterminate red lighten-1"></div>
        </div>
      );
  }
};

const Loader = ({ type, label, loading, children }) => {
  const loader = getLoaderByType(type);

  if (loading) {
    return (
      <FlexCentered>
        <div>
          <p className="text-center">{label}</p>
          {loader}
        </div>
      </FlexCentered>
    );
  }

  return <div className="flex flex-display flex-col">{children}</div>;
};

Loader.defaultProps = {
  loading: true,
  label: "",
  type: "progress",
};

Loader.requiredProps = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default Loader;
