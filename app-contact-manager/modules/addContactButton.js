// default export can be renamed
import { render } from './addContactForm.js';
import { clearMessages } from './notificationBar.js';
import tazz from './stage.js';
const addContactButton = document.querySelector('.add-contact-button');

addContactButton.addEventListener('click', () => {
  clearMessages();
  tazz.innerHTML = '';
  tazz.append(render());
});

export default addContactButton;
