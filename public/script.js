console.log("frontend")

// combine the fetch so that we know what data is, and then use that data to create the dom cards
fetch('/pets')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

const cardDOM = (data) => {
const { pet_name, profile_picture, species, is_friendly } = data
console.log("data", data)
const ul = document.querySelector("#pet-list-unordered");
const li = document.createElement("li");

const petName = document.createElement("h3");
petName.textContent = `Name: ${pet_name}`;

const petPic = document.createElement("img");
petPic.src = `${profile_picture}`;

const petSpecies = document.createElement("p");
petSpecies.textContent = `Species: ${species}`;

const petFriendly = document.createElement("p");
petFriendly.textContent = `Friendly? ${is_friendly}`;

const removeBtn = document.createElement("button")
removeBtn.classList.add('removeButton')
removeBtn.textContent = 'Remove Pet'

li.appendChild(petName);
li.appendChild(petPic);
li.appendChild(petSpecies);
li.appendChild(petFriendly);
li.appendChild(removeBtn)
ul.appendChild(li);

}

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData)
    console.log("formEntries", obj);
    fetch('/pets', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(data => cardDOM(data))
  .catch(error => console.error("Error", error))


  e.target.reset()
}

const main = async () => {
  const petForm = document.querySelector("#pet-form")
  petForm.addEventListener('submit', handleSubmit)
};

main();
