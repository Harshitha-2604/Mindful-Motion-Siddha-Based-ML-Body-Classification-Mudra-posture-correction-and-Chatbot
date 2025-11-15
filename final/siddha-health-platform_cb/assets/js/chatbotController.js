const ChatbotController = {
    topics: [],
    allQuestions: [],
    bodyType: '',
    
    init() {
        ChatbotView.init(); 
        ChatbotVoice.init(); // Initialize voice module
        
        ChatbotView.launcherEl.addEventListener('click', () => ChatbotView.toggle());
        document.getElementById('chatbot-close-btn').addEventListener('click', () => {
            ChatbotView.toggle();
            ChatbotVoice.stopSpeaking(); // Stop speaking when closed
        });
        ChatbotView.formEl.addEventListener('submit', this.handleUserInput.bind(this));
        ChatbotView.messagesEl.addEventListener('click', this.handleButtonClick.bind(this));
    },
    
    start(bodyType) {
        this.bodyType = bodyType;
        this.topics = ChatbotModel.getTopics(bodyType);
        this.allQuestions = ChatbotModel.getAllQuestions(bodyType);
        ChatbotView.displayWelcomeMessage(bodyType); 
        
        setTimeout(() => {
            const greeting = "Vanakkam! Hello!";
            ChatbotView.addMessage(greeting, 'bot');
            ChatbotVoice.speak(greeting);
        }, 500);

        setTimeout(() => {
            const welcomeMsg = "I'm your personalized guide. You can ask a question directly, or choose from the topics below to explore specific areas:";
            ChatbotView.addMessage(
                welcomeMsg,
                'bot',
                this.topics  
            );
            ChatbotVoice.speak(welcomeMsg);
        }, 2500); 

        ChatbotView.showLauncher();
    },

    handleUserInput(event) {
        event.preventDefault();
        const userInput = ChatbotView.inputEl.value.trim();
        if (!userInput) return;
        
        // Stop any ongoing speech when user sends new message
        ChatbotVoice.stopSpeaking();
        
        ChatbotView.addMessage(userInput, 'user');
        ChatbotView.clearInput();
        setTimeout(() => this.processInput(userInput), 500);
    },

    handleButtonClick(event) {
        // Stop speaking when user clicks any button
        ChatbotVoice.stopSpeaking();
        
        if (event.target.classList.contains('chatbot-topic')) {
            const topicName = event.target.getAttribute('data-topic');
            ChatbotView.addMessage(topicName, 'user');
            setTimeout(() => this.showTopicQuestions(topicName), 500);
        } else if (event.target.classList.contains('chatbot-question')) {
            const questionText = event.target.textContent.trim();
            ChatbotView.addMessage(questionText, 'user');
            setTimeout(() => this.processInput(questionText), 500);
        } else if (event.target.classList.contains('chatbot-back-btn')) {
            ChatbotView.addMessage("Show me the main topics", 'user');
            setTimeout(() => this.showMainTopics(), 500);
        }
    },

    showTopicQuestions(topicName) {
        const questions = ChatbotModel.getQuestionsForTopic(this.bodyType, topicName);
        if (questions.length > 0) {
            const msg = `Here are the questions related to "${topicName}":`;
            ChatbotView.addMessage(msg, 'bot');
            ChatbotVoice.speak(msg);
            
            setTimeout(() => {
                ChatbotView.addMessage(
                    "", 
                    'bot',
                    [], 
                    questions 
                );
            }, 1000); 
        } else {
            const msg = "Sorry, I couldn't find questions for that topic. Here are the main topics:";
            ChatbotView.addMessage(msg, 'bot', this.topics);
            ChatbotVoice.speak(msg);
        }
    },

    showMainTopics() {
        const msg = "Here are the main topics I can help you with:";
        ChatbotView.addMessage(msg, 'bot');
        ChatbotVoice.speak(msg);
        
        setTimeout(() => {
            ChatbotView.addMessage(
                "", 
                'bot',
                this.topics 
            );
        }, 800);
    },

    processInput(text) {
        if (ChatbotModel.checkForComplexDisease(text)) {
            const msg = "For serious health conditions and diseases, it is essential to get a personalized diagnosis. Please consult a qualified Siddha practitioner for proper guidance.";
            ChatbotView.addMessage(msg, 'bot');
            ChatbotVoice.speak(msg);
            return;
        }
        
        const lowerCaseText = text.toLowerCase().trim();

        if (lowerCaseText === 'hi' || lowerCaseText === 'hello') {
            const greeting = "Vanakkam! How can I help you today? Feel free to ask a question or pick from the topics below.";
            ChatbotView.addMessage(greeting, 'bot');
            ChatbotVoice.speak(greeting);
            
            setTimeout(() => {
                ChatbotView.addMessage("", 'bot', this.topics);
            }, 1000);
            return;
        }

        if (lowerCaseText.includes('topic') || lowerCaseText.includes('menu') || lowerCaseText.includes('option') || lowerCaseText.includes('main')) {
            this.showMainTopics();
            return;
        }

        const matchedQA = ChatbotModel.findQuestion(lowerCaseText, this.allQuestions);
        if (matchedQA) {
            // Display the answer with HTML formatting
            ChatbotView.addAnswerMessage(matchedQA.answer);
            
            // For speech, get clean text version
            let speechText = matchedQA.answer.text;
            
            // Clean up the text for speech
            speechText = speechText.replace(/<br\s*\/?>/gi, '. '); // Replace <br> with period
            speechText = speechText.replace(/<b>(.*?)<\/b>/gi, '$1'); // Remove <b> tags but keep content
            speechText = speechText.replace(/<[^>]*>/g, ' '); // Remove any remaining HTML
            speechText = speechText.replace(/\s+/g, ' ').trim(); // Clean up spaces
            
            // Calculate estimated speaking time (150 words per minute average)
            const wordCount = speechText.split(' ').length;
            const estimatedTime = (wordCount / 150) * 60 * 1000; // in milliseconds
            const followUpDelay = Math.max(estimatedTime + 1000, 3000); // Add 1 second buffer
            
            // Speak the cleaned text
            console.log('About to speak:', speechText);
            console.log('Estimated speaking time:', estimatedTime, 'ms');
            ChatbotVoice.speak(speechText);
            
            setTimeout(() => {
                const followUp = "Is there anything else I can help you with?";
                ChatbotView.addMessage(followUp, 'bot');
                // Don't speak follow-up automatically - let user control it
            }, followUpDelay);
            
            setTimeout(() => {
                ChatbotView.addMessage("", 'bot', this.topics);
            }, followUpDelay + 500);
            return;
        }

        const msg = "I'm sorry, I don't have information on that specific topic yet. My expertise is in lifestyle, diet, and common concerns related to your body type. Perhaps one of these topics can help?";
        ChatbotView.addMessage(msg, 'bot');
        ChatbotVoice.speak(msg);
        
        setTimeout(() => {
            ChatbotView.addMessage("", 'bot', this.topics);
        }, 1000);
    }
};