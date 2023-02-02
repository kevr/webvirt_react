const Card = ({ title, style, children }) => (
  <div className="card" style={style}>
    <div className="card-content">
      <span className="card-title">{title}</span>
      {children}
    </div>
  </div>
);

export default Card;
