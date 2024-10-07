import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';

interface TransactionsState {
  transactions: Transaction[]; // An array to hold all transaction objects
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions', // The name of the slice, used as a prefix for generated action types
  initialState,         // The initial state defined above
  reducers: {           // An object containing reducer functions to handle different actions
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload); // Adds the new transaction to the array
    },

    editTransaction(state, action: PayloadAction<Transaction>) {
      // Find the index of the transaction to be edited using its id
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      
      // If the transaction exists, update it with the new data
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    deleteTransaction(state, action: PayloadAction<string>) {
      // Filter out the transaction with the matching id
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
