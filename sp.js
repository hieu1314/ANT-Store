// ================= PLAYLIST MUSIC WITH PERSIST =================

// 🎶 PLAYLIST
const playlist = [
  "music/back.mp3"
];

let currentTrack = parseInt(localStorage.getItem("currentTrack")) || 0;
let musicTime    = parseFloat(localStorage.getItem("musicTime")) || 0;
let musicPlaying = localStorage.getItem("musicPlaying") === "true";
let musicMuted   = localStorage.getItem("musicMuted") !== "false";

// 🔧 FIX PLAYLIST 1 BÀI
if (currentTrack >= playlist.length) {
  currentTrack = 0;
}

// 🎧 Audio
const bgMusic = new Audio(playlist[currentTrack]);
bgMusic.loop = false; // ❗ playlist nên để false
bgMusic.volume = 0.4;
bgMusic.muted = musicMuted;

// 🎵 nút nhạc
const musicBtn = document.querySelector(".music-btn");

// ===== LOAD =====
window.addEventListener("load", () => {
  if (musicPlaying) {
    bgMusic.currentTime = musicTime;

    bgMusic.play().then(() => {
      musicPlaying = true;   // 🔴 BỔ SUNG
      updateMusicUI();
    }).catch(() => {});
  } else {
    updateMusicUI();
  }
});

// ===== SAVE TIME =====
setInterval(() => {
  if (!bgMusic.paused) {
    localStorage.setItem("musicTime", bgMusic.currentTime);
  }
}, 1000);

// ===== AUTO NEXT TRACK =====
bgMusic.addEventListener("ended", () => {
  nextTrack();
});

// ===== NEXT TRACK =====
function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  localStorage.setItem("currentTrack", currentTrack);
  localStorage.setItem("musicTime", 0);

  bgMusic.src = playlist[currentTrack];
  bgMusic.currentTime = 0;

if (musicPlaying) {
  bgMusic.play().then(updateMusicUI).catch(() => {});
}

}

// ===== FIRST INTERACTION ENABLE SOUND =====
const enableSound = () => {
  if (bgMusic.muted && musicPlaying) {
    bgMusic.muted = false;
    localStorage.setItem("musicMuted", "false");
  }
  removeInteraction();
};

function removeInteraction() {
  document.removeEventListener("click", enableSound);
  document.removeEventListener("scroll", enableSound);
  document.removeEventListener("keydown", enableSound);
}

document.addEventListener("click", enableSound);
document.addEventListener("scroll", enableSound);
document.addEventListener("keydown", enableSound);

// ===== TOGGLE MUSIC =====
if (musicBtn) {
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        bgMusic.muted = false;
        musicPlaying = true;
        saveState();
        updateMusicUI();
      });
    } else {
      bgMusic.pause();
      musicPlaying = false;
      saveState();
      updateMusicUI();
    }
  });
}

// ===== UI =====
function updateMusicUI() {
  if (!musicBtn) return;

  if (musicPlaying && !bgMusic.paused) {
    musicBtn.classList.add("music-playing");
    musicBtn.classList.remove("music-paused");
  } else {
    musicBtn.classList.remove("music-playing");
    musicBtn.classList.add("music-paused");
  }
}

// ===== SAVE =====
function saveState() {
  localStorage.setItem("musicPlaying", musicPlaying);
  localStorage.setItem("musicMuted", bgMusic.muted);
  localStorage.setItem("currentTrack", currentTrack);
}

// ===== LOWER VOLUME WHEN DETAIL OPEN =====
const productDetail = document.getElementById("product-detail");
if (productDetail) {
  const observer = new MutationObserver(() => {
    bgMusic.volume = productDetail.classList.contains("hidden") ? 0.4 : 0.15;
  });
  observer.observe(productDetail, { attributes: true });
}

// ===== BEFORE LEAVE =====
window.addEventListener("beforeunload", () => {
  localStorage.setItem("musicTime", bgMusic.currentTime);
});
