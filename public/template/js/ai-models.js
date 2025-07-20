/* ===================================
   AI MODELS JS
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {      
        // Model management functions
        function configureModel(modelId) {
            console.log(`Configuring model: ${modelId}`);
            // In a real app, this would open model configuration
        }

        function testModel(modelId) {
            console.log(`Testing model: ${modelId}`);
            // In a real app, this would open model testing interface
        }

        function restartModel(modelId) {
            console.log(`Restarting model: ${modelId}`);
            // In a real app, this would restart the model
        }

        function viewLogs(modelId) {
            console.log(`Viewing logs for model: ${modelId}`);
            // In a real app, this would show model logs
        }

        // Search functionality
        document.getElementById('modelSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const modelItems = document.querySelectorAll('.model-item');
            
            modelItems.forEach(item => {
                const modelName = item.querySelector('.model-name').textContent.toLowerCase();
                const modelDescription = item.querySelector('.model-description').textContent.toLowerCase();
                
                if (modelName.includes(searchTerm) || modelDescription.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Filter functionality
        document.querySelectorAll('[data-filter]').forEach(filterBtn => {
            filterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const filter = this.getAttribute('data-filter');
                const modelItems = document.querySelectorAll('.model-item');
                
                modelItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // View toggle
        document.getElementById('gridView').addEventListener('click', function() {
            document.getElementById('listView').classList.remove('active');
            this.classList.add('active');
            // Switch to grid view (current default)
        });

        document.getElementById('listView').addEventListener('click', function() {
            document.getElementById('gridView').classList.remove('active');
            this.classList.add('active');
            // Switch to list view (would need additional CSS)
        });

        // Add model form
        document.getElementById('addModelForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            console.log('Adding new model:', Object.fromEntries(formData));
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addModelModal'));
            modal.hide();
            
            // Reset form
            this.reset();
            
            // In a real app, this would send data to server
        });
    });
   
} (jQuery) );