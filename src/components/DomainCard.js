import { Tooltip } from "react-tooltip";

const STATE_COLORS = {
  None: "",
  Running: "green-text text-darken-2",
  Blocked: "red-text text-darken-2",
  Paused: "grey-text text-darken-2",
  Shutdown: "orange-text",
  Shutoff: "",
  Crashed: "red-text text-darken-2",
  Suspended: "grey-text text-darken-2",
};

const DomainCard = ({ domain, uuid }) => {
  const color = STATE_COLORS[domain.state.string];
  return (
    <div className="col s6 m4">
      <div className="card">
        <div
          id={`domain-tooltip-${uuid}`}
          data-tooltip-content={`${domain.name}: ${domain.state.string}`}
        >
          <div className="card-content">
            <span className="card-title">{domain.name}</span>
            <p>
              State: <span className={color}>{domain.state.string}</span>
            </p>
          </div>
        </div>
        <Tooltip anchorId={`domain-tooltip-${uuid}`} place="bottom" />
      </div>
    </div>
  );
};

export default DomainCard;
