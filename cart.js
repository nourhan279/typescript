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
    var cartContainer = document.getElementById("cart-items");
    var totalPriceContainer = document.getElementById("total-price");
    function updateCartDisplay() {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceContainer.innerHTML = "Total Price: $0";
            return;
        }
        var itemQuantities = cart.reduce(function (acc, item) {
            acc[item.id] = (acc[item.id] || 0) + item.quantity;
            return acc;
        }, {});
        var cartHTML = "";
        var totalPrice = 0;
        Object.keys(itemQuantities).forEach(function (id) {
            var item = cart.find(function (item) { return item.id === parseInt(id); });
            var quantity = itemQuantities[parseInt(id)];
            if (item) {
                totalPrice += item.price * quantity;
                cartHTML += "\n            <div class=\"cart-item\">\n              <img src=\"".concat(item.thumbnail, "\" alt=\"").concat(item.title, "\" class=\"cart-item-img\">\n              <h2>").concat(item.title, "</h2>\n              <p>Price: $").concat(item.price, "</p>\n              <div class=\"quantity-controls\">\n                <button class=\"btn-increase\" data-product-id=\"").concat(item.id, "\">+</button>\n                <span class=\"item-quantity\">").concat(quantity, "</span>\n                <button class=\"btn-decrease\" data-product-id=\"").concat(item.id, "\">-</button>\n                <button class=\"btn-delete\" data-product-id=\"").concat(item.id, "\">Delete</button>\n              </div>\n            </div>\n            ");
            }
        });
        cartContainer.innerHTML = cartHTML;
        totalPriceContainer.innerHTML = "Total Price: $".concat(totalPrice.toFixed(2));
        document.querySelectorAll(".btn-increase").forEach(function (btn) {
            btn.addEventListener("click", function () {
                updateItemQuantity(this.getAttribute("data-product-id"), 1);
            });
        });
        document.querySelectorAll(".btn-decrease").forEach(function (btn) {
            btn.addEventListener("click", function () {
                updateItemQuantity(this.getAttribute("data-product-id"), -1);
            });
        });
        document.querySelectorAll(".btn-delete").forEach(function (btn) {
            btn.addEventListener("click", function () {
                deleteItem(this.getAttribute("data-product-id"));
            });
        });
    }
    function updateItemQuantity(productId, change) {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        var itemFound = false;
        cart = cart
            .map(function (item) {
            if (item.id === parseInt(productId)) {
                itemFound = true;
                item.quantity = (item.quantity || 1) + change;
                if (item.quantity <= 0)
                    return null;
            }
            return item;
        })
            .filter(function (item) { return item !== null; });
        if (!itemFound && change > 0) {
            var products = JSON.parse(localStorage.getItem("products") || "[]");
            var product = products.find(function (p) { return p.id === parseInt(productId); });
            if (product) {
                cart.push(__assign(__assign({}, product), { quantity: 1 }));
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
    function deleteItem(productId) {
        var confirmDelete = confirm("Are you sure you want to delete this item from your cart?");
        if (confirmDelete) {
            var cart = JSON.parse(localStorage.getItem("cart") || "[]");
            cart = cart.filter(function (item) { return item.id !== parseInt(productId); });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    }
    updateCartDisplay();
});
