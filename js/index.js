const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const countEl = document.querySelector('.count');
let count = 0;
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');
const productImage = document.querySelector('.main-img');

burgerIcon.addEventListener('click', () => {
  navMenu.classList.add('active');
  burgerIcon.style.display = 'none'; // Sembunyikan ikon burger
  closeIcon.style.display = 'block'; // Tampilkan ikon close
  overlay.style.display = 'block'
});

closeIcon.addEventListener('click', () => {
  navMenu.classList.remove('active');
  burgerIcon.style.display = 'block'; // Tampilkan ikon burger kembali
  closeIcon.style.display = 'none'; // Sembunyikan ikon close
  overlay.style.display = 'none'
});

minusBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
    countEl.textContent = count;
  }
});

plusBtn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
});

// keranjang
const cartIcon = document.getElementById('cartIcon');
const cartDropdown = document.getElementById('cartDropdown');

cartIcon.addEventListener('click', () => {
  if (cartDropdown.style.display === 'none' || cartDropdown.style.display === '') {
    cartDropdown.style.display = 'block';
  } else {
    cartDropdown.style.display = 'none';
  }
});

// Close dropdown if clicked outside
window.addEventListener('click', (e) => {
  if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
    cartDropdown.style.display = 'none';
  }
});

// Mengubah gambar utama ketika thumbnail diklik
const thumbs = document.querySelectorAll('.thumb');
const mainImg = document.querySelector('.main-img');
thumbs[0].classList.add('active');


thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    // Hapus class 'active' dari thumbnail yang sebelumnya dipilih
    const activeThumb = document.querySelector('.thumb.active');
    if (activeThumb) {
      activeThumb.classList.remove('active');
    }

    // Tambahkan class 'active' ke thumbnail yang diklik
    thumb.classList.add('active');

    // Ganti gambar utama dengan gambar thumbnail yang dipilih
    mainImg.src = thumb.src; // Gunakan src thumbnail untuk gambar utama
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxMainImg = document.getElementById('lightbox-img');
const lightboxMainImgMobile = document.getElementById('lightbox-img-mobile');
const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
const productImages = [
  'images/image-product-1.jpg',
  'images/image-product-2.jpg',
  'images/image-product-3.jpg',
  'images/image-product-4.jpg'
];
let currentImageIndex = 0;
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtnMobile = document.getElementById('prev-btn-mobile');
const nextBtnMobile = document.getElementById('next-btn-mobile');
lightboxThumbs[0].classList.add('active');

// Event listener untuk menampilkan lightbox ketika gambar produk diklik
productImage.addEventListener('click', () => {
  lightbox.style.display = 'flex';
  lightboxImg.src = productImage.src; // Set gambar di lightbox sama dengan gambar produk utama
});

// Event listener untuk menutup lightbox
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Fungsi untuk mengganti gambar utama di lightbox ketika thumbnail diklik
lightboxThumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    // Hapus kelas active dari semua thumbnail
    lightboxThumbs.forEach(t => t.classList.remove('active'));
    
    // Tambahkan kelas active pada thumbnail yang diklik
    thumb.classList.add('active');
    
    // Perbarui gambar lightbox dengan gambar yang sesuai
    lightboxImg.src = productImages[index];
  });
});

// Fungsi untuk memperbarui gambar utama berdasarkan index
function updateLightboxImage(index) {
  lightboxMainImg.src = productImages[index];

  // Hapus class 'active' dari thumbnail yang sebelumnya dipilih
  document.querySelector('.lightbox-thumb.active')?.classList.remove('active');
  
  // Tambahkan class 'active' ke thumbnail yang sesuai dengan gambar utama
  lightboxThumbs[index].classList.add('active');
}

function updateLightboxImageMobile(index) {
  lightboxMainImgMobile.src = productImages[index];

  // Hapus class 'active' dari thumbnail yang sebelumnya dipilih
  document.querySelector('.lightbox-thumb.active')?.classList.remove('active');
  
  // Tambahkan class 'active' ke thumbnail yang sesuai dengan gambar utama
  lightboxThumbs[index].classList.add('active');
}

// Event listener untuk tombol Previous
prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex === 0) ? productImages.length - 1 : currentImageIndex - 1;
  updateLightboxImage(currentImageIndex);
});

// Event listener untuk tombol Next
nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex === productImages.length - 1) ? 0 : currentImageIndex + 1;
  updateLightboxImage(currentImageIndex);
});

// Event listener untuk tombol Previous mobile
prevBtnMobile.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex === 0) ? productImages.length - 1 : currentImageIndex - 1;
  updateLightboxImageMobile(currentImageIndex);
});

// Event listener untuk tombol Next mobile
nextBtnMobile.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex === productImages.length - 1) ? 0 : currentImageIndex + 1;
  updateLightboxImageMobile(currentImageIndex);
});


let cart = [];
let cartCount = 0;
let cartTotal = 0;

function addToCart() {
  const quantity = count; // Use the count variable to get the current quantity

  // Only add to cart if the quantity is greater than zero
  if (quantity > 0) {
    const product = {
        name: "Fall Limited Edition Sneakers",
        price: 125.00,
        quantity: quantity,
    };

    // Add product to cart
    cart.push(product);
    cartCount += quantity; // Update the total cart count
    cartTotal += product.price * quantity; // Update total price

    // Update cart count display
    document.getElementById('cart-count').textContent = cartCount;

    // Reset count to zero after adding to cart
    count = 0;
    countEl.textContent = count; // Reset the displayed count

    // Update cart details
    updateCartDetails();
  }
}

function updateCartDetails() {
  const cartItems = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-message');
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  cartItems.innerHTML = ''; // Kosongkan daftar item keranjang sebelumnya
  
  if (cart.length === 0) {
    // Jika keranjang kosong, tampilkan pesan "Cart is empty"
    emptyMessage.style.display = 'block';
    checkoutBtn.style.display = 'none'; // Sembunyikan tombol checkout
    
    // Reset ikon cart-count saat keranjang kosong
    document.getElementById('cart-count').style.display = 'none'; // Sembunyikan ikon cart
  } else {
    // Sembunyikan pesan "Cart is empty" jika ada produk
    emptyMessage.style.display = 'none';
    checkoutBtn.style.display = 'block'; // Tampilkan tombol checkout
    
    // Tambahkan produk ke dalam keranjang
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="cart-item">
          <img src="images/image-product-1.jpg" alt="${item.name}">
          <div class="item-details">
            <span>${item.name}</span>
            <span>$${item.price} x ${item.quantity} <span style="font-weight: 700;">$${(item.price * item.quantity).toFixed(2)}</span></span>

          </div>
          <button class="remove-item" onclick="removeItem('${item.name}')">
            <img src="images/icon-delete.svg" alt="delete">
          </button>
        </div>
      `;
      cartItems.appendChild(li);
    });

    // Tampilkan ikon cart-count dengan nilai terbaru
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-count').style.display = 'block'; // Tampilkan ikon cart
  }

  document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}

function toggleCart() {
  const cartDetails = document.getElementById('cart-details');
  cartDetails.classList.toggle('active');
}

function removeItem(productName) {
  const index = cart.findIndex(item => item.name === productName);
  if (index > -1) {
    const item = cart[index];

    // Kurangi total harga dan jumlah produk di keranjang
    cartTotal -= item.price * item.quantity;
    cartCount -= item.quantity; // Update jumlah total produk di keranjang

    // Hapus produk dari array cart
    cart.splice(index, 1);
    
    // Perbarui tampilan keranjang
    updateCartDetails();
    
    // Perbarui ikon keranjang
    document.getElementById('cart-count').textContent = cartCount;

    // Jika keranjang kosong, reset ikon cart-count
    if (cartCount === 0) {
      document.getElementById('cart-count').style.display = 'none'; // Sembunyikan ikon cart-count jika kosong
    } else {
      document.getElementById('cart-count').style.display = 'block'; // Tampilkan jika tidak kosong
    }
  }
}
