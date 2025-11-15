const MudraController = {
    // HTML Elements
    video: null,
    canvas: null,
    context: null,
    mudraNameEl: null,
    confidenceEl: null,
    postureAccuracyEl: null,
    postureFeedbackEl: null,

    // State
    stream: null,
    detectionInterval: null,
    isCameraOn: false,

    init() {
        this.video = document.getElementById('webcam');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.mudraNameEl = document.getElementById('mudra-name');
        this.confidenceEl = document.getElementById('confidence');
        this.postureAccuracyEl = document.getElementById('posture-accuracy');
        this.postureFeedbackEl = document.getElementById('posture-feedback');
        
        document.getElementById('start-mudra-btn').addEventListener('click', () => this.startCamera());
        document.getElementById('stop-mudra-btn').addEventListener('click', () => this.stopCamera());
    },

    async startCamera() {
        if (this.isCameraOn) return;

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.video.srcObject = this.stream;
            this.isCameraOn = true;
            
            document.getElementById('mudra-interface').style.display = 'block';
            document.getElementById('start-mudra-btn').style.display = 'none';

            this.detectionInterval = setInterval(() => this.sendFrameToBackend(), 250);

        } catch (err) {
            console.error("Error accessing webcam: ", err);
            alert("Could not access webcam. Please allow camera permissions and try again.");
        }
    },

    stopCamera() {
        if (!this.isCameraOn || !this.stream) return;

        clearInterval(this.detectionInterval);
        this.detectionInterval = null;

        this.stream.getTracks().forEach(track => track.stop());
        this.video.srcObject = null;
        this.isCameraOn = false;

        document.getElementById('mudra-interface').style.display = 'none';
        document.getElementById('start-mudra-btn').style.display = 'block';
    },

    async sendFrameToBackend() {
        if (!this.isCameraOn) return;

        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        const imageData = this.canvas.toDataURL('image/jpeg');

        try {
            const response = await fetch('http://localhost:5000/api/detect_mudra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageData })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            this.updateUI(data);

        } catch (error) {
            console.error("Error sending data to backend:", error);
            this.mudraNameEl.textContent = "Server Connection Error";
            this.stopCamera(); // Stop if the connection fails
        }
    },
    
    updateUI(data) {
        this.mudraNameEl.textContent = data.mudra_name || '...';
        this.confidenceEl.textContent = data.confidence ? `${data.confidence}%` : '...';
        this.postureAccuracyEl.textContent = data.posture_accuracy ? `${data.posture_accuracy}%` : '...';

        this.postureFeedbackEl.innerHTML = '';
        
        if (data.posture_feedback && data.posture_feedback.length > 0) {
            data.posture_feedback.forEach(item => {
                const [message, type] = item;
                const p = document.createElement('p');
                p.textContent = message;
                p.className = type;
                this.postureFeedbackEl.appendChild(p);
            });
        }
    }
};
