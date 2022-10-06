import React from "react";
import {
  chooseFilterTransplants,
  chooseAllFilterTransplants,
} from "../../../store/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { ticketsSelector } from "../../../store/selectors";
import styles from "./filter-group.module.scss";

const FilterGroup = () => {
  const dispatch = useAppDispatch();
  const {
    noTransplants,
    oneTransplant,
    twoTransplants,
    threeTransplants,
    allFilterTransplants,
  } = useAppSelector(ticketsSelector).filterTransplants;
  return (
    <div className={styles["filter-group"]}>
      <h2 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <ul className={styles['checkbox-ul']}>
        <li  className={styles["checkbox-container"]}>
          <label>
            <input
              type="checkbox"
              className={styles["input-checkbox"]}
              checked={allFilterTransplants}
              onChange={() => dispatch(chooseAllFilterTransplants())}
            />
            <span className={styles.checkbox}></span>
            <span className={styles["checkbox-description"]}> Все </span>
          </label>
        </li>
        <li className={styles["checkbox-container"]}>
        <label>
          <input
            type="checkbox"
            className={styles["input-checkbox"]}
            checked={noTransplants}
            onChange={() => dispatch(chooseFilterTransplants("noTransplants"))}
          />
          <span className={styles.checkbox}></span>
          <span className={styles["checkbox-description"]}>
            {" "}
            Без пересадок{" "}
          </span>
        </label>
        </li>
        <li  className={styles["checkbox-container"]}>
        <label>
          <input
            type="checkbox"
            className={styles["input-checkbox"]}
            checked={oneTransplant}
            onChange={() => dispatch(chooseFilterTransplants("oneTransplant"))}
          />
          <span className={styles.checkbox}></span>
          <span className={styles["checkbox-description"]}> 1 пересадка </span>
        </label>
        </li>
        <li  className={styles["checkbox-container"]}>
        <label>
          <input
            type="checkbox"
            className={styles["input-checkbox"]}
            checked={twoTransplants}
            onChange={() => dispatch(chooseFilterTransplants("twoTransplants"))}
          />
          <span className={styles.checkbox}></span>
          <span className={styles["checkbox-description"]}> 2 пересадки </span>
        </label>
        </li>
        <li  className={styles["checkbox-container"]}>
        <label>
          <input
            type="checkbox"
            className={styles["input-checkbox"]}
            checked={threeTransplants}
            onChange={() =>
              dispatch(chooseFilterTransplants("threeTransplants"))
            }
          />
          <span className={styles.checkbox}></span>
          <span className={styles["checkbox-description"]}> 3 пересадки </span>
        </label>
        </li>
      </ul>
    </div>
  );
};

export default FilterGroup;
