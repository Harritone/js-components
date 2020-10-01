class Product {
  constructor(title, imgUrl, desc, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Product added to cart');
    console.log(this.product);
  }

  render() {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
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
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product( 'A pillow',
      'https://johnlewis.scene7.com/is/image/JohnLewis/236578658?$rsp-pdp-port-1080$', 
      'A nice pillow', 24.99),
    new Product( 'A carpet', 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2sLdkDkWMIxQhclWrVoXMKY_FsE9hpFYn4Q&usqp=CAU', 
      'A carpet you will love', 99.99)
  ]

  constructor() {}

  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      //const prodEl = new ProductItem(prod).render();
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const prodList = new ProductList();
prodList.render();

