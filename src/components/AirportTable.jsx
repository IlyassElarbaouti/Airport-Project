import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faPlaneArrival,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Route} from "react-router-dom";
import {
  showFlightNumberSelector,
  showFlightDirectionSelector,
} from "../redux/flights.selectors.js";
import AirportResults from "./AirportResults";
import './airportTable.scss'
import Spinner from "./Spinner.jsx";


const AirportTable = ({ flightNumber, direction }) => {
  const searchFlight = flightNumber ? `?search=${flightNumber}` : "";
  const [showSpinner,setShowSpinner] = useState(false)

const showSpinnerHandler = ()=>{
setShowSpinner(true);
setInterval(() => {
  setShowSpinner(false)
}, 1000);
}
  return (
    <div className="table-container">
      {showSpinner ? <Spinner /> : null}
      <div className="flight-options">
        <div className="flight-options__item">
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => showSpinnerHandler()}
            to={`/flights/departures${searchFlight}`}
          >
            <button
              className={classNames("flight-options__item-btn", {
                selected: direction === "departures",
                selectedRight: direction === "departures",
              })}
            >
              <div>
                <FontAwesomeIcon icon={faPlaneDeparture} />
              </div>
              <span className="flight-options__item-text">Departures</span>
            </button>
          </Link>
        </div>
        <div className="flight-options__item">
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => showSpinnerHandler()}
            to={`/flights/arrivals${searchFlight}`}
          >
            <button
              className={classNames("flight-options__item-btn", {
                selected: direction === "arrivals",
                selectedLeft: direction === "arrivals",
              })}
            >
              <div>
                <FontAwesomeIcon icon={faPlaneArrival} />
              </div>
              <span className="flight-options__item-text">Arrivals</span>
            </button>
          </Link>
        </div>
      </div>
      <Route exact path={`/flights/:direction`}>
        <AirportResults />
      </Route>
    </div>
  );
};

AirportTable.propTypes = {
  direction: PropTypes.string.isRequired,
  flightNumber: PropTypes.string,
};

const mapState = (state) => {
  return {
    direction: showFlightDirectionSelector(state),
    flightNumber: showFlightNumberSelector(state),
  };
};

export default connect(mapState)(AirportTable);
