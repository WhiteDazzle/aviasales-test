import {getSearchId, getTicket} from '../../services/aviasales-services';

export const chooseFilterTransplants = (filterName: string) => ({
  type: 'choose_filter_transplants',
  filterName,
});
export const getSearchIdFromApi = () => {
  return async (dispatch: any) => {
    const response = await getSearchId();
    return dispatch({ type: 'set_search_id', searchId: response.searchId })
    };
  };

export const getTicketFromApi = (searchId:string) => {
  return async (dispatch: any) => {
    const response = await getTicket(searchId);
    if(response === 'problems') return dispatch({ type: 'set_tickets', tickets: [], loadingTickets: false, })
    return dispatch({ type: 'set_tickets', tickets: response.tickets, StopLoadingTickets: response.stop, })
  };
};

export const addingAdditionalTickets = (amountTickets: number) => ({
  type:  'adding_additional_tickets',
  amountTickets,
});
