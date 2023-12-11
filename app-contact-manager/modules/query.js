import contacts from './data.js';

export const findContact = (needle = 'query', isCaseSensitive = false) => {
  const results = contacts.filter((contact) => {
    const values = Object.values(contact).filter((part) => {
      return typeof part === 'number' || typeof part === 'string';
    });

    const searchValue = isCaseSensitive ? needle : needle.toLowerCase();
    const contactString = isCaseSensitive
      ? values.join('')
      : values.join('').toLowerCase();

    return contactString.includes(searchValue);
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

// add contact
export const addContact = (contact) => {
  // push mutates
  contacts.push(contact);
};

// get contact (by id)
export const getContact = (contactId) => {
  contactId = Number(contactId);

  return contacts.find((contact) => {
    const { id } = contact;

    return id === contactId;
  });
};

// editContact
export const editContact = (contact) => {
  const existingContact = getContact(contact.id);

  const contactProperties = Object.keys(existingContact);

  for (let i = 0; i < contactProperties.length; i++) {
    const propertyName = contactProperties[i];

    existingContact[propertyName] =
      contact[propertyName] || existingContact[propertyName];
  }
};

// addPet

export const addPet = (contactId, pet) => {
  const contact = getContact(contactId);
  contact.pets = contact.pets || [];
  // push mutates
  contact.pets.push(pet);
};

// deletePet

export const deletePet = (contactId, petId) => {
  const contact = getContact(contactId);
  if (!contact || !contact.pets) {
    return;
  }

  const petIndex = contact.pets.findIndex((pet) => pet.id === petId);
  if (petIndex >= 0) {
    contact.pets.splice(petIndex, 1);
  }
};

// getPet
export const getPet = (contactId, petId) => {
  contactId = Number(contactId);
  petId = Number(petId);

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact || !contact.pets) {
    return null;
  }

  return contact.pets.find((pet) => pet.id === petId);
};

export const editPet = (contactId, updatedPet) => {
  const contact = getContact(contactId);
  if (!contact || !contact.pets) {
    return;
  }

  const petIndex = contact.pets.findIndex((pet) => pet.id === updatedPet.id);
  if (petIndex >= 0) {
    contact.pets[petIndex] = { ...contact.pets[petIndex], ...updatedPet };
  }
};
