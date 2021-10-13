import { get } from './imageView.js';

const cartButton = get('.cart_button');
const cartModal = get('.cart_modal');
const cartItem = get('.cart_item');
const productDisplay = get('.product_container');

const Images = [
  {
    img: './images/image-product-1.jpg',
  },
  {
    img: './images/image-product-2.jpg',
  },
  {
    img: './images/image-product-3.jpg',
  },
  {
    img: './images/image-product-4.jpg',
  },
];

const addToLocal = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};
const item = [
  {
    id: 'p1',
    name: 'fall limited edition sneakers',
    src: 'images/image-product-1.jpg',
    price: '125',
  },
];

const getLocal = () => {
  let storage = localStorage.getItem('cart');
  if (storage) storage = JSON.parse(localStorage.getItem('cart'));
  else storage = [];

  return storage;
};
window.addEventListener('DOMContentLoaded', () => {
  displayCartItem();
  const singleItem = item.map((item) => {
    return `
    <div class="product" data-id=${item.id}>
   
    <img  src="./images/icon-previous.svg" class="arrowBtn prevButton" alt="prev"/>
 
  <img  src="./images/icon-next.svg" class="arrowBtn nextButton" alt="prev"/>
 
    <div class="product-image_container">
   
    <img
    src= ${item.src}
    class="product_image"
    alt="display image"
  />
  
  </div>
  <div class="product_image-slider"><h1>Hello</h1></div>
  <div class="product_details">
    <p class="name">sneaker company</p>
    <h1>
     ${item.name}
    </h1>
    <p class="product_desc">
      These low-profile sneakers are your perfect casual wear companion.
      Featuring a durable rubber outer sole, they’ll withstand everything
      the weather can offer.
    </p>

    <span class="product_price-Container">
      <span class="product_price">
        $125.00
        <p>50%</p></span
      >
      <strike class="product_oldPrice">$250.00</strike>
    </span>
    <div class="products_actions">
      <div>
        <img src="images/icon-minus.svg" alt="minus" class="decrease" />
        <input type="number" value="1" max="5" min="1"/>
        <img src="images/icon-plus.svg" alt="plus"  class="increase" />
      </div>
      <button class="add_btn" data-id=${item.id}>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart
      </button>
    </div>
  </div>
  
  </div>`;
  });
  productDisplay.innerHTML = singleItem;

  const container = get('.product_image-slider');

  container.innerHTML = Images.map((image, slideIndex) => {
    let position = 'next';
    if (slideIndex === 0) position = 'active';
    if (slideIndex === Images.length - 1) position = ' prev';

    return ` <img src=${image.img}  class="slide ${position}" alt="img1">
 `;
  }).join(' ');
  const prevBtn = document.querySelector('.prevButton');
  const nextBtn = get('.nextButton');

  function startSlide(type) {
    let active = get('.active');
    let last = get('.prev');
    let next = active.nextElementSibling;
    if (!next) {
      next = container.firstElementChild;
    }
    active.classList.remove(['active']);
    next.classList.remove(['next']);
    last.classList.remove(['prev']);

    if (type === 'prev') {
      active.classList.add('next');
      last.classList.add('active');
      next = last.previousElementSibling;

      if (!next) next = container.lastElementChild;
      next.classList.remove(['next']);
      next.classList.add('prev');
      return;
    }

    active.classList.add('prev');
    last.classList.add('next');
    next.classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    startSlide('prev');
  });

  nextBtn.addEventListener('click', () => {
    startSlide();
  });

  // selection from  dynamic values
  const adddCartButton = document.querySelector('.add_btn');
  const increaseHandler = document.querySelector('.increase');
  const decreaseHandler = document.querySelector('.decrease');

  // add to cart functionality
  adddCartButton.addEventListener('click', (e) => {
    const cartItems = [];
    item.find((item) => {
      if (item.id === e.target.dataset.id)
        cartItems.push({
          id: item.id,
          name: item.name,
          src: item.src,
          price: parseInt(item.price),
          quantity: 1,
          total: parseInt(item.price),
        });
    });
    addToLocal(cartItems);
    displayCartItem();
  });

  // increasehandler
  increaseHandler.addEventListener('click', (e) => {
    const totaltoAdd = e.target.previousElementSibling.value;
    const storage = getLocal();
    let increaseQuantity = [];
    storage.map((product) => {
      increaseQuantity.push({
        id: product.id,
        name: product.name,
        src: product.src,
        quantity: product.quantity + parseInt(totaltoAdd),
        price: product.price,
      });
    });
    increaseQuantity.map((product) => {
      increaseQuantity[0] = {
        id: product.id,
        name: product.name,
        src: product.src,
        price: product.price,
        quantity: product.quantity,
        total: product.price * product.quantity,
      };
    });

    addToLocal(increaseQuantity);
    displayCartItem();
  });

  // decreasehandler
  decreaseHandler.addEventListener('click', (e) => {
    // const totaltoRemove = e.target.nextElementSibling.value;
    let storage = getLocal();
    let increaseQuantity = [];
    if (storage[0].quantity <= 1) {
      storage = [];
      addToLocal([]);
    }
    storage.map((product) => {
      increaseQuantity.push({
        id: product.id,
        name: product.name,
        src: product.src,
        quantity: product.quantity - 1,
        price: product.price,
      });
    });
    increaseQuantity.map((product) => {
      increaseQuantity[0] = {
        id: product.id,
        name: product.name,
        src: product.src,
        price: product.price,
        quantity: product.quantity,
        total: product.price * product.quantity,
      };
    });

    addToLocal(increaseQuantity);
    displayCartItem();
  });
});

cartButton.addEventListener('click', () => {
  displayCartItem();
  cartModal.classList.toggle('Show');
});

const removeItem = () => {
  localStorage.removeItem('cart');
  addToLocal([]);
  displayCartItem();
};

function displayCartItem() {
  let storage = localStorage.getItem('cart');
  if (storage) storage = JSON.parse(localStorage.getItem('cart'));
  else storage = [];

  const cartProduct = storage.map((cart) => {
    return `
    <img src=${cart.src} alt="image1" />
    <div class="cart_itemDetail">
    <p>${cart.name}</p>
    <div class="cart_amount">
    $${cart.price} <span>x${cart.quantity}</span> <span class="total_amount">$${cart.total}</span>

    <i class="fas fa-trash removeBtn"></i>
    </div>
    <button>Checkout</button>
    
    </div>`;
  });
  cartItem.innerHTML = cartProduct;
  if (storage.length > 0) {
    const removeBtn = document.querySelector('.removeBtn');
    removeBtn.addEventListener('click', removeItem);
  }
}

const menuBar = get('.menu_bar');
const sideBar = get('.backdrop');
const closeSidebar = get('.sidebar p');

menuBar.addEventListener('click', () => {
  sideBar.classList.add('Show');
});
closeSidebar.addEventListener('click', () => {
  sideBar.classList.remove('Show');
});