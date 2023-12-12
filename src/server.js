const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
const Pets = require('./models/pets')
const PORT = 8080;

const publicDir = path.join(__dirname, '..', 'public' ) // what is this doing ? // connecting to our server 
const staticAssets = express.static(publicDir) // used for html and css files
app.use(staticAssets) // connects our static page in the 

// app.get('/pets', (req, res) => {
//     res.send({ message: "Hi, this works" });
// })

app.post('/pets', async (req, res) => {
  // const { pet_name, profile_picture, species, is_friendly } = req.body;
  console.log(req.body)
    const newPet = await Pets.create(req.body);
    newPet
   ? res.status(201).send(newPet)
   : res.status(500).send({ error: 'Failed to create a new pet' });
});
  
  app.get('/pets', async (req, res) => {
    const allPets = await Pets.list();
    if (allPets) {
        res.status(200).send(allPets);
    } else {
        res.status(500).send({ error: 'Failed to get any pets' });
    }
  });
  
  app.delete('/pets/:petId', async (req, res) => {
    const petId = req.params.petId;
    const removedPet = await Pets.remove(petId);
  
    if (removedPet) {
      res.send(removedPet);
    } else {
      res.status(404).send({ error: 'Pet not found' });
    }
  });

app.listen(PORT, () => {
    console.log(`This server is running on, http://localhost:${PORT}`);
});