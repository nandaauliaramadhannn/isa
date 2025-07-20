/* ===================================
   AI CHAT JS
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {      

        let generationCount = 0;

        function setPrompt(prompt) {
            document.getElementById('prompt').value = prompt;
        }

        function simulateProgress() {
            const progressBar = document.getElementById('progressBar');
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                progressBar.style.width = progress + '%';
            }, 500);
        }

        function generateImage() {
            const prompt = document.getElementById('prompt').value.trim();
            if (!prompt) {
                alert('Please enter a prompt to generate an image.');
                return;
            }

            // Hide empty state and show loading
            document.getElementById('emptyState').style.display = 'none';
            document.getElementById('loadingState').style.display = 'block';
            
            // Simulate progress
            simulateProgress();
            
            // Generate button loading state
            const generateBtn = document.getElementById('generateBtn');
            const originalText = generateBtn.innerHTML;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            generateBtn.disabled = true;

            // Simulate image generation
            setTimeout(() => {
                // Hide loading state
                document.getElementById('loadingState').style.display = 'none';
                
                // Show generated images
                const count = parseInt(document.getElementById('count').value);
                const aspectRatio = document.getElementById('aspectRatio').value;
                const style = document.getElementById('style').value;
                
                showGeneratedImages(prompt, count, aspectRatio, style);
                
                // Reset button
                generateBtn.innerHTML = originalText;
                generateBtn.disabled = false;
                
                generationCount++;
            }, 3000);
        }

        function showGeneratedImages(prompt, count, aspectRatio, style) {
            const container = document.getElementById('generatedImages');
            const width = aspectRatio === '9:16' ? 300 : aspectRatio === '16:9' ? 400 : 350;
            const height = aspectRatio === '9:16' ? 400 : aspectRatio === '16:9' ? 225 : 350;
            
            let imagesHtml = '<div class="row g-3">';
            
            for (let i = 0; i < count; i++) {
                imagesHtml += `
                    <div class="col-md-${count === 1 ? '12' : count === 2 ? '6' : '6'}">
                        <div class="generated-image-card">
                            <div class="image-container">
                                <img width="400" src="assets/images/user-avatar.jpg" 
                                     alt="Generated Image ${i+1}" class="img-fluid">
                                <div class="image-overlay">
                                    <button class="btn btn-sm btn-light" onclick="downloadImage(${i+1})">
                                        <i class="fas fa-download"></i>
                                    </button>
                                    <button class="btn btn-sm btn-light" onclick="shareImage(${i+1})">
                                        <i class="fas fa-share"></i>
                                    </button>
                                    <button class="btn btn-sm btn-light" onclick="editImage(${i+1})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="image-info">
                                <h6>Generated Image ${i+1}</h6>
                                <p class="text-muted">${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}</p>
                                <small class="text-muted">Style: ${style} ??? ${aspectRatio}</small>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            imagesHtml += '</div>';
            container.innerHTML = imagesHtml;
        }

        function downloadImage(imageId) {
            // Simulate download
            console.log(`Downloading image ${imageId}`);
            // In a real app, this would trigger an actual download
        }

        function shareImage(imageId) {
            // Simulate share functionality
            console.log(`Sharing image ${imageId}`);
            // In a real app, this would open share options
        }

        function editImage(imageId) {
            // Simulate edit functionality
            console.log(`Editing image ${imageId}`);
            // In a real app, this would open an image editor
        }

        function downloadAll() {
            if (generationCount === 0) {
                alert('No images to download. Generate some images first.');
                return;
            }
            console.log('Downloading all images');
            // In a real app, this would download all generated images
        }

        function clearHistory() {
            if (confirm('Are you sure you want to clear your generation history?')) {
                console.log('Clearing history');
                // In a real app, this would clear the user's history
            }
        }

        // Form submission
        document.getElementById('imageGenerationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            generateImage();
        });
    });
   
} (jQuery) );