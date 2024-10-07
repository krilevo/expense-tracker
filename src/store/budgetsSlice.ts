import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface BudgetsState {
  budgets: Budget[];
}

const initialState: BudgetsState = {
  budgets: [],
};

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setBudget: {
      reducer(state, action: PayloadAction<Budget>) {
        state.budgets.push(action.payload);
      },
      prepare(categoryId: string, amount: number) {
        return {
          payload: {
            id: uuidv4(),
            categoryId,
            amount,
          } as Budget,
        };
      },
    },
    editBudget(state, action: PayloadAction<Budget>) {
      const index = state.budgets.findIndex(budget => budget.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    deleteBudget(state, action: PayloadAction<string>) {
      state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
    },
  },
});

export const { setBudget, editBudget, deleteBudget } = budgetsSlice.actions;
export default budgetsSlice.reducer;
