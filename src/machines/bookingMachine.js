import { createMachine, assign } from 'xstate';
import { fetchCountries } from '../utils/api';

const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data 
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request'
          })
        } 
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'loading'}
      }
    }
  }
}


const bookingMachine = createMachine({
  id: 'buy plane tickets',
  initial: 'initial',
  context: {
    passengers: [],
    selectedCountry: '',
    countries: [],
    error: '',
  },
  states: {
    initial: {
      on: {
        START: {
          target: 'search',
        }
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: 'passengers',
          actions: assign({
            selectedCountry: (_, event) => event.selectedCountry
          })
        },
        CANCEL: {
          target: 'initial',
          actions: 'reset'
        },
      },
      ...fillCountries
    },
    passengers: {
      on: {
        DONE: {
          target: 'tickets',
          cond: 'moreThanOnePassenger'
        },
        CANCEL: {
          target: 'initial',
          actions: 'reset'
        },
        ADD: {
          target: 'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      }
    },
    tickets: {
      after: {
        5000: {
          target: 'initial',
          actions: 'reset'
        },
      },
      on: {
        FINISH: {
          target: 'initial',
          actions: 'reset'
        },
      }
    },
  },
},
{
  actions: {
    reset: assign({
      passengers: (_, event) => event.passengers = [],
      selectedCountry: (_, event) => event.selectedCountry = "",
    }),
  },
  guards: {
    moreThanOnePassenger: (context) => {
      return context.passengers.length > 0
    } 
  }
}
);

export default bookingMachine;