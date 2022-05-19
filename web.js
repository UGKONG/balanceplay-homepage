const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const conf = require('./config.json');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.listen(8001, () => console.log('server start!!'));