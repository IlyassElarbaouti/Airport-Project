import React from "react";
import classNames from "classnames";


const AirportData = ({
  terminal,
  schedule,
  destination,
  status,
  companyLogoSource,
  companyName,
  flightNum,
}) => {
  return (
    <>
      <tr className="flights-info">
        <td
          className={classNames("col", "flights-info__terminal-col", {
            "terminal-a": terminal === "A",
            "terminal-b": terminal === "B",
            "terminal-d": terminal === "D",
          })}
        >
          <span className="flights-info__terminal-name">{terminal}</span>
        </td>
        <td className="col flights-info__time">{schedule}</td>
        <td
          style={{ fontWeight: 600 }}
          className="col flights-info__destination"
        >
          {destination}
        </td>
        <td className="col flights-info__status">{status}</td>
        <td className="col flights-info__airlines">
          <img
            className="flights-info__logo"
            src={companyLogoSource}
            alt="company-logo"
          />
          <span className="flights-info__logo-name">{companyName}</span>
        </td>
        <td className="flights-info__flight col">{flightNum}</td>
      </tr>
    </>
  );
};

export default AirportData;
