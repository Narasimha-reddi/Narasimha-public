document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const renderCart = () => {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      cartItems.innerHTML += `
        <div class="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${item.name} - ₹${item.price}</h3>
          <div class="flex items-center gap-3">
            <button onclick="changeQty(${index}, -1)" class="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1">-</button>
            <span class="text-md font-medium">${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)" class="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1">+</button>
            <span class="ml-auto text-md font-semibold">= ₹${subtotal}</span>
          </div>
        </div>
      `;
    });

    cartTotal.textContent = total;
    localStorage.setItem('cart', JSON.stringify(cart));

    if (cart.length === 0) {
      checkoutBtn.classList.add('opacity-60', 'cursor-not-allowed');
      checkoutBtn.classList.remove('hover:bg-[#218838]');
    } else {
      checkoutBtn.classList.remove('opacity-60', 'cursor-not-allowed');
      checkoutBtn.classList.add('hover:bg-[#218838]');
    }
  };

  window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    renderCart();
  };

  checkoutBtn.addEventListener('click', () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (currentCart.length === 0) {
      alert('Your cart is empty! Add Food items');
    } else {
      window.location.href = 'checkout.html';
    }
  });

  renderCart();
});
