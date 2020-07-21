import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
  //bring contactContext
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter } = contactContext;

  const text = useRef('');

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      ></input>
    </Form>
  );
};

export default ContactFilter;
