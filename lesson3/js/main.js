const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
        this.getSummaryCoast = this._getSummaryCoast();
    }

    _getProducts(){
        fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = data;
                this.render();
            })
            .catch(error => console.log(error));
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
            const productObj = new ProductItem(product.id_product, product.product_name, product.price);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        console.log(this.allProducts);
    }
}

class ProductItem {
    constructor(id, title, price, img = 'https://placehold.it/200x150') {
        this.id_product = id;
        this.product_name = title;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>$${this.price}</p>
                    </div>
                    <button>Добавить в корзину</button>
                </div>`;
    }
}

class Basket {
    constructor(user, container = '.cart') {
        this.container = container;
        this.user = user; // пользователь, к которому эта корзина относится
        this.goods = {}; // все товары в корзине {good: quantity,}
        this.totalCost = this._getTotalCost();
        this.totalQuantity = this._getTotalQuantity();
    }

    // добавить товар в корзину
    addGood(good) {

    }

    // удалить товар из корзины
    removeGood(good) {

    }

    // уменьшить количество товара в корзине на 1
    decGoodCount(good) {

    }

    // получить общую стоимость товаров в корзине
    _getTotalCost() {

    }

    // получить общее количество товаров в корзине
    _getTotalQuantity() {

    }

    //создать заказ с этой корзиной
    order() {

    }
}

let products = new ProductsList();
