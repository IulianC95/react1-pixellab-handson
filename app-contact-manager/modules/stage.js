import { addMessage, clearMessages } from './notificationBar.js';
import { addContact, deleteContact, editContact, getContact } from './query.js';
import renderMessage from './message.js';
import { render as renderEditContact } from './editContactForm.js';

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

  deleteContact(contactId);
  parent.remove();
  addMessage(renderMessage('Contact removed', 'danger'));
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
  addMessage(renderMessage(`Contact ${name.value} ${surname.value} saved.`));
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
  {
    const addPetButton = target;
    const ownerContainer = addPetButton.closest('.contact');
    const contactId = ownerContainer.dataset.contactId;

    clearMessages();
    stage.innerHTML = '';

    // for next time
    stage.append('add pet');
  }
});

export default stage;
