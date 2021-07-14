
randomMeal();
favMealGenerator();
let favMealData = [];
let searchedMealData = [];
let Data = {};

function goBack() {
    document.querySelector(".meal-info").style.visibility = "hidden";
    document.querySelector(".mobile-container").style.visibility = "visible";
}

async function randomMeal() {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json()).then(data => {
        document.querySelector(".meal-header").innerHTML = `<img onclick="showInfo(this)" id="rd" class="meal-image" src="${data.meals[0].strMealThumb}" alt="">`;
        Data = data;
        let randomMealName = data.meals[0].strMeal.slice(0, 26);
        document.getElementById("random-mealName").innerHTML = `<h3 class="random-mealName">${randomMealName}</h3>`;
    }).catch(console.log("randomMeal err"));
}

function showInfo(prop) {
    document.querySelector(".meal-info").style.visibility = "visible";
    document.querySelector(".meal-info").style.backgroundColor = "rgb(236, 235, 235)";
    document.querySelector(".meal-info").style.width = "100%";
    document.querySelector(".meal-info").style.height = "100%";
    document.querySelector(".meal-info").style.zIndex = "10";
    document.querySelector(".mobile-container").style.visibility = "hidden";

    let randomData = "";
    let index = 0;

    if (prop.id === "rd") { randomData = Data; }
    else if (prop.id == "fav-meal.fav-list-1") { randomData = favMealData[0] }
    else if (prop.id == "fav-meal.fav-list-2") { randomData = favMealData[1] }
    else if (prop.id == "fav-meal.fav-list-3") { randomData = favMealData[0] }
    else { randomData = searchedMealData; index = parseInt(prop.id); }

    let Ingredients = ``;
    let Measures = ``;
    for (let item in randomData.meals[0]) {
        if ((item.includes("strIngredient")) && (randomData.meals[index][item])) {
            Ingredients += `<li class="info-data">${randomData.meals[index][item]}</li>`
        }
        if ((item.includes("strMeasure")) && (randomData.meals[index][item])) {
            Measures += `<li class="info-data">${randomData.meals[index][item]}</li>`
        }


    }
    document.querySelector(".meal-info").innerHTML = `
             <svg  onclick="goBack()" xmlns="http://www.w3.org/2000/svg" class="icon enlarge icon-tabler icon-tabler-x cross" width="44" height="44" viewBox="0 0 24 24"   stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        <h1 id=".meal-infoName">${randomData.meals[0].strMeal}</h1>
        <image id=".meal-infoImg" src="${randomData.meals[0].strMealThumb}" alt="nothing to show yet"/>
        <h5>Category</h5>
        <p class="info-data">${randomData.meals[0].strCategory}</p>
        <div class="meal-ingredients">
            <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>${Ingredients}</ul>
            </div>
            <div class="measures">
                <h3>Quantity</h3>
                <ul>${Measures}</ul>
            </div>
        </div>
        <h3>Steps</h3>
        <p class="info-data">${randomData.meals[0].strInstructions}</p>
        <p class="info-data">Mix this and that and you are ready</p>
    `
}

function removeFavMeal(data) {
    let id = 0;
    if (data.id == ".fav-list-1") {
        id = 0;
    }
    else if (data.id == ".fav-list-2") {
        id = 1;
    }
    else {
        id = 2;
    }
    favMealData.splice(id, 1);
    fetchMeal(id);

}

function renderFavMeal(prop) {
    let id = 0;
    if (prop == ".fav-list-1") {
        id = 0;
    }
    else if (prop == ".fav-list-2") {
        id = 1;
    }
    else {
        id = 2;
    }
    let name = favMealData[id].meals[0].strMeal.slice(0, 10) + "...";
    document.querySelector(prop).innerHTML = `
        <img onclick="showInfo(this)" class="fav-meal" id="fav-meal${prop}" src="${favMealData[id].meals[0].strMealThumb}" alt="">
        <span class="fav-listName">${name}</span>
            <svg id=${prop} onclick="removeFavMeal(this)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x cross" width="44" height="44" viewBox="0 0 24 24"   stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        `;
}

async function fetchMeal(id = -1) {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json()).then(data => {
        if (id >= 0) {
            const prop = [".fav-list-1", ".fav-list-2", ".fav-list-3"]
            favMealData.splice(id, 0, data);
            renderFavMeal(prop[id]);
        }
    }).catch("fetchMeal err")
}

async function favMeal(prop) {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json()).then(data => {
        favMealData.push(data);
        let name = data.meals[0].strMeal.slice(0, 10) + "...";
        document.querySelector(prop).innerHTML = `
        <img onclick="showInfo(this)" class="fav-meal" id="fav-meal${prop}" src="${data.meals[0].strMealThumb}" alt="">
        <span class="fav-listName">${name}</span>
            <svg id=${prop} onclick="removeFavMeal(this)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x cross" width="44" height="44" viewBox="0 0 24 24"   stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        `;
    }).catch(console.log("favMeal err"))
}

function favMealGenerator() {
    favMeal(".fav-list-1");
    favMeal(".fav-list-2");
    favMeal(".fav-list-3");
}
async function searchMeal(prop) {
    searchedMealData = [];
    await fetch(prop).then(response => response.json()).then(data => {
        let searchedMeals = "";
        if (data.meals == null) {
            searchedMeals = `<div class="searched-meals"><h3>No such meals found.</h3></div>`
        }
        else {
            searchedMealData = data;
            let size = data.meals.length;
            for (let i = 0; i < size; i++) {
                searchedMeals += `<div class="meal-header">
                                <img onclick="showInfo(this)" class="meal-image" id="${i}" src="${data.meals[i].strMealThumb}" alt="">
                                <h3 class="searched-mealName">${data.meals[i].strMeal}</h3>
                                </div>`;
            }
        }
        document.querySelector(".meals").innerHTML = searchedMeals;;
    }).catch("searchMeal err")
    console.log(searchedMealData.meals[0])
}

document.getElementById("search").addEventListener("click", (e) => {
    e.preventDefault();
    let input = document.getElementById("search-input").value;
    let link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    searchMeal(link);
});


