/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifikasiReducer";
import {
  goodNotification,
  badNotification,
} from "../reducers/notifikasiReducer";
import "../styles/anecdoteForm.css";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.trim() === "") {
      dispatch(
        setNotification({
          message: "Content cannot be empty!",
          type: "error",
        })
      );
      return;
    }

    event.target.anecdote.value = "";

    try {
      dispatch(createNewAnecdote(content));
      dispatch(goodNotification(`Anecdote "${content}" created!`));
    } catch (error) {
      dispatch(
        badNotification(
          "Anecdote could not be created. Please try again later."
        )
      );
    }
  };

  return (
    <div className="anecdote-form-container">
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="anecdote" placeholder="Type your anecdote here..." />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
