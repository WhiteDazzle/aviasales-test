import styles from "./label-checkbox.module.scss";
import React from "react";

type typeProps = {
  onChange: () => void;
  checked: boolean;
  LabelText: string;
};

const LabelCheckbox = ({ checked, onChange, LabelText }: typeProps) => {
  return (
    <label className={styles["label-input"]}>
      <input
        type="checkbox"
        className={styles["input-checkbox"]}
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.checkbox}></div>
      <div className={styles["checkbox-description"]}> {LabelText} </div>
    </label>
  );
};

export default LabelCheckbox;
