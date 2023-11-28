import contacts from './data.js';

export const findContact = (needle = 'query') => {
  const results = contacts.filter((contact) => {
    // [1, 'Carol', 'Carolson', '073', ... , []]
    const values = Object.values(contact).filter((part) => {
      return typeof part === 'number' || typeof part === 'string';
    });

    needle = needle.toLowerCase();

    if (values.join('').toLowerCase().includes(needle)) {
      return true;
    }

    return false;
  });

  return results;
};

export const deleteContact = (contactId) => {
  contactId = parseInt(contactId);
  if (!contactId || isNaN(contactId)) {
    return;
  }

  const contactIndex = contacts.findIndex((contact) => {
    const { id } = contact;

    return contactId === id;
  });

  if (contactIndex >= 0) {
    // splice mutates
    contacts.splice(contactIndex, 1);
  }
};
