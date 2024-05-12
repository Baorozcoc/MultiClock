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
    const year= date.getFullYear();
    const hour=date.getHours();
    const min= toStr(date.getMinutes());
    const sec= toStr(date.getSeconds());
    const months=["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    return(
        <>
            <h4 className='Date'>{year}-{months[month]}-{day}</h4>
            <h1 className='Clock1'>{hour<=12? hour : hour%13+1}:{min}:{sec}<span className='Date'>{hour<=12? 'AM' : 'PM'}</span></h1>
        </>
    )
}
export default Clock1;