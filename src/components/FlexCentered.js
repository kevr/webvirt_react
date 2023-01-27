const FlexCentered = ({ children }) => (
  <div className="flex flex-display flex-col">
    <div className="flex"></div>
    <div className="flex-display flex-row">
      <div className="flex"></div>
      <div className="centered">{children}</div>
      <div className="flex"></div>
    </div>
    <div className="flex"></div>
  </div>
);

export default FlexCentered;
