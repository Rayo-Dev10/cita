const cardsData = [
  { title: "Quick Sync", duration: "15 minutos", type: "Virtual (Google Meet)", link: "https://calendly.com/rayo1429-est/quick-sync" },
  { title: "Normal Sync", duration: "30 minutos", type: "Virtual (Google Meet)", link: "https://calendly.com/rayo1429-est/30min" },
  { title: "Personal Sync", duration: "45 minutos", type: "Presencial", link: "https://calendly.com/rayo1429-est/presencial" }
];

function generateCards() {
  const container = document.getElementById("card-container");
  cardsData.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `<h2>${card.title}</h2><p><strong>Duración:</strong> ${card.duration}</p><p><strong>Tipo:</strong> ${card.type}</p>`;
    cardElement.addEventListener("click", () => showIframe(card.link));
    container.appendChild(cardElement);
  });
}

function showIframe(link) {
  const iframe = document.getElementById("calendly-iframe");
  iframe.src = link;
  document.getElementById("iframe-container").classList.add("visible");
  document.getElementById("card-container").style.display = "none";
  document.getElementById("page-title").style.opacity = "0"; // Oculta el título
  iframe.onload = () => setTimeout(() => scrollToBottom(), 1000);
}

function scrollToBottom() {
  const iframe = document.getElementById("calendly-iframe");
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframe.contentWindow.scrollTo(0, iframeDoc.body.scrollHeight);
  } catch (err) {
    console.warn("⚠️ No se pudo hacer scroll en el iframe (posible restricción CORS).");
  }
}

document.getElementById("back-button").onclick = () => {
  document.getElementById("iframe-container").classList.remove("visible");
  document.getElementById("card-container").style.display = "flex";
  document.getElementById("page-title").style.opacity = "1"; // Muestra el título nuevamente
};

// Ocultar el header gradualmente al hacer scroll
document.getElementById("calendly-iframe").addEventListener("load", () => {
  const iframeWindow = document.getElementById("calendly-iframe").contentWindow;
  iframeWindow.addEventListener("scroll", () => {
    const fixedHeader = document.getElementById("fixed-header");
    fixedHeader.style.opacity = Math.max(1 - (iframeWindow.scrollY / 100), 0);
  });
});

document.addEventListener("DOMContentLoaded", generateCards);
