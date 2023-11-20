import { useState } from "react";

function App() {
  const [count1,setcount1]=useState(0);
  const [count2,setcount2]=useState(0);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center font-mono font-bold">
        <h1>Voting For your candidate</h1>
      </div>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-4 ">
          <h2>candidate 1</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">vote</button>
          <p>Total:{count1}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2>candidate 2</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >vote</button>
          <p>Total:{count2}</p>
        </div>
      </div>

    </div>
  );
}

export default App;
