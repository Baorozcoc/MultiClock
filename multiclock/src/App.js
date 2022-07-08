import React, {useState} from 'react';
import Clock1 from './components/Clock1';
import Temp1 from './components/Temporizador';
import Buttons from './components/Buttons';
import Alarm from './components/Alarm';
import Crono from './components/Crono';
import './App.css';

function App() {
  const [option,setOption]= useState(0);
  return(
    <div className="App">
      <div className="Main">
        {option===0&&<Clock1/>}
        {option===1&&<Crono/>}
        {option===2&&<Temp1/>}
        {option===3&&<Alarm/>}
        <div className='Divider'></div>
        <Buttons option={option} setOption={setOption}/>
        <div className='Credits'>Creado por Berny Alejandro Orozco C.<br/>baorozcoc@unal.edu.co</div>
      </div>
    </div>
  );
  
}
export default App;
