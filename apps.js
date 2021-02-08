const displayFood = document.getElementById('displayFood');
const inputFoodName = document.getElementById('inputFoodName');
const searchBtn = document.getElementById('searchBtn');
const errorArea = document.getElementById('errorArea');
const detailsDiv = document.getElementById('foodDetails');

//search Button 
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    getFoodContain();
})
//Get Food Contain Area
const getFoodContain = getFoodContain => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFoodName.value}`)
        .then(res => res.json())
        .then(data => {
            let previwesHTML = displayFood.innerHTML;
            data.meals.forEach(food => {
                const htmlTemplate = `<div onclick="getSingleArea(${food.idMeal})" class="foodContain">
                                         <img src="${food.strMealThumb}" alt="...">
                                         <h2>${food.strMeal}</h2>
                                        </div>`
                previwesHTML += htmlTemplate;

            })

            displayFood.innerHTML = previwesHTML;
            document.getElementById('inputFoodName').value = '';
        })
        .catch(error => {
            displayFood.style.display = "none";
            errorArea.style.display = "block";
            detailsDiv.style.display = "none";
            inputFoodName.value = '';
        });
};

// single Food Details
const getFoodDetail = singleFood => {
    detailsDiv.innerHTML = `<div class="singleFoodArea">
     <img src="${singleFood.strMealThumb}" alt="">
     <h1>Category : ${singleFood.strCategory}</h1>
     <h5>Ingredient1 : ${singleFood.strIngredient1}</h5>
     <h5>Ingredient2 : ${singleFood.strIngredient2}</h5>
     <h5>Ingredient3 : ${singleFood.strIngredient3}</h5>
     <h5>Ingredient4 : ${singleFood.strIngredient4}</h5>
     <h5>Ingredient5 : ${singleFood.strIngredient5}</h5>
     <h5>Ingredient6 : ${singleFood.strIngredient6}</h5> 
     </div>
     `
}



// single Food Details
const getSingleArea = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
    fetch(url)
        .then(res => res.json())
        .then(data => getFoodDetail(data.meals[0]));
}

