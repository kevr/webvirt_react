const Error = ({ error }) => {
  if (!error) {
    return <span />;
  }

  return (
    <div className="red-text text-lighten-1 text-center">
      <div>
        <i className="material-icons medium">error</i>
      </div>
      <div className="error">{error}</div>
    </div>
  );
};

export default Error;
