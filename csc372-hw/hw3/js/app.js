/*
Name: Garrett Emerich
  Date: 09/25/2024
  CSC 372-01

This is the javascript for the index page.
*/


document.addEventListener('DOMContentLoaded', function () {
    const dishes = document.querySelectorAll('.dish');

    dishes.forEach(dish => {
        dish.addEventListener('click', function () {
            const dishId = dish.getAttribute('data-dish');
            toggleDishSize(dishId);
        });
    });
});

function toggleDishSize(dishId) {
   //get image and description
    const clickedDish = document.querySelector(`.dish[data-dish="${dishId}"] img`);
    const selectedDescription = document.querySelector(`.dish-description[data-description="${dishId}"]`);

    //check if image is large and if so make it small
    if (clickedDish.classList.contains('large-image')) {
        clickedDish.classList.remove('large-image');
        clickedDish.classList.add('small-image');
        selectedDescription.style.display = 'none';
    } else {
        const images = document.querySelectorAll('.dish img');
        const descriptions = document.querySelectorAll('.dish-description');
        
        images.forEach(img => {
            img.classList.remove('large-image');
            img.classList.add('small-image');
        });
        descriptions.forEach(desc => {
            desc.style.display = 'none';
        });

        // enlarge clicked image and show description
        clickedDish.classList.remove('small-image');
        clickedDish.classList.add('large-image');
        selectedDescription.style.display = 'block';
    }
}
