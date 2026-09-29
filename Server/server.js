const { json } = require('body-parser');
const express = require('express');
const app = express();

app.use(json());



app.listen(3000, () => {
    console.log("Server is running.....")
})