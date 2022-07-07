import FilterTransplants from './type-filter-transplants';
import {TypeResponseSearchId} from "./Type-response-search-id";
import TypeTicket from "./type-ticket";

type TypeState = {
  filterTransplants: FilterTransplants;
  searchId: string;
  tickets: Array<TypeTicket>;
  StopLoadingTickets: boolean;
  amountTickets: number;
  serverErrorCounter: number;
};

export default TypeState;
