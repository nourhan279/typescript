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
  const product: Product | null = JSON.parse(
    localStorage.getItem("selectedProduct") || "null"
  );

  const productDetails = document.getElementById(
    "product-details"
  ) as HTMLElement;

  if (!product) {
    productDetails.innerHTML = "<p>No product selected.</p>";
    return;
  }

  const productHTML = `
        <div class="card">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h1 class="card-title">${product.title}</h1>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Price: $${product.price}</p>
            <p class="card-text">Brand: ${product.brand}</p>
            <p class="card-text mb-4">Category: ${product.category}</p>
            <a href="index.html" class="btn btn-primary">Back to Products</a>
            <a href="#" id="additem" class="btn btn-primary ml-4">Add To Cart</a>
          </div>
        </div>
      `;

  productDetails.innerHTML = productHTML;

  // Adding an item to the cart
  const addItemBtn = document.getElementById("additem") as HTMLAnchorElement;
  addItemBtn.addEventListener("click", function (event: Event) {
    event.preventDefault();
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const productExists = cart.find((cartItem) => cartItem.id === product.id);

    if (productExists) {
      alert("This item is already in your cart.");
    } else {
      const res = confirm("Are you sure to add this item to your cart?");
      if (res) {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart");
        window.location.href = "cart.html";
      }
    }
  });
});
