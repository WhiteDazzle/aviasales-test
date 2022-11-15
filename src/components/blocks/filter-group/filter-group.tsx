import React from "react";
import {
  chooseFilterTransplants,
  chooseAllFilterTransplants,
} from "../../../store/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { ticketsSelector } from "../../../store/selectors";
import styles from "./filter-group.module.scss";
import LabelCheckbox from "../inputs/label-checkbox/label-checkbox";

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
      <ul className={styles["checkbox-ul"]}>
        <li className={styles["checkbox-container"]}>
          <LabelCheckbox
            LabelText={"все"}
            onChange={() => dispatch(chooseAllFilterTransplants())}
            checked={allFilterTransplants}
          />
        </li>
        <li className={styles["checkbox-container"]}>
          <LabelCheckbox
            LabelText={"Без пересадок"}
            onChange={() => dispatch(chooseFilterTransplants("noTransplants"))}
            checked={noTransplants}
          />
        </li>
        <li className={styles["checkbox-container"]}>
          <LabelCheckbox
            LabelText={"1 пересадка"}
            onChange={() => dispatch(chooseFilterTransplants("oneTransplant"))}
            checked={oneTransplant}
          />
        </li>
        <li className={styles["checkbox-container"]}>
          <LabelCheckbox
            LabelText={"2 пересадки"}
            onChange={() => dispatch(chooseFilterTransplants("twoTransplants"))}
            checked={twoTransplants}
          />
        </li>
        <li className={styles["checkbox-container"]}>
          <LabelCheckbox
            LabelText={"3 пересадки"}
            onChange={() =>
              dispatch(chooseFilterTransplants("threeTransplants"))
            }
            checked={threeTransplants}
          />
        </li>
      </ul>
    </div>
  );
};

export default FilterGroup;
