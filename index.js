var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var api = "https://dummyjson.com/products";
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(api)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.products];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function renderProducts(filteredProducts) {
            var productsHTML = "";
            filteredProducts.forEach(function (product) {
                productsHTML += "\n            <div class=\"product\">\n              <img src=\"".concat(product.thumbnail, "\" alt=\"").concat(product.title, "\">\n              <h2>").concat(product.title, "</h2>\n              <p>Price: $").concat(product.price, "</p>\n              <button class=\"view-item-btn\" data-product-id=\"").concat(product.id, "\">View Item</button>\n            </div>\n          ");
            });
            maindiv.innerHTML = productsHTML;
            // Add event listeners for "View Item" buttons
            document.querySelectorAll(".view-item-btn").forEach(function (btn) {
                btn.addEventListener("click", function () {
                    var productId = this.getAttribute("data-product-id");
                    var product = products.find(function (p) { return p.id.toString() === productId; });
                    if (product) {
                        localStorage.setItem("selectedProduct", JSON.stringify(product));
                        window.location.href = "viewitem.html";
                    }
                });
            });
        }
        function filterAndSortProducts() {
            var filteredProducts = products;
            var searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(function (product) {
                    return product.title.toLowerCase().includes(searchTerm);
                });
            }
            var selectedCategory = filterCategory.value;
            if (selectedCategory) {
                filteredProducts = filteredProducts.filter(function (product) { return product.category === selectedCategory; });
            }
            var selectedSort = sortPrice.value;
            if (selectedSort) {
                filteredProducts = filteredProducts.sort(function (a, b) {
                    return selectedSort === "asc" ? a.price - b.price : b.price - a.price;
                });
            }
            renderProducts(filteredProducts);
        }
        var products, maindiv, searchInput, searchBtn, filterCategory, sortPrice, categories, defaultOption;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchProducts()];
                case 1:
                    products = _a.sent();
                    console.log("Fetched products:", products); // Log fetched products
                    maindiv = document.getElementById("products");
                    searchInput = document.getElementById("search-input");
                    searchBtn = document.getElementById("search-btn");
                    filterCategory = document.getElementById("filter-category");
                    sortPrice = document.getElementById("sort-price");
                    categories = __spreadArray([], new Set(products.map(function (product) { return product.category; })), true);
                    console.log("Extracted categories:", categories); // Log extracted categories
                    defaultOption = document.createElement("option");
                    defaultOption.value = "";
                    defaultOption.textContent = "All";
                    filterCategory.appendChild(defaultOption);
                    categories.forEach(function (category) {
                        var option = document.createElement("option");
                        option.value = category;
                        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                        filterCategory.appendChild(option);
                    });
                    console.log("Filter category options:", filterCategory.innerHTML); // Log options
                    renderProducts(products);
                    searchBtn.addEventListener("click", filterAndSortProducts);
                    filterCategory.addEventListener("change", filterAndSortProducts);
                    sortPrice.addEventListener("change", filterAndSortProducts);
                    return [2 /*return*/];
            }
        });
    });
}
main();
