var Person = /** @class */ (function () {
    function Person(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    Person.getInstance = function (name, gender) {
        if (!Person.instance) {
            Person.instance = new Person(name, gender);
        }
        return Person.instance;
    };
    return Person;
}());
var person1 = Person.getInstance('vinh', 'male');
console.log(person1);
var person2 = Person.getInstance('Quang', 'female');
console.log(person2);
