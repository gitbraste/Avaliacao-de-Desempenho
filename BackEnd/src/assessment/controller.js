const pool = require("../../config.js");
const queries = require("./queries.js");
const nodemailer = require("nodemailer");

const getAssessmentById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getAssessmentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAssessmentByManager = (req, res) => {
  const manager = req.params.manager;
  pool.query(queries.getAssessmentByManager, [manager], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAssessmentByDate = (req, res) => {
  const { manager, start, end } = req.params;

  pool.query(
    queries.getAssessmentByDate,
    [manager, start, end],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const getAssessmentByDateAndUser = (req, res) => {
  const { register, manager, start, end } = req.params;

  pool.query(
    queries.getAssessmentByDateAndUser,
    [register, manager, start, end],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const getAssessmentByUser = (req, res) => {
  const register = req.params.register;
  const manager = req.params.manager;
  pool.query(
    queries.getAssessmentByUser,
    [register, manager],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const createAssessment = (req, res) => {
  const transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "app@brasterapica.com.br",
      pass: "Bov05092",
    },
    tls:  { ciphers: 'SSLv3' },
    service: "Outlook365",
  });

  const {
    register,
    date_time,
    description,
    descriptionEmployee,
    emailEmployee,
    nameEmployee,
    emailManager,
    nameManager,
    resultValue,
  } = req.body;

  const date = new Date(date_time).toLocaleString("pt-BR");

  pool.query(
    queries.createAssessment,
    [register, date_time, description, descriptionEmployee],
    async (error, results) => {
      if (error) throw error;
       await sendEmail(
        transport,
        emailEmployee,
        `<div>
      <div style="background: #195BA2; padding: 10px 16px">
            <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
      </div>
      <div style="padding: 10px 16px">
            <h2 style="color: #195BA2">Olá!</h2>
            <p>Você recentemente realizou uma avaliação de desempenho anual em conjunto com seu gestor.</p>
            <div>
              <p>
                <span style="color: #195BA2; font-weight: bold">Gestor:</span> ${nameManager} <br>
                <span style="color: #195BA2; font-weight: bold">Colaborador:</span> ${nameEmployee} <br>
                <span style="color: #195BA2; font-weight: bold">Data:</span> ${date}
              </p>
              <p style="font-size: 20px;">Seu resultado: <br/>
                <span style="font-size: 36px; color: #195BA2; font-weight: bold">${resultValue}</span>
              </p>
            </div>
            <p>No entanto, notamos que sua avaliação ainda não foi validada. Para garantir a integridade da sua avaliação, é importante que você valide sua avaliação.</p>
            <p>Para fazer isso, por favor, clique no botão de validação abaixo. </p>
            <p>Obrigado novamente por sua colaboração e aguardamos sua validação.</p>
            <a><Button style="cursor: pointer; background: #195BA2; border: none; border-radius: 16px; padding: 16px"><a style="text-decoration: none; color: #fff" href="http://localhost:3000/validation/${results.rows[0].id_assessment}">Clique aqui para realizar a validação</Button></a>
            <p>Atenciosamente, <br/>Equipe Braste</p>
            </div>
  </div>`
      );

      await sendEmail(
        transport,
        "joao.soares@brasterapica.com.br",
        `<div>
      <div style="background: #195BA2; padding: 10px 16px">
            <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
      </div>
      <div style="padding: 10px 16px">
            <h2 style="color: #195BA2">Olá!</h2>
            <p>Você recentemente realizou uma avaliação de desempenho anual em conjunto com seu gestor.</p>
            <div>
              <p>
                <span style="color: #195BA2; font-weight: bold">Gestor:</span> ${nameManager} <br>
                <span style="color: #195BA2; font-weight: bold">Colaborador:</span> ${nameEmployee} <br>
                <span style="color: #195BA2; font-weight: bold">Data:</span> ${date}
              </p>
              <p style="font-size: 20px;">Seu resultado: <br/>
                <span style="font-size: 36px; color: #195BA2; font-weight: bold">${resultValue}</span>
              </p>
            </div>
            <p>No entanto, notamos que sua avaliação ainda não foi validada. Para garantir a integridade da sua avaliação, é importante que você valide sua avaliação.</p>
            <p>Para fazer isso, por favor, clique no botão de validação abaixo. </p>
            <p>Obrigado novamente por sua colaboração e aguardamos sua validação.</p>
            <Button style="cursor: pointer; background: #195BA2; border: none; border-radius: 16px; padding: 16px"><a style="text-decoration: none; color: #fff" href="http://localhost:3000/validation/${results.rows[0].id_assessment}">Clique aqui para realizar a validação</a></Button>
            <p>Atenciosamente, <br/>Equipe Braste</p>
            </div>
  </div>`
      );

      await sendEmail(
        transport,
        "joaovitor.soaresti@gmail.com",
        `<div>
      <div style="background: #195BA2; padding: 10px 16px">
            <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
      </div>
      <div style="padding: 10px 16px">
            <h2 style="color: #195BA2">Olá!</h2>
            <p>Você recentemente realizou uma avaliação de desempenho anual em conjunto com seu gestor.</p>
            <div>
              <p>
                <span style="color: #195BA2; font-weight: bold">Gestor:</span> ${nameManager} <br>
                <span style="color: #195BA2; font-weight: bold">Colaborador:</span> ${nameEmployee} <br>
                <span style="color: #195BA2; font-weight: bold">Data:</span> ${date}
              </p>
              <p style="font-size: 20px;">Seu resultado: <br/>
                <span style="font-size: 36px; color: #195BA2; font-weight: bold">${resultValue}</span>
              </p>
            </div>
            <p>No entanto, notamos que sua avaliação ainda não foi validada. Para garantir a integridade da sua avaliação, é importante que você valide sua avaliação.</p>
            <p>Para fazer isso, por favor, clique no botão de validação abaixo. </p>
            <p>Obrigado novamente por sua colaboração e aguardamos sua validação.</p>
            <Button style="cursor: pointer; background: #195BA2; border: none; border-radius: 16px; padding: 16px"><a style="text-decoration: none; color: #fff" href="http://localhost:3000/validation/${results.rows[0].id_assessment}">Clique aqui para realizar a validação</a></Button>
            <p>Atenciosamente, <br/>Equipe Braste</p>
            </div>
  </div>`
      ); 
      res.status(200).json(results.rows[0].id_assessment);
    }
  );
};

const updateAssessmentStatus = (req, res) => {
  const id = req.params.id;
  const { date, email } = req.body;

  pool.query(
    queries.updateAssessmentStatus,
    [date, email, id],
    (error, results) => {
      if (error) throw error;
      res.status(200);
    }
  );
};

const sendEmail = (transport, email, body) => {
  transport
    .sendMail({
      from: "app@brasterapica.com.br",
      to: email,
      subject: "Validação de Avaliação de Desempenho",
      html: body,
      text: "teste de funcionalidade",
    })
    .then((response) => {
      console.log("Enviado com sucesso!");
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

module.exports = {
  getAssessmentById,
  getAssessmentByManager,
  getAssessmentByUser,
  createAssessment,
  updateAssessmentStatus,
  getAssessmentByDate,
  getAssessmentByDateAndUser,
};
