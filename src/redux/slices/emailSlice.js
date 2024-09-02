import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async ({ uniqueCode, email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/email/send-code-email", {
        code: uniqueCode,
        to_email: email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState: {
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default emailSlice.reducer;
