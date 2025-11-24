const fetchData = "https://www.themealdb.com/api/json/v1/1/";

const CATEGORY_API = "https://www.themealdb.com/api/json/v1/1/categories.php";
const SEARCH_API =  "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const DETAILS_API = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const FILTER_BY_CATEGORY_API =  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
// let data = [];

// console.log(CATEGORY_API);
// console.log(SEARCH_API + 'Beef')
// console.log(FILTER_BY_CATEGORY_API+'chicken');
// console.log(DETAILS_API+53099);

async function products() {
  let pr = await fetch(CATEGORY_API);
  let res = await pr.json();
  let data = res.categories;

  let product = document.getElementById('product');
  product.innerHTML = ''; 

  data.forEach((item) => {
    let card = document.createElement('div');
    card.className = 'card col-12 col-md-6 col-lg-3 m-lg-3 p-2 text-center text-white';
    card.innerHTML = `
      <p class="fw-light rounded px-2 py-1 fs-6 fs-md-5 fs-lg-4">${item.strCategory}</p>
      <img src="${item.strCategoryThumb}" alt="${item.strCategory}" class="img1 pb-1 rounded">
    `;
    card.addEventListener('click', () => {
      displaydescription(item.strCategory,item.strCategoryDescription)
      filterByCategory(item.strCategory); 
    });
    product.appendChild(card);
  });
}
products();



let menubtn=document.getElementById('menubtn')
let sidebar=document.getElementById('sidebar')
let closebar=document.getElementById('close')
let menulist=document.getElementById('menulist')

menubtn.addEventListener('click',()=>{
  sidebar.classList.add('active')
})
closebar.addEventListener('click',()=>{
  sidebar.classList.remove('active')
})

async function menubar(){
  let res=await fetch(CATEGORY_API);
  let data= await res.json();
  let category=data.categories
  // console.log(category);

  menulist.innerHTML=''
  category.forEach(item => {
    let list=document.createElement('li');
    list.textContent=item.strCategory
    list.addEventListener('click',()=>{
      sidebar.classList.remove('active')
      displaydescription(item.strCategory,item.strCategoryDescription) 
      filterByCategory(item.strCategory) 
    })
    menulist.appendChild(list)
  });
}
menubar();

// seraching 

// async function searchitem(item){
//  let res= await fetch(SEARCH_API+item)
//  let data = await res.json()
//  return data
 
// }

// // let input=document.getElementById('input').value.trim()
// let btn=document.getElementById('searchbtn')
// let searchitemdisplay=document.getElementById('searchitemdisplay')
// btn.addEventListener('click',async ()=>{
//   let input=document.getElementById('input').value.trim()
//  let res= await  searchitem(input)
 
//  let ar=res.meals;
//  searchitemdisplay.innerHTML='';
//  ar.forEach((item)=>{
//    let card = document.createElement('div');
//     card.className = 'card col-12 col-md-6 col-lg-3 m-lg-3 p-2 text-center text-white';
//     card.innerHTML = `
//       <img src="${item.strMealThumb}" alt="${item.strMeal}" class="img1 pb-1 rounded">
//       <p class="fw-light rounded px-2 py-1 fs-6 fs-md-5 fs-lg-4">${item.strMeal}</p>
//     `;

//     // card.addEventListener('click',()=>{
//     //   detailsitem(item.idMeal)
//     // })
    
//   searchitemdisplay.appendChild(card)
//  })
 
// })
// food details
// async function detailsitem(item) {
//   let res=await fetch(DETAILS_API+item)
//   let data = await res.json()
//   console.log(data);
  
// }

async function searchitem(item) {
  let res = await fetch(SEARCH_API + item);
  let data = await res.json();
  return data;
}

let btn = document.getElementById('searchbtn');
let searchitemdisplay = document.getElementById('searchitemdisplay');
let Meald=document.getElementById('meal')

btn.addEventListener('click', async () => {

  let input = document.getElementById('input').value.trim();

  // CASE 1: Input empty
  if (input === "") {
    searchitemdisplay.innerHTML = `
      <p class="text-white fs-5 text-center"> Please enter a search item</p>
    `;
    return;  // stop execution
  }

  let res = await searchitem(input);
  let ar = res.meals;

  // CASE 2: No results
  if (!ar) {
    searchitemdisplay.innerHTML = `
      <p class="text-white fs-5 text-center"> No items found for "<b>${input}</b>"</p>
    `;
    return;
  }

  // CASE 3: Display items
  searchitemdisplay.innerHTML = "";
  ar.forEach((item) => {
    let card = document.createElement("div");
    card.className =
      "card col-12 col-md-6 col-lg-3 m-lg-3 p-2 text-center text-white";
    card.innerHTML = `
      <img src="${item.strMealThumb}" alt="${item.strMeal}" class="img1 pb-1 rounded">
      <p class="fw-light rounded px-2 py-1 fs-6 fs-md-5 fs-lg-4">${item.strMeal}</p>
    `;
    card.addEventListener('click',()=>{
          detailsAboutpaticularitem(item.idMeal)
    })
    searchitemdisplay.appendChild(card);
  });
});
  

function displaydescription(name,discription){
  Meald.innerHTML=`<div class="border border-secondary p-3">
  <h2 class='text-danger'>${name}</h2>
  <p class="p-3 text-white fw-lg fs-xl">${discription}</p>
  </div>
  `
}
function displaymeals(meals) {
  searchitemdisplay.innerHTML = ''; 
  // Meald.innerText='MEAL';
  //document.getElementById('mealheading').innerText='MEAL'
  meals.forEach(meal => {
    let cards = document.createElement('div');
    cards.className = 'col-12 col-md-6 col-lg-3 m-lg-3 shadow-lg bg-body-tertiary rounded';
    cards.innerHTML += `
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}' class='img1 pb-1'>
      <h5 class='text-dark text-center fw-semi-bold'>${meal.strMeal}</h5>
    `;
    cards.addEventListener('click', () => {
      Meald.innerHTML=' ';
      detailsAboutpaticularitem(meal.idMeal); //paticular item will display with full information 
    });

    searchitemdisplay.appendChild(cards);
  });
}


async function filterByCategory(category) {
  const res = await fetch(FILTER_BY_CATEGORY_API + category);
  const data = await res.json();
  displaymeals(data.meals);
}

// displaying last and particular item
async function detailsAboutpaticularitem(item){
   let res= await fetch(DETAILS_API+item)
   let data =await res.json()
   let meal=data.meals[0]
   displayParticularItem(meal)
}
function displayParticularItem(item) {

  let ingredientslist = '';
  for (let i = 1; i <= 20; i++) {
    let ingredient = item[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredientslist += `<li class="list-group-item border-0 bg-transparent">${ingredient}</li>`;
    }
  }

  let measurementlist = '';
  for (let i = 1; i <= 20; i++) {
    let measurement = item[`strMeasure${i}`];
    if (measurement && measurement.trim() !== '') {
      measurementlist += `
        <li class="list-group-item border-0 bg-transparent">
          <i class="fa-solid fa-spoon text-danger me-2"></i> ${measurement}
        </li>`;
    }
  }
  let instructionList = '';
  if (item.strInstructions && item.strInstructions.trim() !== '') {
    let steps = item.strInstructions.split('.').filter(step => step.trim() !== '');
    instructionList = steps.map(step => `<li>${step.trim()}.</li>`).join('');
  } else {
    instructionList = '<li>No instructions found.</li>';
  }

  searchitemdisplay.innerHTML = `
    <div class="bgorange d-flex align-items-center mb-3 rounded">
      <i class="fa-solid fa-house text-white fs-4 me-2"></i>
      <h4 class="text-white px-3 py-2 rounded mb-0">${item.strMeal}</h4>
    </div>

    <h3 class="text-white  py-2 fw-bold border-bottom-danger">Meal Details</h3>

    <div class="row bg-light rounded shadow p-4 mt-3">
      <div class="col-md-5 text-center">
        <img src="${item.strMealThumb}" class="img-fluid rounded border border-3 shadow-sm" alt="${item.strMeal}">
      </div>

      <div class="col-md-7">
        <h3 class="text-danger border-bottom pb-2">${item.strMeal}</h3>
        <p><strong>Category:</strong> ${item.strCategory}</p>
        <p><strong>Area:</strong> ${item.strArea}</p>
        <p><strong>Source:</strong> 
          <a href="${item.strSource}" target="_blank" class="text-primary text-decoration-none">
            ${item.strSource}
          </a>
        </p>
        <p class="bg-secondary-emphasis p-2 "><strong class='text-dander p-2 border-dark rounded'>Tags:</strong>${item.strTags}</p>
      </div>
      <div class="col-12 mt-4">
        <div class="row">
          <div class="col-md-6">
            <h5 class="text-dark p-2 fw-bold">Ingredients</h5>
            <ol class="list-group list-group-numbered">
              ${ingredientslist}
            </ol>
          </div>
          <div class="col-md-6">
            <h5 class="text-dark p-2 fw-bold">Measurements</h5>
            <ul class="list-group">
              ${measurementlist}
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4">
        <h5 class="text-dark fw-bold p-2">Instructions</h5>
        <ol class="ps-3">
          ${instructionList}
        </ol>
      </div>
    </div>
  `;
}