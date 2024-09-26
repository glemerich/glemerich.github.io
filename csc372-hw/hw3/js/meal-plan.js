/*
Name: Garrett Emerich
  Date: 09/25/2024
  CSC 372-01

This is the javascript for the meal-plan page.
*/

document.addEventListener('DOMContentLoaded', function () {
    let mealPlan = [];
    let totalPrice = 0;

    // Add event listeners to "Add" buttons
    const addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const listItem = this.closest('li');
            const dishName = listItem.getAttribute('data-dish');
            const dishPrice = parseFloat(listItem.getAttribute('data-price'));
            addToMealPlan(dishName, dishPrice);
        });
    });

    function addToMealPlan(dishName, dishPrice) {
        const totalAmount = document.getElementById('total-amount');

        // Check if the dish is already in the meal plan
        const existingDish = mealPlan.find(dish => dish.name === dishName);

        if (existingDish) {
            existingDish.quantity++;
        } else {
            mealPlan.push({ name: dishName, price: dishPrice, quantity: 1 });
        }

        totalPrice += dishPrice;
        renderMealPlan();

        // Update the total amount displayed
        totalAmount.textContent = totalPrice.toFixed(2);
    }

    function removeFromMealPlan(dishName) {
        const totalAmount = document.getElementById('total-amount');

        mealPlan = mealPlan.filter(dish => {
            if (dish.name === dishName) {
                totalPrice -= dish.price * dish.quantity;
                return false; 
            }
            return true;
        });

        renderMealPlan();

        // Update the total amount displayed
        totalAmount.textContent = totalPrice.toFixed(2);
    }

    function renderMealPlan() {
        const mealPlanList = document.getElementById('meal-plan-list');
        mealPlanList.innerHTML = '';

        mealPlan.forEach(dish => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${dish.name} - $${dish.price.toFixed(2)} x ${dish.quantity}
                <button class="remove-button" data-dish="${dish.name}">Remove</button>
            `;
            mealPlanList.appendChild(li);
        });

        // Attach event listeners to "Remove" buttons
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const dishName = this.getAttribute('data-dish');
                removeFromMealPlan(dishName);
            });
        });
    }
});
