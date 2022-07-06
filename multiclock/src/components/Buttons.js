import Sound from '../resources/Option.wav'
import './Buttons.css'

const Buttons = ({option,setOption})=>{
    function Choose(option){
      const alarm= new Audio(Sound);
      alarm.play();
      setOption(option);
    }
    return(
        <div className='Options'>
          {option!==0?
          <div className='Option NoClick' onClick={() => Choose(0)}>Hora y Fecha</div>:<div className='Option Clicked'>Hora y Fecha</div>}
          {option!==1?
          <div className='Option NoClick' onClick={() => Choose(1)}>Cronometro</div>:<div className='Option Clicked'>Cronometro</div>}
          {option!==2?
          <div className='Option NoClick' onClick={() => Choose(2)}>Temporizador</div>:<div className='Option Clicked'>Temporizador</div>}
          {option!==3?
          <div className='Option NoClick' onClick={() => Choose(3)}>Alarma</div>:<div className='Option Clicked'>Alarma</div>}
        </div>
    )
}
export default Buttons;