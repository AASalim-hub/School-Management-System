
const express = require('express');
const app = express();


app.get("/", (req, res) => {
    res.send("School Management System API")
})



app.listen(3000, () => {
    console.log("Server is running.....")
})