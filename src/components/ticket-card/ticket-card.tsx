import React from 'react';

import TypeTicket from '../../types-data/type-ticket';
import TicketSegment from '../ticket-segment';

import styles from './ticket-card.module.scss';

const TicketCard = ({ ticketInfo }: { ticketInfo: TypeTicket }) => {
  if (!ticketInfo) return null;
  const { price, carrier, segments } = ticketInfo;
  const ticketBody =
    segments.length === 1 ? (
      <div className={styles.body}>
        <TicketSegment segmentInfo={segments[0]} />{' '}
      </div>
    ) : (
      <div className={styles.body}>
        <TicketSegment segmentInfo={segments[0]} />
        <TicketSegment segmentInfo={segments[1]} />
      </div>
    );
  return (
    <section className={styles['ticket-card']}>
      <div className={styles['price-and-logo']}>
        <span className={styles['total-price']}>
          {' '}
          {`${Math.floor(price / 1000)} ${('000' + (price % 1000)).slice(-3)}`}
        </span>
        <img src={`./company-logos/${carrier}.jpg`} alt={carrier} />
      </div>
      {ticketBody}
    </section>
  );
};

export default TicketCard;
