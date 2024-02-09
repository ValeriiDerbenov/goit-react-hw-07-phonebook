import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://65c0f04adc74300bce8d070b.mockapi.io/';

// const startContacts = [
//   { id: nanoid(6), name: 'Valerii', number: '+380 98 380 4 380' },
// ];

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (name, phone, id, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', name, phone, id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContacts',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;

// const initialState = {
//   contacts: JSON.parse(localStorage.getItem('contacts')) ?? startContacts,
//   isLoading: false,
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     addContact(state, action) {
//       state.contacts = [...state.contacts, action.payload];
//     },
//     deleteContact(state, action) {
//       state.contacts = state.contacts.filter(
//         contact => contact.id !== action.payload
//       );
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;
