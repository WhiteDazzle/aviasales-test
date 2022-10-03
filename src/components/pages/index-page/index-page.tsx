import React from "react";
import styles from "./index-page.module.scss";
import FilterGroup from "../../blocks/filter-group/filter-group";
import TicketList from "../../layouts/ticket-list";
import { softByPrise, sortByFast } from "../../../helpers/vars/sort-vars";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { ticketsSorted } from "../../../store/ticketsSlice";
import { ticketsSelector } from "../../../store/selectors";

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const { sortParameter } = useAppSelector(ticketsSelector);
  return (
    <div className={styles["index-page"]}>
      <div className={styles["app_filter-group-wrapper"]}>
        <FilterGroup />
      </div>
      <div className={styles.main}>
        <div className={styles[`sorted-group`]}>
          <label className={styles["sorted-radio-wrapper"]}>
            <input
              type="radio"
              className={styles["sorted-radio-input"]}
              name="sortedBy"
              checked={sortParameter===softByPrise}
              onChange={(e) => dispatch(ticketsSorted(e.target.value))}
              value={softByPrise}
            />
            <div className={styles["sorted-radio"]}>САМЫЙ ДЕШЕВЫЙ </div>
          </label>
          <label className={styles["sorted-radio-wrapper"]}>
            <input
              type="radio"
              className={styles["sorted-radio-input"]}
              name="sortedBy"
              checked={sortParameter===sortByFast}
              onChange={(e) => dispatch(ticketsSorted(sortByFast))}
              value={sortByFast}
            />
            <div className={styles["sorted-radio"]}>САМЫЙ БЫСТРЫЙ </div>
          </label>
        </div>
        <div className={styles["app_ticket-list-wrapper"]}>
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
