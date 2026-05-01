(function () {
  const CART_KEY = "edufunStoreCart";
  const PROMO_KEY = "edufunStorePromo";
  const ORDER_KEY = "edufunLatestOrder";

  function getRootPath() {
    const marker = "/pages/";
    const path = window.location.pathname;
    if (path.includes(marker)) {
      return path.split(marker)[0] + "/";
    }

    return path.substring(0, path.lastIndexOf("/") + 1);
  }

  function toRoot(relativePath) {
    return getRootPath() + relativePath.replace(/^\/+/, "");
  }

  function formatCurrency(value) {
    return "Rs " + new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0
    }).format(Number(value) || 0);
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getCart() {
    return readJson(CART_KEY, []);
  }

  function saveCart(items) {
    writeJson(CART_KEY, items);
    document.dispatchEvent(new CustomEvent("edufun:cart-updated", { detail: getCartSummary() }));
  }

  function getPromo() {
    const promo = readJson(PROMO_KEY, null);
    if (!promo || typeof promo.discount !== "number") {
      return null;
    }

    return promo;
  }

  function savePromo(promo) {
    if (!promo) {
      localStorage.removeItem(PROMO_KEY);
      return;
    }

    writeJson(PROMO_KEY, promo);
  }

  function clearPromo() {
    localStorage.removeItem(PROMO_KEY);
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(function (entry) {
      return entry.id === item.id && entry.source === item.source;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        title: item.title,
        price: Number(item.price) || 0,
        image: item.image || "",
        category: item.category || "Learning item",
        description: item.description || "",
        source: item.source || window.location.pathname,
        quantity: 1
      });
    }

    saveCart(cart);
  }

  function removeFromCart(itemId, itemSource) {
    const nextCart = getCart().filter(function (entry) {
      return !(entry.id === itemId && entry.source === itemSource);
    });
    saveCart(nextCart);
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    document.dispatchEvent(new CustomEvent("edufun:cart-updated", { detail: getCartSummary() }));
  }

  function getCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce(function (sum, entry) {
      return sum + (entry.price * entry.quantity);
    }, 0);
    const promo = getPromo();
    const discount = promo ? Math.round(subtotal * promo.discount) : 0;
    const total = Math.max(subtotal - discount, 0);

    return {
      items: cart,
      count: cart.reduce(function (sum, entry) { return sum + entry.quantity; }, 0),
      subtotal: subtotal,
      discount: discount,
      total: total,
      promo: promo
    };
  }

  function showToast(message, type) {
    let toast = document.querySelector("[data-store-message]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("data-store-message", "true");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "toast visible " + (type || "");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.className = "toast";
    }, 2800);
  }

  function renderCartWidgets() {
    const summary = getCartSummary();

    document.querySelectorAll("[data-cart-count]").forEach(function (node) {
      node.textContent = String(summary.count);
    });

    document.querySelectorAll("[data-cart-total]").forEach(function (node) {
      node.textContent = formatCurrency(summary.total);
    });

    document.querySelectorAll("[data-cart-subtotal]").forEach(function (node) {
      node.textContent = formatCurrency(summary.subtotal);
    });

    document.querySelectorAll("[data-cart-discount]").forEach(function (node) {
      node.textContent = summary.discount ? "-" + formatCurrency(summary.discount) : formatCurrency(0);
    });

    document.querySelectorAll("[data-cart-promo]").forEach(function (node) {
      if (summary.promo) {
        node.textContent = summary.promo.label + " saved " + formatCurrency(summary.discount);
        node.hidden = false;
      } else {
        node.textContent = "";
        node.hidden = true;
      }
    });

    document.querySelectorAll("[data-cart-items]").forEach(function (container) {
      if (!summary.items.length) {
        container.innerHTML = '<div class="empty-state">Your cart is empty right now. Add a book, game, or learning kit to continue to payment.</div>';
        return;
      }

      container.innerHTML = summary.items.map(function (entry) {
        return (
          '<article class="cart-item">' +
            '<div class="cart-item-thumb">' +
              (entry.image ? '<img src="' + entry.image + '" alt="' + entry.title + '">' : "") +
            '</div>' +
            '<div>' +
              '<p class="cart-item-title">' + entry.title + "</p>" +
              '<p class="cart-item-meta">' + entry.category + ' · Qty ' + entry.quantity + "</p>" +
              '<p class="cart-item-meta">' + formatCurrency(entry.price) + ' each</p>' +
            "</div>" +
            '<div>' +
              '<p class="cart-item-price">' + formatCurrency(entry.price * entry.quantity) + "</p>" +
              '<button class="remove-btn" type="button" data-remove-item="' + entry.id + '" data-remove-source="' + entry.source + '">Remove</button>' +
            "</div>" +
          "</article>"
        );
      }).join("");
    });

    document.querySelectorAll("[data-checkout-button]").forEach(function (button) {
      button.disabled = !summary.items.length;
    });
  }

  function bindCartActions() {
    document.addEventListener("click", function (event) {
      const removeButton = event.target.closest("[data-remove-item]");
      if (removeButton) {
        removeFromCart(removeButton.getAttribute("data-remove-item"), removeButton.getAttribute("data-remove-source"));
        renderCartWidgets();
        showToast("Item removed from cart.", "success");
        return;
      }

      const addButton = event.target.closest("[data-add-to-cart]");
      if (addButton) {
        addToCart({
          id: addButton.getAttribute("data-id"),
          title: addButton.getAttribute("data-title"),
          price: addButton.getAttribute("data-price"),
          image: addButton.getAttribute("data-image"),
          category: addButton.getAttribute("data-category"),
          description: addButton.getAttribute("data-description"),
          source: addButton.getAttribute("data-source") || window.location.pathname
        });
        renderCartWidgets();
        showToast(addButton.getAttribute("data-title") + " added to cart.", "success");
        return;
      }

      const checkoutButton = event.target.closest("[data-checkout-button]");
      if (checkoutButton) {
        const summary = getCartSummary();
        if (!summary.items.length) {
          showToast("Add at least one item before checkout.", "error");
          return;
        }

        window.location.href = toRoot("pages/payment.html");
      }
    });
  }

  function bindSearch() {
    document.querySelectorAll("[data-store-search]").forEach(function (input) {
      input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();
        document.querySelectorAll("[data-product-card]").forEach(function (card) {
          const haystack = [
            card.getAttribute("data-name") || "",
            card.getAttribute("data-category") || "",
            card.getAttribute("data-description") || ""
          ].join(" ").toLowerCase();

          card.hidden = query && !haystack.includes(query);
        });
      });
    });
  }

  function bindSpinWheel() {
    const button = document.querySelector("[data-spin-wheel]");
    const resultNode = document.querySelector("[data-spin-result]");

    if (!button || !resultNode) {
      return;
    }

    const options = [
      { label: "5% off", discount: 0.05 },
      { label: "10% off", discount: 0.10 },
      { label: "15% off", discount: 0.15 },
      { label: "Free shipping note", discount: 0 },
      { label: "20% off", discount: 0.20 }
    ];

    button.addEventListener("click", function () {
      const outcome = options[Math.floor(Math.random() * options.length)];
      if (outcome.discount > 0) {
        savePromo({
          label: outcome.label,
          discount: outcome.discount
        });
        resultNode.textContent = "Nice. Your cart now includes " + outcome.label + " for checkout.";
        showToast("Promo applied: " + outcome.label, "success");
      } else {
        clearPromo();
        resultNode.textContent = "You earned a cheerful retry. Spin again any time for a discount.";
        showToast("Try again for a discount.", "error");
      }

      renderCartWidgets();
    });
  }

  function bindPaymentForm() {
    const form = document.querySelector("[data-payment-form]");
    if (!form) {
      return;
    }

    const summary = getCartSummary();
    const methodInputs = Array.from(form.querySelectorAll('input[name="paymentMethod"]'));
    const cardFields = form.querySelector("[data-card-fields]");
    const upiField = form.querySelector("[data-upi-field]");

    function syncMethodFields() {
      const selected = methodInputs.find(function (input) { return input.checked; });
      const method = selected ? selected.value : "card";
      if (cardFields) {
        cardFields.hidden = method !== "card";
      }
      if (upiField) {
        upiField.hidden = method !== "upi";
      }
    }

    methodInputs.forEach(function (input) {
      input.addEventListener("change", syncMethodFields);
    });
    syncMethodFields();

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!summary.items.length) {
        showToast("Your cart is empty. Add items before paying.", "error");
        return;
      }

      const data = new FormData(form);
      const order = {
        orderId: "EDU-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        createdAt: new Date().toISOString(),
        customerName: String(data.get("customerName") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        address: String(data.get("address") || "").trim(),
        paymentMethod: String(data.get("paymentMethod") || "card"),
        total: summary.total,
        subtotal: summary.subtotal,
        discount: summary.discount,
        promo: summary.promo,
        items: summary.items
      };

      if (!order.customerName || !order.email || !order.phone || !order.address) {
        showToast("Complete the payment form before placing the order.", "error");
        return;
      }

      if (order.paymentMethod === "card") {
        const cardNumber = String(data.get("cardNumber") || "").replace(/\s+/g, "");
        const expiry = String(data.get("expiry") || "").trim();
        const cvv = String(data.get("cvv") || "").trim();
        if (cardNumber.length < 12 || !expiry || cvv.length < 3) {
          showToast("Enter valid card details to continue.", "error");
          return;
        }
      }

      if (order.paymentMethod === "upi") {
        const upiId = String(data.get("upiId") || "").trim();
        if (!upiId || !upiId.includes("@")) {
          showToast("Enter a valid UPI ID to continue.", "error");
          return;
        }
      }

      writeJson(ORDER_KEY, order);
      clearCart();
      clearPromo();
      showToast("Payment successful. Redirecting...", "success");
      setTimeout(function () {
        window.location.href = toRoot("pages/order-success.html");
      }, 350);
    });
  }

  function renderOrderSuccess() {
    const order = readJson(ORDER_KEY, null);
    const host = document.querySelector("[data-order-success]");
    if (!host) {
      return;
    }

    if (!order) {
      host.innerHTML = '<div class="empty-state">No recent order was found. Visit the payment page after adding items to your cart.</div>';
      return;
    }

    const paymentLabels = {
      card: "Card payment",
      upi: "UPI payment",
      cod: "Cash on delivery"
    };

    host.innerHTML =
      '<section class="success-card">' +
        '<h2>Order Details</h2>' +
        '<ul class="list-clean">' +
          '<li><span>Order ID</span><strong>' + order.orderId + '</strong></li>' +
          '<li><span>Name</span><strong>' + order.customerName + '</strong></li>' +
          '<li><span>Payment</span><strong>' + (paymentLabels[order.paymentMethod] || order.paymentMethod) + '</strong></li>' +
          '<li><span>Total paid</span><strong>' + formatCurrency(order.total) + '</strong></li>' +
        '</ul>' +
      '</section>' +
      '<section class="success-card">' +
        '<h2>Items Purchased</h2>' +
        '<ul class="list-clean">' +
          order.items.map(function (entry) {
            return '<li><span>' + entry.title + ' x' + entry.quantity + '</span><strong>' + formatCurrency(entry.price * entry.quantity) + '</strong></li>';
          }).join("") +
        '</ul>' +
      '</section>';
  }

  function exposeApi() {
    window.EduFunStore = {
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      clearCart: clearCart,
      getCart: getCart,
      getCartSummary: getCartSummary,
      getPromo: getPromo,
      savePromo: savePromo,
      clearPromo: clearPromo,
      formatCurrency: formatCurrency,
      getRootPath: getRootPath,
      toRoot: toRoot,
      saveOrder: function (order) { writeJson(ORDER_KEY, order); }
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindCartActions();
    bindSearch();
    bindSpinWheel();
    bindPaymentForm();
    renderCartWidgets();
    renderOrderSuccess();
    exposeApi();
  });

  document.addEventListener("edufun:cart-updated", renderCartWidgets);
})();
