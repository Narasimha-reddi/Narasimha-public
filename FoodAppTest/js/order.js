document.addEventListener('DOMContentLoaded', () => {
  const orderHistoryDiv = document.getElementById('orderHistory');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (orders.length === 0) {
    orderHistoryDiv.innerHTML = '<p class="text-center text-gray-600 col-span-2">No orders found.</p>';
  } else {
    orders.forEach((order, index) => {
      const orderDiv = document.createElement('div');
      orderDiv.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';

      orderDiv.innerHTML = `
        <h4 class="text-lg font-semibold mb-3">Order ${index + 1} - ${order.date}</h4>
        <p class="text-sm mb-1"><strong>Email:</strong> ${order.userEmail}</p>
        <p class="text-sm mb-3"><strong>Address:</strong> ${order.address}</p>
        
        <ul class="space-y-1 text-sm text-gray-700 mb-4">
          ${order.items.map(item => `
            <li class="flex justify-between">
              <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
              <span>₹${item.price * item.quantity}</span>
            </li>
          `).join('')}
        </ul>

        <p class="text-right font-bold text-lg text-gray-800">Total: ₹${order.total}</p>
      `;

      orderHistoryDiv.appendChild(orderDiv);
    });
  }
});
