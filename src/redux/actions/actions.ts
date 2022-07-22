import { getSearchId, getTicket } from '../../services/aviasales-services';
import {
  typeChooseFilterTransplants,
  typeSetSearchId,
  typeSetTicket,
  typeAddingAdditionalTickets,
  typeSaveErrorCount,
  typeChooseAllFilterTransplants,
} from './action-type';
import TypeResponseTicket from '../../types-data/type-response-ticket';

export const chooseFilterTransplants = (filterName: string) => ({
  type: typeChooseFilterTransplants,
  filterName,
});

export const chooseAllFilterTransplants = () => ({
  type: typeChooseAllFilterTransplants,
});

export const saveSearchId = (searchId: string) => {
  return { type: typeSetSearchId, searchId };
};

export const saveErrorCount = () => {
  return { type: typeSaveErrorCount, tickets: [], serverError: true };
};

export const saveTicket = (response: TypeResponseTicket) => {
  return { type: typeSetTicket, tickets: response.tickets, StopLoadingTickets: response.stop };
};

export const addingAdditionalTickets = (amountTickets: number) => ({
  type: typeAddingAdditionalTickets,
  amountTickets,
});

export const getSearchIdFromApi = () => {
  return async (dispatch: any) => {
    const response = await getSearchId();
    return dispatch(saveSearchId(response.searchId));
  };
};

export const getTicketFromApi = (searchId: string) => {
  return async (dispatch: any) => {
    const response = await getTicket(searchId);
    if (response) {
      dispatch(saveTicket(response));
    } else {
      dispatch(saveErrorCount());
    }
  };
};
