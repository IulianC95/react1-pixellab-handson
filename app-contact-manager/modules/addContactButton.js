// default export can be renamed
import tazz from './stage.js';
const addContactButton = document.querySelector('.add-contact-button');

addContactButton.addEventListener('click', () => {
  tazz.innerHTML = '';
  tazz.append('new contact form');
});

export default addContactButton;
