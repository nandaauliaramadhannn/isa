/* ===================================
   AI Writer JS
   =================================== */

(function ($) {
    'use strict';
    
    $(document).ready(function() {      
        // Template data
        const templates = {
            'article-generator': {
                title: 'Article Generator',
                description: 'Generate high-quality articles on any topic with AI assistance',
                icon: 'fas fa-newspaper'
            },
            'blog-post': {
                title: 'Blog Post Generator',
                description: 'Create engaging blog posts for your website or platform',
                icon: 'fas fa-blog'
            },
            'rewrite-article': {
                title: 'Article Rewriter',
                description: 'Rewrite existing articles with fresh perspective and style',
                icon: 'fas fa-sync-alt'
            },
            'ads-content': {
                title: 'Ad Copy Generator',
                description: 'Create compelling advertising copy for various platforms',
                icon: 'fas fa-ad'
            },
            'meta-titles': {
                title: 'SEO Title Generator',
                description: 'Generate SEO-optimized titles for better search rankings',
                icon: 'fas fa-heading'
            },
            'meta-description': {
                title: 'Meta Description Writer',
                description: 'Create compelling meta descriptions for better click-through rates',
                icon: 'fas fa-align-left'
            },
            'video-script': {
                title: 'Video Script Writer',
                description: 'Generate engaging scripts for videos and presentations',
                icon: 'fas fa-video'
            },
            'grammar-checker': {
                title: 'Grammar & Style Checker',
                description: 'Check and improve grammar, spelling, and writing style',
                icon: 'fas fa-spell-check'
            },
            'tags-generator': {
                title: 'Tags Generator',
                description: 'Generate relevant tags and hashtags for your content',
                icon: 'fas fa-tags'
            },
            'name-generator': {
                title: 'Name Generator',
                description: 'Generate creative names for brands, products, or characters',
                icon: 'fas fa-signature'
            }
        };

        // Initialize page
        setupTemplateNavigation();
        setupFormHandlers();

        function setupTemplateNavigation() {
            const templateItems = document.querySelectorAll('.template-item');
            
            templateItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all items
                    templateItems.forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                    
                    // Get template data
                    const templateKey = this.dataset.template;
                    const template = templates[templateKey];
                    
                    if (template) {
                        // Update header
                        document.getElementById('templateTitle').textContent = template.title;
                        document.getElementById('templateDescription').textContent = template.description;
                        document.querySelector('.template-icon i').className = template.icon + ' fa-2x';
                        
                        // Update form if needed
                        updateTemplateForm(templateKey);
                    }
                });
            });
        }

        function updateTemplateForm(templateKey) {
            // For demo purposes, we'll keep the article generator form for all templates
            // In a real application, you would switch between different forms
            console.log('Switching to template:', templateKey);
        }

        function setupFormHandlers() {
            const articleForm = document.getElementById('articleForm');
            if (articleForm) {
                articleForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    generateContent();
                });
            }
        }

        function generateContent() {
            const topic = document.getElementById('articleTopic').value;
            const keywords = document.getElementById('articleKeywords').value;
            const language = document.getElementById('articleLanguage').value;
            const style = document.getElementById('writingStyle').value;
            const length = document.getElementById('articleLength').value;
            const audience = document.getElementById('targetAudience').value;
            const variants = document.getElementById('variants').value;

            if (!topic.trim()) {
                alert('Please enter a topic for your article.');
                return;
            }

            // Show loading state
            const submitBtn = document.querySelector('#articleForm button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Generate mock content
                const mockContent = generateMockContent(topic, keywords, style, length);
                
                // Show results
                document.getElementById('generatedContent').innerHTML = mockContent;
                document.getElementById('resultsSection').style.display = 'block';
                
                // Scroll to results
                document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        function generateMockContent(topic, keywords, style, length) {
            const keywordsList = keywords ? keywords.split(',').map(k => k.trim()) : [];
            
            return `
                <div class="generated-article">
                    <h3 class="mb-3">${topic}</h3>
                    <div class="article-meta mb-3">
                        <span class="badge bg-primary me-2">Style: ${style}</span>
                        <span class="badge bg-secondary me-2">Length: ${length}</span>
                        ${keywordsList.map(keyword => `<span class="badge bg-info me-1">${keyword}</span>`).join('')}
                    </div>
                    <div class="article-content">
                        <p><strong>Introduction:</strong></p>
                        <p>This is a sample generated article about "${topic}". In the real application, this would be generated using advanced AI models based on your specifications.</p>
                        
                        <p><strong>Main Content:</strong></p>
                        <p>The article would include comprehensive coverage of the topic, incorporating the specified keywords: ${keywordsList.join(', ')}. The content would be written in a ${style} style, suitable for ${document.getElementById('targetAudience').value}.</p>
                        
                        <p><strong>Key Points:</strong></p>
                        <ul>
                            <li>Detailed explanation of the main topic</li>
                            <li>Relevant examples and case studies</li>
                            <li>Best practices and recommendations</li>
                            <li>Conclusion with actionable insights</li>
                        </ul>
                        
                        <p><strong>Conclusion:</strong></p>
                        <p>This generated content demonstrates the capabilities of the AI Writer tool. In the full version, you would receive high-quality, original content tailored to your specific requirements.</p>
                    </div>
                    <div class="article-stats mt-3 p-3 bg-light rounded">
                        <div class="row">
                            <div class="col-md-3">
                                <strong>Word Count:</strong> ~${getWordCountForLength(length)}
                            </div>
                            <div class="col-md-3">
                                <strong>Reading Time:</strong> ${Math.ceil(getWordCountForLength(length) / 200)} min
                            </div>
                            <div class="col-md-3">
                                <strong>Keywords Used:</strong> ${keywordsList.length}
                            </div>
                            <div class="col-md-3">
                                <strong>SEO Score:</strong> 85/100
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function getWordCountForLength(length) {
            const counts = {
                'short': 400,
                'medium': 750,
                'long': 1500,
                'very-long': 2500
            };
            return counts[length] || 750;
        }

        function copyToClipboard() {
            const content = document.getElementById('generatedContent').innerText;
            navigator.clipboard.writeText(content).then(function() {
                alert('Content copied to clipboard!');
            });
        }

        function downloadContent() {
            const content = document.getElementById('generatedContent').innerText;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated-article.txt';
            a.click();
            window.URL.revokeObjectURL(url);
        }

        function shareContent() {
            if (navigator.share) {
                const content = document.getElementById('generatedContent').innerText;
                navigator.share({
                    title: 'Generated Article',
                    text: content.substring(0, 200) + '...',
                    url: window.location.href
                });
            } else {
                alert('Share functionality is not supported in this browser.');
            }
        }

        function saveTemplate() {
            const name = document.getElementById('templateName').value;
            const description = document.getElementById('templateDescriptionInput').value;
            const category = document.getElementById('templateCategory').value;
            
            if (!name.trim()) {
                alert('Please enter a template name.');
                return;
            }
            
            // Simulate saving
            alert('Template saved successfully!');
            bootstrap.Modal.getInstance(document.getElementById('saveTemplateModal')).hide();
            document.getElementById('saveTemplateForm').reset();
        }
    });

} (jQuery) );