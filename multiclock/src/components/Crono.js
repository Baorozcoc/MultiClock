import React, {useState, useEffect} from 'react';
import Sound from '../resources/Option.wav'
import './Crono.css'

function toStr(texto){
    return texto.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
}
const Crono = () => {
    const [start,setstart]=useState(0);
    const [hours, setHours]= useState(0);
    const [minutes, setMinutes]= useState(0);
    const [seconds, setSeconds]= useState(0);
    const [milsec, setMilisec]=useState(0);
    useEffect(() => {
            start===1&&setTimeout(()=> 
            {
                if(milsec===99 && seconds===59 && minutes===59&& hours===99){
                    setMilisec(0);
                    setSeconds(0);
                    setMinutes(0);
                    setHours(0);
                    setstart(0);
                }
                else if(milsec===99 && seconds===59 && minutes===59 && hours!==99){
                    setMilisec(0);
                    setSeconds(0);
                    setMinutes(0);
                    setHours(hours+1);
                }
                else if(milsec===99 && seconds===59 && minutes!==59){
                    setMilisec(0);
                    setSeconds(0);
                    setMinutes(minutes+1);
                }
                else if(milsec===99 && seconds!==59){
                    setSeconds(seconds+1);
                    setMilisec(0);
                }
                else{
                    setMilisec(milsec+1);
                }
            },8)

    }, [hours, minutes,  seconds, milsec, start]);
    const sectoshow=toStr(seconds);
    const mintoshow=toStr(minutes);
    const hourtoshow=toStr(hours);
    const milsectoshow=toStr(milsec);
    function Reset(){
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setMilisec(0);
        const alarm= new Audio(Sound);
        alarm.play();
    }
    function Continue(){
        setstart(1);
        const alarm= new Audio(Sound);
        alarm.play();
    }
    function Stop(){
        setstart(0);
        const alarm= new Audio(Sound);
        alarm.play();
    }
    return(
        <div>
            <div className='Crono'>
                {hourtoshow}:{mintoshow}:{sectoshow}
                <div className='Milisec'>:{milsectoshow}</div>
            </div>
            <div className='Buttons'>
                {start===0&&hours===0&&minutes===0&&seconds===0&&milsec===0&&<div onClick={()=>Continue()}>EMPEZAR</div>}
                {start===0&&(hours!==0||minutes!==0||seconds!==0||milsec!==0)&&<div onClick={()=>Continue()}>CONTINUAR</div>}
                {start===1&&<div onClick={()=>Stop()}>PARAR</div>}
                {start===0&&(hours!==0||minutes!==0||seconds!==0||milsec!==0)&&<div onClick={()=>Reset()}>REINICIAR</div>}
            </div>
        </div>
    )
}
export default Crono;