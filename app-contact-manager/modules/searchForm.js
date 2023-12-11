import { addMessage } from './notificationBar.js';
import { findContact } from './query.js';
import stage from './stage.js';
import renderMessage from './message.js';
import { pluralize } from './utils.js';
import { render as renderContact } from './contact.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const queryInput = form.q;
  const caseSensitiveChebox = form.caseSensitive;
  let searchValue = queryInput.value;

  // Make sure search works for three letter and up
  if (searchValue.length < 3) {
    addMessage(
      renderMessage('Search term must be at least 3 characters long.'),
    );
    return;
  }

  const contacts = findContact(searchValue, caseSensitiveChebox.checked);
  const contactsCount = contacts.length;

  if (contactsCount <= 0) {
    addMessage(renderMessage('No contacts found', 'warning'));
  } else {
    const petsCount = contacts.reduce((petsCount, contact) => {
      const { pets = [] } = contact;
      petsCount += pets.length;

      return petsCount;
    }, 0);

    addMessage(
      renderMessage(
        `Found ${pluralize(contactsCount, {
          one: 'contact',
          many: 'contacts',
        })} with ${
          petsCount <= 0
            ? 'no pets'
            : pluralize(petsCount, {
                one: 'pet',
                many: 'pets',
              })
        }.`,
        'success',
      ),
    );
  }

  const fragment = new DocumentFragment();
  contacts.forEach((contact) => {
    fragment.append(renderContact(contact));
  });

  stage.innerHTML = '';
  stage.append(fragment);
  queryInput.value = '';
});

export default searchForm;
