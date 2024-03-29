import React, { useEffect, useRef } from "react";

import TicketCard from "../ticket-card";
import TypeTicket from "../../../types-data/type-ticket";
import LoadingIndicator from "../../blocks/loading-indicator/loading-indicator";
import {
  sortTicketsFast,
  sortTicketsPrice,
} from "../../../helpers/sort-tickets";
import styles from "./ticket-list.module.scss";
import { softByPrise } from "../../../helpers/vars/sort-vars";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  ticketsSelector,
  userSearchIdSelector,
} from "../../../store/selectors";
import {
  getTicketFromApi,
  addVisibleTickets,
} from "../../../store/ticketsSlice";

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
        ticketInfo.segments[1].date
      }
    />
  );
};

const TicketList = () => {
  const ticketListRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const { searchId, errorMassage } = useAppSelector(userSearchIdSelector);
  const {
    StopLoadingTickets,
    serverErrorCounter,
    tickets,
    amountTickets,
    filterTransplants,
    sortParameter,
  } = useAppSelector(ticketsSelector);

  useEffect(() => {
    (
      ticketListRef.current?.children[
        ticketListRef.current?.children.length - 5
      ] as HTMLLIElement
    )?.focus();
  }, [amountTickets]);

  useEffect(() => {
    if (searchId !== "" && !StopLoadingTickets && serverErrorCounter < 10) {
      dispatch(getTicketFromApi(searchId));
    }
  }, [searchId, tickets.length, serverErrorCounter]);

  const filterStops = (ticket: TypeTicket) => {
    if (ticket.segments[0].stops.length > 3)
      return filterTransplants.allFilterTransplants;
    return Object.values(filterTransplants)[ticket.segments[0].stops.length];
  };

  const sortedTickets =
    sortParameter === softByPrise
      ? sortTicketsPrice([...tickets])
      : sortTicketsFast([...tickets]);
  const visibleTickets = sortedTickets
    .filter(filterStops)
    .slice(0, amountTickets)
    .map(renderTicket);

  if (errorMassage) return <div className={styles.massage}>{errorMassage}</div>;

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
      <ul ref={ticketListRef} className={styles["tickets-ul"]}>
        {visibleTickets}
      </ul>
      <button
        className={styles["button-show-more-ticket"]}
        onClick={() => {
          dispatch(addVisibleTickets(5));
        }}
      >
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
      </button>
    </section>
  );
};

export default TicketList;
