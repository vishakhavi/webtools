export const PAGES = {
    PRODUCT: 'product'
};

export const appEl = document.querySelector('#app');
const state = {
    products: [
        { name: 'Fluffball', item: 'http://placekitten.com/150/150?image=1', price: 0.99 },
        { name: 'General Meyhem', item: 'http://placekitten.com/150/150?image=2', price: 3.14 },
        { name: 'Aegean', item: 'http://placekitten.com/150/150?image=3', price: 2.73 }
    ],
    page: PAGES.PRODUCT,
    viewCart: false
};
export const cart = {
    items: {
        'Fluffball': {
            name: 'Fluffball',
            image: ' http://placekitten.com/50/50?image=1',
            price: 0,
            quantity: 0,
        },
        'General Meyhem': {
            name: 'General Meyhem',
            image: ' http://placekitten.com/50/50?image=2',
            price: 0,
            quantity: 0,
        },
        'Aegean': {
            name: 'Aegean',
            image: ' http://placekitten.com/50/50?image=3',
            price: 0,
            quantity: 0,
        },
    },
    totalQuantity: 0,
    subtotal: 0

};

export default state;