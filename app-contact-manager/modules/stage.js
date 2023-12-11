import { addMessage, clearMessages } from './notificationBar.js';
import {
  addContact,
  addPet,
  deleteContact,
  deletePet,
  editContact,
  editPet,
  getContact,
  getPet,
} from './query.js';
import renderMessage from './message.js';
import { render as renderEditContact } from './editContactForm.js';
import { render as renderAddPetForm } from './addPetForm.js';
import { renderEditPetForm } from './editPetForm.js';

const stage = document.querySelector('.stage');

// delete contact
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('delete-friend')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = parent.dataset.contactId;

  // Add a confirm box (browser) to the delete friend

  const isConfirmed = confirm('Are you sure you want to delete this contact?');
  if (!isConfirmed) {
    return;
  }

  deleteContact(contactId);
  parent.remove();
  addMessage(renderMessage('Contact removed', 'danger'));
});

// delete pet
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.classList.contains('delete-pet-button')) {
    return;
  }

  const petContainer = target.closest('.pet');
  const petId = petContainer ? parseInt(petContainer.dataset.petId) : null;
  const contactContainer = petContainer
    ? petContainer.closest('.contact')
    : null;
  const contactId = contactContainer
    ? parseInt(contactContainer.dataset.contactId)
    : null;

  if (!petId || !contactId) {
    console.error('Missing petId or contactId.');
    return;
  }

  const isConfirmed = confirm('Are you sure you want to delete this pet?');
  if (!isConfirmed) {
    return;
  }

  deletePet(contactId, petId);
  petContainer.remove();
  addMessage(renderMessage('Pet removed', 'danger'));
});

// add contact form
stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== 'FORM' || !target.classList.contains('add-contact')) {
    return;
  }

  const form = target;
  // input elements:
  const { name, surname, phone, email } = form;
  const contact = {
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    email: email.value,
    // hack:
    id: Number(Date.now().toString().slice(-6)),
  };

  // implement create contact
  addContact(contact);

  addMessage(
    renderMessage(`Contact ${name.value} ${surname.value} created.`, 'success'),
  );
  stage.innerHTML = '';
});

// cancel button
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('cancel-button')
  ) {
    return;
  }

  stage.innerHTML = '';
});

// edit contact button click
// subscribe
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('edit-friend')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = parent.dataset.contactId;

  const contact = getContact(contactId);

  if (contact === undefined) {
    return;
  }

  clearMessages();
  stage.innerHTML = '';
  stage.append(renderEditContact(contact));
});

// edit contact form submit
stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (
    target.nodeName !== 'FORM' ||
    !target.classList.contains('edit-contact')
  ) {
    return;
  }

  const form = target;
  // DOM elements
  const { name, surname, phone, email, id } = form;
  const contact = {
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    email: email.value,
    id: Number(id.value),
  };

  editContact(contact);

  stage.innerHTML = '';
  addMessage(
    renderMessage(`Contact ${name.value} ${surname.value} saved.`, 'success'),
  );
});

// add pet button
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('add-pet-button')
  ) {
    return;
  }

  const addPetButton = target;
  const ownerContainer = addPetButton.closest('.contact');
  const contactId = ownerContainer.dataset.contactId;

  clearMessages();
  stage.innerHTML = '';

  stage.append(renderAddPetForm(contactId));
});

//add pet submit
stage.addEventListener('submit', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'FORM' ||
    !target.classList.contains('add-pet-form')
  ) {
    return;
  }

  event.preventDefault();
  const form = target;
  // dom elements:
  const { age, name, species, contactId } = form;
  const pet = {
    age: age.value,
    name: name.value,
    species: species.value,
    // hack
    id: Number(Date.now().toString().slice(-6)),
  };

  addPet(contactId.value, pet);
  const { name: contactName, surname: contactSurname } = getContact(
    contactId.value,
  );

  stage.innerHTML = '';
  addMessage(
    renderMessage(
      `Pet ${name.value} added to contact ${contactName} ${contactSurname}.`,
      'success',
    ),
  );
});

// edit pet

stage.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-pet-button')) {
    const button = event.target;
    const petId = button.dataset.petId;

    const contactContainer = button.closest('.contact');
    const contactId = contactContainer
      ? contactContainer.dataset.contactId
      : null;

    if (!petId || !contactId) {
      console.error('Missing petId or contactId:', petId, contactId);
      return;
    }

    const editPetForm = renderEditPetForm(contactId, petId);
    if (editPetForm) {
      stage.innerHTML = '';
      stage.appendChild(editPetForm);
    }
  }
});

// save edit pet

stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.classList.contains('edit-pet-form')) {
    const form = target;

    const updatedPet = {
      id: Number(form.petId.value),
      name: form.name.value,
      species: form.species.value,
      age: Number(form.age.value),
    };

    const contactId = Number(form.contactId.value);

    editPet(contactId, updatedPet);

    stage.innerHTML = '';
    addMessage(
      renderMessage(`Pet ${updatedPet.name} updated successfully`, 'success'),
    );
  }
});

// Reset stage on logo click (<button type=“button> in h1)
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  stage.innerHTML = '';
});

export default stage;
