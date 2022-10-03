import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTicket } from "../services/aviasales-services";
import { softByPrise } from "../helpers/vars/sort-vars";
import TypeTicket from "../types-data/type-ticket";
import TypeFiltersTransplants from "../types-data/type-filter-transplants";
interface ticketsState {
  tickets: [] | [TypeTicket];
  filterTransplants: TypeFiltersTransplants;
  serverErrorCounter: number;
  StopLoadingTickets: boolean;
  amountTickets: number;
  sortParameter: string;
}

const initialState: ticketsState = {
  tickets: [],
  filterTransplants: {
    noTransplants: true,
    oneTransplant: true,
    twoTransplants: false,
    threeTransplants: false,
    allFilterTransplants: false,
  },
  serverErrorCounter: 0,
  StopLoadingTickets: false,
  amountTickets: 5,
  sortParameter: softByPrise,
};

export const getTicketFromApi = createAsyncThunk(
  "tickets",
  async (searchId: string) => {
    return await getTicket(searchId);
  }
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addVisibleTickets: (state, action) => {
      state.amountTickets = state.amountTickets + action.payload;
    },
    chooseFilterTransplants: (state, action) => {
      const {
        filterTransplants,
      }: { filterTransplants: TypeFiltersTransplants } = state;
      const newFilter =
        !filterTransplants[action.payload as keyof typeof filterTransplants];
      state.filterTransplants = {
        ...filterTransplants,
        [action.payload as keyof typeof filterTransplants]: newFilter,
        allFilterTransplants: !Object.values({
          ...filterTransplants,
          [action.payload as keyof typeof filterTransplants]: newFilter,
        })
          .slice(0, 4)
          .includes(false),
      };
    },
    chooseAllFilterTransplants: (state) => {
      const filters = !state.filterTransplants.allFilterTransplants;
      state.filterTransplants = {
        noTransplants: filters,
        oneTransplant: filters,
        twoTransplants: filters,
        threeTransplants: filters,
        allFilterTransplants: filters,
      };
    },
    ticketsSorted: (state, action) => {
      state.sortParameter = action.payload;
    },
  },
  extraReducers: {
    [getTicketFromApi.fulfilled.type]: (state, action) => {
      console.log(action);
      state.StopLoadingTickets = action.payload.stop;
      state.serverErrorCounter = 0;
      //@ts-ignore
      state.tickets = [...state.tickets, ...action.payload.tickets];
    },
    [getTicketFromApi.rejected.type]: (state: ticketsState) => {
      state.serverErrorCounter = state.serverErrorCounter + 1;
    },
  },
});

export const {
  addVisibleTickets,
  chooseFilterTransplants,
  chooseAllFilterTransplants,
  ticketsSorted
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
