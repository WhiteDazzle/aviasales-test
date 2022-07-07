import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import FilterGroup from '../filter-group';
import TicketList from '../ticket-list';
import 'antd/dist/antd.css';
import * as actions from '../../redux/actions/actions';
import TypeState from '../../types-data/type-state';

import styles from './App.module.scss';

const { TabPane } = Tabs;

function App({ getSearchIdFromApi }: any) {
  useEffect(() => {
    try {
      getSearchIdFromApi();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className={styles['app-wrapper']}>
      <img className={styles.app__logo} src="./logo.svg" alt="life without a logo is pain" />
      <div className={styles.app}>
        <FilterGroup></FilterGroup>
        <Tabs centered={true} className={styles.main} defaultActiveKey="1">
          <TabPane tab="САМЫЙ ДЕШЕВЫЙ" key="1">
            <TicketList sortParameter={'byPrice'} />
          </TabPane>
          <TabPane tab="САМЫЙ БЫСТРЫЙ" key="2">
            <TicketList sortParameter={'byFast'} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
const mapStateToProps = (state: TypeState) => {
  return { state };
};
export default connect(mapStateToProps, actions)(App);
