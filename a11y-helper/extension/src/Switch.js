import React from "react";
import "./Switch.css";

const Switch = ({ name, checked, onToggle }) => {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={onToggle}/>
      <label for="checkbox" class="visually-hidden">
        {name}
      </label>
    </div>
  );
};

export default Switch;
