import React from "react";
import styles from "./index-page.module.scss";
import FilterGroup from "../../blocks/filter-group/filter-group";
import { Tabs } from "antd";
import TicketList from "../../layouts/ticket-list";
import { softByPrise, sortByFast } from "../../../helpers/vars/sort-vars";

const { TabPane } = Tabs;

const IndexPage = () => {
  return (
      <div className={styles['index-page']}>
        <div className={styles["app_filter-group-wrapper"]}>
          <FilterGroup />
        </div>

        <Tabs centered={true} className={styles.main} defaultActiveKey="1">
          <TabPane tab="САМЫЙ ДЕШЕВЫЙ" key="1">
            <div className={styles["app_ticket-list-wrapper"]}>
              <TicketList sortParameter={softByPrise} />
            </div>
          </TabPane>
          <TabPane tab="САМЫЙ БЫСТРЫЙ" key="2">
            <div className={styles["app_ticket-list-wrapper"]}>
              <TicketList sortParameter={sortByFast} />
            </div>
          </TabPane>
        </Tabs>
      </div>
  )
}

export default IndexPage