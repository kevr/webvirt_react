const Error = ({ inline, enabled, error }) => {
  if (!enabled) {
    return <span />;
  }

  return (
    <div className="red-text text-lighten-1 text-center">
      {!inline && (
        <div>
          <i className="material-icons medium">error</i>
        </div>
      )}
      <div className="error">{error.data.detail}</div>
    </div>
  );
};

Error.defaultProps = {
  inline: false,
};

export default Error;
