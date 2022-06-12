# Ejercicio Full Stack Developer - Bastó
---

### BackEnd (api)

- The first step is intall all the dependencies, te do this do\
`npm install` in the api folder
- To start using the API do `npm run dev`
- To run all the tests do `npm run test`


#### The routes are:
1. `GET http://localhost:3001/api/cattle` It will return all the animals in the DataBase
2. `GET http://localhost:3001/api/cattle?name=${name}` It will return all the Potreros in the DataBase that matches with the given Name
3. `GET http://localhost:3001/api/cattle/:id` It will return a single animal that matches with the given ID
4. `POST http://localhost:3001/api/cattle` It will create a new animal, you can send the data in this format: 
``` 
 {
    idSenasa: 'sffsdhj453ed4rhm',
    animalType: 'toro',
    weight: 130,
    name: 'Fede',
    device: 'caravana',
    deviceNumber: '1235sd78',
  }
```
5. `PUT http://localhost:3001/api/cattle/:id` It will update the data of the animal that matches with the given ID
6. `DELETE http://localhost:3001/api/cattle/:id` It will delete the data of the animal that matches with the given ID



### FrontEnd (client)

- The first step is intall all the dependencies, te do this do\
`npm install` in the client folder
- The next step is run the client, you can do it by running `npm start`  (Make sure to keep running your BackEnd)
- To run all the tests do `npm run test`
