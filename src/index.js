
let addToy = false
let TOYS_URL = "http://localhost:3000/toys"
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }

  })
fetchToyData()
addNewToyForm()
})


function addNewToyForm(){
  let fo = document.getElementsByClassName("add-toy-form")
  let form = fo[0]
  console.log("form", form)
  form.addEventListener("submit", ev =>{
    ev.preventDefault()

    let newToy = document.getElementsByClassName("input-text")
    console.log(newToy)
    let newToyName = newToy.name.value
    let newToyImage = newToy.image.value
    console.log(newToyName, newToyImage)

    return fetch(TOYS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImage,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(toy => {
      let toyElement = createToy(toy)
      let toyCollection = document.getElementById("toy-collection")
      toyCollection.prepend(toyElement)
    })
  })
}

function fetchToyData(){
    console.log("Fetch Function")
  return fetch(TOYS_URL)
    .then (res => res.json())
    .then (json => displayToy(json))
}

function displayToy (toyArray) {
  let toyCollection = document.getElementById("toy-collection")
  toyArray.forEach(toy =>{
    let em = createToy(toy)
    toyCollection.append(em)
    console.log("IN DIsplay toy")
  })
}

function createToy(toy){
  let toyId = toy.id
  console.log("TOY ID:", toy.id)
  let toyDiv = document.createElement("div")
  let toyH2 = document.createElement("h2")
  let toyImage = document.createElement("img")
  let toyP = document.createElement("p")
  toyP.id = "likeCounts"
  let toyButton = document.createElement("button")
  toyButton.setAttribute("id", "likeButton")

  console.log("In  Create Toy", toy)
  toyH2.textContent = toy['name']
  console.log("toy  name", toy.name)
  toyImage.src = toy.image
  toyP.textContent = toy.likes + " Likes"
  toyButton.textContent = "Likes"

  toyDiv.append(toyH2, toyImage, toyP, toyButton)
  console.log("toyDiv", toyDiv)


  toyButton.addEventListener('click', () =>{
     toyP.textContent = (toy.likes++) + " Likes"
  })

  return toyDiv
}


