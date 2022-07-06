import React, {useState} from 'react';
import Clock1 from './components/Clock1';
import Temp1 from './components/Temporizador';
import Buttons from './components/Buttons';
import './App.css';

function App() {
  const [option,setOption]= useState(0);
  return(
    <div className="App">
      <div className="Main">
        {option===0&&<Clock1/>}
        {option===2&&<Temp1/>}
        <Buttons option={option} setOption={setOption}/>
      </div>
    </div>
  );
  
}
export default App;
