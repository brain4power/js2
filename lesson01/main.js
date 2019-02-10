const products = [
    {title: 'Notebook', price: 2000},
    {title: 'Mouse', price: 20},
    {title: 'Keyboard', price: 35},
    {title: 'Gamepad', price: 48},
    {title: 'Chair', price: 500},
];

const renderProduct = (title = 'Нет названия', price = 'Нет цены') => {
    return `<div class="product-item"><h3>${title}</h3><p>${price}</p></div>`
};

const renderPage = list => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    productList.forEach(item => document.querySelector('.products').insertAdjacentHTML('beforeend', item));
};

renderPage(products);

