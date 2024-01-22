const menuUrl =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

let deliciousImg = document.getElementById("deliciousImg");

function showMenu() {
  deliciousImg.style.display = "none";
}

async function getMenu() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  try {
    const response = await fetch(menuUrl);
    const data = await response.json();
    displayMenuItems(data);
  } catch (error) {
    console.error("Error fetching menu:", error);
  } finally {
    loader.style.display = "none";
  }
}

function displayMenuItems(menuItems) {
  const menuContainer = document.getElementById("menu-items");

  menuItems.forEach((item) => {
    const foodItemContainer = document.createElement("div");
    foodItemContainer.className = "food-item-container";

    const img = document.createElement("img");
    img.src = item.imgSrc;
    img.alt = item.name;
    img.className = "burger";
    foodItemContainer.appendChild(img);

    const itemDetails = document.createElement("div");
    itemDetails.className = "item-details";

    const itemInfo = document.createElement("div");
    const itemName = document.createElement("h1");
    itemName.textContent = item.name;
    itemName.className = "item-name";
    const price = document.createElement("p");
    price.textContent = `$${item.price}`;
    price.className = "price";
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(price);
    itemDetails.appendChild(itemInfo);

    const plusIcon = document.createElement("div");
    const plusImg = document.createElement("img");
    plusImg.src = "./assets/plusIcon.svg";
    plusImg.alt = "plus icon";
    plusIcon.className = "plus-icon";
    plusIcon.appendChild(plusImg);
    itemDetails.appendChild(plusIcon);

    foodItemContainer.appendChild(itemDetails);
    menuContainer.appendChild(foodItemContainer);
  });
}

window.onload = async function () {
  setTimeout(() => {
    alert("Please click on 'Menu' to see more items");
  }, 3000);
  await getMenu();
};

function showHome() {
  window.location.href = "index.html";
}

async function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomBurgers = chooseRandomBurgers(3);
      resolve(randomBurgers);
    }, 2500);
  });
}

function chooseRandomBurgers(numBurgers) {
  const menuContainer = document.getElementById("menu-items");
  const menuItems = menuContainer.getElementsByClassName("food-item-container");
  const randomBurgers = [];

  if (menuItems.length >= numBurgers) {
    for (let i = 0; i < numBurgers; i++) {
      const randomIndex = Math.floor(Math.random() * menuItems.length);
      const selectedItem = menuItems[randomIndex];
      const burgerName = selectedItem.querySelector(".item-name").textContent;
      const burgerPrice = selectedItem.querySelector(".price").textContent;

      randomBurgers.push({
        name: burgerName,
        price: burgerPrice,
      });
    }
  }

  return randomBurgers;
}

document.addEventListener("click", async function (event) {
  if (event.target.tagName === "IMG" && event.target.alt === "plus icon") {
    try {
      const selectedBurgers = await takeOrder();
      console.log("Order resolved with the following burgers:", selectedBurgers);

      const orderPrepStatus = await orderPrep();
      console.log("Order preparation status:", orderPrepStatus);

      if (orderPrepStatus.order_status) {
        const payStatus = await payOrder();
        console.log("Payment status:", payStatus);

        if (payStatus.paid) {
          thankyouFnc();
        } else {
          throw new Error("Payment failed");
        }
      } else {
        throw new Error("Order preparation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing order. Please try again.");
    }
  }
});

async function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

async function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}
