import React, { useEffect } from "react";
import { connect } from "react-redux";

import TicketCard from "../ticket-card";
import * as actions from "../../../redux/actions/actions";
import TypeState from "../../../types-data/type-state";
import TypeTicket from "../../../types-data/type-ticket";
import LoadingIndicator from "../../blocks/loading-indicator/loading-indicator";
import TypeAction from "../../../types-data/type-action";
import {
  sortTicketsFast,
  sortTicketsPrice,
} from "../../../helpers/sort-tickets";
import styles from "./ticket-list.module.scss";
import { softByPrise } from "../../../helpers/vars/sort-vars";

const renderTicket = (ticketInfo: TypeTicket) => {
  return (
    <TicketCard
      ticketInfo={ticketInfo}
      key={
        ticketInfo.price +
        ticketInfo.segments[0].duration +
        ticketInfo.segments[0].date +
        ticketInfo.carrier +
        ticketInfo.segments[1].duration +
        ticketInfo.segments[1].date +
        Math.random()
      }
    />
  );
};

const TicketList = ({
  sortParameter,
  state,
  getTicketFromApi,
  addingAdditionalTickets,
}: {
  state: TypeState;
  getTicketFromApi: any;
  addingAdditionalTickets: (number: number) => TypeAction;
  sortParameter: string;
}) => {
  const {
    searchId,
    StopLoadingTickets,
    serverErrorCounter,
    tickets,
    amountTickets,
  } = state;

  useEffect(() => {
    if (searchId !== "" && !StopLoadingTickets && serverErrorCounter < 10)
      getTicketFromApi(state.searchId);
  });

  const filterStops = (ticket: TypeTicket) => {
    if (ticket.segments[0].stops.length > 3)
      return state.filterTransplants.allFilterTransplants;
    return Object.values(state.filterTransplants)[
      ticket.segments[0].stops.length
    ];
  };

  const sortedTickets =
    sortParameter === softByPrise
      ? sortTicketsPrice([...tickets])
      : sortTicketsFast([...tickets]);
  const visibleTickets = sortedTickets
    .filter(filterStops)
    .slice(0, amountTickets)
    .map(renderTicket);

  if (state.errorMassage)
    return <div className={styles.massage}>{state.errorMassage}</div>;

  if (visibleTickets.length < 1) {
    return (
      <div className={styles.massage}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </div>
    );
  }

  return (
    <section className={styles["ticket-list"]}>
      <div style={StopLoadingTickets ? { visibility: `collapse` } : {}}>
        <LoadingIndicator />
      </div>

      {visibleTickets}
      <button
        className={styles["button-show-more-ticket"]}
        onClick={() => addingAdditionalTickets(5)}
      >
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
      </button>
    </section>
  );
};

const mapStateToProps = (state: TypeState) => {
  return { state };
};
export default connect(mapStateToProps, actions)(TicketList);
