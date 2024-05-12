import React, {useState, useEffect, useRef} from 'react';
import Click from '../resources/SimpleClick.wav'
import './Crono.css'

function toStr(texto){
    return texto.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
}
const Crono = () => {
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate] = useState(null);
    const [start,setStart]=useState(false);
    const timerId = useRef(null);

    function refreshClock() {
        setEndDate(new Date());
    }
    useEffect(() => {
        if(start) timerId.current = setInterval(refreshClock, 10);
        return function cleanup() {
          clearInterval(timerId.current);
        };
    }, [start]);
    function Continue(){
        mil? setStartDate(new Date().setMilliseconds(-mil)): setStartDate(new Date());
        setEndDate(new Date());
        setStart(true);
        const alarm= new Audio(Click);
        alarm.play();
    }
    function Stop(){
        setStart(false);
        clearInterval(timerId.current);
        const alarm= new Audio(Click);
        alarm.play();
    }
    function Reset(){
        setEndDate(null);
        setStartDate(null);
        const alarm= new Audio(Click);
        alarm.play();
    }
    
    let mil = endDate && startDate? endDate - startDate: 0;
    let milToShow = toStr(parseInt((mil%1000)/10))
    let sec =parseInt(mil / 1000);
    let secToShow = toStr(sec%60)
    let min = parseInt(sec/60);
    let minToShow = toStr(min%60);
    let hrs = parseInt(min/60);
    let hrsToShow = toStr(hrs%24);

    return(
        <>
           <h1 className='Crono'>
                {hrsToShow}:{minToShow}:{secToShow}
                <span className='Milisec'>:{milToShow}</span>
            </h1>
            <fieldset className='Buttons flex-wrap'>
                {!start&&<button className='Option NoClick' onClick={()=>Continue()}>{mil===0? 'EMPEZAR' : 'CONTINUAR'}</button>}
                {start&&<button className='Option NoClick' onClick={()=>Stop()}>PARAR</button>}
                {!start&&mil!==0&&<button className='Option NoClick' onClick={()=>Reset()}>REINICIAR</button>}
            </fieldset>
        </>
    )
}
export default Crono;