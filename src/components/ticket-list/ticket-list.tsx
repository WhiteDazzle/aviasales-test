import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TicketCard from '../ticket-card';
import * as actions from '../../redux/actions/actions';
import TypeState from '../../types-data/type-state';
import TypeTicket from '../../types-data/type-ticket';
import LoadingIndicator from '../loading-indicator/loading-indicator';

import styles from './ticket-list.module.scss';

const renderTicket = (ticketInfo: TypeTicket) => {
  return (
    <TicketCard
      ticketInfo={ticketInfo}
      key={
        ticketInfo.price +
        ticketInfo.segments[0].duration +
        ticketInfo.segments[0].date +
        ticketInfo.carrier +
        Math.random()
      }
    />
  );
};

const sortTicketsFast = (Tickets: Array<TypeTicket>) => {
  return Tickets.sort(function (a, b) {
    return a.segments[0].duration - b.segments[0].duration;
  });
};

const sortTicketsPrice = (Tickets: Array<TypeTicket>) => {
  return Tickets.sort(function (a, b) {
    return a.price - b.price;
  });
};

const TicketList = ({ sortParameter, state, getTicketFromApi, addingAdditionalTickets }: any) => {
  useEffect(() => {
    if (state.searchId !== '' && !state.StopLoadingTickets) getTicketFromApi(state.searchId);
  });

  const filterStops = (ticket: TypeTicket) => {
    if (ticket.segments[0].stops.length > 3) return state.filterTransplants.allFilterTransplants;
    return Object.values(state.filterTransplants)[ticket.segments[0].stops.length];
  };

  const sortedTickets =
    sortParameter === 'byPrice' ? sortTicketsPrice([...state.tickets]) : sortTicketsFast([...state.tickets]);
  const visibleTickets = sortedTickets.filter(filterStops).slice(0, state.amountTickets).map(renderTicket);
  if (visibleTickets.length < 1) return <h1>Рейсов, подходящих под заданные фильтры, не найдено</h1>;
  return (
    <section className={styles['ticket-list']}>
      <div style={state.StopLoadingTickets ? { display: 'none' } : {}}>
        <LoadingIndicator />
      </div>

      {visibleTickets}
      <button className={styles['button-show-more-ticket']} onClick={() => addingAdditionalTickets(5)}>
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
      </button>
    </section>
  );
};
const mapStateToProps = (state: TypeState) => {
  return { state };
};
export default connect(mapStateToProps, actions)(TicketList);
