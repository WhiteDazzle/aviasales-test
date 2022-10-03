import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSearchId } from "../services/aviasales-services";
import { receiveErrorSearchId } from "../helpers/vars/errorMessage";

// Define a type for the slice state
interface userState {
  searchId: string;
  errorMassage: string
}

// Define the initial state using that type
const initialState: userState = {
  searchId: '',
  errorMassage: '',
}

export const getSearchIdFromApi:any = createAsyncThunk(
  'user/searchId',
  async () => {
    const response = await getSearchId()
    const {searchId} = response
    return searchId
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchIdFromApi.fulfilled.type]: (state, action) => {
        state.searchId = action.payload
      }
    },
    [getSearchIdFromApi.rejected.type]: (state:userState) => {
      state.errorMassage = receiveErrorSearchId
    }
})

// export const {} = userSlice.actions

export default userSlice.reducer