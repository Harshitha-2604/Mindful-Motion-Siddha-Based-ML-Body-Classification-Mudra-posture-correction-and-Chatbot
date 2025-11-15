// View - Presentation logic
const View = {
    renderQuestion(question) {
        const container = document.getElementById('questionnaire-container');
        container.innerHTML = `
            <div class="question">
                <h3>${question.text}</h3>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option">
                            <input type="radio" name="${question.id}" id="${question.id}-${index}" value="${option.value}" ${Model.answers[question.id] === option.value ? 'checked' : ''}>
                            <label for="${question.id}-${index}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add event listeners to radio buttons
        const radioButtons = document.querySelectorAll(`input[name="${question.id}"]`);
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                Controller.onAnswerSelected(question.id, e.target.value);
            });
        });
    },
    
    updateProgress(current, total) {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const percentage = (current / total) * 100;
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `Question ${current + 1} of ${total}`;
    },
    
    updateNavButtons(currentIndex, totalQuestions) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        prevBtn.disabled = currentIndex === 0;
        
        // Show submit button on last question
        if (currentIndex === totalQuestions - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
        
        // Disable next button if no answer for current question
        const currentQuestionId = Model.questions[currentIndex].id;
        nextBtn.disabled = !Model.answers[currentQuestionId];
        
        // Disable submit button if no answer for current question
        submitBtn.disabled = !Model.answers[currentQuestionId];
    },
    
    showLoading() {
        // Create loading overlay if it doesn't exist
        if (!document.getElementById('loading-overlay')) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Analyzing your responses...</p>
            `;
            document.body.appendChild(loadingOverlay);
            
            // Add loading styles
            const style = document.createElement('style');
            style.textContent = `
                #loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.9);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.getElementById('loading-overlay').style.display = 'flex';
    },
    
    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    },
    
    showResults(bodyType, recommendations) {
        // Hide questionnaire and show results
        document.getElementById('questionnaire-container').style.display = 'none';
        document.getElementById('prev-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none';
        document.getElementById('progress-container').style.display = 'none';
        document.getElementById('results-container').style.display = 'block';
        
        // Update results content
        document.getElementById('body-type').textContent = bodyType.charAt(0).toUpperCase() + bodyType.slice(1);
        
        // Set body type description
        const descriptions = {
            vata: "Vata represents the elements of air and space. You tend to be creative, quick-thinking, and adaptable. When balanced, you are energetic, enthusiastic, and flexible. When imbalanced, you may experience anxiety, irregular habits, and dryness.",
            pitta: "Pitta represents the elements of fire and water. You tend to be intelligent, focused, and organized. When balanced, you are warm, articulate, and efficient. When imbalanced, you may experience irritability, inflammation, and excessive heat.",
            kapha: "Kapha represents the elements of earth and water. You tend to be calm, steady, and compassionate. When balanced, you are grounded, loyal, and strong. When imbalanced, you may experience lethargy, weight gain, and congestion.",
            "vata-pitta": "You have a dual constitution with both Vata and Pitta characteristics. You may experience both the creativity of Vata and the focus of Pitta. Your challenge is to balance both movement and intensity in your life.",
            "vata-kapha": "You have a dual constitution with both Vata and Kapha characteristics. You combine the adaptability of Vata with the steadiness of Kapha. Your challenge is to find balance between activity and rest.",
            "pitta-kapha": "You have a dual constitution with both Pitta and Kapha characteristics. You blend the organization of Pitta with the endurance of Kapha. Your challenge is to balance drive with relaxation.",
            tridoshic: "You have a balanced constitution with relatively equal amounts of all three doshas. This is rare and potentially very balanced, but also requires attentiveness to maintain harmony based on changing conditions."
        };
        
        document.getElementById('body-type-description').textContent = descriptions[bodyType];
        
        // Set recommendations
        document.getElementById('diet-recommendations').innerHTML = `<p>${recommendations.diet}</p>`;
        document.getElementById('lifestyle-recommendations').innerHTML = `<p>${recommendations.lifestyle}</p>`;
        document.getElementById('exercise-recommendations').innerHTML = `<p>${recommendations.exercise}</p>`;
    }
};