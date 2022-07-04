import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import Clock1 from './components/Clock1';
import Buttons from './components/Buttons';
import './App.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
function App() {
  const [option,setOption]= useState(0);
  const element= (
    <div className="App">
      <div className="Main">
        <Clock1/>
        <Buttons option={option} setOption={setOption}/>
      </div>
    </div>
  );
  root.render(element);
}
setInterval(App, 1000);
export default App;
