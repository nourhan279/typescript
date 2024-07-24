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

type ApiResponse = {
  products: Product[];
};

const api = "https://dummyjson.com/products";

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(api);
  const data: ApiResponse = await response.json();
  return data.products;
}

async function main() {
  const products = await fetchProducts();
  console.log("Fetched products:", products); // Log fetched products

  const maindiv = document.getElementById("products") as HTMLDivElement;
  const searchInput = document.getElementById(
    "search-input"
  ) as HTMLInputElement;
  const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
  const filterCategory = document.getElementById(
    "filter-category"
  ) as HTMLSelectElement;
  const sortPrice = document.getElementById("sort-price") as HTMLSelectElement;

  // Populate categories
  const categories = [...new Set(products.map((product) => product.category))];
  console.log("Extracted categories:", categories); // Log extracted categories

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "All";
  filterCategory.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    filterCategory.appendChild(option);
  });

  console.log("Filter category options:", filterCategory.innerHTML); // Log options

  function renderProducts(filteredProducts: Product[]) {
    let productsHTML = "";
    filteredProducts.forEach((product) => {
      productsHTML += `
            <div class="product">
              <img src="${product.thumbnail}" alt="${product.title}">
              <h2>${product.title}</h2>
              <p>Price: $${product.price}</p>
              <button class="view-item-btn" data-product-id="${product.id}">View Item</button>
            </div>
          `;
    });
    maindiv.innerHTML = productsHTML;

    // Add event listeners for "View Item" buttons
    document.querySelectorAll(".view-item-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = (this as HTMLButtonElement).getAttribute(
          "data-product-id"
        );
        const product = products.find((p) => p.id.toString() === productId);
        if (product) {
          localStorage.setItem("selectedProduct", JSON.stringify(product));
          window.location.href = "viewitem.html";
        }
      });
    });
  }

  function filterAndSortProducts() {
    let filteredProducts = products;

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    const selectedCategory = filterCategory.value;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    const selectedSort = sortPrice.value;
    if (selectedSort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return selectedSort === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    renderProducts(filteredProducts);
  }

  renderProducts(products);

  searchBtn.addEventListener("click", filterAndSortProducts);
  filterCategory.addEventListener("change", filterAndSortProducts);
  sortPrice.addEventListener("change", filterAndSortProducts);
}

main();
