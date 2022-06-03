import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { User } from '~/types';
import { login, logout, register } from './authThunk';

const user = JSON.parse(localStorage.getItem('user') as string);

interface InitialState {
    user?: User;
    isLoggedIn: boolean;
    logging: boolean;
    message: string;
}

const initialState: InitialState = user
    ? {
          user,
          isLoggedIn: true,
          logging: false,
          message: '',
      }
    : {
          user: undefined,
          isLoggedIn: false,
          logging: false,
          message: '',
      };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
        clearMessage(state) {
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.logging = true;
            state.isLoggedIn = false;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.logging = false;
        });

        builder.addCase(register.rejected, (state) => {
            state.logging = false;
            state.isLoggedIn = false;
        });

        builder.addCase(login.pending, (state, action: any) => {
            state.logging = true;
            state.isLoggedIn = false;
            state.user = action.payload;
        });

        builder.addCase(login.fulfilled, (state, action: any) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.user = action.payload;
        });

        builder.addCase(login.rejected, (state) => {
            state.logging = false;
            state.isLoggedIn = false;
            state.user = undefined;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        });
    },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
