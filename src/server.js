const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 8080;

const publicDir = path.join(__dirname, '..', 'public' ) // what is this doing ? // connecting to our server 
const staticAssets = express.static(publicDir) // used for html and css files
app.use(staticAssets) // connects our static page in the 

app.get('/pets', (req, res) => {
    res.send({ message: "Hi, this works" });
})

app.listen(PORT, () => {
    console.log(`This server is running on, http://localhost:${PORT}`);
});