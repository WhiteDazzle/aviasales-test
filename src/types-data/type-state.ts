import FilterTransplants from './type-filter-transplants';
import TypeTicket from "./type-ticket";

type TypeState = {
  filterTransplants: FilterTransplants;
  searchId: string;
  tickets: Array<TypeTicket>;
  StopLoadingTickets: boolean;
  amountTickets: number;
  serverErrorCounter: number;
  errorMassage: string;
};

export default TypeState;
