const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
        this.getSummaryCoast = this._getSummaryCoast();
    }

    _getProducts() {
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
    }

    // getProductById(productId) {
    //     for (let i = 0; this.allProducts.length; i++) {
    //         if (this.allProducts[i].id_product === productId) {
    //             return this.allProducts[i].id_product
    //         }
    //     }
    // }
}

class ProductItem {
    constructor(id, title, price, img = 'https://placehold.it/200x150') {
        this.settings = {
            buyButtonClass: 'buy-btn',
            delProductButtonClass: 'del-btn'
        };
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
                    <button 
                        data-id="${this.id_product}" 
                        data-price="${this.price}" 
                        data-name="${this.product_name}"
                        class="${this.settings.buyButtonClass}">
                        Добавить в корзину
                    </button>
                    <button 
                        data-id="${this.id_product}"
                        class="${this.settings.delProductButtonClass}">
                        Удалить из корзины
                    </button>
                </div>`;
    }
}

class Basket {
    constructor(user, container = '.cart') {
        this.settings = {
            countSelector: '#basket-count',
            priceSelector: '#basket-price',
            buyButtonClass: 'buy-btn',
            delProductButtonClass: 'del-btn',
        };
        this.user = user; // пользователь, к которому эта корзина относится
        this.goods = []; // все товары в корзине
        this.totalCost = 0;
        this.totalQuantity = 0;
        this.allBuyButtons = this._getAllBuyButtons();
        this.allDelProductButtons = this._getAllDelProductButtons();
        this._setEventListenerOnAllButtons();
        this._setEventListenerOnAllDelButtons();
    }

    _getAllBuyButtons() {
        return document.querySelectorAll(`button.${this.settings.buyButtonClass}`);
    }

    _setEventListenerOnAllButtons() {
        this.allBuyButtons.forEach(button => {
            button.addEventListener('click', event => this._callAddToBasket(event))
        });
    }

    _callAddToBasket(event) {
        const goodId = event.target.dataset.id;
        const goodName = event.target.dataset.name;
        const goodPrice = event.target.dataset.price;
        this.addGood(goodId, goodName, goodPrice);
        this.render();
    }

    _getAllDelProductButtons() {
        return document.querySelectorAll(`button.${this.settings.delProductButtonClass}`);
    }

    _setEventListenerOnAllDelButtons() {
        this.allDelProductButtons.forEach(button => {
            button.addEventListener('click', event => this._callRemoveGood(event))
        });
    }

    _callRemoveGood(event) {
        this.removeGood(event.target.dataset.id);
        this.render();
    }

    render() {
        document.querySelector(this.settings.countSelector).textContent = this._getTotalQuantity().toString();
        document.querySelector(this.settings.priceSelector).textContent = this._getTotalCost().toString();
    }

    // добавить товар в корзину
    addGood(goodId, goodName, goodPrice) {
        let flag = false;
        if (this.goods.length) {
            this.goods.forEach(element => {
                if (element['id'] === goodId) {
                    flag = true;
                    element['quantity'] += 1;
                }
            });
        }
        if (!flag) {
            let item = {
                'id': goodId,
                'quantity': 1,
                'name': goodName,
                'price': goodPrice,
            };
            this.goods.push(item);
        }
    }

    // удалить товар из корзины
    removeGood(goodId) {
        for (let i = 0; this.goods.length; i++) {
            if (this.goods[i]['id'] === goodId) {
                return this.goods.splice(i, 1);
            }
        }
    }

    // уменьшить количество товара в корзине на 1
    decGoodCount(good) {

    }

    // получить общую стоимость товаров в корзине
    _getTotalCost() {
        let summary = 0;
        this.goods.forEach(element => {
            summary += +element['price'] * element['quantity']
        });
        return summary;
    }

    // получить общее количество товаров в корзине
    _getTotalQuantity() {
        let summary = 0;
        this.goods.forEach(element => {
            summary += element['quantity']
        });
        return summary;
    }

    // получить список товаров корзины
    getBasket() {
        return this.goods;
    }

    //создать заказ с этой корзиной
    order() {

    }
}

let products = new ProductsList();
window.onload = () => {
    let basket = new Basket();
};

