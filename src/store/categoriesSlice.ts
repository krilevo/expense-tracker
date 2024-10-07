import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [
    // Predefined example categories
    { id: uuidv4(), name: 'Salary', type: 'income' },
    { id: uuidv4(), name: 'Groceries', type: 'expense' },
    { id: uuidv4(), name: 'Rent', type: 'expense' },
    { id: uuidv4(), name: 'Entertainment', type: 'expense' },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: {
      reducer(state, action: PayloadAction<Category>) {
        state.categories.push(action.payload);
      },
      prepare(name: string, type: 'income' | 'expense') {
        return {
          payload: {
            id: uuidv4(),
            name,
            type,
          } as Category,
        };
      },
    },
    editCategory(state, action: PayloadAction<Category>) {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
