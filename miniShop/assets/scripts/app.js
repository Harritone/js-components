class Product {
  constructor(title, imgUrl, desc, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {};

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if(cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId, false);

    this.orderProducts = () => {
      console.log('ordering');
      console.log(this.items);
    }
    this.render();
  }

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`
  }

  get totalAmount() {
    return this.items.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }


  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    //orderButton.addEventListener('click', () => this.orderProducts());
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imgUrl}" alt="${this.product.title}" />
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>${this.product.price}</h3>
          <p>${this.product.desc}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component{
  products = [
    new Product( 'A pillow',
      'https://johnlewis.scene7.com/is/image/JohnLewis/236578658?$rsp-pdp-port-1080$', 
      'A nice pillow', 24.99),
    new Product( 'A carpet', 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2sLdkDkWMIxQhclWrVoXMKY_FsE9hpFYn4Q&usqp=CAU', 
      'A carpet you will love', 99.99)
  ];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts()
  }

  fetchProducts() {
  }

  render() {
    this.createRootElement('ul', 'product-list', [ new ElementAttribute('id', 'prod-list')]);
    if (this.products && this.products.length > 0) {
      for (const prod of this.products) {
        new ProductItem(prod, 'prod-list');
      }
    }
  }
}

class Shop extends Component{

  constructor() {
    super();
  };

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static initialize(){
    const shop = new Shop;
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.initialize();

