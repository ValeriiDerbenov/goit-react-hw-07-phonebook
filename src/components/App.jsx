import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Section from './Section/Section';
import Title from './Title/Title';
import { selectContacts, selectError, selectIsLoading } from '../../src/redux/contacts/contacts.selector';

import Loader from './Loader/Loader';
import {fetchContacts} from '../../src/redux/contacts/contacts.reducer'

export const App = () => {
  // const contacts = useSelector(state => state.contactsStore.contacts);
  
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm />
      </Section>
      <Section>
      {contacts.length > 0 ? (<Filter />) : (<h3>Your phonebook is empty. Add first contact!</h3>)}
      {error !== null && <p className="textError">{error}</p>}
      {isLoading && <Loader />}
        {contacts.length > 0 && <ContactList />}
      </Section>
    </div>
  );
};
