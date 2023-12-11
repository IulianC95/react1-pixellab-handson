export const render = (pet, contactId) => {
  const { name, species, age, id } = pet;
  const container = document.createElement('article');
  container.classList.add('pet', 'mt-3');
  container.dataset.petId = id;

  container.innerHTML = `
  <h1>${name}</h1>
  <ul>
    <li>Name: ${name}</li>
    <li>Age: ${age}</li>
    <li>Species: ${species}</li>
  </ul>
  <footer class="mt-2">
    <button type="button"
    title="Edit"
    class="btn btn-secondary edit-pet-button"
    data-pet-id="${id}" ${
    contactId ? `data-contact-id="${contactId}"` : ''
  } // Adăugarea atributului data-pet-id și, opțional, data-contact-id
    >Edit</button>
    <button type="button"
      title="Delete"
      class="btn btn-danger delete-pet-button"
      data-pet-id="${id}" ${contactId ? `data-contact-id="${contactId}"` : ''}
    >Delete</button>
  </footer>
`;

  return container;
};
