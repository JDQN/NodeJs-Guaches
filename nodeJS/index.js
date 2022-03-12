const express = require('express');
const app = express();
app.use(express.json());

const students = [
      {
         id: 1,
         name: 'John',
         age: 20,
         enroll: true
      },
      {
         id: 2,
         name: 'Mike',
         age: 21,
         enroll: true
      },
      {
         id: 3,
         name: 'Mary',
         age: 22,
         enroll: false
      }
];

app.get('/', (req, res) => {
   res.send('Hello World Node JS Api!');
});

app.get('/api/students', (req, res) => {
   res.send(students);
});

app.get('/api/students/:id', (req, res) => {
   const student = students.find(student => student.id === parseInt(req.params.id));
   if (!student) {
      return res.status(404).send('The student with given id is not found');
   }
   res.send(student);
});

app.post('/api/sudents', (req, res) => {
   const student = {
      id: students.length + 1,
      name: req.body.name,
      age: parseInt(req.body.age),
      enroll: (req.body.enroll === 'true')
   };
   students.push(student);
   res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
   const student = students.find(student => student.id === parseInt(req.params.id));
   if (!student) {
      return res.status(404).send('The student with given id is not found');
   }
   const index = students.indexOf(student);
   students.splice(index, 1);
   res.send(student);
});


const port = process.env.PORT || 80; // process.env.PORT is Heroku's port if you're using Heroku
app.listen(port, () => console.log(`Escucahndo en el puerto ${port}...`));
  