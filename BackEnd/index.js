const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const userRoutes = require('./src/users/routes');
const assessmentRoutes = require('./src/assessment/routes');
const questionRoutes = require('./src/question/routes'); 
const answerRoutes = require('./src/answer/routes'); 

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
      user: 'joaovitor.soaresti@outlook.com',
      pass: 'Joao@2023'
  }
});

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);

app.post('/api/email', (req, res) => {
  const { email, code } = req.body;

  transport.sendMail({
    from: 'joaovitor.soaresti@outlook.com',
    to: email,
    subject: 'Seu código de acesso Avaliação de Desempenho',
    html: `
    <div>
      <div style="background: #195BA2; padding: 10px 16px">
              <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
      </div>
            <div style="padding: 10px 16px">
              <h2 style="color: #195BA2">Olá!</h2>
              <p>Segue seu código de autenticação ao Sistema de Validação de Desempenho.</p>
              <p style="font-size: 42px; color: #195BA2; font-weight: bold">${code}<p/>
              <p>Atenciosamente, <br/>Equipe Braste</p>
            </div>
    </div>
    `,
    text: 'teste de funcionalidade'
  }).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
      console.log("Error: " + err);
  })
})

app.listen(PORT, ()=>{
  console.log("App listening on port: "+PORT);
})