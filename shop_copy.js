const API_URL = "http://localhost:5000/api/orders";
const user = JSON.parse(localStorage.getItem("user")); // logged-in user

/* ================= PRODUCTS ================= */
const products = [
  {id:1,title:"MM Calligraphy Set 33pc",category:"colored_pencils",price:12,stock:true,img:"images_shop/MM Calligraph.png"},
  {id:2,title:"Acrylic Paint Set of 36",category:"acrylic",price:200,stock:true,img:"images_shop/Acrylic Gouache Paint.png"},
  {id:3,title:"Gouache Paint",category:"colored_pencils",price:380,stock:false,img:"images_shop/LUK STUDIO GOUACHE 6X20ML SET.png"},
  {id:4,title:"Lukas Watercolour 24",category:"watercolor",price:55,stock:true,img:"images_shop/Lukas Terzia Gouache Opaque Watercolour 24 Colours + 1 Tube White.png"},
  {id:5,title:"LUK GOUACHE 12X20ML",category:"watercolor",price:94,stock:false,img:"images_shop/LUK STUDIO GOUACHE 12X20ML STARTER SET.png"},
  {id:6,title:"Palette Pad 40 Sheets",category:"watercolor",price:40,stock:true,img:"images_shop/Disposable Palette Pad, 9 x 12 in, 40 Sheets - Pack of 1.png"},
  {id:7,title:"Gouache Paint Set",category:"watercolor",price:380,stock:true,img:"images_shop/Gouache Paint & Tool Small Art Set.png"},
  {id:8,title:"Drawing Tools 35 Piece",category:"markers",price:12,stock:true,img:"images_shop/Drawing & Detailing Accessory Tools - 35 Piece Set.png"},
  {id:9,title:"Calligraphy Dip Pen Set",category:"markers",price:30,stock:false,img:"images_shop/Caligraphy Dip Pen Se.png"},
  {id:10,title:"Calligraphy 2 Nib Set",category:"markers",price:20,stock:true,img:"images_shop/Caligraphy 2 Nib Pen Set.png"},

  {id:11,title:"38ML Indian Red Paint",category:"acrylic",price:18,stock:true,img:"images_shop/38ML GOC INDIAN RED.png"},
  {id:12,title:"Oil Paint 200ML Turquoise",category:"acrylic",price:48,stock:true,img:"images_shop/LUK STUDIO OIL 200ML TURQUOISE.png"},
  {id:13,title:"Oil Paint 37ML Burnt Umber",category:"acrylic",price:15,stock:false,img:"images_shop/LUK STUDIO OIL 37ML BURNT UMBER.png"},

  {id:14,title:"Painting Brush Set 9pcs",category:"brushes",price:22,stock:true,img:"images_shop/Art Asia 5pc Mix Pink Synthetic Hair Paint Brush Set of 5.png"},
  {id:15,title:"Flat Paintbrush Set 3pcs",category:"brushes",price:28,stock:true,img:"images_shop/Art Asia Synthetic Triple Hair Flat Paintbrush - Set of 3.png"},
  {id:16,title:"Chinese Painting Brushes 4pcs",category:"brushes",price:16,stock:true,img:"images_shop/CHINESE PAINTING BRUSHES SET OF 4.png"},

  {id:17,title:"Canvas with Easel 24x30cm",category:"canvas",price:15,stock:true,img:"images_shop/CREATIVA CANVAS WITH EASEL 24X30CM.jpg"},
  {id:18,title:"Stretched Canvas 15x15cm",category:"canvas",price:25,stock:true,img:"images_shop/CREATIVA CANVAS WITH EASEL 24X30CM.jpg"},
  {id:19,title:"Canvas 30x30cm",category:"canvas",price:10,stock:false,img:"images_shop/CREATIVA CANVAS WITH EASEL 24X30CM.jpg"},

  {id:21,title:"Oil & Acrylic Block 10 Sheets",category:"sketchbooks",price:12,stock:true,img:"images_shop/OIL AND ACRYLICBLOCK 230GSM 24X32CM 10SHEETS.jpg"},
  {id:22,title:"Sketchpad A5 25 Sheets",category:"sketchbooks",price:22,stock:true,img:"images_shop/SKETCHPAD.jpg"},
  {id:23,title:"Acrylic Block 10 Sheets",category:"sketchbooks",price:8,stock:false,img:"images_shop/10628144 ACRYLICBLOCK 360GSM 42X56CM 10SHEETS.jpg"},

  {id:24,title:"Charcoal Pencils 12pc",category:"charcoal",price:9,stock:true,img:"images_shop/Mont Marte Charcoal Pencils 12pc.png"},
  {id:25,title:"Compressed Charcoal 6pcs",category:"charcoal",price:6,stock:true,img:"images_shop/SINOART COMPRESSED CHARCOAL 6PCS.png"},
  {id:26,title:"Coloured Charcoal Pencils 4pc",category:"charcoal",price:11,stock:true,img:"images_shop/Mont Marte Coloured Charcoal Pencils 4pc.png"},

  {id:27,title:"Air Dry Clay Terracotta 500g",category:"premium",price:56,stock:true,img:"images_shop/27072 JOVI AIR DRY CLAY TERRACOTTA 500g.png"},
  {id:28,title:"Oil Pastels 36 Colors",category:"premium",price:48,stock:false,img:"images_shop/COLORINO ARTIST OIL PASTEL -36 COLORS.png"},
  {id:29,title:"Oil Pastels 36pc Tin Box",category:"premium",price:42,stock:true,img:"images_shop/MM Oil Pastels 36pc Tin Box.png"},

  {id:30,title:"Blender Colourless Marker",category:"markers",price:33,stock:true,img:"images_shop/0 Blender Colourless Sketch Marker.png"},
  {id:31,title:"Silkscreen Stencil 40139",category:"markers",price:26,stock:true,img:"images_shop/40139 SILKSCREEN STENCIL.png"},
  {id:32,title:"Acrylic Color Pad",category:"colored_pencils",price:5,stock:true,img:"images_shop/colors pad.png"},
  {id:33,title:"Sponge Brushes Set 5pcs",category:"brushes",price:7,stock:true,img:"images_shop/5935 SPONGE BRUSHES 5PCSSET.png"},
  {id:34,title:"Glossy Effect Light Blue 100ml",category:"sketchbooks",price:14,stock:true,img:"images_shop/3DG3 3D GLOSSY EFFECT LIGHT BLUE 100ML.png"}
];
function filterProducts(type, el){
  document
    .querySelectorAll(".filter-card")
    .forEach(card => card.classList.remove("active"));

  el.classList.add("active");

  let filtered = type === "all"
    ? products
    : products.filter(p => p.category === type);

  renderProducts(filtered);
}


/* ================= ELEMENTS ================= */
const shop = document.getElementById("shop");
const cartIcon = document.getElementById("cartIcon");
const cartDropdown = document.getElementById("cartDropdown");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalEl = document.getElementById("total");
const stockPopup = document.getElementById("stockPopup");
const locationPopup = document.getElementById("locationPopup");

let cart = [];
function renderProducts(list){
  shop.innerHTML = "";
  list.forEach(p => {
    // Random rating for demo
    const rating = Math.floor(Math.random()*3) + 3;
    let stars = "";
    for(let i=0;i<5;i++){
      stars += i<rating ? "★" : "☆";
    }

    // Top seller badge for demo
    const topSeller = Math.random() > 0.7 ? '<div class="top-seller">Top Seller</div>' : '';

    // Product description (you can customize per product if needed)
    const description = "High-quality art product for creative use.";

    shop.innerHTML += `
      <div class="card ${p.stock ? 'available' : 'out'}">
        ${topSeller}
        <img src="${p.img}" alt="${p.title}">
        <h4>${p.title}</h4>
        <p class="description">${description}</p>
        <p class="stars">${stars}</p>
        <p class="price">$${p.price}</p>
        <button onclick="addToCart(${p.id}, this)">Add</button>
      </div>
    `;
  });
}

/* ================= CART ================= */
function addToCart(id, btn){
  const product = products.find(p => p.id === id);
  if(!product.stock){
    stockPopup.style.display = "flex";
    return;
  }

  cart.push(product);
  updateCart();

  btn.classList.add("pulse");
  setTimeout(()=>btn.classList.remove("pulse"), 400);
}

function updateCart(){
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <strong>${item.title}</strong><br>
          $${item.price}
        </div>
        <span class="trash" onclick="removeItem(${i})">🗑</span>
      </div>
    `;
  });

  cartCount.textContent = cart.length;
  totalEl.textContent = total;
}

/* ================= REMOVE ITEM ================= */
function removeItem(i){
  cart.splice(i,1);
  updateCart();
}

/* ================= DROPDOWN ================= */
cartIcon.onclick = () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "block" ? "none" : "block";
};

/* ================= CHECKOUT ================= */
function openCheckout(){
  document.getElementById("cartView").style.display = "none";
  document.getElementById("paymentView").style.display = "block";
}

function openLocation(){
  locationPopup.style.display = "flex";
}

function closeLocationPopup(){
  locationPopup.style.display = "none";
}

function closeStockPopup(){
  stockPopup.style.display = "none";
}

async function finishOrder() {
  for (let item of cart) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: item.title,
        price: item.price,
        image: item.img
      })
    });

    const data = await res.json();
    console.log("Order saved:", data);
  }

  alert("✅ Order saved to database!");
  cart = [];
  updateCart();
  closeLocationPopup();
}

/* ================= FILTER ================= */
function filterProducts(type, el){
  document.querySelectorAll(".circle").forEach(c=>c.classList.remove("active"));
  el.classList.add("active");

  const filtered = type==="all" ? products : products.filter(p=>p.category===type);
  renderProducts(filtered);
}

/* ================= PAYMENT SWITCH ================= */
function switchPay(type, btn){
  document.querySelectorAll(".pay-switch button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("paymentCard").style.display = type==="card"?"block":"none";
  document.getElementById("cashMsg").style.display = type==="cash"?"block":"none";
}

/* ================= INIT ================= */
renderProducts(products);
updateCart();
