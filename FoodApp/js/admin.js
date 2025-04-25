document.addEventListener('DOMContentLoaded', () => {
  const foodList = document.getElementById('foodList');
  const addFoodForm = document.getElementById('addFoodForm');
  const updateBtn = document.getElementById('updateBtn');

  let foods = JSON.parse(localStorage.getItem('foods')) || [];
  let editIndex = null;

  const renderFoods = () => {
    foodList.innerHTML = '';
    foods.forEach((food, index) => {
      foodList.innerHTML += `
        <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px;">
          <img src="${food.image}" width="100" height="80" style="object-fit: cover;"><br>
          <strong style="display: inline-block; margin-top: 8px;">${food.name}</strong> - ₹${food.price} <br>
          <span style="display: inline-block; margin-top: 4px;">Category: ${food.type}</span> <br><br>
          <button onclick="editFood(${index})" style="background-color: #4CAF50; color: white; border: none; padding: 6px 12px; margin-right: 8px; border-radius: 4px; cursor: pointer;">Edit</button>
          <button onclick="deleteFood(${index})" style="background-color: #f44336; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Delete</button>
        </div>
      `;
    });
  };

  addFoodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('foodName').value;
    const price = document.getElementById('foodPrice').value;
    const category = document.getElementById('foodCategory').value;
    const imageFile = document.getElementById('foodImage').files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result;
      foods.push({ name, price, type: category.toLowerCase(), image });
      localStorage.setItem('foods', JSON.stringify(foods));
      renderFoods();
      addFoodForm.reset();
      alert("Food item added successfully!");
    };
    reader.readAsDataURL(imageFile);
  });

  window.editFood = (index) => {
    const food = foods[index];
    editIndex = index;

    document.getElementById('foodName').value = food.name;
    document.getElementById('foodPrice').value = food.price;
    document.getElementById('foodCategory').value = food.type;
    document.getElementById('foodImage').required = false;

    addFoodForm.querySelector('button[type="submit"]').style.display = 'none';
    updateBtn.style.display = 'inline-block';
  };

  updateBtn.addEventListener('click', () => {
    const name = document.getElementById('foodName').value;
    const price = document.getElementById('foodPrice').value;
    const category = document.getElementById('foodCategory').value;
    const imageFile = document.getElementById('foodImage').files[0];

    const updateAndRender = (image) => {
      foods[editIndex] = { name, price, type: category.toLowerCase(), image };
      localStorage.setItem('foods', JSON.stringify(foods));
      renderFoods();
      addFoodForm.reset();
      updateBtn.style.display = 'none';
      addFoodForm.querySelector('button[type="submit"]').style.display = 'inline-block';
      editIndex = null;
      alert("Food item updated successfully!");
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => updateAndRender(reader.result);
      reader.readAsDataURL(imageFile);
    } else {
      updateAndRender(foods[editIndex].image);
    }
  });

  window.deleteFood = (index) => {
    if (confirm("Are you sure you want to delete this food item?")) {
      foods.splice(index, 1);
      localStorage.setItem('foods', JSON.stringify(foods));
      renderFoods();
      alert("Food item deleted successfully!");
    }
  };

  renderFoods();
});
