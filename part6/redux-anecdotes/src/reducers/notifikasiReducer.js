import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification(state) {
      state.message = "";
      state.type = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const goodNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type: "success" }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const badNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type: "error" }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const voteNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type: "vote" }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const deleteNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type: "delete" }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};
export default notificationSlice.reducer;
