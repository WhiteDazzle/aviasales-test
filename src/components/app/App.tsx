import React, { useEffect } from "react";
import { connect } from "react-redux";

import "antd/dist/antd.css";
import * as actions from "../../redux/actions/actions";
import TypeState from "../../types-data/type-state";

import styles from "./App.module.scss";
import IndexPage from "../pages/index-page/index-page";

function App({ getSearchIdFromApi }: any) {
  useEffect(() => {
      getSearchIdFromApi();
  }, []);

  return (
    <div className={styles["app-wrapper"]}>
      <div className={styles[`app__logo`]} />
      <IndexPage/>
    </div>
  );
}

const mapStateToProps = (state: TypeState) => {
  return { state };
};
export default connect(mapStateToProps, actions)(App);
