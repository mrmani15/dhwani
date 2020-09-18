import React from 'react';
import './App.css';
import PinBoxes from './PinBoxes';

function App() {
  return (
    <div className="App">
      <h1>Card Number* :</h1>
      <PinBoxes length={4} digit={16} />
    </div>
  );
}

export default App;