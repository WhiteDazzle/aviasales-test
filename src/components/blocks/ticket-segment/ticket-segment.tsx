import React from "react";

import TypeTicketSegment from "../../../types-data/type-ticket-segment";

import styles from "./ticket-segment.module.scss";
import { createTextAfterStopsCounter } from "../../../helpers/create-text-after-stops-counter";
import { arrivalTimeCalculation } from "../../../helpers/arrival-time-calculation";
const renderRoute = (routes: Array<string>) => {
  const additionalText = createTextAfterStopsCounter(routes);
  return (
    <div>
      <div
        className={styles["segment-section-header"]}
      >{`${routes.length} ${additionalText}`}</div>
      <div>{routes.toString()}</div>
    </div>
  );
};

const TicketSegment = ({ segmentInfo }: { segmentInfo: TypeTicketSegment }) => {
  const departureDate = new Date(segmentInfo.date);
  return (
    <div className={styles.segment}>
      <div>
        <div
          className={styles["segment-section-header"]}
        >{`${segmentInfo.origin}-${segmentInfo.destination}`}</div>
        <div>{`${departureDate.getHours()}:${departureDate.getMinutes()}-${arrivalTimeCalculation(
          segmentInfo
        )}`}</div>
      </div>
      <div>
        <div className={styles["segment-section-header"]}>В ПУТИ</div>
        <div>{`${Math.floor(segmentInfo.duration / 60)}ч ${
          segmentInfo.duration % 60
        }мин`}</div>
      </div>
      <div>{renderRoute(segmentInfo.stops)}</div>
    </div>
  );
};

export default TicketSegment;
