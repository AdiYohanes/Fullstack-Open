import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
    voteAnecdote(state, action) {
      const { id } = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },

    deleteAnecdote(state, action) {
      const id = action.payload;
      return state.filter((a) => a.id !== id);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, deleteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(anecdote));
  };
};

export const voteAnecdoteAsync = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateVote(id);
    dispatch(voteAnecdote(updatedAnecdote));
  };
};

export const deleteAnecdoteAsync = (id) => {
  return async (dispatch) => {
    await anecdotesService.deleteData(id);
    dispatch(deleteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
