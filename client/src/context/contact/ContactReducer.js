import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      //spread contacts and add to it
      return { ...state, contacts: [...state.contacts, action.payload] };
    case DELETE_CONTACT:
      return {
        ...state,
        //return all other contacts
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          //if ids match, return the new contact; otherwise, return original contact
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case SET_CONTACT:
      //make current current contact
      return { ...state, current: action.payload };
    case CLEAR_CONTACT:
      return { ...state, current: null };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
