const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
const port = 2121;

MAX_SIZE = (1024 * 1024 * 1024)/2 // 0,5 GB

// Configuração do Multer para salvar os arquivos no diretório 'uploads'
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: MAX_SIZE /* bytes */ }
  })

// Página inicial com formulário de upload
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para manipular o upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Success');
});

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(__dirname + '/public'));

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});
