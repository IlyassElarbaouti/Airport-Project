import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { showFlightDirectionSelector } from "../redux/flights.selectors.js";
import './airportInput.scss'
import Spinner from "./Spinner.jsx";



const AirportInput = ({direction}) => {
    const [showSpinner, setShowSpinner] = useState(false);

    const showSpinnerHandler = () => {
      setShowSpinner(true);
      setInterval(() => {
        setShowSpinner(false);
      }, 1000);
    };
  const [searchInputValue, setSearchInputValue] = useState("");
  const handleChange = (e) => setSearchInputValue(e.target.value);
  const isDirection = direction === "departures" ? "departures" : "arrivals";

  const searchParam = searchInputValue ? `?search=${searchInputValue}` : "";
  return (
    <div className="airport-search">
      <span className="airport-search__title">Search flight</span>

      <form className="airport-search__form">
        <input
          value={searchInputValue}
          onChange={handleChange}
          type="text"
          className="airport-search__input"
          placeholder="#Number flight or destination"
        />
        <Link
          onClick={() => showSpinnerHandler()}
          style={{ textDecoration: "none" }}
          to={`/flights/${isDirection}${searchParam}`}
        >
          <div className="airport-search__btn">Search</div>
        </Link>
      </form>
      {showSpinner ? <Spinner /> : null}
    </div>
  );
};
const mapState = state => {
  return {
    direction: showFlightDirectionSelector(state),
  };
};

AirportInput.propTypes = {
  direction: PropTypes.string,
};

export default connect(mapState)(AirportInput);
