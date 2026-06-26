https://sweetscan.onrender.com

function send() {
  let input = document.getElementById("input");
  let text = input.value.trim();
  if (!text) return;

  add(text, "user");
  input.value = "";

  add("🍬 pensando...", "bot");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
  .then(res => res.json())
  .then(data => {
    removeTyping();
    add(data.reply, "bot");
  });
}

function add(text, type) {
  let chat = document.getElementById("chat");

  let div = document.createElement("div");
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
