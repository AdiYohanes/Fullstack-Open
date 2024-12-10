import { configureStore } from "@reduxjs/toolkit";
import reducer, { setAnecdotes } from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notifikasiReducer";
import anecdotesService from "./services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});
anecdotesService
  .getAll()
  .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));

export default store;
