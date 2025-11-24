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
    searchitemdisplay.appendChild(card);
  });
});
  

