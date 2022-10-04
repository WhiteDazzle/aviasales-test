import React, { useEffect } from "react";
import styles from "./App.module.scss";
import IndexPage from "../pages/index-page/index-page";
import { useAppDispatch } from "../../hooks/hooks";
import { getSearchIdFromApi } from "../../store/userSlice";
import 'normalize.css'
function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSearchIdFromApi())
  }, []);

  return (
    <div className={styles["app-wrapper"]}>
      <img src={'./img/aviasales.svg'} className={styles[`app__logo`]} alt={'Aviasales'}/>
      <IndexPage/>
    </div>
  );
}

export default App;
