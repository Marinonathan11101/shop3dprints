

export const addItem = (item, color, baseColor, topColor, next) => {
    let cart = [];

    if (typeof window !== 'undefined') {
        // Get the cart from localStorage
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        // Check if the product with the selected color, base color, and top color already exists in the cart
        const existingItem = cart.find(cartItem => 
            cartItem._id === item._id && 
            cartItem.color === color &&
            cartItem.baseColor === baseColor &&
            cartItem.topColor === topColor
        );

        if (existingItem) {
            // If the item with the same product and selected colors already exists, do not add it again
            console.log("This product with the selected colors is already in the cart.");
        } else {
            // If the product with the selected colors doesn't exist, add it to the cart
            cart.push({
                ...item,
                count: 1,
                color: color,           
                baseColor: baseColor,  
                topColor: topColor,     
            });
        }

        // Remove duplicate items (based on product _id, color, baseColor, and topColor)
        cart = Array.from(new Set(cart.map(p => `${p._id}-${p.color}`-`${p.baseColor}-${p.topColor}`)))
            .map(id => cart.find(p => `${p._id}-${p.color}`-`${p.baseColor}-${p.topColor}` === id));

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);

        // Trigger a page reload or perform other actions
        window.location.reload();
        next();
    }
}; 

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};


export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

export const updateItem = (productId, value, color) => {
    let cart = getCart();
    cart = cart.map((item) =>
      item._id === productId && item.color === color
        ? { ...item, count: value }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  };

export const DeleteCartItem = (productId, color) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Remove the item from the cart array
    cart = cart.filter((item) => item._id !== productId || item.color !== color);
    
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
};

export const ClearCart = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.length = 0; // clear all items from array

        localStorage.setItem('cart', JSON.stringify(cart));
    }

};




