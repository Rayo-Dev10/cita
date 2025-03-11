const cardsData = [
  { title: "Quick Sync", duration: "15 minutos", type: "Virtual (Google Meet)", link: "https://calendly.com/rayo1429-est/quick-sync" },
  { title: "Normal Sync", duration: "30 minutos", type: "Virtual (Google Meet)", link: "https://calendly.com/rayo1429-est/30min" },
  { title: "Personal Sync", duration: "45 minutos", type: "Presencial", link: "https://calendly.com/rayo1429-est/presencial" }
];

function generateCards() {
  const container = document.getElementById("card-container");
  cardsData.forEach(({ title, duration, type, link }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h2>${title}</h2><p><strong>Duración:</strong> ${duration}</p><p><strong>Tipo:</strong> ${type}</p>`;
    card.onclick = () => showIframe(link);
    container.appendChild(card);
  });
}

function showIframe(link) {
  document.getElementById("calendly-iframe").src = link;
  document.getElementById("iframe-container").classList.add("visible");
  document.getElementById("card-container").style.display = "none";
}

document.getElementById("back-button").onclick = () => {
  document.getElementById("iframe-container").classList.remove("visible");
  document.getElementById("card-container").style.display = "flex";
};

document.addEventListener("DOMContentLoaded", generateCards);
