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
        <div class="bg-white rounded-[10px] p-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center flex flex-col items-center transition-transform hover:scale-[1.03]" id="food-${food.name}">
          <img src="${food.image}" alt="${food.name}" class="w-full max-w-[200px] h-[150px] object-cover rounded-[8px] mb-[15px]">
          <h3 class="text-[18px] mb-1 text-[#333] font-semibold">${food.name}</h3>
          <p class="text-[16px] font-bold text-[#4CAF50] my-2">₹${food.price}</p>
          <p class="text-[16px] text-[#333] font-semibold">${food.type === 'veg' ? 'Veg' : 'Non-Veg'}</p>
          <div class="mt-2">
            ${
              quantity > 0
                ? `
                <div class="inline-flex items-center justify-between border border-[#ccc9c9] rounded-[10px] bg-white overflow-hidden">
                  <button class="bg-[#cfcdcc] text-white border-0 py-1 px-2 text-[16px] font-bold cursor-pointer w-[30px]" onclick="updateCart('${food.name}', ${food.price}, -1)">−</button>
                  <span class="px-2 text-[16px] text-[#333] font-bold">${quantity}</span>
                  <button class="bg-[#cfcdcc] text-white border-0 py-1 px-2 text-[16px] font-bold cursor-pointer w-[30px]" onclick="updateCart('${food.name}', ${food.price}, 1)">+</button>
                </div>
                `
                : `<button class="bg-[#ff6b6b] hover:bg-[#e65c5c] text-white py-2 px-4 border-0 rounded-md cursor-pointer mt-2" onclick="updateCart('${food.name}', ${food.price}, 1)">ADD</button>`
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
