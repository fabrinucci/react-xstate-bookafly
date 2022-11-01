import { useState } from 'react';
import './Search.css';

export const Search = ({ send, context }) => {

  const [flight, setFlight] = useState('');

  const goToPassengers = () => {
    send('CONTINUE', { selectedCountry: flight });
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = context.countries;

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select 
        id="country" 
        className='Search-select' 
        value={flight} 
        onChange={handleSelectChange}
      >
        <option 
          value="" 
          disabled
          defaultValue
        >
          Escoge un país
        </option>
        {options.map((option) => 
          <option 
            value={option.name.common} 
            key={option.name.common}
          >
            {option.name.common}
          </option>
        )}
      </select>
      <button 
        onClick={goToPassengers}
        disabled={flight === ''} 
        className='Search-continue button'
      >
        Continuar
      </button>
    </div>
  );
}; 