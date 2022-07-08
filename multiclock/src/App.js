import React, {useState} from 'react';
import Clock1 from './components/Clock1';
import Temp1 from './components/Temporizador';
import Buttons from './components/Buttons';
import Alarm from './components/Alarm';
import Crono from './components/Crono';
import Click from './resources/SimpleClick.wav'
import './App.css';

function ChangeColor(color){
  document.documentElement.style.setProperty('--Secondary-color', color);
  const Sound=new Audio(Click);
  Sound.play();
}

function App() {
  const [option,setOption]= useState(0);
  return(
    <div className="App">
      <div className="Main">
        <div className='Styles'>
          <div className='S1' onClick={()=>ChangeColor('#00aeff')}>1</div>
          <div className='S2' onClick={()=>ChangeColor('orange')}>2</div>
          <div className='S3' onClick={()=>ChangeColor('lightseagreen')}>3</div>
          <div className='S4' onClick={()=>ChangeColor('salmon')}>4</div>
          <div className='S5' onClick={()=>ChangeColor('lightgreen')}>5</div>
          <div className='S6' onClick={()=>ChangeColor('orangered')}>6</div>
          <div className='S7' onClick={()=>ChangeColor('hotpink')}>7</div>
        </div>
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
