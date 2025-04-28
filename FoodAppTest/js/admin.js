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
        <div class="food-item bg-white border border-gray-300 p-[10px] rounded-[8px] text-center shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
          <img src="${food.image}" class="w-full h-[150px] object-cover mb-2 rounded-[5px]">
          <strong class="block text-[16px] font-semibold">${food.name}</strong>
          <span class="block text-[14px] text-gray-600">₹${food.price}</span>
          <span class="block text-[14px] text-gray-500 mb-3">Category: ${food.type}</span>
          <button onclick="editFood(${index})" class="bg-[#3498db] text-white py-2 px-4 rounded-[5px] text-[14px] mb-2 hover:bg-[#2980b9]">
            Edit
          </button>
          <button onclick="deleteFood(${index})" class="bg-[#f44336] text-white py-2 px-4 rounded-[5px] text-[14px] mb-2 hover:bg-[#d32f2f]">
            Delete
          </button>
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
