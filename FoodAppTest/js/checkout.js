document.addEventListener('DOMContentLoaded', () => {
  const orderSummary = document.getElementById('orderSummary');
  const shippingForm = document.getElementById('shippingForm');
  const addressInput = document.getElementById('address');
  const phoneInput = document.getElementById('phone');
  const savedAddressesDropdown = document.getElementById('savedAddresses');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  let total = 0;

  if (cart.length > 0) {
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      const itemRow = document.createElement('div');
      itemRow.className = 'flex justify-between mb-2 text-gray-700';
      itemRow.innerHTML = `<span>${item.name} x ${item.quantity}</span><span>₹${subtotal}</span>`;
      orderSummary.appendChild(itemRow);
    });

    const totalRow = document.createElement('div');
    totalRow.className = 'flex justify-between mt-4 pt-4 border-t text-lg font-semibold text-black';
    totalRow.innerHTML = `<span>Total:</span><span>₹${total}</span>`;
    orderSummary.appendChild(totalRow);
  } else {
    orderSummary.innerHTML = `<p class="text-center text-gray-500">Your cart is empty.</p>`;
  }

  const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
  savedAddresses.forEach(address => {
    const option = document.createElement('option');
    option.value = JSON.stringify(address);
    option.textContent = `${address.address} (${address.phone})`;
    savedAddressesDropdown.appendChild(option);
  });

  savedAddressesDropdown.addEventListener('change', () => {
    const selectedValue = savedAddressesDropdown.value;
    if (selectedValue) {
      const selectedAddress = JSON.parse(selectedValue);
      addressInput.value = selectedAddress.address;
      phoneInput.value = selectedAddress.phone;
    } else {
      addressInput.value = '';
      phoneInput.value = '';
    }
  });

  shippingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (total === 0) {
      alert('Your cart is empty. Cannot place the order!');
      return;
    }

    const address = addressInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!address || !phone) {
      alert('Please enter a valid address and phone number.');
      return;
    }

    const alreadyExists = savedAddresses.some(a => a.address === address && a.phone === phone);
    if (!alreadyExists) {
      savedAddresses.push({ address, phone });
      localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
      userEmail: user?.email || 'guest',
      items: cart,
      total,
      address,
      phone,
      date: new Date().toLocaleString()
    });

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');

    alert('Order placed successfully!');
    window.location.href = 'orders.html';
  });
});
