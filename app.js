const fetchData = "https://www.themealdb.com/api/json/v1/1/";

const CATEGORY_API = fetchData + "categories.php";
const SEARCH_API = fetchData + "search.php?s=";
const DETAILS_API = fetchData + "lookup.php?i=";
const FILTER_BY_CATEGORY_API = fetchData + "filter.php?c=";
// let data = [];

console.log(CATEGORY_API);
console.log(SEARCH_API + 'Beef')
console.log(FILTER_BY_CATEGORY_API+'chicken');
console.log(DETAILS_API+53099);

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
      displaydescription(item.strCategory,item.strCategoryDescription) //click on particur category display that category
      // console.log( item.strCategory);
      filterByCategory(item.strCategory);  //same functionality for side bar category 
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
  console.log(category);

  menulist.innerHTML=''
  category.forEach(item => {
    let list=document.createElement('li');
    list.textContent=item.strCategory
    list.addEventListener('click',()=>{
      sidebar.classList.remove('active')
      displaydescription(item.strCategory,item.strCategoryDescription) //same as home productafter clicking on sider bar display first description of item passing name and description
      filterByCategory(item.strCategory) //then its category will display
    })
    menulist.appendChild(list)
  });
}
menubar();