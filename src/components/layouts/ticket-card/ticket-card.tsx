import React from 'react';

import TypeTicket from '../../../types-data/type-ticket';
import TicketSegment from '../../blocks/ticket-segment';

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
    <li className={styles['ticket-card']} tabIndex={0}>
      <div className={styles['price-and-logo']}>
        <span className={styles['total-price']}>
          {' '}
          {`${Math.floor(price / 1000)} ${('000' + (price % 1000)).slice(-3)}`}
        </span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </div>
      {ticketBody}
    </li>
  );
};

export default TicketCard;
