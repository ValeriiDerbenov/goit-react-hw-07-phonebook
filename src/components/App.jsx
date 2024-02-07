import React from 'react';
import { useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Section from './Section/Section';
import Title from './Title/Title';

export const App = () => {
  const contacts = useSelector(state => state.contactsStore.contacts);
  
  return (
    <div>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm />
      </Section>
      <Section>
      {contacts.length > 0 ? (<Filter />) : (<h3>Your phonebook is empty. Add first contact!</h3>)}
        {contacts.length > 0 && <ContactList />}
      </Section>
    </div>
  );
};
