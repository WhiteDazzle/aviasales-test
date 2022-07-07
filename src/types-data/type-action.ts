import TypeTicket from "./type-ticket";

type TypeAction = {
  type: string;
  filterName?: string;
  searchId?: string;
  tickets?: Array<TypeTicket>;
  downloadTicketsStop?: boolean;
  amountTickets?: number;
  serverError?: boolean;
};

export default TypeAction;
