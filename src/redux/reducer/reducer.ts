import {
  typeChooseFilterTransplants,
  typeSetSearchId,
  typeSetTicket,
  typeAddingAdditionalTickets,
  typeStart,
  typeSaveErrorCount,
  typeChooseAllFilterTransplants,
  typeSaveErrorMassage
} from '../actions/action-type';

import TypeState from '../../types-data/type-state';
import TypeAction from '../../types-data/type-action';
import TypeFiltersTransplants from '../../types-data/type-filter-transplants';

import defaultState from './default-state';

const reducer = (state: TypeState = defaultState, action: TypeAction) => {
  const { filterTransplants }: { filterTransplants: TypeFiltersTransplants } = state;
  const newFilter = !filterTransplants[action.filterName as keyof typeof filterTransplants];

  switch (action.type) {
    case typeStart:
      return defaultState;

    case typeSaveErrorMassage:
      return {
        ...state, errorMassage: action.errorMessage
      }

    case typeChooseFilterTransplants:
      return {
        ...state,
        filterTransplants: {
          ...filterTransplants,
          [action.filterName as keyof typeof filterTransplants]: newFilter,
          allFilterTransplants: !Object.values({
            ...filterTransplants,
            [action.filterName as keyof typeof filterTransplants]: newFilter,
          })
            .slice(0, 4)
            .includes(false),
        },
      };

    case typeChooseAllFilterTransplants:
      const filters = !filterTransplants.allFilterTransplants;
      return {
        ...state,
        filterTransplants: {
          noTransplants: filters,
          oneTransplant: filters,
          twoTransplants: filters,
          threeTransplants: filters,
          allFilterTransplants: filters,
        },
      };

    case typeSetSearchId:
      return { ...state, searchId: action.searchId };

    case typeSetTicket:
      return {
        ...state,
        serverErrorCounter: 0,
        // @ts-ignore
        tickets: [...state.tickets, ...action.tickets],
        // @ts-ignore
        StopLoadingTickets: action.StopLoadingTickets,
      };

    case typeSaveErrorCount:
      return {
        ...state,
        serverErrorCounter: state.serverErrorCounter + 1,
        // @ts-ignore
        tickets: [...state.tickets, ...action.tickets],
      };

    case typeAddingAdditionalTickets:
      // @ts-ignore
      return { ...state, amountTickets: state.amountTickets + action.amountTickets };
  }
};

export default reducer;
