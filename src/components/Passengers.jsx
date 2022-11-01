import { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ send, context }) => {

  const passengers = context.passengers;

  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }

  const submit = (e) => {
    e.preventDefault();
    send('ADD', { newPassenger: value })
    changeValue('');
  }

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar</p>
      <ul>
        {passengers.map( (passenger, index) => (
          <li key={ index }>{ passenger }</li>
        ))}
      </ul>
      <input 
        id='name' 
        name='name' 
        type='text' 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type='submit'
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type='button'
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};