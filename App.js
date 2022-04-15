import React from "react";
import RoomAllocation from "./src/components/RoomAllocation.jsx";

const App = () => {
  return (
    <div>
      <h1>Hello! Welcome to Room Allocation</h1>
      <RoomAllocation
        guest={10}
        room={3}
        onChange={(result) => console.log(result)}
      />
    </div>
  );
};

export default App;
