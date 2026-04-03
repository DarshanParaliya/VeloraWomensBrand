import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const loadUserFromStorage = (): User | null => {
  try {
    const serializedUser = localStorage.getItem("velora_user");
    if (serializedUser === null) return null;
    return JSON.parse(serializedUser);
  } catch (err) {
    return null;
  }
};

const user = loadUserFromStorage();

const initialState: AuthState = {
  user,
  isAuthenticated: !!user,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("velora_user", JSON.stringify(action.payload));
    },
    signup: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("velora_user", JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("velora_user", JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("velora_user");
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { login, signup, logout, setError, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;
