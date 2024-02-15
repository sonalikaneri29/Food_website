const searchbox =document.querySelector('.searchbox');
const searchbtn =document.querySelector('.searchbtn');
const recipecontainer =document.querySelector('.recipe-container');
const recipeDetailscontent= document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn')

const fetchRecipes= async(query)=>{
    // recipecontainer.innerHTML="<h2>Fetching Recipes....</h2>";

    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response=await data.json();



        recipecontainer.innerHTML="";
        response.meals.forEach(meal=>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML =`
        <img src="${meal.strMealThumb}" alt="Meal Image">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> cetegory</p>

       
       
       `
        const button=document.createElement('button');
        button.textContent='View Recipe';
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            opneRecipePopup(meal);
        });
       recipecontainer.appendChild(recipeDiv)
    });
    }
    catch(error){
        recipecontainer.innerHTML="<h2>Error in Fetching Recipes....</h2>";
    };

    
};


//function to fetch ingredent and measurement
const fetchIngredients=(meal)=>{
    let ingredientslist="";
    for(let i=1; i<=20; i++){
        const ingredient= meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientslist+=`<li>${measure} ${ingredient}</li>`

        }else{
            break;
        }
    }
    return ingredientslist;
}


const opneRecipePopup=(meal)=>{
    recipeDetailscontent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredints:</h3>
        <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p ">${meal.strInstructions}</p>
        </div>



    `
        
    
    recipeDetailscontent.parentElement.style.display="block";
}
















recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailscontent.parentElement.style.display="none";
})











searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML=`<h2>......type the meal in the search box.......</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("button clicked");
});
