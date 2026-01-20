const typewriters = document.querySelectorAll('.typewriter');

typewriters.forEach(el => {
  el.addEventListener('animationend', (e) => {
    if (e.animationName === 'typing') {
      el.classList.add('done'); // thêm class 'done' cho từng p
    }
  });
});

const items = document.querySelectorAll('.menu ul li');
const indicator = document.querySelector('.menu .indicator');

// ===== XÁC ĐỊNH ITEM ACTIVE =====
let activeItem = items[0]; // mặc định Trang chủ

items.forEach(item => {
  const link = item.querySelector('a');
  if (link.href === window.location.href) {
    activeItem = item;
  }
});

// ===== DI CHUYỂN INDICATOR =====
function moveIndicator(el) {
  indicator.style.width = el.offsetWidth + 'px';
  indicator.style.left = el.offsetLeft + 'px';
}

// ===== GÁN SỰ KIỆN =====
items.forEach(item => {
  // Hover (desktop)
  item.addEventListener('mouseenter', () => {
    moveIndicator(item);
  });

  // Rời chuột → quay về active
  item.addEventListener('mouseleave', () => {
    moveIndicator(activeItem);
  });

  // Touch (mobile)
  item.addEventListener('touchstart', () => {
    moveIndicator(item);
  });
});

// ===== VỊ TRÍ BAN ĐẦU =====
window.addEventListener('load', () => {
  moveIndicator(activeItem);
});
