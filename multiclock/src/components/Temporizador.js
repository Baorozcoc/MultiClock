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
        let timerId;
        if(start) timerId = setTimeout(()=> {
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
        
        return function cleanup() {
            timerId&& clearTimeout(timerId);
        };
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
        <>
            {start===0&&
            <fieldset className='Buttons'>
                <button className='Option NoClick' onClick={()=>MoreHours()}>+</button>
                <button className='Option NoClick' onClick={()=>MoreMinutes()}>+</button>
                <button className='Option NoClick' onClick={()=>MoreSeconds()}>+</button>
            </fieldset>}
            <h1 className='Temp1'>{hourtoshow}:{mintoshow}:{sectoshow}</h1>
            {start===0&&
            <fieldset className='Buttons'>
                <button className='Option NoClick' onClick={()=>LessHours()}>-</button>
                <button className='Option NoClick' onClick={()=>LessMinutes()}>-</button>
                <button className='Option NoClick' onClick={()=>LessSeconds()}>-</button>
            </fieldset>}
            <fieldset className='Buttons flex-wrap'>
                {start===0&&(minutes!==0||hours!==0||seconds!==0)&&<button className='Option NoClick' onClick={()=>Activate(1)}>EMPEZAR</button>}
                {start===1&&<button className='Option NoClick' onClick={()=>Activate(0)}>PARAR</button>}
                {infinite===0
                    ?<button className='Option NoClick' onClick={()=>SetInfinite(1)}>REPETIR=NO</button>
                    :<button className='Option NoClick' onClick={()=>SetInfinite(0)}>REPETIR=SI</button>}
            </fieldset>
        </>
    )
}
export default Temp1;