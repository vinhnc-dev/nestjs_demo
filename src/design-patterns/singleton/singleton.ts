class Person {
  static instance: Person;

  name: string;
  gender: string;

  constructor(name: string, gender: string) {
    this.name = name;
    this.gender = gender;
  }

  static getInstance(name: string, gender: string) {
    if (!Person.instance) {
      Person.instance = new Person(name, gender);
    }

    return Person.instance;
  }
}

const person1 = Person.getInstance('vinh', 'male');
console.log(person1);
const person2 = Person.getInstance('Quang', 'female');
console.log(person2);
