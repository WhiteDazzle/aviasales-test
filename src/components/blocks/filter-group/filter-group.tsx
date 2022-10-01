import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/actions';
import TypeState from '../../../types-data/type-state';

import styles from './filter-group.module.scss';

interface Props {
  state: TypeState;
  chooseFilterTransplants: (filterName: string) => { type: string; filterName: string };
  chooseAllFilterTransplants: () => { type: string };
}

const FilterGroup = ({ state, chooseFilterTransplants, chooseAllFilterTransplants }: Props) => {
  const { noTransplants, oneTransplant, twoTransplants, threeTransplants, allFilterTransplants } =
    state.filterTransplants;
  return (
    <section className={styles['filter-group']}>
      <div className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <label className={styles['checkbox-container']}>
        <input
          type="checkbox"
          className={styles['input-checkbox']}
          checked={allFilterTransplants}
          onChange={chooseAllFilterTransplants}
        />
        <span className={styles.checkbox}></span>
        <span className={styles['checkbox-description']}> Все </span>
      </label>
      <label className={styles['checkbox-container']}>
        <input
          type="checkbox"
          className={styles['input-checkbox']}
          checked={noTransplants}
          onChange={() => chooseFilterTransplants('noTransplants')}
        />
        <span className={styles.checkbox}></span>
        <span className={styles['checkbox-description']}> Без пересадок </span>
      </label>
      <label className={styles['checkbox-container']}>
        <input
          type="checkbox"
          className={styles['input-checkbox']}
          checked={oneTransplant}
          onChange={() => chooseFilterTransplants('oneTransplant')}
        />
        <span className={styles.checkbox}></span>
        <span className={styles['checkbox-description']}> 1 пересадка </span>
      </label>
      <label className={styles['checkbox-container']}>
        <input
          type="checkbox"
          className={styles['input-checkbox']}
          checked={twoTransplants}
          onChange={() => chooseFilterTransplants('twoTransplants')}
        />
        <span className={styles.checkbox}></span>
        <span className={styles['checkbox-description']}> 2 пересадки </span>
      </label>
      <label className={styles['checkbox-container']}>
        <input
          type="checkbox"
          className={styles['input-checkbox']}
          checked={threeTransplants}
          onChange={() => chooseFilterTransplants('threeTransplants')}
        />
        <span className={styles.checkbox}></span>
        <span className={styles['checkbox-description']}> 3 пересадки </span>
      </label>
    </section>
  );
};
const mapStateToProps = (state: TypeState) => {
  return { state };
};

export default connect(mapStateToProps, actions)(FilterGroup);
