/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import {
  voteAnecdoteAsync,
  deleteAnecdoteAsync,
  initializeAnecdotes,
} from "../reducers/anecdoteReducer";
import {
  deleteNotification,
  voteNotification,
} from "../reducers/notifikasiReducer";
import "../styles/anecdoteList.css";
import { useEffect } from "react";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const filteredAnecdotes = [...anecdotes]
    .filter(
      (anecdote) =>
        typeof anecdote.content === "string" &&
        anecdote.content.includes(filter)
    )
    .sort((a, b) => b.votes - a.votes);

  const handleVote = async (id) => {
    dispatch(voteAnecdoteAsync(id));
    dispatch(voteNotification("You voted an anecdote!"));
  };

  const handleDelete = async (id) => {
    dispatch(deleteAnecdoteAsync(id));
    dispatch(deleteNotification("You deleted an anecdote!"));
  };

  return (
    <div className="anecdote-list">
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id} className="anecdote-item">
          <div className="anecdote-content">{anecdote.content}</div>
          <div className="anecdote-votes">
            has {anecdote.votes}
            <button
              className="vote-button"
              onClick={() => handleVote(anecdote.id)}
            >
              vote
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(anecdote.id)}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
