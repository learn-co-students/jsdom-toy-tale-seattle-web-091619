let addToy = false
const TOY_URL = "http://localhost:3000/toys"




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
  fetchData()

  document.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target[0].value
    let image = event.target[1].value
  
    addNewToy(name, image);
  });
})

function fetchData(){
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => readJson(json))

}

function readJson(json){



  for(let i = 0; i < json.length; i++){
    const name = json[i].name
    const imgTag = json[i].image
    const likes = json[i].likes
    const id = json[i].id
  
      appendToy(name, imgTag, likes, id)



  }

}

function appendToy(name, imgTag, likes, id) {
  const toyCollection = document.getElementById("toy-collection")
  const toy = document.createElement('div')
    toy.className = "card"

  const h2 = document.createElement('h2')
  h2.innerText = name
  toy.appendChild(h2)

  const img = document.createElement('img')
  img.src = imgTag
  img.className = 'toy-avatar'
  toy.appendChild(img)


  const p = document.createElement('p')
  p.innerText = `${likes} Likes`

  toy.appendChild(p)


  const button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"
  toy.appendChild(button)
  
  button.addEventListener('click', function(event) {
    event.preventDefault();
    likes++
    p.innerText = `${likes} Likes`
    incrementLikes(id, likes);
  })

  toyCollection.appendChild(toy)
}


//   <div class="container">
//   <form class="add-toy-form" style="">
//     <h3>Create a toy!</h3>

//     <input type="text" name="name" value="" placeholder="Enter a toy's name..." class="input-text">
//     <br>
//     <input type="text" name="image" value="" placeholder="Enter a toy's image URL..." class="input-text">
//     <br>
//     <input type="submit" name="submit" value="Create New Toy" class="submit">
//   </form>
// </div>

function addNewToy(name, image){

  let input1 = document.getElementsByName('name').innerHTML

  fetch(TOY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
  const toyCollection1 = document.getElementById("toy-collection").children.length
  console.log(toyCollection1)
  appendToy(name, image, 0)

}


function incrementLikes(id, likes){

  const PATCH_URL = `http://localhost:3000/toys/${id}`

  likes++



fetch(PATCH_URL, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    "id": id,
    "likes": likes
  })
})



}

