const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn(
  `Folosind obiectul person si reduce, afiseaza in consola un string care contine skill-urile de pe pozitiile pare ale arrayului, separate prin virgula`,
);

// html, js,java,jquery,
let accumulator = '';

for (let i = 0; i < person.skills.length; ++i) {
  const skill = person.skills[i];
  let punctuation = ',';

  if (i === person.skills.length - 1) {
    punctuation = '';
  }
  accumulator += `${skill}${punctuation}`;
}

console.log(accumulator);

const message1 = person.skills.reduce((message1, skill, index, skills) => {
  const punctuation = skills.length - 1 === index ? '' : ',';

  return (message1 += `${skill}${punctuation}`);
}, '');

console.log(message1);
