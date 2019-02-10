class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
        this.getSummaryCoast = this._getSummaryCoast();
    }

    _getProducts() {
        this.goods = [
            {title: 'Notebook', price: 2000},
            {title: 'Mouse', price: 20},
            {title: 'Keyboard', price: 35},
            {title: 'Gamepad', price: 48},
            {title: 'Chair', price: 500},
        ];
    }

    _getSummaryCoast() {
        let summary = 0;
        this.goods.forEach(item => {
            summary += item.price;
        });
        return summary
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product.title, product.price);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class ProductItem {
    constructor(title, price, img = 'https://placehold.it/200x150') {
        this.title = title;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>$${this.price}</p>
                    </div>
                </div>`;
    }
}

let products = new ProductsList();
products.render();
