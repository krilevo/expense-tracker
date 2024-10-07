import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCategory, editCategory, deleteCategory } from '../../store/categoriesSlice';
import { Category } from '../../types';

const CategoryManager: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select the categories state from the Redux store
  const categories = useAppSelector(state => state.categories.categories);

  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Handle adding a new category
  const handleAdd = () => {
    // Prevent adding a category with an empty name
    if (name.trim() === '') return;

    // Dispatch the addCategory action to add a new category
    dispatch(addCategory(name, type));

    // Reset the name and type fields to their initial states
    setName('');
    setType('expense');
  };

  // Handle editing a category
  const handleEdit = (category: Category) => {
    // Set the category to be edited
    setEditingCategory(category);

    // Populate the form fields with the category's current data
    setName(category.name);
    setType(category.type);
  };

  // Handle updating a category
  const handleUpdate = () => {
    // Ensure there is a category being edited and the name is not empty
    if (editingCategory && name.trim() !== '') {

      // Dispatch the editCategory action to update the category
      dispatch(editCategory({ ...editingCategory, name, type }));

      // Clear the editingCategory state to exit edit mode
      setEditingCategory(null);

      // Reset the name and type fields to their initial states
      setName('');
      setType('expense');
    }
  };

  // Handle deleting a category
  const handleDelete = (id: string) => {
    // Dispatch the deleteCategory action to remove the category
    dispatch(deleteCategory(id));
  };

  return (
    <div className="category-manager my-2 p-4 bg-white shadow rounded flex-1">
      <h2 className="text-xl font-semibold mb-4">Category Manager</h2>

      {/* Form Section */}
      <div className="form mb-4 flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
        />
        
        <select
          value={type}
          onChange={e => setType(e.target.value as 'income' | 'expense')}
          className="border p-2 rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Conditional Rendering: Show Update and Cancel buttons if editing, else show Add button */}
        {editingCategory ? (
          <div className="flex space-x-2">
            {/* Button to confirm updating the category */}
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Category
            </button>
            {/* Button to cancel editing and reset the form */}
            <button
              onClick={() => setEditingCategory(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          // Button to add a new category
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Category
          </button>
        )}
      </div>

      {/* List of Categories */}
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>
              {cat.name} ({cat.type})
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
