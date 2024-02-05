import { createSlice, nanoid } from '@reduxjs/toolkit';

const startContacts = [
  { id: nanoid(6), name: 'Valerii', number: '+380 98 380 4 380' },
];

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) ?? startContacts,
  isLoading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
