import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialCode = localStorage.getItem("uniqueCode") || "";

export const saveUniqueCode = createAsyncThunk(
  "uniqueCode/saveUniqueCode",
  async ({ institutionId, uniqueCode }, { rejectWithValue }) => {
    try {
      const response = await api.post("/unique-code", {
        institutionId,
        code: uniqueCode,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const uniqueCodeSlice = createSlice({
  name: "uniqueCode",
  initialState: {
    code: initialCode,
    status: "idle",
    error: null,
  },
  reducers: {
    generateUniqueCode(state) {
      if (!state.code) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        let result = "";
        for (let i = 0; i < 3; i++) {
          result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 2; i++) {
          result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        state.code = result;
        localStorage.setItem("uniqueCode", result);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUniqueCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveUniqueCode.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveUniqueCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { generateUniqueCode } = uniqueCodeSlice.actions;

export default uniqueCodeSlice.reducer;
