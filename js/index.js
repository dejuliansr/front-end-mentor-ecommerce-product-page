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
  if (cartDropdown.classList.contains('active')) {
    // Jika sudah aktif, tambah kelas 'closing' untuk animasi penutupan
    cartDropdown.classList.add('closing');
    
    // Tunggu sampai animasi selesai, baru sembunyikan
    setTimeout(() => {
      cartDropdown.classList.remove('active');
      cartDropdown.classList.remove('closing');
      cartDropdown.style.display = 'none';
    }, 300); // Tunggu selama durasi animasi
  } else {
    // Jika tidak aktif, tampilkan dengan animasi pembukaan
    cartDropdown.classList.add('active');
    cartDropdown.style.display = 'block';
  }
});

// Close dropdown if clicked outside
window.addEventListener('click', (e) => {
  if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
    cartDropdown.classList.add('closing');
    setTimeout(() => {
      cartDropdown.classList.remove('active');
      cartDropdown.classList.remove('closing');
      cartDropdown.style.display = 'none';
    }, 300); // Tunggu sampai animasi selesai
  }
});

// Mengubah gambar utama ketika thumbnail diklik
const thumbs = document.querySelectorAll('.thumb');
const mainImg = document.querySelector('.main-img');
let currentIndex = 0;

thumbs[0].classList.add('active');

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', (event) => {
    event.stopPropagation(); // Hentikan event bubbling agar tidak memicu event lain

    if (index === currentIndex) return; // Hindari animasi jika gambar yang sama diklik

    const activeThumb = document.querySelector('.thumb.active');
    if (activeThumb) activeThumb.classList.remove('active');
    thumb.classList.add('active');

    // Tentukan arah swipe
    const direction = index > currentIndex ? "right" : "left";
    const exitClass = direction === "right" ? "exit-left" : "exit-right";
    const enterClass = direction === "right" ? "enter-right" : "enter-left";
    
    // Tambahkan animasi keluar
    mainImg.classList.add(exitClass);

    setTimeout(() => {
      // Ganti gambar setelah animasi keluar
      mainImg.src = thumb.src;

      // Hapus class animasi keluar dan tambahkan animasi masuk
      mainImg.classList.remove(exitClass);
      mainImg.classList.add(enterClass);

      setTimeout(() => {
        mainImg.classList.remove(enterClass);
      }, 500); // Sesuai durasi animasi CSS
    }, 300);

    currentIndex = index;
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxImgMobile = document.getElementById('lightbox-img-mobile');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtnMobile = document.getElementById('prev-btn-mobile');
const nextBtnMobile = document.getElementById('next-btn-mobile');

const productImages = [
  'https://github.com/dejuliansr/front-end-mentor-ecommerce-product-page/blob/master/images/image-product-1.jpg?raw=true',
  'https://github.com/dejuliansr/front-end-mentor-ecommerce-product-page/blob/master/images/image-product-2.jpg?raw=true',
  'https://github.com/dejuliansr/front-end-mentor-ecommerce-product-page/blob/master/images/image-product-3.jpg?raw=true',
  'https://github.com/dejuliansr/front-end-mentor-ecommerce-product-page/blob/master/images/image-product-4.jpg?raw=true'
];

let currentImageIndex = 0;

// Event listener untuk menampilkan lightbox ketika gambar produk diklik
productImage.addEventListener('click', () => {
  lightbox.style.display = 'flex';
  lightboxImg.src = productImage.src; // Set gambar di lightbox sama dengan gambar produk utama
});

// Event listener untuk menutup lightbox
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

function updateLightboxImage(index, direction) {
  if (index < 0) index = productImages.length - 1;
  if (index >= productImages.length) index = 0;

  // Hapus class 'active' dari thumbnail yang sedang aktif
  const activeThumb = document.querySelector('.lightbox-thumb.active');
  if (activeThumb) activeThumb.classList.remove('active');

  // Tambahkan class 'active' pada thumbnail baru
  lightboxThumbs[index].classList.add('active');

  const exitClass = direction === 'right' ? 'exit-left' : 'exit-right';
  const enterClass = direction === 'right' ? 'enter-right' : 'enter-left';

  lightboxImg.classList.add(exitClass);

  setTimeout(() => {
    lightboxImg.src = productImages[index];

    // Hapus animasi keluar dan tambahkan animasi masuk
    lightboxImg.classList.remove(exitClass);
    lightboxImg.classList.add(enterClass);

    setTimeout(() => {
      lightboxImg.classList.remove(enterClass);
    }, 500);
  }, 300);

  currentImageIndex = index;
}


// Fungsi untuk mengganti gambar utama di lightbox (versi mobile) dengan animasi
function updateLightboxImageMobile(index, direction) {
  if (index < 0) index = productImages.length - 1;
  if (index >= productImages.length) index = 0;

  const exitClass = direction === 'right' ? 'exit-left' : 'exit-right';
  const enterClass = direction === 'right' ? 'enter-right' : 'enter-left';

  lightboxImgMobile.classList.add(exitClass);

  setTimeout(() => {
    lightboxImgMobile.src = productImages[index];

    lightboxImgMobile.classList.remove(exitClass);
    lightboxImgMobile.classList.add(enterClass);

    setTimeout(() => {
      lightboxImgMobile.classList.remove(enterClass);
    }, 500);
  }, 300);

  currentImageIndex = index;
}

// Event listener untuk tombol Previous dan Next (desktop)
prevBtn.addEventListener('click', () => updateLightboxImage(currentImageIndex - 1, 'left'));
nextBtn.addEventListener('click', () => updateLightboxImage(currentImageIndex + 1, 'right'));

// Event listener untuk tombol Previous dan Next (mobile)
prevBtnMobile.addEventListener('click', () => updateLightboxImageMobile(currentImageIndex - 1, 'left'));
nextBtnMobile.addEventListener('click', () => updateLightboxImageMobile(currentImageIndex + 1, 'right'));



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
          <img src="https://github.com/dejuliansr/front-end-mentor-ecommerce-product-page/blob/master/images/image-product-1.jpg?raw=true" alt="${item.name}">
          <div class="item-details">
            <span style="color: hsl(222, 7.00%, 63.30%); font-weight: 500;">${item.name}</span>
            <span style="color: hsl(222, 7.00%, 63.30%); font-weight: 500;">$${item.price} x ${item.quantity} <span style="font-weight: 700; color:black;">$${(item.price * item.quantity).toFixed(2)}</span></span>

          </div>
          <button class="remove-item" onclick="removeItem('${item.name}')">
            <img src="https://raw.githubusercontent.com/dejuliansr/front-end-mentor-ecommerce-product-page/0fc43f451abd98226bd314d4bf7f08399476c5b2/images/icon-delete.svg" alt="delete">
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

const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutPopup = document.getElementById('checkout-popup');
const closePopupBtn = document.getElementById('close-popup');

checkoutBtn.addEventListener('click', () => {
  checkoutPopup.classList.add('active');
  if (cart.length > 0) { // Pastikan keranjang tidak kosong
    checkoutPopup.classList.remove('hidden'); // Tampilkan pop-up
  }
  // Kosongkan keranjang
  cart = [];
  cartCount = 0;
  cartTotal = 0;

  // Perbarui tampilan keranjang
  updateCartDetails();
});

// Event listener untuk tombol tutup pop-up
closePopupBtn.addEventListener('click', () => {
  checkoutPopup.classList.add('hidden'); // Sembunyikan pop-up
});