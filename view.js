var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
document.addEventListener("DOMContentLoaded", function () {
    var product = JSON.parse(localStorage.getItem("selectedProduct") || "null");
    var productDetails = document.getElementById("product-details");
    if (!product) {
        productDetails.innerHTML = "<p>No product selected.</p>";
        return;
    }
    var productHTML = "\n        <div class=\"card\">\n          <img src=\"".concat(product.thumbnail, "\" class=\"card-img-top\" alt=\"").concat(product.title, "\">\n          <div class=\"card-body\">\n            <h1 class=\"card-title\">").concat(product.title, "</h1>\n            <p class=\"card-text\">").concat(product.description, "</p>\n            <p class=\"card-text\">Price: $").concat(product.price, "</p>\n            <p class=\"card-text\">Brand: ").concat(product.brand, "</p>\n            <p class=\"card-text mb-4\">Category: ").concat(product.category, "</p>\n            <a href=\"index.html\" class=\"btn btn-primary\">Back to Products</a>\n            <a href=\"#\" id=\"additem\" class=\"btn btn-primary ml-4\">Add To Cart</a>\n          </div>\n        </div>\n      ");
    productDetails.innerHTML = productHTML;
    // Adding an item to the cart
    var addItemBtn = document.getElementById("additem");
    addItemBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        var productExists = cart.find(function (cartItem) { return cartItem.id === product.id; });
        if (productExists) {
            alert("This item is already in your cart.");
        }
        else {
            var res = confirm("Are you sure to add this item to your cart?");
            if (res) {
                cart.push(__assign(__assign({}, product), { quantity: 1 }));
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Item added to cart");
                window.location.href = "cart.html";
            }
        }
    });
});
