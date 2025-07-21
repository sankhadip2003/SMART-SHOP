document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  let cartItems = [];

  const header = document.querySelector("header");

  // 🛒 Cart Display
  const cartDisplay = document.createElement("div");
  cartDisplay.style.position = "absolute";
  cartDisplay.style.top = "20px";
  cartDisplay.style.right = "140px";
  cartDisplay.style.backgroundColor = "#fff";
  cartDisplay.style.padding = "8px 16px";
  cartDisplay.style.borderRadius = "5px";
  cartDisplay.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  cartDisplay.style.color = "black";
  cartDisplay.style.fontWeight = "bold";
  cartDisplay.innerText = `🛒 Cart: ${cartCount}`;
  header.appendChild(cartDisplay);

  // 🧾 View Bill Button
  const billButton = document.createElement("button");
  billButton.innerText = "🧾 View Bill";
  billButton.style.position = "absolute";
  billButton.style.top = "20px";
  billButton.style.right = "20px";
  billButton.style.padding = "8px 16px";
  billButton.style.backgroundColor = "#ffc107";
  billButton.style.border = "none";
  billButton.style.borderRadius = "5px";
  billButton.style.cursor = "pointer";
  billButton.style.fontWeight = "bold";
  header.appendChild(billButton);

  // 🛍️ Handle Product Buy Buttons
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const btn = document.createElement("button");
    btn.innerText = "Buy Now";
    btn.style.marginTop = "10px";
    btn.style.padding = "8px 12px";
    btn.style.backgroundColor = "#28a745";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      cartCount++;
      cartDisplay.innerText = `🛒 Cart: ${cartCount}`;

      const productName = product.querySelector("h3").innerText;
      const price = parseFloat(product.querySelector(".price").innerText.replace("₹", "").trim());
      const existingItem = cartItems.find(item => item.name === productName);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ name: productName, price, quantity: 1 });
      }

      // Optional: Send to PHP backend
      fetch("submit_order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `product=${encodeURIComponent(productName)}&price=${price}&quantity=1`
      })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.error("Order failed", err));
    });

    product.appendChild(btn);
  });

  // 💵 Show Bill Popup
  billButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("🛍️ Your cart is empty!");
      return;
    }

    let bill = "🧾 BILL\n-------------------------\n";
    let total = 0;

    cartItems.forEach(item => {
      const subtotal = item.price * item.quantity;
      bill += `${item.name} x ${item.quantity} = ₹${subtotal.toFixed(2)}\n`;
      total += subtotal;
    });

    bill += "-------------------------\n";
    bill += `Total: ₹${total.toFixed(2)}\n\nThank you for shopping! 🎉`;

    alert(bill);
  });
});

// 🌗 Toggle Dark/Light Mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}
