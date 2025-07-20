/* ===================================
   AIKIT - Main JavaScript Functions
   =================================== */
(function ($) {
    'use strict';

    $(document).ready(function() {      
        // Global variables
        let sidebarCollapsed = false;
        let currentTheme = 'light';

        // Initialize the application
        initializeApp();

        /**
         * Initialize the main application
         */
        function initializeApp() {
            initializeSidebar();
            initializeTheme();
            initializeTooltips();
            initializeModals();
            initializeDropdowns();
            initializeForms();
            initializeSearch();
            initializeNotifications();
            
            // Add loading state management
            removeLoadingStates();
            
            console.log('AIKIT Dashboard initialized successfully');
        }

        /**
         * Sidebar functionality
         */
        function initializeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
            const sidebarToggle = document.getElementById('sidebarToggle');
            const sidebarCollapseToggle = document.getElementById('sidebarCollapseToggle');
            const mainContent = document.querySelector('.main-content');
            
            // Mobile sidebar toggle
            if (mobileSidebarToggle) {
                mobileSidebarToggle.addEventListener('click', function() {
                    if (sidebar) {
                        sidebar.classList.toggle('show');
                        document.body.classList.toggle('sidebar-open');
                    }
                });
            }
            
            // Desktop sidebar toggle
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', function() {
                    if (sidebar) {
                        sidebar.classList.remove('show');
                    }
                });
            }
            
            // Sidebar collapse toggle
            if (sidebarCollapseToggle) {
                sidebarCollapseToggle.addEventListener('click', function() {
                    // Hide the tooltip immediately when clicked
                    const tooltipInstance = bootstrap.Tooltip.getInstance(sidebarCollapseToggle);
                    if (tooltipInstance) {
                        tooltipInstance.hide();
                    }
                    
                    if (sidebar) {
                        sidebar.classList.toggle('collapsed');
                        sidebarCollapsed = sidebar.classList.contains('collapsed');
                        localStorage.setItem('aikit-sidebar-collapsed', sidebarCollapsed);
                        
                        // Update tooltip placement for collapsed state
                        updateSidebarTooltips();
                    }
                });
            }
            
            // Restore sidebar state
            const savedCollapsedState = localStorage.getItem('aikit-sidebar-collapsed');
            if (savedCollapsedState === 'true' && sidebar) {
                sidebar.classList.add('collapsed');
                sidebarCollapsed = true;
            }
            
            // Close sidebar on overlay click (mobile)
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('show')) {
                    if (!sidebar.contains(e.target) && !mobileSidebarToggle.contains(e.target)) {
                        sidebar.classList.remove('show');
                        document.body.classList.remove('sidebar-open');
                    }
                }
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 991 && sidebar) {
                    sidebar.classList.remove('show');
                    document.body.classList.remove('sidebar-open');
                }
            });
            
            // Active navigation item
            setActiveNavigation();
            
            // Initialize sidebar tooltips
            updateSidebarTooltips();
        }

        /**
         * Set active navigation item based on current page
         */
        function setActiveNavigation() {
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.sidebar-menu .nav-link');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                
                if (href && currentPath.includes(href.replace('.html', ''))) {
                    link.classList.add('active');
                }
            });
        }

        /**
         * Theme management
         */
        function initializeTheme() {
            // Check for saved theme preference or default to 'light'
            const savedTheme = localStorage.getItem('aikit-theme') || 'light';
            setTheme(savedTheme);
            
            // Listen for theme toggle events
            document.addEventListener('click', function(e) {
                if (e.target.matches('[data-theme-toggle]') || e.target.matches('#themeToggle') || e.target.closest('#themeToggle')) {
                    toggleTheme();
                }
            });
        }

        /**
         * Set application theme
         * @param {string} theme - 'light' or 'dark'
         */
        function setTheme(theme) {
            currentTheme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('aikit-theme', theme);
            
            // Update theme toggle buttons
            const themeToggles = document.querySelectorAll('[data-theme-toggle], #themeToggle');
            themeToggles.forEach(toggle => {
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            });
            
            // Update charts if they exist
            if (typeof window.AIKIT_Charts !== 'undefined' && window.AIKIT_Charts.updateChartsForTheme) {
                window.AIKIT_Charts.updateChartsForTheme();
            }
        }

        /**
         * Toggle between light and dark themes
         */
        function toggleTheme() {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        }

        /**
         * Initialize tooltips
         */
        function initializeTooltips() {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl, {
                    trigger: 'hover',
                    placement: 'right',
                    delay: { show: 100, hide: 100 }
                });
            });
        }

        /**
         * Initialize modals
         */
        function initializeModals() {
            // Custom modal functionality can be added here
            const modals = document.querySelectorAll('.modal');
            
            modals.forEach(modal => {
                modal.addEventListener('show.bs.modal', function() {
                    // Add any custom modal show logic
                });
                
                modal.addEventListener('hidden.bs.modal', function() {
                    // Clear form data when modal is closed
                    const forms = modal.querySelectorAll('form');
                    forms.forEach(form => form.reset());
                });
            });
        }

        /**
         * Initialize dropdowns
         */
        function initializeDropdowns() {
            // Custom dropdown functionality
            const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
            
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    // Add any custom dropdown logic
                });
            });
        }

        /**
         * Initialize forms
         */
        function initializeForms() {
            // Form validation
            const forms = document.querySelectorAll('form[novalidate]');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    if (!form.checkValidity()) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    form.classList.add('was-validated');
                });
            });
            
            // Auto-resize textareas
            const textareas = document.querySelectorAll('textarea[data-auto-resize]');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
                });
            });
            
            // File input styling
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const fileName = this.files.length > 0 ? this.files[0].name : 'No file chosen';
                    const label = this.nextElementSibling;
                    if (label && label.classList.contains('file-label')) {
                        label.textContent = fileName;
                    }
                });
            });
        }

        /**
         * Initialize search functionality
         */
        function initializeSearch() {
            const searchInputs = document.querySelectorAll('input[data-search]');
            
            searchInputs.forEach(input => {
                let searchTimeout;
                
                input.addEventListener('input', function() {
                    clearTimeout(searchTimeout);
                    const searchTerm = this.value.toLowerCase();
                    const targetSelector = this.getAttribute('data-search');
                    
                    searchTimeout = setTimeout(() => {
                        performSearch(searchTerm, targetSelector);
                    }, 300);
                });
            });
        }

        /**
         * Perform search on target elements
         * @param {string} searchTerm - The search term
         * @param {string} targetSelector - CSS selector for search targets
         */
        function performSearch(searchTerm, targetSelector) {
            const targets = document.querySelectorAll(targetSelector);
            
            targets.forEach(target => {
                const text = target.textContent.toLowerCase();
                const match = text.includes(searchTerm);
                
                target.style.display = match ? '' : 'none';
                
                // Add search highlighting
                if (match && searchTerm) {
                    highlightSearchTerm(target, searchTerm);
                } else {
                    removeSearchHighlight(target);
                }
            });
        }

        /**
         * Highlight search terms in element
         * @param {Element} element - Target element
         * @param {string} searchTerm - Term to highlight
         */
        function highlightSearchTerm(element, searchTerm) {
            // Simple highlighting implementation
            removeSearchHighlight(element);
            
            if (!searchTerm) return;
            
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            textNodes.forEach(textNode => {
                const text = textNode.textContent;
                const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                
                if (regex.test(text)) {
                    const highlightedText = text.replace(regex, '<mark>$1</mark>');
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = highlightedText;
                    textNode.parentNode.replaceChild(wrapper, textNode);
                }
            });
        }

        /**
         * Remove search highlighting from element
         * @param {Element} element - Target element
         */
        function removeSearchHighlight(element) {
            const marks = element.querySelectorAll('mark');
            marks.forEach(mark => {
                mark.outerHTML = mark.innerHTML;
            });
        }

        /**
         * Escape special regex characters
         * @param {string} string - String to escape
         * @returns {string} Escaped string
         */
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        /**
         * Initialize notifications
         */
        function initializeNotifications() {
            // Check for notification permission
            if ('Notification' in window && Notification.permission === 'default') {
                // Request permission on user interaction
                document.addEventListener('click', requestNotificationPermission, { once: true });
            }
            
            // Handle notification clicks
            document.addEventListener('click', function(e) {
                if (e.target.matches('[data-notification]')) {
                    const type = e.target.getAttribute('data-notification');
                    const message = e.target.getAttribute('data-message') || 'Notification';
                    showNotification(message, type);
                }
            });
        }

        /**
         * Request notification permission
         */
        function requestNotificationPermission() {
            if ('Notification' in window) {
                // Notification.requestPermission();
            }
        }

        /**
         * Show notification
         * @param {string} message - Notification message
         * @param {string} type - Notification type (success, error, warning, info)
         */
        function showNotification(message, type = 'info') {
            // Create in-app notification
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} notification-toast`;
            notification.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
                    <span>${message}</span>
                    <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
                </div>
            `;
            
            // Style the notification
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                min-width: 300px;
                animation: slideInRight 0.3s ease-out;
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.animation = 'slideOutRight 0.3s ease-out';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 5000);
            
            // Browser notification (if permission granted)
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('AIKIT Dashboard', {
                    body: message,
                    icon: '/favicon.ico'
                });
            }
        }

        /**
         * Get notification icon based on type
         * @param {string} type - Notification type
         * @returns {string} Icon class
         */
        function getNotificationIcon(type) {
            const icons = {
                success: 'check-circle',
                error: 'exclamation-triangle',
                warning: 'exclamation-triangle',
                info: 'info-circle'
            };
            return icons[type] || icons.info;
        }

        /**
         * Remove loading states
         */
        function removeLoadingStates() {
            const loadingElements = document.querySelectorAll('.loading, [data-loading]');
            loadingElements.forEach(element => {
                element.classList.remove('loading');
                element.removeAttribute('data-loading');
            });
        }

        /**
         * Format number with commas
         * @param {number} num - Number to format
         * @returns {string} Formatted number
         */
        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        /**
         * Format file size
         * @param {number} bytes - File size in bytes
         * @returns {string} Formatted file size
         */
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        /**
         * Format date to relative time
         * @param {Date|string} date - Date to format
         * @returns {string} Relative time string
         */
        function formatRelativeTime(date) {
            const now = new Date();
            const targetDate = new Date(date);
            const diffInSeconds = Math.floor((now - targetDate) / 1000);
            
            if (diffInSeconds < 60) return 'Just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
            
            return targetDate.toLocaleDateString();
        }

        /**
         * Copy text to clipboard
         * @param {string} text - Text to copy
         * @returns {Promise<boolean>} Success status
         */
        async function copyToClipboard(text) {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    return true;
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    const success = document.execCommand('copy');
                    textArea.remove();
                    return success;
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
                return false;
            }
        }

        /**
         * Debounce function
         * @param {Function} func - Function to debounce
         * @param {number} wait - Wait time in milliseconds
         * @returns {Function} Debounced function
         */
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        /**
         * Throttle function
         * @param {Function} func - Function to throttle
         * @param {number} limit - Time limit in milliseconds
         * @returns {Function} Throttled function
         */
        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        /**
         * Update sidebar tooltips for collapsed state
         */
        function updateSidebarTooltips() {
            const sidebar = document.getElementById('sidebar');
            const menuLinks = sidebar.querySelectorAll('.menu-link');
            
            if (sidebar.classList.contains('collapsed')) {
                // Add tooltips for collapsed sidebar
                menuLinks.forEach(link => {
                    const textElement = link.querySelector('.menu-text');
                    if (textElement && textElement.textContent.trim()) {
                        // Remove existing tooltip if any
                        const existingTooltip = bootstrap.Tooltip.getInstance(link);
                        if (existingTooltip) {
                            existingTooltip.dispose();
                        }
                        
                        // Add new tooltip
                        link.setAttribute('data-bs-toggle', 'tooltip');
                        link.setAttribute('data-bs-placement', 'right');
                        link.setAttribute('title', textElement.textContent.trim());
                    }
                });
                
                // Initialize new tooltips
                initializeTooltips();
            } else {
                // Remove tooltips for expanded sidebar
                menuLinks.forEach(link => {
                    const tooltipInstance = bootstrap.Tooltip.getInstance(link);
                    if (tooltipInstance) {
                        tooltipInstance.dispose();
                    }
                    link.removeAttribute('data-bs-toggle');
                    link.removeAttribute('data-bs-placement');
                    link.removeAttribute('title');
                });
                
                // Initialize new tooltips
                initializeTooltips();
            }
        }

        /**
         * Generate random ID
         * @param {number} length - ID length
         * @returns {string} Random ID
         */
        function generateId(length = 8) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }

        /**
         * Validate email address
         * @param {string} email - Email to validate
         * @returns {boolean} Validation result
         */
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Get query parameter value
         * @param {string} name - Parameter name
         * @returns {string|null} Parameter value
         */
        function getQueryParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        /**
         * Smooth scroll to element
         * @param {string|Element} target - Target element or selector
         * @param {number} offset - Scroll offset
         */
        function scrollToElement(target, offset = 0) {
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            if (element) {
                const targetPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        /**
         * Check if element is in viewport
         * @param {Element} element - Element to check
         * @returns {boolean} Visibility status
         */
        function isElementInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        /**
         * Add loading state to element
         * @param {Element} element - Target element
         * @param {string} text - Loading text
         */
        function addLoadingState(element, text = 'Loading...') {
            element.disabled = true;
            element.setAttribute('data-original-html', element.innerHTML);
            element.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${text}`;
        }

        /**
         * Remove loading state from element
         * @param {Element} element - Target element
         */
        function removeLoadingState(element) {
            element.disabled = false;
            const originalHtml = element.getAttribute('data-original-html');
            if (originalHtml) {
                element.innerHTML = originalHtml;
                element.removeAttribute('data-original-html');
            }
        }

        // Export functions for use in other modules
        window.AIKIT = {
            // Core functions
            showNotification,
            copyToClipboard,
            formatNumber,
            formatFileSize,
            formatRelativeTime,
            
            // Utility functions
            debounce,
            throttle,
            generateId,
            validateEmail,
            getQueryParam,
            scrollToElement,
            isElementInViewport,
            
            // UI functions
            addLoadingState,
            removeLoadingState,
            setTheme,
            toggleTheme,
            
            // Search functions
            performSearch,
            highlightSearchTerm,
            removeSearchHighlight
        };

        // Add CSS for notifications
        const notificationCSS = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .notification-toast {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: none;
            border-radius: 8px;
        }
        `;

        // Add the CSS to the document
        if (!document.getElementById('aikit-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'aikit-notification-styles';
            style.textContent = notificationCSS;
            document.head.appendChild(style);
        }


        // Image upload handling
        $('#imageUpload').on('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    $('#profileImage').attr('src', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Skills management
        function addSkill() {
            const $skillInput = $('#skillInput');
            const skill = $skillInput.val().trim();
            
            if (skill) {
                const $skillsContainer = $('#skillsTags');
                const $skillTag = $(`<span class="skill-tag editable">${skill} <i class="fas fa-times"></i></span>`);
                
                $skillTag.find('i').on('click', function() {
                    $skillTag.remove();
                });
                
                $skillsContainer.append($skillTag);
                $skillInput.val('');
            }
        }

        $('#addSkillBtn').on('click', addSkill);
        $('#skillInput').on('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });

        // Remove skill functionality for existing skills
        $(document).on('click', '.skill-tag.editable i', function() {
            $(this).parent().remove();
        });

        // Form submission
        $('#editProfileForm').on('submit', function(e) {
            e.preventDefault();
            
            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            
            $submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Saving...').prop('disabled', true);
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 2000);
        });


        // Settings tab navigation
        $('.settings-nav-item').on('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items and tabs
            $('.settings-nav-item').removeClass('active');
            $('.settings-tab').removeClass('active');
            
            // Add active class to clicked nav item
            $(this).addClass('active');
            
            // Show corresponding tab
            const tabId = $(this).data('tab');
            $('#' + tabId).addClass('active');
        });


        // PRICING TABLES
        // Plan data
        let plans = [
            {
                id: 1,
                name: 'Free',
                price: 0,
                description: 'Perfect for getting started with AI',
                apiCalls: 1000,
                storage: 1,
                support: 'email',
                features: ['aiChat'],
                popular: false,
                users: 847
            },
            {
                id: 2,
                name: 'Basic',
                price: 29,
                description: 'Great for individual developers and small projects',
                apiCalls: 10000,
                storage: 10,
                support: 'email',
                features: ['aiChat', 'imageGeneration', 'apiAccess'],
                popular: false,
                users: 234
            },
            {
                id: 3,
                name: 'Premium',
                price: 99,
                description: 'Ideal for growing businesses and teams',
                apiCalls: 100000,
                storage: 100,
                support: 'priority',
                features: ['aiChat', 'imageGeneration', 'analytics', 'apiAccess', 'teamCollaboration'],
                popular: true,
                users: 156
            },
            {
                id: 4,
                name: 'Enterprise',
                price: 299,
                description: 'Advanced features for large organizations',
                apiCalls: 1000000,
                storage: 1000,
                support: 'dedicated',
                features: ['aiChat', 'imageGeneration', 'analytics', 'customModels', 'apiAccess', 'teamCollaboration'],
                popular: false,
                users: 43
            }
        ];

        // Feature mapping
        const featureLabels = {
            aiChat: 'AI Chat Access',
            imageGeneration: 'Image Generation',
            analytics: 'Advanced Analytics',
            customModels: 'Custom Models',
            apiAccess: 'Full API Access',
            teamCollaboration: 'Team Collaboration'
        };

        // Initialize page
        $(document).ready(function() {
            renderPricingCards();
            renderPlanTable();
        });

        function renderPricingCards() {
            const container = $('#pricingCards');
            container.empty();

            plans.forEach(plan => {
                const card = $('<div class="col-lg-3 col-md-6"></div>');
                card.html(`
                    <div class="pricing-card ${plan.popular ? 'popular' : ''}">
                        ${plan.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
                        <div class="pricing-header">
                            <h4>${plan.name}</h4>
                            <div class="price">
                                <span class="currency">$</span>
                                <span class="amount">${plan.price}</span>
                                <span class="period">/month</span>
                            </div>
                            <p class="description">${plan.description}</p>
                        </div>
                        <div class="pricing-features">
                            <ul>
                                <li><i class="fas fa-api"></i> ${formatNumber(plan.apiCalls)} API calls/month</li>
                                <li><i class="fas fa-hdd"></i> ${plan.storage} GB storage</li>
                                <li><i class="fas fa-headset"></i> ${plan.support} support</li>
                                ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${featureLabels[feature]}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="pricing-footer">
                            <button class="btn btn-${plan.popular ? 'primary' : 'outline-primary'} w-100">
                                Choose Plan
                            </button>
                            <small class="text-muted">${plan.users} active users</small>
                        </div>
                        <div class="pricing-actions">
                            <button class="btn btn-sm btn-outline-secondary" data-plan-id="${plan.id}" data-action="edit">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger" data-plan-id="${plan.id}" data-action="delete">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `);
                container.append(card);
            });
        }

        function renderPlanTable() {
            const tbody = $('#planTableBody');
            tbody.empty();

            plans.forEach(plan => {
                const row = $('<tr></tr>');
                row.html(`
                    <td>
                        <strong>${plan.name}</strong>
                        ${plan.popular ? '<span class="badge bg-warning ms-2">Popular</span>' : ''}
                    </td>
                    <td>$${plan.price}/month</td>
                    <td>${formatNumber(plan.apiCalls)}</td>
                    <td>${plan.storage} GB</td>
                    <td><span class="badge bg-secondary">${plan.support}</span></td>
                    <td>${plan.users} users</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-outline-primary" data-plan-id="${plan.id}" data-action="edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" data-plan-id="${plan.id}" data-action="delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `);
                tbody.append(row);
            });
        }

        function editPlan(planId) {
            const plan = plans.find(p => p.id === planId);
            if (!plan) return;

            // Populate form
            $('#planModalTitle').text('Edit Plan');
            $('#planId').val(plan.id);
            $('#planName').val(plan.name);
            $('#planPrice').val(plan.price);
            $('#planDescription').val(plan.description);
            $('#apiCalls').val(plan.apiCalls);
            $('#storage').val(plan.storage);
            $('#support').val(plan.support);

            // Reset checkboxes
            $('#planForm input[type="checkbox"]').prop('checked', false);
            
            // Set feature checkboxes
            plan.features.forEach(feature => {
                const checkbox = $('#planForm input[id="' + feature + '"]');
                if (checkbox.length > 0) checkbox.prop('checked', true);
            });

            // Show modal
            new bootstrap.Modal($('#addPlanModal')).show();
        }

        function savePlan() {
            const form = $('#planForm');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const planId = $('#planId').val();
            const features = [];
            $('#planForm input[type="checkbox"]:checked').each(function() {
                features.push($(this).attr('id'));
            });

            const planData = {
                name: $('#planName').val(),
                price: parseFloat($('#planPrice').val()),
                description: $('#planDescription').val(),
                apiCalls: parseInt($('#apiCalls').val()),
                storage: parseInt($('#storage').val()),
                support: $('#support').val(),
                features: features
            };

            if (planId) {
                // Update existing plan
                const planIndex = plans.findIndex(p => p.id === parseInt(planId));
                if (planIndex !== -1) {
                    plans[planIndex] = { ...plans[planIndex], ...planData };
                }
            } else {
                // Add new plan
                planData.id = Math.max(...plans.map(p => p.id)) + 1;
                planData.popular = false;
                planData.users = 0;
                plans.push(planData);
            }

            // Refresh displays
            renderPricingCards();
            renderPlanTable();

            // Close modal and reset form
            bootstrap.Modal.getInstance($('#addPlanModal')).hide();
            form.reset();
            $('#planModalTitle').text('Add New Plan');
            $('#planId').val('');

            alert(planId ? 'Plan updated successfully!' : 'Plan added successfully!');
        }

        function deletePlan(planId) {
            const plan = plans.find(p => p.id === planId);
            if (!plan) return;

            if (confirm(`Are you sure you want to delete the "${plan.name}" plan? This action cannot be undone.`)) {
                plans = plans.filter(p => p.id !== planId);
                renderPricingCards();
                renderPlanTable();
                alert('Plan deleted successfully!');
            }
        }

        function refreshPlans() {
            renderPricingCards();
            renderPlanTable();
            alert('Plans refreshed successfully!');
        }

        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // Made functions globally accessible for modal usage
        window.editPlan = editPlan;
        window.deletePlan = deletePlan;
        window.savePlan = savePlan;
        window.refreshPlans = refreshPlans;

    });
} (jQuery) );