/* ===================================
   AI TLD JS
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {      

        // AI Tools data
        let tools = [
            // Content Creation & Writing
            {
                id: 1,
                name: "Blog Article Generator",
                description: "Generate high-quality blog articles on any topic with AI-powered writing assistance",
                category: "content",
                icon: "fas fa-blog",
                status: "active",
                uses: 15420,
                rating: 4.8
            },
            {
                id: 2,
                name: "Cover Letter & Resume Generator",
                description: "Create professional cover letters and resumes tailored to job descriptions",
                category: "content",
                icon: "fas fa-file-alt",
                status: "active",
                uses: 8934,
                rating: 4.7
            },
            {
                id: 3,
                name: "Email Writer",
                description: "Craft effective sales, support, and follow-up emails with AI assistance",
                category: "content",
                icon: "fas fa-envelope",
                status: "active",
                uses: 12456,
                rating: 4.6
            },
            {
                id: 4,
                name: "Social Media Caption Generator",
                description: "Create engaging captions for Instagram, Facebook, Twitter, and LinkedIn",
                category: "content",
                icon: "fas fa-hashtag",
                status: "active",
                uses: 18742,
                rating: 4.9
            },
            {
                id: 5,
                name: "Product Description Generator",
                description: "Generate compelling product descriptions for e-commerce and marketing",
                category: "content",
                icon: "fas fa-shopping-cart",
                status: "active",
                uses: 9823,
                rating: 4.5
            },
            {
                id: 6,
                name: "Article Summarizer",
                description: "Summarize long articles and documents into key points and insights",
                category: "content",
                icon: "fas fa-compress-alt",
                status: "active",
                uses: 7654,
                rating: 4.7
            },
            {
                id: 7,
                name: "Grammar & Style Enhancer",
                description: "Improve grammar, style, and readability of your written content",
                category: "content",
                icon: "fas fa-spell-check",
                status: "active",
                uses: 11234,
                rating: 4.8
            },
            {
                id: 8,
                name: "Paraphrasing & Rewriter Tool",
                description: "Rewrite and paraphrase content while maintaining original meaning",
                category: "content",
                icon: "fas fa-sync-alt",
                status: "active",
                uses: 6789,
                rating: 4.4
            },

            // Design & Image Tools
            {
                id: 9,
                name: "AI Image Generator",
                description: "Create stunning images from text descriptions using advanced AI models",
                category: "image",
                icon: "fas fa-image",
                status: "active",
                uses: 23456,
                rating: 4.9
            },
            {
                id: 10,
                name: "Background Remover",
                description: "Remove backgrounds from images automatically with AI precision",
                category: "image",
                icon: "fas fa-cut",
                status: "active",
                uses: 15678,
                rating: 4.6
            },
            {
                id: 11,
                name: "AI Avatar Generator",
                description: "Create personalized avatars and profile pictures using AI",
                category: "image",
                icon: "fas fa-user-circle",
                status: "active",
                uses: 8901,
                rating: 4.5
            },
            {
                id: 12,
                name: "Image Upscaler / Enhancer",
                description: "Enhance and upscale images without losing quality using AI",
                category: "image",
                icon: "fas fa-expand-arrows-alt",
                status: "active",
                uses: 12345,
                rating: 4.7
            },
            {
                id: 13,
                name: "Logo Generator",
                description: "Design professional logos for your business with AI assistance",
                category: "image",
                icon: "fas fa-crown",
                status: "beta",
                uses: 5432,
                rating: 4.3
            },
            {
                id: 14,
                name: "Meme Generator",
                description: "Create viral memes with AI-generated images and text",
                category: "image",
                icon: "fas fa-laugh",
                status: "active",
                uses: 9876,
                rating: 4.4
            },

            // Video & Audio Tools
            {
                id: 15,
                name: "Text-to-Video Generator",
                description: "Convert text scripts into engaging videos with AI narration",
                category: "video",
                icon: "fas fa-video",
                status: "beta",
                uses: 3421,
                rating: 4.2
            },
            {
                id: 16,
                name: "AI Voiceover Generator",
                description: "Generate natural-sounding voiceovers in multiple languages",
                category: "audio",
                icon: "fas fa-microphone",
                status: "active",
                uses: 7890,
                rating: 4.6
            },
            {
                id: 17,
                name: "Podcast Summarizer & Clip Generator",
                description: "Extract key moments and create shareable clips from podcasts",
                category: "audio",
                icon: "fas fa-podcast",
                status: "active",
                uses: 4567,
                rating: 4.5
            },
            {
                id: 18,
                name: "AI Music Generator",
                description: "Create background music and loops for your projects",
                category: "audio",
                icon: "fas fa-music",
                status: "beta",
                uses: 2345,
                rating: 4.1
            },
            {
                id: 19,
                name: "Subtitle Generator & Translator",
                description: "Generate and translate subtitles for videos automatically",
                category: "video",
                icon: "fas fa-closed-captioning",
                status: "active",
                uses: 6789,
                rating: 4.4
            },

            // Marketing & SEO Tools
            {
                id: 20,
                name: "Keyword Generator & Clustering",
                description: "Research and cluster keywords for SEO optimization",
                category: "marketing",
                icon: "fas fa-search",
                status: "active",
                uses: 11234,
                rating: 4.7
            },
            {
                id: 21,
                name: "Ad Copy Generator",
                description: "Create compelling ad copy for Google, Facebook, and Instagram",
                category: "marketing",
                icon: "fas fa-bullhorn",
                status: "active",
                uses: 9876,
                rating: 4.6
            },
            {
                id: 22,
                name: "Meta Title & Description Generator",
                description: "Generate SEO-optimized meta titles and descriptions",
                category: "marketing",
                icon: "fas fa-tags",
                status: "active",
                uses: 8765,
                rating: 4.5
            },
            {
                id: 23,
                name: "A/B Test Variant Generator",
                description: "Create multiple variants for A/B testing campaigns",
                category: "marketing",
                icon: "fas fa-random",
                status: "active",
                uses: 5432,
                rating: 4.3
            },
            {
                id: 24,
                name: "Landing Page Generator",
                description: "Build high-converting landing pages with AI-generated copy",
                category: "marketing",
                icon: "fas fa-desktop",
                status: "beta",
                uses: 3456,
                rating: 4.2
            },

            // Business & Productivity Tools
            {
                id: 25,
                name: "AI Chatbot Creator",
                description: "Create custom chatbots with your own data and knowledge base",
                category: "business",
                icon: "fas fa-robot",
                status: "active",
                uses: 7890,
                rating: 4.8
            },
            {
                id: 26,
                name: "Meeting Summary Tool",
                description: "Automatically summarize meetings and extract action items",
                category: "business",
                icon: "fas fa-users",
                status: "active",
                uses: 6543,
                rating: 4.6
            },
            {
                id: 27,
                name: "Contract & Legal Document Generator",
                description: "Generate legal documents and contracts with AI assistance",
                category: "business",
                icon: "fas fa-gavel",
                status: "beta",
                uses: 2345,
                rating: 4.0
            },
            {
                id: 28,
                name: "Invoice Generator",
                description: "Create professional invoices and billing documents",
                category: "business",
                icon: "fas fa-file-invoice",
                status: "active",
                uses: 8901,
                rating: 4.5
            },
            {
                id: 29,
                name: "Spreadsheet Assistant",
                description: "Generate smart formulas and analyze spreadsheet data",
                category: "business",
                icon: "fas fa-table",
                status: "active",
                uses: 5678,
                rating: 4.4
            },

            // Developer Tools
            {
                id: 30,
                name: "Code Generator & Explainer",
                description: "Generate code snippets and explain complex programming concepts",
                category: "developer",
                icon: "fas fa-code",
                status: "active",
                uses: 12456,
                rating: 4.8
            },
            {
                id: 31,
                name: "Regex Generator",
                description: "Convert natural language descriptions to regular expressions",
                category: "developer",
                icon: "fas fa-terminal",
                status: "active",
                uses: 4567,
                rating: 4.5
            },
            {
                id: 32,
                name: "API Response Mock Generator",
                description: "Generate mock API responses for testing and development",
                category: "developer",
                icon: "fas fa-server",
                status: "active",
                uses: 3456,
                rating: 4.3
            },
            {
                id: 33,
                name: "SQL Query Generator",
                description: "Convert natural language to SQL queries automatically",
                category: "developer",
                icon: "fas fa-database",
                status: "active",
                uses: 6789,
                rating: 4.6
            },
            {
                id: 34,
                name: "Bug Fix & Code Optimization Tool",
                description: "Identify and fix bugs while optimizing code performance",
                category: "developer",
                icon: "fas fa-bug",
                status: "beta",
                uses: 2345,
                rating: 4.2
            },

            // Niche/Custom Tools
            {
                id: 35,
                name: "Course Creator Tool",
                description: "Design and structure online courses with AI-generated content",
                category: "education",
                icon: "fas fa-graduation-cap",
                status: "beta",
                uses: 1234,
                rating: 4.1
            },
            {
                id: 36,
                name: "Dating Profile Optimizer",
                description: "Optimize dating profiles for better matches and engagement",
                category: "lifestyle",
                icon: "fas fa-heart",
                status: "active",
                uses: 3456,
                rating: 4.3
            },
            {
                id: 37,
                name: "Real Estate Listing Generator",
                description: "Create compelling property descriptions for real estate listings",
                category: "business",
                icon: "fas fa-home",
                status: "active",
                uses: 2345,
                rating: 4.4
            },
            {
                id: 38,
                name: "E-learning Quiz Generator",
                description: "Generate interactive quizzes and assessments for online learning",
                category: "education",
                icon: "fas fa-question-circle",
                status: "active",
                uses: 4567,
                rating: 4.5
            },
            {
                id: 39,
                name: "Recipe Generator",
                description: "Create unique recipes based on available ingredients",
                category: "lifestyle",
                icon: "fas fa-utensils",
                status: "active",
                uses: 5678,
                rating: 4.2
            },
            {
                id: 40,
                name: "Travel Itinerary Planner",
                description: "Plan detailed travel itineraries with AI recommendations",
                category: "lifestyle",
                icon: "fas fa-map-marked-alt",
                status: "active",
                uses: 3456,
                rating: 4.4
            },

            // System & SaaS Support Tools
            {
                id: 41,
                name: "Custom Prompt Builder",
                description: "Build and optimize prompts for various AI models",
                category: "system",
                icon: "fas fa-cogs",
                status: "active",
                uses: 6789,
                rating: 4.7
            },
            {
                id: 42,
                name: "Tool Usage Tracker",
                description: "Track token usage and credit consumption across all tools",
                category: "system",
                icon: "fas fa-chart-line",
                status: "active",
                uses: 8901,
                rating: 4.6
            },
            {
                id: 43,
                name: "Team Collaboration Features",
                description: "Collaborate on AI projects with team members and shared workspaces",
                category: "system",
                icon: "fas fa-users-cog",
                status: "beta",
                uses: 2345,
                rating: 4.2
            },
            {
                id: 44,
                name: "White-label Tool Creator",
                description: "Create branded versions of AI tools for your clients",
                category: "system",
                icon: "fas fa-palette",
                status: "beta",
                uses: 1234,
                rating: 4.0
            },
            {
                id: 45,
                name: "Embed Generator",
                description: "Generate embeddable widgets to integrate tools into other websites",
                category: "system",
                icon: "fas fa-code",
                status: "active",
                uses: 3456,
                rating: 4.3
            }
        ];

        // Initialize page
        renderTools();
        setupEventListeners();

        function renderTools(filteredTools = tools) {
            const grid = document.getElementById('toolsGrid');
            grid.innerHTML = '';

            filteredTools.forEach(tool => {
                const toolCard = createToolCard(tool);
                grid.appendChild(toolCard);
            });
        }

        function createToolCard(tool) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 mb-4';
            
            const statusBadge = getStatusBadge(tool.status);
            
            col.innerHTML = `
                <div class="dashboard-card h-100">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-start mb-3">
                            <div class="tool-icon me-3">
                                <i class="${tool.icon} fa-2x text-primary"></i>
                            </div>
                            <div class="flex-fill">
                                <h5 class="card-title mb-1">${tool.name}</h5>
                                <div class="d-flex align-items-center">
                                    ${statusBadge}
                                    <span class="badge bg-secondary ms-2">${getCategoryLabel(tool.category)}</span>
                                </div>
                            </div>
                        </div>
                        <p class="card-text flex-fill">${tool.description}</p>
                        <div class="tool-stats mb-3">
                            <div class="row text-center">
                                <div class="col-4">
                                    <div class="stat-value">${formatNumber(tool.uses)}</div>
                                    <div class="stat-label">Uses</div>
                                </div>
                                <div class="col-4">
                                    <div class="stat-value">${tool.rating}</div>
                                    <div class="stat-label">Rating</div>
                                </div>
                                <div class="col-4">
                                    <div class="stat-value">${generateRating(tool.rating)}</div>
                                    <div class="stat-label">Stars</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <div class="btn-group w-100" role="group">
                                <button class="btn btn-primary flex-fill" onclick="useTool(${tool.id})">
                                    <i class="fas fa-play"></i> Use Tool
                                </button>
                                <button class="btn btn-outline-secondary" onclick="editTool(${tool.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-danger" onclick="deleteTool(${tool.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return col;
        }

        function getStatusBadge(status) {
            const badges = {
                active: '<span class="badge bg-success">Active</span>',
                beta: '<span class="badge bg-warning">Beta</span>',
                maintenance: '<span class="badge bg-danger">Maintenance</span>'
            };
            return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
        }

        function getCategoryLabel(category) {
            const labels = {
                content: 'Content',
                image: 'Image',
                audio: 'Audio',
                video: 'Video',
                marketing: 'Marketing',
                business: 'Business',
                developer: 'Developer',
                education: 'Education',
                lifestyle: 'Lifestyle',
                system: 'System'
            };
            return labels[category] || 'Other';
        }

        function formatNumber(num) {
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        }

        function generateRating(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star text-warning"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt text-warning"></i>';
            }
            
            return stars;
        }

        function setupEventListeners() {
            document.getElementById('searchTools').addEventListener('input', filterTools);
            document.getElementById('categoryFilter').addEventListener('change', filterTools);
            document.getElementById('statusFilter').addEventListener('change', filterTools);
        }

        function filterTools() {
            const searchTerm = document.getElementById('searchTools').value.toLowerCase();
            const categoryFilter = document.getElementById('categoryFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;

            const filtered = tools.filter(tool => {
                const matchesSearch = tool.name.toLowerCase().includes(searchTerm) || 
                                    tool.description.toLowerCase().includes(searchTerm);
                const matchesCategory = !categoryFilter || tool.category === categoryFilter;
                const matchesStatus = !statusFilter || tool.status === statusFilter;
                
                return matchesSearch && matchesCategory && matchesStatus;
            });

            renderTools(filtered);
        }

        function clearFilters() {
            document.getElementById('searchTools').value = '';
            document.getElementById('categoryFilter').value = '';
            document.getElementById('statusFilter').value = '';
            renderTools();
        }

        function addTool() {
            const form = document.getElementById('toolForm');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const newTool = {
                id: Math.max(...tools.map(t => t.id)) + 1,
                name: document.getElementById('toolName').value,
                description: document.getElementById('toolDescription').value,
                category: document.getElementById('toolCategory').value,
                icon: document.getElementById('toolIcon').value || 'fas fa-cog',
                status: document.getElementById('toolStatus').value,
                uses: 0,
                rating: 0
            };

            tools.push(newTool);
            renderTools();
            
            bootstrap.Modal.getInstance(document.getElementById('addToolModal')).hide();
            form.reset();
            
            alert('Tool added successfully!');
        }

        function useTool(toolId) {
            const tool = tools.find(t => t.id === toolId);
            if (tool) {
                alert(`Launching ${tool.name}...`);
                // Increment usage count
                tool.uses++;
                renderTools();
            }
        }

        function editTool(toolId) {
            const tool = tools.find(t => t.id === toolId);
            if (tool) {
                // Populate form with tool data
                document.getElementById('toolName').value = tool.name;
                document.getElementById('toolDescription').value = tool.description;
                document.getElementById('toolCategory').value = tool.category;
                document.getElementById('toolIcon').value = tool.icon;
                document.getElementById('toolStatus').value = tool.status;
                
                // Show modal
                new bootstrap.Modal(document.getElementById('addToolModal')).show();
            }
        }

        function deleteTool(toolId) {
            if (confirm('Are you sure you want to delete this tool?')) {
                const index = tools.findIndex(t => t.id === toolId);
                if (index > -1) {
                    tools.splice(index, 1);
                    renderTools();
                    alert('Tool deleted successfully!');
                }
            }
        }
    });

} (jQuery) );