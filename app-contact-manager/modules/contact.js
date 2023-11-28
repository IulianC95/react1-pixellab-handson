export const render = (contact) => {
  const { id, name, surname, phone, email, pets = [] } = contact;
  const container = document.createElement('article');
  container.classList.add('contact', 'border', 'p-3', 'mb-4');
  container.dataset.contactId = id;

  container.innerHTML = `
    <h1>${name + ' ' + surname}</h1>
    <ul>
      <li>${phone}</li>
      <li>${email}</li>
    </ul>

    <button title="Delete"
      type="button"
      class="btn btn-secondary delete-friend"
    >Delete</button>
  `;

  return container;
};
