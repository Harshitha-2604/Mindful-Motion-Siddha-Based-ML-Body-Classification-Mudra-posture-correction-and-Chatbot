const ChatbotVoice = {
    recognition: null,
    synthesis: window.speechSynthesis,
    isListening: false,
    isSpeaking: false,
    voiceEnabled: true,

    init() {
        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('User said:', transcript);
                this.onSpeechResult(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateMicButton();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateMicButton();
            };
        } else {
            console.warn('Speech recognition not supported');
        }

        // Add voice controls to the chatbot
        this.addVoiceControls();
    },

    addVoiceControls() {
        const inputForm = document.getElementById('chatbot-input-form');
        
        // Create microphone button
        const micButton = document.createElement('button');
        micButton.type = 'button';
        micButton.id = 'chatbot-mic-btn';
        micButton.className = 'chatbot-mic-btn';
        micButton.innerHTML = '🎤';
        micButton.title = 'Click to speak';
        micButton.addEventListener('click', () => this.toggleListening());
        
        // Create voice toggle button
        const voiceToggle = document.createElement('button');
        voiceToggle.type = 'button';
        voiceToggle.id = 'chatbot-voice-toggle';
        voiceToggle.className = 'chatbot-voice-toggle active';
        voiceToggle.innerHTML = '🔊';
        voiceToggle.title = 'Toggle voice responses';
        voiceToggle.addEventListener('click', () => this.toggleVoice());
        
        // Insert buttons before submit button
        const submitBtn = inputForm.querySelector('button[type="submit"]');
        inputForm.insertBefore(micButton, submitBtn);
        inputForm.insertBefore(voiceToggle, submitBtn);
    },

    toggleListening() {
        if (!this.recognition) {
            alert('Speech recognition is not supported in your browser');
            return;
        }

        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    },

    startListening() {
        if (this.isSpeaking) {
            this.stopSpeaking();
        }

        try {
            this.recognition.start();
            this.isListening = true;
            this.updateMicButton();
        } catch (error) {
            console.error('Error starting recognition:', error);
        }
    },

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateMicButton();
        }
    },

    updateMicButton() {
        const micBtn = document.getElementById('chatbot-mic-btn');
        if (micBtn) {
            if (this.isListening) {
                micBtn.classList.add('listening');
                micBtn.innerHTML = '⏹️';
                micBtn.title = 'Stop listening';
            } else {
                micBtn.classList.remove('listening');
                micBtn.innerHTML = '🎤';
                micBtn.title = 'Click to speak';
            }
        }
    },

    onSpeechResult(transcript) {
        // Fill the input with the transcript
        const inputEl = document.getElementById('chatbot-input');
        if (inputEl) {
            inputEl.value = transcript;
            // Trigger form submission
            const formEl = document.getElementById('chatbot-input-form');
            if (formEl) {
                formEl.dispatchEvent(new Event('submit'));
            }
        }
    },

    speak(text) {
        if (!this.voiceEnabled || !this.synthesis) {
            return;
        }

        // Stop any ongoing speech first
        this.stopSpeaking();

        // Clean the text more thoroughly
        let cleanText = text;
        
        // Remove HTML tags
        cleanText = cleanText.replace(/<br\s*\/?>/gi, '. '); // Replace <br> with period and space
        cleanText = cleanText.replace(/<[^>]*>/g, ' '); // Remove all other HTML tags
        
        // Replace multiple spaces with single space
        cleanText = cleanText.replace(/\s+/g, ' ');
        
        // Trim whitespace
        cleanText = cleanText.trim();
        
        if (!cleanText) {
            console.warn('No text to speak after cleaning');
            return;
        }

        console.log('Speaking text length:', cleanText.length);
        console.log('Speaking text:', cleanText);

        // Split long text into chunks to avoid cutoff
        const maxLength = 200; // Characters per chunk
        const chunks = this.splitTextIntoChunks(cleanText, maxLength);
        
        console.log('Split into', chunks.length, 'chunks');
        
        // Speak chunks sequentially
        this.speakChunks(chunks, 0);
    },

    splitTextIntoChunks(text, maxLength) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        const chunks = [];
        let currentChunk = '';

        sentences.forEach(sentence => {
            if ((currentChunk + sentence).length <= maxLength) {
                currentChunk += sentence;
            } else {
                if (currentChunk) chunks.push(currentChunk.trim());
                currentChunk = sentence;
            }
        });

        if (currentChunk) chunks.push(currentChunk.trim());
        return chunks;
    },

    speakChunks(chunks, index) {
        if (index >= chunks.length || !this.voiceEnabled) {
            this.isSpeaking = false;
            console.log('All chunks spoken');
            return;
        }

        const chunk = chunks[index];
        console.log(`Speaking chunk ${index + 1}/${chunks.length}:`, chunk);

        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            this.isSpeaking = true;
            console.log(`Chunk ${index + 1} started`);
        };

        utterance.onend = () => {
            console.log(`Chunk ${index + 1} ended`);
            // Speak next chunk after a brief pause
            setTimeout(() => {
                this.speakChunks(chunks, index + 1);
            }, 100);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            // Try next chunk even if there's an error
            setTimeout(() => {
                this.speakChunks(chunks, index + 1);
            }, 100);
        };

        // Chrome bug workaround
        if (this.synthesis.paused) {
            this.synthesis.resume();
        }

        this.synthesis.speak(utterance);
    },

    stopSpeaking() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.isSpeaking = false;
            console.log('Speech stopped/cancelled');
        }
    },

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const voiceToggle = document.getElementById('chatbot-voice-toggle');
        
        if (voiceToggle) {
            if (this.voiceEnabled) {
                voiceToggle.classList.add('active');
                voiceToggle.innerHTML = '🔊';
                voiceToggle.title = 'Voice on - Click to mute';
            } else {
                voiceToggle.classList.remove('active');
                voiceToggle.innerHTML = '🔇';
                voiceToggle.title = 'Voice off - Click to unmute';
                this.stopSpeaking();
            }
        }
    }
};