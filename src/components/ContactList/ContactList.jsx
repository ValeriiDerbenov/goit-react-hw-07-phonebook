import React from 'react';
import css from './ContactList.module.css';
import Title from '../Title/Title';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import { deleteContact } from '../../redux/contacts/contacts.reducer';
import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.filterStore.filter);
  const dispatch = useDispatch();
	// console.log('dispatch :>> ', dispatch);
  const deletedContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const availableContacts = () => {
    return contacts.filter(
      contact =>
        typeof contact.name === 'string' &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const listOfContacts = availableContacts();

  return (
    <div className={css.contactListContainer}>
      <Title>Contacts</Title>
      {listOfContacts.map(contact => (
        <ContactListItem
          contact={contact}
          key={contact.id}
          deleteContact={deletedContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
