import React, {useState, useEffect} from 'react';
import './Temp1.css'
import Sound from '../resources/TempSound.wav'
import Click from '../resources/SimpleClick.wav'

function toStr(texto){
    return texto.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
}
const Temp1 = () => {
    const [start,setstart]=useState(0);
    const [infinite, isInfinite]= useState(0);
    const [hours, setHours]= useState(0);
    const [minutes, setMinutes]= useState(0);
    const [seconds, setSeconds]= useState(0);
    const [hoursstatic, setHoursstatic]= useState(0);
    const [minutesstatic, setMinutesstatic]= useState(0);
    const [secondsstatic, setSecondsstatic]= useState(0);
    const [alarm]=useState(new Audio(Sound));
    useEffect(() => {
            start===1&&setTimeout(()=> 
            {
                if(infinite===0 && hours===0 && minutes===0 && seconds===0 ){
                    setstart(0);
                }
                else if(infinite===1 && hours===0 && minutes===0 && seconds===0){
                    setSeconds(secondsstatic);
                    setMinutes(minutesstatic);
                    setHours(hoursstatic);
                    
                }
                else if(seconds===0 && minutes===0 && hours!==0){
                    setSeconds(59);
                    setMinutes(59);
                    setHours(hours-1);
                }
                else if(seconds===0 && minutes===0 && hours!==0){
                    setSeconds(59);
                    setMinutes(59);
                    setHours(hours-1);
                }
                else if(seconds===0 && minutes!==0){
                    setSeconds(59);
                    setMinutes(minutes-1);
                }
                else{
                    setSeconds(seconds-1);
                }
                if(hours===0 && minutes===0 && seconds===1){
                    alarm.play();
                }
            },1000)

    }, [alarm, hours, hoursstatic, infinite, minutes, minutesstatic, seconds, secondsstatic, start]);
    function MoreHours(){
        if(hours<99){
            setHours(hours+1);
            setHoursstatic(hours+1);
        }
    }
    function MoreMinutes(){
        if(minutes<59){
            setMinutes(minutes+1);
            setMinutesstatic(minutes+1);
        }
        else{
            MoreHours();
            setMinutes(0);
            setMinutesstatic(0);
        }
    }
    function MoreSeconds(){
        if(seconds<59){
            setSeconds(seconds+1);
            setSecondsstatic(seconds+1);
        }
        else{
            MoreMinutes();
            setSeconds(0);
            setSecondsstatic(0);
        }
    }
    function LessHours(){
        if(hours>0){
            setHours(hours-1);
            setHoursstatic(hours-1);
        }
    }
    function LessMinutes(){
        if(minutes>0){
            setMinutes(minutes-1);
            setMinutesstatic(minutes-1);
        }
        else if(hours!==0){
            LessHours();
            setMinutes(59);
            setMinutesstatic(59);
        }
    }
    function LessSeconds(){
        if(seconds>0){
            setSeconds(seconds-1);
            setSecondsstatic(seconds-1);
        }
        else if(hours!==0||minutes!==0){
            LessMinutes();
            setSeconds(59);
            setSecondsstatic(59);
        }
    }
    function Activate(n){
        const Clic=new Audio(Click);
        Clic.play();
        setstart(n);
    }
    function SetInfinite(n){
        const Clic=new Audio(Click);
        Clic.play();
        isInfinite(n);
    }
    const sectoshow=toStr(seconds);
    const mintoshow=toStr(minutes);
    const hourtoshow=toStr(hours);
    return(
        <div>
            {start===0&&
            <div className='Buttons'>
                <div onClick={()=>MoreHours()}>+</div>
                <div onClick={()=>MoreMinutes()}>+</div>
                <div onClick={()=>MoreSeconds()}>+</div>
            </div>}
            <div className='Temp1'>{hourtoshow}:{mintoshow}:{sectoshow}</div>
            {start===0&&
            <div className='Buttons'>
                <div onClick={()=>LessHours()}>-</div>
                <div onClick={()=>LessMinutes()}>-</div>
                <div onClick={()=>LessSeconds()}>-</div>
            </div>}
            <div className='Buttons'>
                {start===0&&(minutes!==0||hours!==0||seconds!==0)&&<div onClick={()=>Activate(1)}>EMPEZAR</div>}
                {start===1&&<div onClick={()=>Activate(0)}>PARAR</div>}
                {infinite===0?<div onClick={()=>SetInfinite(1)}>REPETIR=NO</div>:<div onClick={()=>SetInfinite(0)}>REPETIR=SI</div>}
            </div>
        </div>
    )
}
export default Temp1;