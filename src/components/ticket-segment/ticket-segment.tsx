import React from 'react';

import TypeTicketSegment from '../../types-data/type-ticket-segment';

import styles from './ticket-segment.module.scss';

const renderRoute = (routes: Array<string>) => {
  const additionalText =
    routes.length === 0
      ? 'ПЕРЕСАДОК'
      : routes.length % 10 === 1
      ? 'ПЕРЕСАДКА'
      : routes.length % 10 < 5
      ? 'ПЕРЕСАДКИ'
      : 'ПЕРЕСАДОК';
  return (
    <div>
      <div className={styles['segment-section-header']}>{`${routes.length} ${additionalText}`}</div>
      <div>{routes.toString()}</div>
    </div>
  );
};

const arrivalTimeCalculation = (segmentInfo: TypeTicketSegment) => {
  const { origin, date, duration } = segmentInfo;
  const departureDate = new Date(date);
  const timeZoneDifference = origin === 'MOW' ? 240 : -240;
  const arrivalTimeMinutes = departureDate.getHours() * 60 + departureDate.getMinutes() + timeZoneDifference + duration;
  const arrivalTime = arrivalTimeMinutes > 1439 ? arrivalTimeMinutes - 1440 : arrivalTimeMinutes;
  return `${Math.floor(arrivalTime / 60)}:${arrivalTime % 60}`;
};

const TicketSegment = ({ segmentInfo }: { segmentInfo: TypeTicketSegment }) => {
  const departureDate = new Date(segmentInfo.date);
  return (
    <div className={styles.segment}>
      <div>
        <div className={styles['segment-section-header']}>{`${segmentInfo.origin}-${segmentInfo.destination}`}</div>
        <div>{`${departureDate.getHours()}:${departureDate.getMinutes()}-${arrivalTimeCalculation(segmentInfo)}`}</div>
      </div>
      <div>
        <div className={styles['segment-section-header']}>В ПУТИ</div>
        <div>{`${Math.floor(segmentInfo.duration / 60)}ч ${segmentInfo.duration % 60}мин`}</div>
      </div>
      <div>{renderRoute(segmentInfo.stops)}</div>
    </div>
  );
};

export default TicketSegment;
