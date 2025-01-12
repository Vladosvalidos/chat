const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");

// Функция отправки сообщения
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Добавляем сообщение пользователя
    addMessage("user", message);
    userInput.value = "";

    try {
        // Запрос к OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // Вставь свой API ключ
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // Добавляем сообщение бота
        addMessage("bot", botMessage);
    } catch (error) {
        console.error("Ошибка запроса:", error);
        addMessage("bot", "Извините, произошла ошибка. Попробуйте снова.");
    }
}

// Функция отображения сообщений
function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Автопрокрутка
}
