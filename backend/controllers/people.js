let { v4 : uuidv4 }= require('uuid');
let people = [];

exports.getPeople = (req,res)=>{
    res.send(people);
};

exports.createUser = (req,res)=>{
    const newPerson = req.body;
    const newPersonId = uuidv4();
    const newPersonWithId = {...newPerson, id:newPersonId};
    people.push(newPersonWithId);
    res.send(`Person with the name ${newPerson.firstName} is pushed to the array!`);
};

exports.getUserById = (req,res)=>{
    const { id } = req.params;
    const foundPerson = people.find((person) => person.id === id)
    res.send(foundPerson);
};

exports.updateUser = (req,res)=>{
    const { id } = req.params;
    const {firstName,lastName,age} = req.body;
    const personToBeUpdated = people.find((person)=>person.id === id);

    if(firstName){
        personToBeUpdated.firstName=firstName;
    }
    if(lastName){
        personToBeUpdated.lastName=lastName;
    }
    if(age){
        personToBeUpdated.age=age;
    }
    res.send(`User with the id: ${id} has been updated`)
};

exports.deleteUser = (req,res) => {
    const { id } = req.params;
    people = people.filter((person)=>person.id !== id);
    res.send(`User with id: ${id} is deleted`);
};
