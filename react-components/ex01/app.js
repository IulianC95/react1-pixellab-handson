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

console.warn(`Folosind metoda map pe arrayul skills, returneaza si
  afiseaza in consola un array in care fiecare consoana este scrisa cu
  litera mare (vocalele nu) `);
const vowels = ['a', 'e', 'i', 'o', 'u'];
const arrVowels = person.skills.map((skill) => {
  const letters = skill.split('');
  const upperCaseVowels = letters.map((letter) => {
    if (vowels.includes(letter)) {
      return letter.toUpperCase();
    }

    return letter;
  });

  return upperCaseVowels.join('');
});

console.log(arrVowels);

console.warn(`Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia
“Ma numesc {name} {surname} si am {age} ani.”`);

const sentences = person.friends.map((friend) => {
  const { name, surname, age } = friend;
  return `Ma numesc ${name} ${surname} si am ${age} ani.`;
});
console.log(sentences);

console.warn(`Folosind map pe arrayul friends, returneaza un
 array in care fiecare pozitie contine propozitia
“Diferenta de varsta dintre {friendName} si {personName}
este {diff}”`);

const ageDifferenceSentences = person.friends.map((friend) => {
  const diff = Math.abs(friend.age - person.age);
  return `Diferenta de varsta dintre ${friend.name} si ${person.name} este ${diff}.`;
});

console.log(ageDifferenceSentences);

console.warn(`Returneaza si afiseaza un array in care
fiecare pozitie contine diferenta dintre varsta persoanei si
lungimea cuvantului de pe arrayul skill `);

const skillLengthDifferences = person.skills.map(
  (skill) => person.age - skill.length,
);

console.log(skillLengthDifferences);

console.warn(`Folosind metoda map pe arrayul skills,
returneaza un array care contine cuvintele cu prima si ultima litera mari. `);

const transformedSkills = person.skills.map((skill) => {
  return (
    skill.charAt(0).toUpperCase() +
    skill.slice(1, -1) +
    skill.slice(-1).toUpperCase()
  );
});

console.log(transformedSkills);

console.warn(
  `Folosind metoda map pe arrayul skills,
  returneaza un array care contine cuvintele inversate (exemplu: lmth)`,
);

const reversedSkills = person.skills.map((skill) => {
  return skill.split('').reverse().join('');
});

console.log(reversedSkills);

console.warn(`Folosind metoda map pe arrayul friends,
returneaza un array care sa contina propozitiile
“{friendName} are {age} ani.”`);

const friendSentences = person.friends.map((friend) => {
  return `${friend.name} are ${friend.age} ani.`;
});

console.log(friendSentences);

console.warn(`Folosind metoda map pe arrayul friends,
 returneaza un array care contine numele inversat al
 prietenilor pe fiecare pozitie (exemplu: Stevenson Steven)`);

const reversedNameFriends = person.friends.map((friend) => {
  return `${friend.surname} ${friend.name}`;
});

console.log(reversedNameFriends);

console.warn(`Folosind metoda map pe arrayul friends, returneaza
un array care contine pe fiecare pozitie diferenta dintre lungimea
 totala al numelui complet (fara spatii) si varsta prietenului de
 pe iteratie
`);

const nameLengthAgeDifference = person.friends.map((friend) => {
  const fullNameLength = (friend.name + friend.surname).length;
  return fullNameLength - friend.age;
});

console.log(nameLengthAgeDifference);

console.warn(`Folosind metoda map pe arrayul skills returneaza un
array care contine diferenta dintre lungimea fiecarui skill
si varsta prietenului `);

const skillAgeDifference = person.skills.map((skill, index) => {
  const friendIndex = index % person.friends.length;
  const age = person.friends[friendIndex].age;
  return skill.length - age;
});

console.log(skillAgeDifference);
