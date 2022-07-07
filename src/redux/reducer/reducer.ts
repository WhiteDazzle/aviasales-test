import TypeState from '../../types-data/type-state';
import TypeAction from '../../types-data/type-action';
import TypeFiltersTransplants from '../../types-data/type-filter-transplants';

import defaultState from './default-state';

const reducer = (state: TypeState = defaultState, action: TypeAction) => {
  const { filterTransplants }: { filterTransplants: TypeFiltersTransplants } = state;
  const newFilter = !filterTransplants[action.filterName as keyof typeof filterTransplants];
  switch (action.type) {
    case 'start':
      return defaultState;
    case 'choose_filter_transplants':
      if (action.filterName === 'allFilterTransplants') {
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
      }
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
    case 'set_search_id':
      return { ...state, searchId: action.searchId };
    case 'set_tickets':
      if (action.serverError)
        return {
          ...state,
          serverErrorCounter: state.serverErrorCounter + 1,
          // @ts-ignore
          tickets: [...state.tickets, ...action.tickets],
          // @ts-ignore
          StopLoadingTickets: action.StopLoadingTickets,
        };
      return {
        ...state,
        serverErrorCounter: 0,
        // @ts-ignore
        tickets: [...state.tickets, ...action.tickets],
        // @ts-ignore
        StopLoadingTickets: action.StopLoadingTickets,
      };
    case 'adding_additional_tickets':
      // @ts-ignore
      return { ...state, amountTickets: state.amountTickets + action.amountTickets };
  }
};

export default reducer;
