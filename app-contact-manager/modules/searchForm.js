import { findContact } from './query.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const queryInput = form.q;
  const searchValue = queryInput.value;

  const contacts = findContact(searchValue);

  const stage = document.querySelector('.stage');
  stage.innerText = contacts.toString();

  queryInput.value = '';
});

export default searchForm;
