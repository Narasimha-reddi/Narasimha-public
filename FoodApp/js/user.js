document.addEventListener('DOMContentLoaded', () => {
  const foodMenu = document.getElementById('foodMenu');
  const searchInput = document.getElementById('searchInput');
  const foodTypeFilter = document.getElementById('categoryFilter');

  let allFoods = JSON.parse(localStorage.getItem('foods')) || [];

  function displayFoods(foods) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    foodMenu.innerHTML = '';

    if (foods.length === 0) {
      foodMenu.innerHTML = '<p>No food items found.</p>';
      return;
    }

    foods.forEach(food => {
      const inCart = cart.find(item => item.name === food.name);
      const quantity = inCart ? inCart.quantity : 0;

      const foodCard = `
        <div class="food-item" id="food-${food.name}">
          <img src="${food.image}" alt="${food.name}" width="150">
          <h3>${food.name}</h3>
          <p>₹${food.price}</p>
          <p>${food.type === 'veg' ? 'veg' : 'Non-Veg'}</p>
          <div class="cart-controls">
            ${
              quantity > 0
                ? `
                <div class="compact-counter">
                  <button onclick="updateCart('${food.name}', ${food.price}, -1)">−</button>
                  <span>${quantity}</span>
                  <button onclick="updateCart('${food.name}', ${food.price}, 1)">+</button>
                </div>
              `
                : `<button onclick="updateCart('${food.name}', ${food.price}, 1)">ADD</button>`
            }
          </div>
        </div>
      `;
      foodMenu.innerHTML += foodCard;
    });
  }

  function filterFoods() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedType = foodTypeFilter.value;
    const filteredFoods = allFoods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery);
      const matchesType = selectedType === '' || food.type === selectedType;
      return matchesSearch && matchesType;
    });
    displayFoods(filteredFoods);
  }

  searchInput.addEventListener('input', filterFoods);
  foodTypeFilter.addEventListener('change', filterFoods);

  window.filterFoods = filterFoods;

  window.updateCart = (name, price, change) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += change;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    } else if (change > 0) {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayFoods(allFoods);
  };

  window.placeOrder = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = {
      date: new Date().toLocaleString(),
      items: cart,
      total: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    };

    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orders.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orders));
    localStorage.removeItem('cart');

    alert('Your order has been placed successfully!');
    window.location.href = 'orders.html';
  };

  displayFoods(allFoods);
});
