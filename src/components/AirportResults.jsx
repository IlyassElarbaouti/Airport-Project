import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import qs from "qs";
import { useParams, useLocation } from "react-router-dom";
import { showFilteredListSelector } from "../redux/flights.selectors";
import * as flightsAction from "../redux/flights.actions";
import AirportData from "./AirportData.jsx";

const AirportResults = ({ flightData, getFlightList, showFlightNumber }) => {
  const { direction } = useParams();

  const flightNumber = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  }).search;

  useEffect(() => {
    showFlightNumber(flightNumber);
    getFlightList(direction);
  }, [direction, flightNumber, getFlightList, showFlightNumber]);

  let allFlights;

  if (flightData && flightData.length > 0) {
    allFlights = flightData.map((flight) => (
      <AirportData key={flight.id} {...flight} />
    ));
  } else {
    allFlights = (
      <tr >
        <td colSpan="6">
          <span>No flights found!</span>
        </td>
      </tr>
    );
  }

  return (
    <div className="flight-table__container">
      <table className="flight-table">
        <thead className="flight-table__head">
          <tr className="flight-table__head-first">
            <th>Terminal</th>
            <th>Local time</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Airline</th>
            <th>Flight</th>
          </tr>
        </thead>
        <tbody className="flight-board-table__body">{allFlights}</tbody>
      </table>
    </div>
  );
};

AirportResults.propTypes = {
  flightData: PropTypes.array,
  getFlightList: PropTypes.func.isRequired,
  showFlightNumber: PropTypes.func,
};

const mapState = (state) => {
  return {
    flightData: showFilteredListSelector(state),
  };
};

const mapDispatch = {
  getFlightList: flightsAction.getFlightList,
  showFlightNumber: flightsAction.showFlightNumber,
};

export default connect(mapState, mapDispatch)(AirportResults);
