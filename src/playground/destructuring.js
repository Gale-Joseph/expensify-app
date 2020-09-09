//Object Destructuring

// const person = {
//     //name: 'Andrew',
//     age: 26,
//     location:{
//         city: 'Philly',
//         temp: 92
//     }
// };

// const {name='James',age,location} = person

// console.log(`${name} is ${age}`)

// const {city, temp: temperature} = person.location;
// if(city&&temperature){
//     console.log(`It's ${temperature} in ${city}`)
// }

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name:publisherName='self-published'} = book.publisher;


// console.log(publisherName)

//ARRAY DESTRUCTuring

// const address = ['1299 S Juniper Street','Philadelphia', 'Pennsylvania','19147'];
// const[,,state='New York',zip] = address;
// console.log(`You are in ${city}, ${state}`)

const item = ['coffee(hot)','$2.00','$2.50','$2.75'];
const[coffee,,medium,] = item;
console.log(`A medium ${coffee} costs ${medium} `)