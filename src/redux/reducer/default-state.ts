import TypeState from '../../types-data/type-state';
const defaultState: TypeState = {
  filterTransplants: {
    noTransplants: true,
    oneTransplant: true,
    twoTransplants: false,
    threeTransplants: false,
    allFilterTransplants: false,
  },
  searchId: '',
  tickets: [],
  StopLoadingTickets: false,
  amountTickets: 5,
  serverErrorCounter: 0,
  errorMassage: '',
};

export default defaultState;
