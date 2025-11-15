const Controller = {
    init() {
        View.renderQuestion(Model.questions[0]);
        View.updateProgress(0, Model.questions.length);
        View.updateNavButtons(0, Model.questions.length);
        
        document.getElementById('prev-btn').addEventListener('click', this.onPrevious.bind(this));
        document.getElementById('next-btn').addEventListener('click', this.onNext.bind(this));
        document.getElementById('submit-btn').addEventListener('click', this.onSubmit.bind(this));
        document.getElementById('restart-btn').addEventListener('click', this.onRestart.bind(this));
        
        document.getElementById('results-container').style.display = 'none';
    },
    
    
    onAnswerSelected(questionId, value) {
        Model.setAnswer(questionId, value);
        View.updateNavButtons(Model.currentQuestionIndex, Model.questions.length);
    },
    
    onNext() {
        if (Model.currentQuestionIndex < Model.questions.length - 1) {
            Model.currentQuestionIndex++;
            View.renderQuestion(Model.questions[Model.currentQuestionIndex]);
            View.updateProgress(Model.currentQuestionIndex, Model.questions.length);
            View.updateNavButtons(Model.currentQuestionIndex, Model.questions.length);
        }
    },
    
    onPrevious() {
        if (Model.currentQuestionIndex > 0) {
            Model.currentQuestionIndex--;
            View.renderQuestion(Model.questions[Model.currentQuestionIndex]);
            View.updateProgress(Model.currentQuestionIndex, Model.questions.length);
            View.updateNavButtons(Model.currentQuestionIndex, Model.questions.length);
        }
    },
    
    onSubmit() {
        View.showLoading();
        
        this.sendToBackend(Model.answers)
            .then(response => {
                if (response && response.body_type) {
                    const bodyType = response.body_type;
                    const recommendations = Model.getRecommendations(bodyType);
                    View.showResults(bodyType, recommendations);
                    
                    ChatbotController.start(bodyType);

                } else {
                    console.warn('No valid prediction from backend, using fallback calculation');
                    const bodyType = Model.calculateBodyType();
                    const recommendations = Model.getRecommendations(bodyType);
                    View.showResults(bodyType, recommendations);

                    ChatbotController.start(bodyType);
                }
            })
            .catch(error => {
                console.error('Error getting prediction:', error);
                const bodyType = Model.calculateBodyType();
                const recommendations = Model.getRecommendations(bodyType);
                View.showResults(bodyType, recommendations);

                ChatbotController.start(bodyType);
            })
            .finally(() => {
                View.hideLoading();
            });
    },
    

    sendToBackend(answers) {
        const apiUrl = 'http://localhost:5000/api/predict';
        
        return fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answers)
        })
        .then(response => {
            if (!response.ok) { throw new Error('Network response was not ok'); }
            return response.json();
        });
    },
    
    onRestart() {
        Model.currentQuestionIndex = 0;
        Model.answers = {};
        
        ChatbotView.hideAll();
        
        document.getElementById('questionnaire-container').style.display = 'block';
        document.getElementById('prev-btn').style.display = 'block';
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('results-container').style.display = 'none';
        document.getElementById('progress-container').style.display = 'block';
        
        View.renderQuestion(Model.questions[0]);
        View.updateProgress(0, Model.questions.length);
        View.updateNavButtons(0, Model.questions.length);
    }
};