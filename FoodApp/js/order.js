document.addEventListener('DOMContentLoaded', () => {
    const orderHistoryDiv = document.getElementById('orderHistory');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    if (orders.length === 0) {
      orderHistoryDiv.innerHTML = '<p>No orders found.</p>';
    } else {
      orders.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
          <h4>Order ${index + 1} - ${order.date}</h4>
          <p><strong>Email:</strong> ${order.userEmail}</p>
          <p><strong>Address:</strong> ${order.address}</p>
          <ul>
            ${order.items.map(item => `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`).join('')}
          </ul>
          <p><strong>Total: ₹${order.total}</strong></p>
        `;
        orderHistoryDiv.appendChild(orderDiv);
      });
    }
  });
  