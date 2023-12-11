import { getPet } from './query.js';

export const renderEditPetForm = (contactId, petId) => {
  const pet = getPet(contactId, petId);
  if (!pet) {
    console.error('Pet not found.');
    return;
  }

  const { name, species, age } = pet;
  const container = document.createElement('form');
  container.classList.add('edit-pet-form');

  container.innerHTML = `
    <h4>Editing pet ${name}</h4>

    <label class="form-label mt-2">Name</label>
    <input type="text" name="name" class="form-control form-control-sm" value="${name}">

    <label class="form-label mt-2">Species</label>
    <input type="text" name="species" class="form-control form-control-sm" value="${species}">

    <label class="form-label mt-2">Age</label>
    <input type="number" name="age" class="form-control form-control-sm" value="${age}">

    <input type="hidden" value="${petId}" name="petId">
    <input type="hidden" value="${contactId}" name="contactId">

    <div class="mt-2">
      <button type="submit" class="btn btn-secondary me-1" title="Save">Save</button>
      <button type="button" class="cancel-button btn btn-secondary" title="Cancel">Cancel</button>
    </div>
  `;

  return container;
};
