const ChatbotView = {
    launcherEl: null,
    widgetEl: null,
    titleEl: null,
    messagesEl: null,
    formEl: null,
    inputEl: null,

    init() {
        this.launcherEl = document.getElementById('chatbot-launcher');
        this.widgetEl = document.getElementById('chatbot-widget');
        this.titleEl = document.getElementById('chatbot-widget-title');
        this.messagesEl = document.getElementById('chatbot-messages');
        this.formEl = document.getElementById('chatbot-input-form');
        this.inputEl = document.getElementById('chatbot-input');
    },

    addMessage(text, sender, topics = [], questions = []) {
        const messageEl = document.createElement('div');
        messageEl.className = `${sender}-message`;
        let messageContent = `<p>${text}</p>`; 
        
       
        if (topics.length > 0) {
            messageContent += '<div class="bot-options">';
            topics.forEach(topic => {
                messageContent += `<button class="chatbot-topic" data-topic="${topic.topic}">${topic.topic}</button>`;
            });
            messageContent += '</div>';
        }
        
       
        if (questions.length > 0) {
            messageContent += '<div class="bot-options">';
            questions.forEach(qa => {
                messageContent += `<button class="chatbot-question">${qa.question}</button>`;
            });
            
            messageContent += '<button class="chatbot-back-btn">← Back to Topics</button>';
            messageContent += '</div>';
        }
        
        messageEl.innerHTML = messageContent;
        this.messagesEl.appendChild(messageEl);
        this.scrollToBottom();
    },

    addAnswerMessage(answer) {
        const messageEl = document.createElement('div');
        messageEl.className = 'bot-message';
        let messageContent = `<p>${answer.text}</p>`;
        if (answer.mudraKey) {
            const mudra = ChatbotModel.mudras[answer.mudraKey];
            if (mudra) {
                messageContent += `
                    <div class="mudra-card">
                        <img src="${mudra.image}" alt="${mudra.name}" class="mudra-image">
                        <div class="mudra-details">
                            <h4>${mudra.name}</h4>
                            <p>${mudra.description}</p>
                        </div>
                    </div>
                `;
            }
        }
        messageEl.innerHTML = messageContent;
        this.messagesEl.appendChild(messageEl);
        this.scrollToBottom();
    },

    displayWelcomeMessage(bodyType) {
        const formattedBodyType = bodyType.charAt(0).toUpperCase() + bodyType.slice(1);
        this.titleEl.textContent = `Your ${formattedBodyType} Guide`;
        this.messagesEl.innerHTML = ''; 
    },

    clearInput() { this.inputEl.value = ''; },
    scrollToBottom() { this.messagesEl.scrollTop = this.messagesEl.scrollHeight; },

    toggle() {
        this.widgetEl.classList.toggle('open');
        if (this.widgetEl.classList.contains('open')) {
            this.inputEl.focus();
        }
    },
    
    showLauncher() { this.launcherEl.style.display = 'flex'; },
    hideAll() {
        if (this.launcherEl) { this.launcherEl.style.display = 'none'; }
        if (this.widgetEl) { this.widgetEl.classList.remove('open'); }
    }
};