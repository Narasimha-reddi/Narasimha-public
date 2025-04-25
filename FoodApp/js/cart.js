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
        <div>
          <h3>${item.name} - ₹${item.price}</h3>
          <p>
            <button onclick="changeQty(${index}, -1)">-</button>
            ${item.quantity}
            <button onclick="changeQty(${index}, 1)">+</button>
            = ₹${subtotal}
          </p>
        </div>
      `;
    });

    cartTotal.textContent = total;
    localStorage.setItem('cart', JSON.stringify(cart));
    checkoutBtn.style.opacity = cart.length === 0 ? '0.6' : '1';
    checkoutBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
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
