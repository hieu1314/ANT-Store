/*********************************
 * DOM READY
 *********************************/
document.addEventListener("DOMContentLoaded", () => {

  /*********************************
   * TYPEWRITER
   *********************************/
  const typewriters = document.querySelectorAll(".typewriter");
  typewriters.forEach(el => {
    el.addEventListener("animationend", e => {
      if (e.animationName === "typing") {
        el.classList.add("done");
      }
    });
  });

  /*********************************
   * BIẾN DOM
   *********************************/
  const cards = document.querySelectorAll(".card");
  const cardWrapper = document.querySelector(".card-wrapper");

  const detail = document.getElementById("product-detail");
  const title = document.getElementById("detail-title");
  const desc = document.getElementById("detail-desc");
  const gallery = document.querySelector(".gallery");

  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");
  const closePopupBtn = popup.querySelector(".close");

  if (!cards.length || !detail) return;

  /*********************************
   * DATA SẢN PHẨM
   *********************************/
  const data = [
    {
      title: "Dâu Mộc Châu",
      desc: `
<strong>🍓 Dâu tươi Mộc Châu - Sơn La</strong><br>
🌿 Trồng tại cao nguyên mát lành<br>
🧺 Thu hoạch trong ngày – không bảo quản<br>
✈️ Ship toàn quốc
`,
      media: [
        "img/dau1.jpg","img/dau2.jpg","img/dau3.jpg",
        "img/dau4.jpg","img/dau5.jpg","img/dau6.jpg",
        "img/dau7.jpg","img/dau8.jpg","img/dau9.jpg",
        "video/dau1.mp4"
      ]
    },
    {
      title: "Cafe chất",
      desc: "Cafe rang mộc – đậm vị – không pha trộn.",
      media: ["img/cafe1.jpg", "img/cafe2.jpg"]
    },
    {
      title: "Hạt điều",
      desc: "Hạt điều rang muối – giòn béo tự nhiên.",
      media: ["img/dieu1.jpg", "video/dieu.mp4"]
    },
    {
      title: "Mật ong",
      desc: "Mật ong nguyên chất.",
      media: ["img/dieu1.jpg"]
    },
    {
      title: "Gạo ST25",
      desc: "Gạo ST25 – hạt ngọc Việt.",
      media: ["img/dieu1.jpg"]
    },
    {
      title: "Nước mắm 584",
      desc: "Nước mắm nhĩ truyền thống.",
      media: ["img/dieu1.jpg"]
    }
  ];

  /*********************************
   * CLICK CARD → CHI TIẾT
   *********************************/
  cards.forEach((card, index) => {
    if (!data[index]) return;

    card.addEventListener("click", () => {
      cardWrapper.style.display = "none";
      detail.classList.remove("hidden");

      title.textContent = data[index].title;
      title.style.color = "#2d6a4f";
      desc.innerHTML = data[index].desc;

      gallery.innerHTML = "";
      data[index].media.forEach(src => {
        if (src.endsWith(".mp4")) {
          gallery.insertAdjacentHTML(
            "beforeend",
            `<video src="${src}" controls playsinline></video>`
          );
        } else {
          gallery.insertAdjacentHTML(
            "beforeend",
            `<img src="${src}" alt="">`
          );
        }
      });

      calcTotal(); // 👈 tính lại tiền khi mở sản phẩm
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /*********************************
   * BACK BUTTON
   *********************************/
  const backBtn = document.querySelector(".back-btn");
  backBtn?.addEventListener("click", () => {
    detail.classList.add("hidden");
    cardWrapper.style.display = "grid";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /*********************************
   * POPUP MEDIA
   *********************************/
  document.addEventListener("click", e => {
    const target = e.target.closest(".gallery img, .gallery video");
    if (!target) return;

    popup.classList.remove("hidden");
    popupContent.innerHTML = target.outerHTML;
    document.body.style.overflow = "hidden";
  });

  const closePopup = () => {
    popup.classList.add("hidden");
    popupContent.innerHTML = "";
    document.body.style.overflow = "";
  };

  closePopupBtn?.addEventListener("click", closePopup);
  popup.addEventListener("click", e => {
    if (e.target === popup) closePopup();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePopup();
  });

  /*********************************
   * MUA HÀNG
   *********************************/
  const qtyInput = document.getElementById("qty");
  const boxSelect = document.getElementById("box");
  const sizeSelect = document.getElementById("size");
  const totalEl = document.getElementById("total");

  // 👇 GIÁ THEO LOẠI
  const PRICE_BY_SIZE = {
    small: 180000,
    medium: 220000,
    large: 260000
  };

  function calcTotal() {
    const qty  = +qtyInput.value;
    const box  = +boxSelect.value;
    const size = sizeSelect.value;

    const price = PRICE_BY_SIZE[size] || 0;
    const total = qty * box * price;

    totalEl.textContent = total.toLocaleString("vi-VN") + "₫";
  }

  qtyInput?.addEventListener("input", calcTotal);
  boxSelect?.addEventListener("change", calcTotal);
  sizeSelect?.addEventListener("change", calcTotal);

  document.querySelector(".qty-plus")?.addEventListener("click", () => {
    qtyInput.value++;
    calcTotal();
  });

  document.querySelector(".qty-minus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, qtyInput.value - 1);
    calcTotal();
  });

  document.querySelector(".cancel-btn")?.addEventListener("click", () => {
    qtyInput.value = 0;
    boxSelect.value = "0.5";
    sizeSelect.value = "small";
    calcTotal();
  });

  /*********************************
   * ADD TO CART
   *********************************/
  document.querySelector(".buy-btn")?.addEventListener("click", () => {
    const size = sizeSelect.value;

    const sizeLabel =
      size === "small" ? "Nhỏ" :
      size === "medium" ? "Vừa" : "To";

    const item = {
      title: `${title.textContent} (${sizeLabel})`,
      qty: +qtyInput.value,
      box: boxSelect.value,
      price: PRICE_BY_SIZE[size],
      total: parseInt(totalEl.textContent.replace(/\D/g, ""))
    };

    addToCart(item);   // từ cart.js
    showCartToast();   // từ cart.js
  });

});
