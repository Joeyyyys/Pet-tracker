console.log("frontend")

fetch('/pets')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

const main = async () => {
  const petForm = document.querySelector("#pet-form")
  petForm.addEventListener('submit', handleSubmit)
};

main();
