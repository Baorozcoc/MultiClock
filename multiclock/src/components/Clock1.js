import React, {useState, useEffect} from 'react';
import './Clock1.css'
function toStr(texto){
    return texto.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
}
const Clock1 = () => {
    const [date,setDate]=useState(new Date());
    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
    }, []);
    const day= toStr(date.getDate());
    const month=date.getMonth();
    const anio= date.getFullYear();
    var hour=0;
    if(date.getHours()<=12){
        hour = date.getHours();
    }
    else{
        hour = date.getHours()%13+1;
    }
    
    const min= toStr(date.getMinutes());
    const sec= toStr(date.getSeconds());
    const months=["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    return(
        <div>
            <div className='Date'>{anio}-{months[month]}-{day}</div>
            <div className='Clock1'>{hour}:{min}:{sec}</div>
        </div>
    )
}
export default Clock1;