const API_URL = "https://sweetscan.onrender.com/chat";

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();

  if (!text) return;

  add(text, "user");
  input.value = "";

  add("🍬 pensando...", "bot");

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: text })
  })
    .then(res => res.json())
    .then(data => {
      removeTyping();
      add(data.reply, "bot");
    })
    .catch(() => {
      removeTyping();
      add("❌ Error al conectar con la IA", "bot");
    });
}

function add(text, type) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  document.querySelectorAll(".msg").forEach(m => {
    if (m.innerText.includes("pensando")) m.remove();
  });
}

/* ✅ ENTER FIJO (ESTA ES LA VERSIÓN QUE NO FALLA) */
window.onload = function () {
  const input = document.getElementById("input");

  if (!input) {
    console.error("No se encontró el input");
    return;
  }

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  });
};
