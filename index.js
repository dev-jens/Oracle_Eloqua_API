const express = require('express');
const axios = require('axios');
const dataJSON = require('./data.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL_V2 = "https://secure.p03.eloqua.com/api/rest/2.0";

const API_URL_V1 = "https://secure.p03.eloqua.com/api/rest/1.0";


const credentials = `${process.env.COMPANY_NAME}\\${process.env.CREDENTIALS_USERNAME}:${process.env.CREDENTIALS_PASS}`;
const base64Credentials = Buffer.from(credentials).toString('base64');

const config = {
  headers: {
    "Authorization": `Basic ${base64Credentials}`,
    "Content-Type": "application/json"
  }
}

app.get("/all-contacts", (req, res) => {
  axios.get(`${API_URL_V2}/data/contacts`, config)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/all-form", (req, res) => {

  axios.get(`${API_URL_V2}/assets/forms`, config)
    .then(response => {
      res.json(response.data);
    }
    ).catch(error => {
      console.log(error);
    });
});

app.get("/formById/:id", (req, res) => {

  const { id } = req.params;
  axios.get(`${API_URL_V2}/assets/form/${id}`, config)
    .then(response => {
      res.json(response.data);
    }
    ).catch(error => {
      console.log(error);
    });
});


app.post("/postForm/:id", (req, res) => {

  data = dataJSON.form_data[0];
  const { id } = req.params;

  axios.post(`${API_URL_V2}/data/form/${id}`, data, config)
    .then(response => {
      res.json(response.status);
      res.json({ "response": "success" });
    }
    ).catch(error => {
      res.json({
        status: error.response.status,
        statusText: error.response.statusText
      });
    }
    );
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
