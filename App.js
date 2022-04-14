import React from "react";
import CustomInputNumber from "./src/components/CustomInputNumber.jsx";

const App = () => {
  return (
    <div>
      <h1>Hello React</h1>
      <CustomInputNumber
        min={1}
        max={10}
        step={1}
        name={"totalPeople"}
        disabled={false}
      />
    </div>
  );
};

export default App;
