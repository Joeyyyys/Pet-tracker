// const { query } = require("express");

console.log("frontend")

fetch('/api/pets')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

const createPetCard = (pet) => {
    const cardContainer = document.createElement('li');
    cardContainer.id = 'pet-card';
  
    const petName = document.createElement('h3');
    petName.textContent = `Name: ${pet.pet_name}`;
  
    const petImage = document.createElement('img');
    petImage.src = pet.profile_picture;
    petImage.alt = `Image of ${pet.pet_name}`;
  
    const petSpecies = document.createElement('p');
    petSpecies.textContent = `Species: ${pet.species}`;
  
    const isFriendly = document.createElement('p');
    isFriendly.textContent = `Is Friendly: ${pet.is_friendly ? 'Yes' : 'No'}`;
  
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      cardContainer.remove();
    });
  
    cardContainer.appendChild(petName);
    cardContainer.appendChild(petImage);
    cardContainer.appendChild(petSpecies);
    cardContainer.appendChild(isFriendly);
    cardContainer.appendChild(removeButton);
  
    return cardContainer;
  };
  

  const createPetCardList = (pets) => {
    const cardListContainer = document.querySelector('#pet-list-unordered');
    cardListContainer.innerHTML = ''; 
  
    pets.forEach((pet) => {
      const petCard = createPetCard(pet);
      cardListContainer.appendChild(petCard);
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e)
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData)
    console.log("formEntries", obj)

    try {
    const response = await fetch('/api/pets', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });

    if (response.ok) {
        const petsData = await response.json();
        createPetCardList(petsData);
      console.log("Pet added successfully.");
    } else {
      console.error("Failed to add a new pet.");
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }

  e.target.reset(); // to clear forms after submission

};

const main = () => {
    const petForm = document.querySelector("#pet-form")
    petForm.addEventListener('submit', handleSubmit)
};

main();