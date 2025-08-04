import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely access localStorage
const getLocalStorageItem = <T>(key: string, defaultValue: Array<T>) => {
  if (typeof window === "undefined") return defaultValue; // ✅ Prevent SSR crash

  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const initialState = {
  allLaunches: [],
};

const launchSlice = createSlice({
  name: "launch",
  initialState,
  reducers: {
    initializeLaunchData: (state) => {
      if (typeof window !== "undefined") {
        state.allLaunches = getLocalStorageItem("launches", []);
      }
    },
    addLaunchData: (state, action) => {
      const data = action.payload;
      state.allLaunches = data;
    },
  },
});

export const { initializeLaunchData , addLaunchData} = launchSlice.actions;
export default launchSlice.reducer;