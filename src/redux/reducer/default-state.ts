import TypeState from '../../types-data/type-state';
import {getSearchId} from "../../services/aviasales-services";

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
};

export default defaultState;
