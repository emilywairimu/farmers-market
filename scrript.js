// Get all the tab panes and buttons
const tabPanes = document.querySelectorAll('.tab-pane');
const tabButtons = document.querySelectorAll('.icons a');

const form = document.querySelector('.search-form');
const searchField = form.querySelector('#search-field');

const resultsContainer = document.getElementById("row");
const resultsSearchContainer = document.getElementById("rowsearch");
const loadingText = document.getElementById("loading-text");
const loadingTextSearch = document.getElementById("loading-text-search");
const imageContainer = document.getElementById("image-container");

const cartContainer = document.getElementById("cart-container");
loadingTextSearch.style.display = "none";

const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");
// Add event listeners to the buttons
tabButtons.forEach((button, index) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // prevent the default behavior of the link

    // Remove the 'active' class from all tab panes and buttons
    tabPanes.forEach((pane) => pane.classList.remove('active'));
    tabButtons.forEach((button) => button.classList.remove('active'));

    // Add the 'active' class to the clicked tab pane and button
    tabPanes[index].classList.add('active');
    button.classList.add('active');
  });
});




form.addEventListener('submit', (event) => {
    loadingTextSearch.style.display = "block";
  event.preventDefault();
   
  if (searchField.value.trim() === '') {
    searchField.classList.add('is-invalid');
    searchField.nextElementSibling.style.display = 'block';
  } else {

        // Get the input value
        const ingredient = searchField.value;

        // Send the GET request using fetch()
        fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=4093876a&app_key=d102e53a50656763ead0c138c3b704d1&ingr=${ingredient}&nutrition-type=cooking`)
            .then(response => response.json()) // parse the response as JSON
            .then(data => {
            // Update the HTML with the data
            loadingTextSearch.style.display = "none";
            const hints = data.hints;
            resultsSearchContainer.innerHTML = "";
            for (let i = 0; i < hints.length; i++) {
              const price = Math.floor(Math.random() * 1981) + 20; // Generate random price between 20 and 2000
              // Iterate through each item and generate HTML
                  data.hints.forEach(item => {
                      item.food.price = price;
                      // Generate HTML for item
                      let itemHtml = `
                      <div class="col">
                      <div class="item">
                          <img src="${item.food.image}" alt="${item.food.label}">
                          <h3>${item.food.label}</h3>
                          <p>Price: ${item.food.price}/-</p>
                          <button class="add-to-cart">Add to Cart</button>
                      </div>
                      </div>
                      `;
                      // Add the HTML to the results container
                      resultsSearchContainer.insertAdjacentHTML("beforeend", itemHtml);
                  });
          
          
            }

            
            })
            .catch(error => {
                console.error(error);
                alert('Error fetching data');
            });


  }
});

searchField.addEventListener('input', () => {
  if (searchField.value.trim() !== '') {
    searchField.classList.remove('is-invalid');
    searchField.nextElementSibling.style.display = 'none';
  }
});

function addRandomPrice(food) {
    food.price = Math.floor(Math.random() * 1980 + 20);
    console.log(food.price); // check if price is undefined
    food.price = food.price.toFixed(2);
    return food;
  }

let cart = [];



fetch('https://api.edamam.com/api/food-database/v2/parser?app_id=4093876a&app_key=d102e53a50656763ead0c138c3b704d1&nutrition-type=cooking', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  // Remove loading text and display results
  loadingText.style.display = "none";
  const hints = data.hints;
  for (let i = 0; i < hints.length; i++) {
    const price = Math.floor(Math.random() * 1981) + 20; // Generate random price between 20 and 2000
    // Iterate through each item and generate HTML
        data.hints.forEach(item => {
            item.food.price = price;
            // Generate HTML for item
            let itemHtml = `
            <div class="col">
            <div class="item">
                <img src="${item.food.image}" alt="${item.food.label}">
                <h3>${item.food.label}</h3>
                <p>Price: ${item.food.price}/-</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
            </div>
            `;
            // Add the HTML to the results container
            resultsContainer.insertAdjacentHTML("beforeend", itemHtml);
        });


  }

  // Select all the "Add to Cart" buttons
let addToCartButtons = document.querySelectorAll(".add-to-cart");
console.log(addToCartButtons);
// Attach event listener to each button
addToCartButtons.forEach((button, itemIndex) => {
  button.addEventListener("click", event => {
    // Get the item that was clicked
    let item = data.hints[itemIndex];
    // Add the item to the cart
    cart.push(item);
    // Update the cart display
    updateCartDisplay();
  });
});

//   resultsContainer.innerHTML = JSON.stringify(data);
})
.catch(error => console.error(error));



// Function to update the cart display
function updateCartDisplay() {
  // Get the cart container


  console.log(cart);
  // Generate HTML for the cart items
  let cartHtml = "";
  cart.forEach(item => {
    cartHtml += `
    <div class="box">
  
    <div class="content">
      <img src="${item.food.image}" alt="${item.food.label}">
      <h3>${item.food.label}</h3>
      <span class="category">${item.food.category}</span>
      <span class="unit">lb/</span>
    </div>
      </div>
    `;
  });

  // Display the cart items in the cart container
cartContainer.innerHTML = cartHtml;
}


checkoutBtn.addEventListener("click", function() {
    checkoutForm.classList.remove("hidden");
  });
