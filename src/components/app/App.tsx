import React, { useEffect } from "react";
import styles from "./App.module.scss";
import IndexPage from "../pages/index-page/index-page";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getSearchIdFromApi } from "../../store/userSlice";
import { userSearchIdSelector } from "../../store/selectors";
import 'normalize.css'
function App() {
  const dispatch = useAppDispatch()
  const result = useAppSelector(userSearchIdSelector)
  console.log(result)
  useEffect(() => {
    dispatch(getSearchIdFromApi())
  }, []);

  return (
    <div className={styles["app-wrapper"]}>
      <img src={'./img/aviasales.svg'} className={styles[`app__logo`]} />
      <IndexPage/>
    </div>
  );
}

export default App;
