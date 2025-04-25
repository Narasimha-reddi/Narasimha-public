document.addEventListener('DOMContentLoaded', () => {
  const orderSummary = document.getElementById('orderSummary');
  const shippingForm = document.getElementById('shippingForm');
  const addressInput = document.getElementById('address');
  const phoneInput = document.getElementById('phone');
  const savedAddressesDropdown = document.getElementById('savedAddresses');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    orderSummary.innerHTML += `<p>${item.name} x ${item.quantity} = ₹${subtotal}</p>`;
  });

  orderSummary.innerHTML += `<strong>Total: ₹${total}</strong>`;

  const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
  savedAddresses.forEach(address => {
    const option = document.createElement('option');
    option.value = address.address;
    option.textContent = `${address.address} (${address.phone})`;
    savedAddressesDropdown.appendChild(option);
  });

  savedAddressesDropdown.addEventListener('change', () => {
    const selected = savedAddresses.find(a => a.address === savedAddressesDropdown.value);
    if (selected) {
      addressInput.value = selected.address;
      phoneInput.value = selected.phone;
    } else {
      addressInput.value = '';
      phoneInput.value = '';
    }
  });

  shippingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (total === 0) {
      alert('Your cart is empty cannot place the order!');
      return;
    }

    const address = addressInput.value;
    const phone = phoneInput.value;

    const alreadyExists = savedAddresses.some(a => a.address === address && a.phone === phone);
    if (!alreadyExists) {
      savedAddresses.push({ address, phone });
      localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
      userEmail: user.email,
      items: cart,
      total,
      address,
      phone,
      date: new Date().toLocaleString()
    });

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    alert('Order placed!');
    window.location.href = 'orders.html';
  });
});
