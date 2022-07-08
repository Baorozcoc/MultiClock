import React, {useState, useEffect} from 'react';
import Sound from '../resources/Alarm.wav'
import Click from '../resources/SimpleClick.wav'
import './Alarm.css'

function toStr(texto){
    return texto.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
}
const Alarm = () => {
    const [date,setDate]=useState(new Date());
    const [alarms,setAlarms]= useState([]);
    function refreshClock() {
        setDate(new Date());
    }
    const hour = date.getHours();
    const min= date.getMinutes();
    const sec= date.getSeconds();

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        for(var i=0; i<alarms.length;i++){
            if(alarms[i][0]===hour&&alarms[i][1]===min&&sec%3===0){
                const AlarmSound= new Audio(Sound);
                AlarmSound.play();
            }
        }
        return function cleanup() {
          clearInterval(timerId);
        };
    }, [alarms, hour, min, sec]);
    const [alarmId,setAlarmId]=useState(-1);
    const [newAlarm,setNewAlarm]=useState(0);
    const [newHour,setNewHour]=useState(0);
    const [newMinute,setNewMinute]=useState(0);
    function AbrirNuevaAlarma(){
        const Clic= new Audio(Click);
        Clic.play();
        setNewAlarm(1);
    }
    function nuevaAlarma(){
        const Clic= new Audio(Click);
        Clic.play();
        var Arr=alarms.slice();
        if(alarmId!==-1){
            Arr.splice(alarmId,1);
        }
        if(Arr.length<12){
            Arr.push([newHour,newMinute]);
            setAlarms(Arr);
        }
        setNewAlarm(0);
        setNewHour(0);
        setNewMinute(0);
        setAlarmId(-1);
    }
    function Cancelar(){
        const Clic= new Audio(Click);
        Clic.play();
        setNewAlarm(0);
        setNewHour(0);
        setNewMinute(0);
        setAlarmId(-1);
    }
    function EliminarAlarma(index){
        const Clic= new Audio(Click);
        Clic.play();
        var Arr=alarms.slice();
        Arr.splice(index,1);
        setAlarms(Arr);
        setNewAlarm(0);
        setNewHour(0);
        setNewMinute(0)
    }
    function EditarAlarma(index){
        const Clic= new Audio(Click);
        Clic.play();
        setNewAlarm(1);
        setNewHour(alarms[index][0]);
        setNewMinute(alarms[index][1])
        setAlarmId(index);
    }
    return(
        <div>
            <div className='Clock'>{hour}:{toStr(min)}:{toStr(sec)}</div>
            <div className='AlarmsContainer'>
                {alarms.map((alarma,index)=>(
                    <div className='Alarms' key={index}>
                        <i onClick={()=>EditarAlarma(index)}>{alarma[0]}:{toStr(alarma[1])}:{toStr(0)}</i> 
                        <i className='Ex' onClick={()=>EliminarAlarma(index)}> X</i>
                    </div>
                ))}
            </div>
            {alarms.length<12&&<div className='Option NoClick' onClick={()=>AbrirNuevaAlarma()}>Agregar Alarma</div>}
            {newAlarm===1&&
            <div className='Emergente'>
                <div className='Buttons'>
                    <div className='Option NoClick' onClick={()=>newHour<24&&setNewHour(newHour+1)}>+</div>
                    <div className='Option NoClick' onClick={()=>newMinute<54&&setNewMinute(newMinute+5)}>+</div>
                    <div></div>    
                </div> 
                <div  className='Clock2'>{newHour}:{toStr(newMinute)}:{toStr(0)}</div>
                <div className='Buttons'>
                    <div className='Option NoClick' onClick={()=>newHour>0&&setNewHour(newHour-1)}>-</div>
                    <div className='Option NoClick' onClick={()=>newMinute>4&&setNewMinute(newMinute-5)}>-</div>
                    <div></div>     
                </div> 
                <div  className='Buttons'>
                    <div className='Option NoClick' onClick={()=>nuevaAlarma()}>CONFIRMAR</div>
                    <div className='Option NoClick' onClick={()=>Cancelar()}>CANCELAR</div>  
                </div>     
            </div>}
        </div>
    )
}
export default Alarm;