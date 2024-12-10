import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const deleteData = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
const updateVote = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    const updatedAnecdote = {
      ...response.data,
      votes: response.data.votes + 1,
    };

    const updateResponse = await axios.patch(
      `${baseUrl}/${id}`,
      updatedAnecdote
    );
    return updateResponse.data;
  } catch (error) {
    console.log("Error updating vote:", error);
  }
};

export default { getAll, createNew, deleteData, updateVote };
