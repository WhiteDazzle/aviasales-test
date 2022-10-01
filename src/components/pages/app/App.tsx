import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import FilterGroup from "../../blocks/filter-group";
import TicketList from "../../layouts/ticket-list";
import "antd/dist/antd.css";
import * as actions from "../../../redux/actions/actions";
import TypeState from "../../../types-data/type-state";

import styles from "./App.module.scss";

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
    <div className={styles["app-wrapper"]}>
      <div className={styles[`app__logo`]} />
      <div className={styles.app}>
        <div className={styles["app_filter-group-wrapper"]}>
          <FilterGroup />{" "}
        </div>

        <Tabs centered={true} className={styles.main} defaultActiveKey="1">
          <TabPane tab="САМЫЙ ДЕШЕВЫЙ" key="1">
            <div className={styles["app_ticket-list-wrapper"]}>
              <TicketList sortParameter={"byPrice"} />
            </div>
          </TabPane>
          <TabPane tab="САМЫЙ БЫСТРЫЙ" key="2">
            <div className={styles["app_ticket-list-wrapper"]}>
              <TicketList sortParameter={"byFast"} />
            </div>
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
