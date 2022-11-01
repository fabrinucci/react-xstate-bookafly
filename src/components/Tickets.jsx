import './Tickets.css';

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send('FINISH');
  };

  const passengers = context.passengers;
  const country = context.selectedCountry;

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>
        Gracias por volar con book a fly 💚
      </p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>{ country }</div>
        <div className='Tickets-passengers'>
          <ul>
            { passengers.map( (passenger, index) => (
              <li key={ index }>{ passenger }</li>
            ))}
          </ul>
          <span>✈</span>
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>
        Finalizar
      </button>
    </div>
  );
};
