import state, { PAGES, appEl, cart } from './constants';

const renderFor = {
    [PAGES.PRODUCT]: renderProduct,
};
render();
addEventListener();

function render() {
    renderFor[state.page]();
}


function renderProduct() {
    const productHtml = generateProductHtml(state.products);
    const viewCartHtml = generateViewCartHtml();
    const navigateHtml = generateNavigateHtml();
    appEl.innerHTML = `
    <div class = "shopping-products">
    <div class ="products-page">
        <ul class="products">
        ${productHtml}
        </ul>
    </div>
        ${viewCartHtml}
    </div>
        ${navigateHtml}
        `;
}


function generateProductHtml(productList) {
    return productList.map((product, index) => {
        return `
        <li class="product" >
        <img
        src=${product.item}
        alt="a random cat"
        >
        <div class="product-name">${product.name}</div>
        <div class="product-price">$ ${product.price}</div>
        <form action="" class="add-cart" data-index =${index}>
       <button type="submit"  class="product-cart--button">Add to cart</button> 
       </form></li>
            `;
    }).join('');
}

function generateNavigateHtml() {
    const viewButton = state.viewCart ? "Hide" : "View";
    const showQuantity = cart.totalQuantity ? "(" + cart.totalQuantity + ")" : "";
    return ` <button type="button" class="show-cart--button" data-target="viewcart">
       ${viewButton} Cart ${showQuantity}
   </button>`;
}


function generateViewCartHtml() {
    const keys = Object.keys(cart.items);
    console.log({ keys });
    const checkSubtotal = cart.subtotal == 0 ? "empty-cart" : "view-cart";
    const showCart = state.viewCart ? "show" : "hide";
    const cartHtml = generateCart(keys);
    const emptyCart = generateEmptyCart(checkSubtotal);

    return `<div class="cart-page ${showCart}">
    <h3> Cart </h3>
    <div class="cart-table ${checkSubtotal}">
        <table class='view-cart-table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody class='cart-line-items'>
        ${cartHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan='3'><b>Subtotal</b></td>
            <td class='cart-subtotal'>$ ${cart.subtotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <form action="" class="checkout">
      <button type="submit"  class="checkout--button">Checkout</button> 
      </form>
      </div>
      ${emptyCart}
      </div>`
}

function generateCart(keys) {
    return keys.map((item, index) => {
        const showItem = cart.items[item].quantity ? "show" : "hide";
        return `
        <tr class="cart-items ${showItem}">
        <td class="item" >
        <img
        src=${cart.items[item].image}
        alt="a random cat"
        >
        </td>
        <td class="item-name">${cart.items[item].name}</td>
        <td class="item-quantity">
        <button
        data-index="${index}" class="decrement" type="button"> -
        </button>
            ${cart.items[item].quantity}
        <button
        data-index="${index}" class="increment" type="button">
        +
        </button>
        </td>
        <td class="item-price">$ ${cart.items[item].price.toFixed(2)}</td>
        </tr>
        `;
    }).join('');
}

function generateEmptyCart(checkSubtotal) {
    return `<p class='msg ${checkSubtotal}'>Nothing in the cart.</p>`;
}

function addEventListener() {
    appEl.addEventListener('submit', (e) => {
        if (e.target.classList.contains('add-cart')) {
            e.preventDefault();
            const index = e.target.dataset.index;
            console.log(`click on <li> index ${index}`);

            const prod = state.products.at(index);
            console.log({ prod });
            cart.items[prod.name].price += prod.price;
            cart.items[prod.name].quantity += 1;
            cart.subtotal += prod.price;
            cart.totalQuantity += 1;
            console.log({ cart });
            render();
            return;
        }
        if (e.target.classList.contains('checkout')) {
            e.preventDefault();
            const keys = Object.keys(cart.items);
            keys.forEach((element, index) => {
                cart.items[element].price = 0;
                cart.items[element].quantity = 0;
            });
            cart.subtotal = 0;
            cart.totalQuantity = 0;
            console.log({ cart });
            render();
            return;
        }
    });

    appEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('show-cart--button')) {
            // const target = e.target.dataset.target;
            state.viewCart = !state.viewCart;
            render();
            return;
        }
        if (e.target.classList.contains('decrement')) {
            const index = e.target.dataset.index;
            const prod = state.products.at(index);
            console.log({ prod });
            cart.items[prod.name].price -= prod.price;
            cart.items[prod.name].quantity -= 1;
            cart.subtotal -= prod.price;
            cart.totalQuantity -= 1;
            if (cart.subtotal == 0) {
                render();
                return;
            }
            render();
            return;
        }
        if (e.target.classList.contains('increment')) {
            const index = e.target.dataset.index;
            const prod = state.products.at(index);
            console.log({ prod });
            cart.items[prod.name].price += prod.price;
            cart.items[prod.name].quantity += 1;
            cart.subtotal += prod.price;
            cart.totalQuantity += 1;
            render();
            return;
        }

    });
}