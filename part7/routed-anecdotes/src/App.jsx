/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/anecdotes" style={padding}>
        anecdotes
      </Link>
      <Link to="/create-new" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const reset = () => setValue("");

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const CreateNew = (props) => {
  const inputContent = useField("text");
  const inputAuthor = useField("text");
  const inputInfo = useField("text");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    inputContent.reset();
    inputAuthor.reset();
    inputInfo.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: inputContent.value,
      author: inputAuthor.value,
      info: inputInfo.value,
      votes: 0,
    });
    props.setNotification(`A new anecdote "${inputContent.value}" created!`);
    setTimeout(() => props.setNotification(""), 5000);
    navigate("/anecdotes");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={inputContent.value}
            onChange={inputContent.onChange}
            type={inputContent.type}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={inputAuthor.value}
            onChange={inputAuthor.onChange}
            type={inputAuthor.type}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={inputInfo.value}
            onChange={inputInfo.onChange}
            type={inputInfo.type}
          />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const Anecdotes = () => {
    const { id } = useParams();
    const anecdote = anecdoteById(Number(id));

    if (!anecdote) return <div>Anecdote not found</div>;

    return (
      <div>
        <h2>{anecdote.content}</h2>
        <div>has {anecdote.votes} votes</div>
        <div>
          for more info see <Link to={anecdote.info}>{anecdote.info}</Link>
        </div>
      </div>
    );
  };

  const Notification = ({ message }) => {
    if (!message) return null;
    return (
      <div
        style={{
          border: "1px solid green",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {message}
      </div>
    );
  };

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification message={notification} />
        <Routes>
          <Route
            path="/anecdotes"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route path="/anecdotes/:id" element={<Anecdotes />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/create-new"
            element={
              <CreateNew addNew={addNew} setNotification={setNotification} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;