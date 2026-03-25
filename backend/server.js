var express = require("./node_modules/express");
var bodyParser = require("./node_modules/body-parser");
var cookieParser = require('./node_modules/cookie-parser');
var cors = require("./node_modules/cors");

var app = express();

const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));



const users = [
  {id: 1, name: "admin", role: "admin"},
  {id: 2, name: 'João Aluno', role: 'student' },
  {id: 3, name: 'Maria Aluna', role: 'student'}
];

const teachers = [
  { id: 1, name: 'Prof. Ana Silva' },
  { id: 2, name: 'Prof. Carlos Souza' },
  { id: 3, name: 'Prof. Mariana Lima' },
  { id: 4, name: 'Prof. Marta gomes'}
]

const subjects = [
  { id: 1, name: 'Matemática', code: 'MAT101' },
  { id: 2, name: 'Português', code: 'POR102' },
  { id: 3, name: 'História', code: 'HIS103' },
  { id: 4, name: 'Física', code: 'FIS104' }
]

const classes = [
  {
    id: 1,
    subjectId: 1,
    teacherId: 1,
    timeCode: '21', // segunda manhã
    enrolledStudents: [2] // João está matriculado
  },
  {
    id: 2,
    subjectId: 2,
    teacherId: 2,
    timeCode: '33', // terça noite
    enrolledStudents: []
  },
  {
    id: 3,
    subjectId: 3,
    teacherId: 3,
    timeCode: '42', // quarta tarde
    enrolledStudents: [3] // Maria está matriculada
  },
  {
    id: 4,
    subjectId: 4,
    teacherId: 1,
    timeCode: '51', // quinta manhã
    enrolledStudents: []
  }
]

app.get("/users", function(req,res){
  res.writeHead(200,{"Content-Type": "application/json"});
  const resp = users;

  res.json(resp);
});

app.get("/teachers", function(req,res){
  res.writeHead(200,{"Content-Type": "application/json"});
  const resp = teachers;

   res.json(resp);
});

app.get("/subjects", function(req,res){
  res.writeHead(200,{"Content-Type": "application/json"});
  const resp = subjects;

   res.json(resp);
});

app.get("/classes", function(req,res){
  res.writeHead(200,{"Content-Type": "application/json"});
  const resp = classes;

  res.json(resp);
});

app.post("/classes", (req, res) => {
  const newClass = {
    id: Date.now(),
    ...req.body,
    enrolledStudents: []
  };

  classes.push(newClass);

  res.json(newClass);
});

app.post("/classes/enroll", (req, res) => {
  const {classID, studentID} = req.body;

   // encontra a turma
  const cls = classes.find(c => c.id === classID);

  if (!cls) {
    return res.status(404).json({ message: "Turma não encontrada" });
  }

   // evita duplicação
  if (!cls.enrolledStudents.includes(studentID)) {
    cls.enrolledStudents.push(studentID);
  }

  res.json(cls);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});