const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  skills: {
    html: true,
    css: false,
    javaScript: true,
  },
  friends: {
    larry: {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    steven: {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    carol: {
      name: 'Carol',
      age: 29,
      surname: 'Carolson',
    },
  },
};

console.warn(
  `Folosind Object.entries() pe proprietatea skills,
   afiseaza abilitatile persoanei daca acestea sunt true.
    Folosind propozitii de forma: “person.name cunoaste:
    html.” “person.name cunoaste: javaScript.”`,
);

const entries1 = Object.entries(person.skills);
entries1.forEach((skillEntry) => {
  const [skillId, isKnown] = skillEntry;

  console.log(
    `${person.name} ${isKnown ? 'cunoaste' : 'nu cunoaste'} ${skillId}`,
  );
});

console.warn(
  `Prin aceeasi metoda, afiseaza o lista inversata
  cu numele complet inversat al prietenilor. `,
);

const reversedFriendsList = Object.entries(person.friends).reverse();
reversedFriendsList.forEach((friendEntry) => {
  const [, friend] = friendEntry;
  const { surname, name } = friend;

  console.log(`${surname} ${name}`);
});

console.warn(`
  Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.”
  folosind Object.entries()`);

console.log(
  Object.entries(person.friends).reduce(
    (message, friendEntry, index, friends) => {
      const length = friends.length;
      const [, { name }] = friendEntry;
      const punctuation =
        length - 1 === index ? '.' : length - 2 === index ? ' si ' : ', ';

      message += `${name}${punctuation}`;
      return message;
    },
    'Prietenii mei sunt ',
  ),
);
