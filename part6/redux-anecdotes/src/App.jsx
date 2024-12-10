/* eslint-disable no-undef */
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import "./styles/app.css";
import Filter from "./components/Filter";
const App = () => {
  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
