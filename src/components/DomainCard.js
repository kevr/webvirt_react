import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import StateControl from "./StateControl";

const STATE_COLORS = {
  None: "",
  Running: "green-text text-darken-4",
  Blocked: "red-text text-darken-4",
  Paused: "grey-text text-darken-3",
  Shutdown: "grey-text text-darken-3",
  Shutoff: "",
  Crashed: "red-text text-darken-4",
  Suspended: "blue-text text-darken-4",
};

const STATE_CARD_COLORS = {
  None: "",
  Running: "green lighten-5",
  Blocked: "red lighten-4",
  Paused: "grey lighten-1",
  Shutdown: "yellow lighten-5",
  Shutoff: "grey lighten-4",
  Crashed: "red lighten-4",
  Suspended: "blue lighten-5",
};

const DomainCard = ({ domain, uuid }) => {
  const color = STATE_COLORS[domain.state.string];
  const cardColor = STATE_CARD_COLORS[domain.state.string];
  return (
    <div className="col s6 m4">
      <div className={`domain card ${cardColor}`}>
        <div
          id={`domain-tooltip-${uuid}`}
          data-tooltip-content={`${domain.name}: ${domain.state.string}`}
        >
          <div className="card-content">
            <Link
              to={`/domains/${domain.name}`}
              className="grey-text text-darken-4"
            >
              <span className="card-title">{domain.name}</span>
              <p style={{ display: "block", width: "110px" }}>
                State: <span className={color}>{domain.state.string}</span>
              </p>
            </Link>
          </div>
        </div>

        <div>
          <StateControl
            domain={domain}
            startElement={<i className="material-icons">play_arrow</i>}
            shutdownElement={
              <i className="material-icons">power_settings_new</i>
            }
          />
        </div>
      </div>
      <Tooltip anchorId={`domain-tooltip-${uuid}`} place="bottom" />
    </div>
  );
};

export default DomainCard;
