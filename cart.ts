type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type CartItem = Product & {
  quantity: number;
};

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-items") as HTMLDivElement;
  const totalPriceContainer = document.getElementById(
    "total-price"
  ) as HTMLDivElement;

  function updateCartDisplay() {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceContainer.innerHTML = "Total Price: $0";
      return;
    }

    const itemQuantities: { [key: number]: number } = cart.reduce(
      (acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + item.quantity;
        return acc;
      },
      {} as { [key: number]: number }
    );

    let cartHTML = "";
    let totalPrice = 0;

    Object.keys(itemQuantities).forEach((id) => {
      const item = cart.find((item) => item.id === parseInt(id));
      const quantity = itemQuantities[parseInt(id)];
      if (item) {
        totalPrice += item.price * quantity;

        cartHTML += `
            <div class="cart-item">
              <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-img">
              <h2>${item.title}</h2>
              <p>Price: $${item.price}</p>
              <div class="quantity-controls">
                <button class="btn-increase" data-product-id="${item.id}">+</button>
                <span class="item-quantity">${quantity}</span>
                <button class="btn-decrease" data-product-id="${item.id}">-</button>
                <button class="btn-delete" data-product-id="${item.id}">Delete</button>
              </div>
            </div>
            `;
      }
    });

    cartContainer.innerHTML = cartHTML;
    totalPriceContainer.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;

    document.querySelectorAll(".btn-increase").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateItemQuantity(
          (this as HTMLElement).getAttribute("data-product-id")!,
          1
        );
      });
    });

    document.querySelectorAll(".btn-decrease").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateItemQuantity(
          (this as HTMLElement).getAttribute("data-product-id")!,
          -1
        );
      });
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        deleteItem((this as HTMLElement).getAttribute("data-product-id")!);
      });
    });
  }

  function updateItemQuantity(productId: string, change: number) {
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    let itemFound = false;

    cart = cart
      .map((item) => {
        if (item.id === parseInt(productId)) {
          itemFound = true;
          item.quantity = (item.quantity || 1) + change;
          if (item.quantity <= 0) return null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    if (!itemFound && change > 0) {
      const products: Product[] = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const product = products.find((p) => p.id === parseInt(productId));
      if (product) {
        cart.push({ ...product, quantity: 1 });
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }

  function deleteItem(productId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this item from your cart?"
    );

    if (confirmDelete) {
      let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      cart = cart.filter((item) => item.id !== parseInt(productId));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  }

  updateCartDisplay();
});
