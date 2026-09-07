var chapterTemplates = {};

document.addEventListener("DOMContentLoaded", function () {
  var chapters = document.querySelectorAll(".section-bolum");
  chapters.forEach(function (ch) {
    chapterTemplates[ch.id] = ch.cloneNode(true);
    if (!ch.classList.contains("active")) {
      ch.remove();
    }
  });
});

function showChapter(chapterId) {
  var readingArea = document.getElementById("reading-area");
  if (!readingArea) return;

  readingArea.innerHTML = "";

  if (chapterTemplates[chapterId]) {
    var newChapter = chapterTemplates[chapterId].cloneNode(true);
    newChapter.classList.add("active");
    readingArea.appendChild(newChapter);
  }

  // Sadece active sınıfını temizliyoruz, renk gruplarına (id'lere) asla dokunmuyoruz
  var menuLinks = document.querySelectorAll(".chapters-list a");
  menuLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  // Tıklanan yeni linke renkleri bozmadan sadece active özelliğini ekliyoruz
  var targetLink = document.getElementById("link-" + chapterId);
  if (targetLink) {
    targetLink.classList.add("active");
  }

  readingArea.scrollTop = 0;
}

// Sezonlar arasında geçişi sağlayan fonksiyon
function switchSeason(seasonNumber) {
  // 1. Önce tüm sezon listelerini sağ bardan gizle
  document.getElementById("season-1-list").style.display = "none";
  document.getElementById("season-2-list").style.display = "none";

  // 2. Tüm sezon butonlarının aktiflik (kırmızı) rengini temizle
  document.getElementById("tab-s1").classList.remove("active");
  document.getElementById("tab-s2").classList.remove("active");

  // 3. Sadece seçilen sezonun listesini göster ve butonunu kırmızı yap
  document.getElementById("season-" + seasonNumber + "-list").style.display =
    "block";
  document.getElementById("tab-s" + seasonNumber).classList.add("active");

  // Sezon değiştiği an okuma ekranını o sezonun ilk bölümüne otomatik geçirir
  if (seasonNumber === 1) {
    showChapter("bolum01");
  } else if (seasonNumber === 2) {
    showChapter("s2-bolum01");
  } else if (seasonNumber === 3) {
    showChapter("s3-bolum01");
  } else if (seasonNumber === 4) {
    showChapter("s4-bolum01");
  }
}

// Gece modunu açıp kapatan ve hafızada tutan fonksiyon
function toggleDarkMode() {
  var body = document.body;
  var btn = document.getElementById("dark-mode-btn");

  // Sitenin üzerine .dark-mode sınıfını ekle veya çıkar
  body.classList.toggle("dark-mode");

  // Butonun yazısını ve logosunu anlık olarak güncelle
  if (body.classList.contains("dark-mode")) {
    btn.innerHTML = "☀️ Gündüz Modu";
    localStorage.setItem("tema", "karanlik"); // Okuyucu sayfayı yenilese bile karanlık kalır
  } else {
    btn.innerHTML = "🌙 Gece Modu";
    localStorage.setItem("tema", "aydınlık");
  }
}

// Okuyucu siteye girdiğinde en son hangi modda bıraktıysa otomatik onu açar
document.addEventListener("DOMContentLoaded", function () {
  var kaydedilenTema = localStorage.getItem("tema");
  if (kaydedilenTema === "karanlik") {
    document.body.classList.add("dark-mode");
    var btn = document.getElementById("dark-mode-btn");
    if (btn) btn.innerHTML = "☀️ Gündüz Modu";
  }
});
