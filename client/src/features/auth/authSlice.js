import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: "", role: "" },
  isLoading: true,
  isError: false,
  error: "",
  userCredentials: {},
};

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}user/${email}`);
  const data = await res.json();

  if (data.acknowledgement) return data;

  return email;
});

export const getMyself = createAsyncThunk("auth/getMyself", async (token) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}user/myself`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (data.acknowledgement) {
    return data;
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, token }) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}user/${email}`);
    const data = await res.json();

    if (data.acknowledgement) {
      localStorage.setItem("accessToken", token);
      return data;
    }

    return email;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user.email = "";
      state.user.role = "";
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";

        if (payload.acknowledgement) {
          state.user.email = payload.data.email;
          state.user.role = payload.data.role;
        } else {
          state.user.email = payload;
          state.user.role = "user";
        }
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error.message;
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";

        console.log(payload, "addCase block");

        if (payload.acknowledgement) {
          state.user.email = payload.data.email;
          state.user.role = payload.data.role;
        } else {
          state.user.email = payload;
          state.user.role = "user";
        }
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error.message;
      })
      // persist my login state
      .addCase(getMyself.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getMyself.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";

        if (payload.acknowledgement) {
          state.user.email = payload.data.email;
          state.user.role = payload.data.role;
          state.userCredentials = payload.data;
        }
      })
      .addCase(getMyself.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error.message;
      });
  },
});

export const { toggleLoading, logout } = authSlice.actions;

export default authSlice.reducer;
