const API_URL = "https://holy-feather-31e1.lilabenrathva1989.workers.dev/";

async function sendMsg() {
  const msg = document.getElementById("msg").value.trim();
  if (!msg) return;

  const chatDiv = document.getElementById("chat");
  chatDiv.innerHTML += "<b>You:</b> " + msg + "<br>";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    chatDiv.innerHTML += "<b>Holy-Feather:</b> " + data.reply + "<br><br>";
    chatDiv.scrollTop = chatDiv.scrollHeight;

    // 👀 Teaching mode popup
    if (data.needTeaching) {
      const teachMsg = prompt("Holy-Feather nahi jaanta 😭. Aap bata sakte ho?");
      if (teachMsg) {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: teachMsg, teach: true, lastQuestion: data.lastQuestion })
        });
        chatDiv.innerHTML += "<b>Holy-Feather:</b> Thanks bhai! 😎 Maine seekh liya.<br><br>";
      }
    }

  } catch (err) {
    chatDiv.innerHTML += "<b>Holy-Feather:</b> Error connecting 😭<br><br>";
  }

  document.getElementById("msg").value = "";
}
