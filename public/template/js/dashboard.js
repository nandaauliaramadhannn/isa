/* ===================================
   AIKIT - Dashboard Specific JavaScript
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {
        // Dashboard data and state
        let dashboardData = {
            stats: {
                models: 24,
                apiCalls: 1247,
                imagesGenerated: 567,
                uptime: 89
            },
            activities: [],
            systemStatus: {
                api: 'online',
                gpu: 'active',
                storage: 80,
                backup: 'updated'
            }
        };


        if (isDashboardPage()) {
            initializeDashboard();
        }


        /**
         * Check if current page is dashboard
         * @returns {boolean}
         */
        function isDashboardPage() {
            return window.location.pathname.includes('index.html') ||
                   window.location.pathname === '/' ||
                   window.location.pathname.includes('dashboard');
        }

        /**
         * Initialize dashboard functionality
         */
        function initializeDashboard() {
            console.log('Initializing dashboard...');

            initializeStatsCards();
            initializeQuickActions();
            initializeSystemStatus();
            initializeActivityFeed();
            initializeRealtimeUpdates();

            console.log('Dashboard initialized successfully');
        }

        /**
         * Initialize stats cards with animations
         */
        function initializeStatsCards() {
            const statsCards = document.querySelectorAll('.stat-card');

            // Animate stats on load
            statsCards.forEach((card, index) => {
                setTimeout(() => {
                    animateStatCard(card);
                }, index * 200);
            });

            // Update stats periodically
            setInterval(updateStatsCards, 30000); // Update every 30 seconds
        }

        /**
         * Animate individual stat card
         * @param {Element} card - Stat card element
         */
        function animateStatCard(card) {
            const numberElement = card.querySelector('.stat-number');
            if (!numberElement) return;

            const finalValue = parseInt(numberElement.textContent.replace(/[^\d]/g, ''));
            if (isNaN(finalValue)) return;

            let currentValue = 0;
            const increment = finalValue / 50;
            const duration = 1000;
            const stepTime = duration / 50;

            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }

                // Format the number based on original format
                const originalText = numberElement.getAttribute('data-original') || numberElement.textContent;
                if (originalText.includes('%')) {
                    numberElement.textContent = Math.floor(currentValue) + '%';
                } else if (originalText.includes('s')) {
                    numberElement.textContent = (currentValue / 10).toFixed(1) + 's';
                } else {
                    numberElement.textContent = AIKIT.formatNumber(Math.floor(currentValue));
                }
            }, stepTime);

            // Store original value
            if (!numberElement.getAttribute('data-original')) {
                numberElement.setAttribute('data-original', numberElement.textContent);
            }
        }

        /**
         * Update stats cards with new data
         */
        function updateStatsCards() {
            // Simulate real-time data updates
            dashboardData.stats.apiCalls += Math.floor(Math.random() * 10);
            dashboardData.stats.imagesGenerated += Math.floor(Math.random() * 3);

            // Update the UI
            const apiCallsElement = document.querySelector('[data-stat="apiCalls"]');
            const imagesElement = document.querySelector('[data-stat="images"]');

            if (apiCallsElement) {
                updateStatValue(apiCallsElement, dashboardData.stats.apiCalls);
            }

            if (imagesElement) {
                updateStatValue(imagesElement, dashboardData.stats.imagesGenerated);
            }
        }

        /**
         * Update individual stat value with animation
         * @param {Element} element - Stat number element
         * @param {number} newValue - New value to display
         */
        function updateStatValue(element, newValue) {
            const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
            const difference = newValue - currentValue;

            if (difference === 0) return;

            let stepValue = currentValue;
            const stepSize = difference / 10;
            const stepTime = 100;

            const timer = setInterval(() => {
                stepValue += stepSize;
                if ((stepSize > 0 && stepValue >= newValue) || (stepSize < 0 && stepValue <= newValue)) {
                    stepValue = newValue;
                    clearInterval(timer);
                }

                element.textContent = AIKIT.formatNumber(Math.floor(stepValue));
            }, stepTime);

            // Add update indicator
            const indicator = document.createElement('span');
            indicator.className = 'update-indicator';
            indicator.innerHTML = `<i class="fas fa-arrow-up text-success"></i>`;
            indicator.style.cssText = 'margin-left: 5px; opacity: 0; transition: opacity 0.3s;';

            element.parentElement.appendChild(indicator);

            setTimeout(() => {
                indicator.style.opacity = '1';
                setTimeout(() => {
                    indicator.style.opacity = '0';
                    setTimeout(() => indicator.remove(), 300);
                }, 2000);
            }, 10);
        }

        /**
         * Initialize quick actions functionality
         */
        function initializeQuickActions() {
            const quickActionButtons = document.querySelectorAll('.quick-action-btn');

            quickActionButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();

                    const actionType = this.getAttribute('href');
                    const actionName = this.querySelector('span').textContent;

                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);

                    // Handle different action types
                    handleQuickAction(actionType, actionName);
                });

                // Add hover effects
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });

                button.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        }

        /**
         * Handle quick action clicks
         * @param {string} actionType - Type of action
         * @param {string} actionName - Name of action
         */
        function handleQuickAction(actionType, actionName) {
            // Show loading state
            AIKIT.showNotification(`Starting ${actionName}...`, 'info');

            // Simulate action execution
            setTimeout(() => {
                AIKIT.showNotification(`${actionName} ready!`, 'success');

                // Add to activity feed
                addActivityItem({
                    icon: getActionIcon(actionType),
                    title: `${actionName} Accessed`,
                    description: `User initiated ${actionName.toLowerCase()}`,
                    time: new Date(),
                    type: 'info'
                });
            }, 1500);
        }

        /**
         * Get icon for action type
         * @param {string} actionType - Action type
         * @returns {string} Icon class
         */
        function getActionIcon(actionType) {
            const iconMap = {
                'ai-chat.html': 'fas fa-comments',
                'ai-image.html': 'fas fa-image',
                'ai-analytics.html': 'fas fa-chart-line',
                'ai-models.html': 'fas fa-robot'
            };

            return iconMap[actionType] || 'fas fa-play';
        }

        /**
         * Initialize system status monitoring
         */
        function initializeSystemStatus() {
            updateSystemStatus();

            // Update status every 60 seconds
            setInterval(updateSystemStatus, 60000);

            // Add click handlers for status items
            const statusItems = document.querySelectorAll('.status-item');
            statusItems.forEach(item => {
                item.addEventListener('click', function() {
                    const statusType = this.querySelector('.status-label').textContent;
                    showStatusDetails(statusType);
                });
            });
        }

        /**
         * Update system status display
         */
        function updateSystemStatus() {
            const statusItems = document.querySelectorAll('.status-item');

            statusItems.forEach(item => {
                const label = item.querySelector('.status-label').textContent.toLowerCase();
                const badge = item.querySelector('.status-badge');

                if (!badge) return;

                // Simulate status updates
                let status, statusClass;

                switch (label) {
                    case 'api status':
                        status = Math.random() > 0.1 ? 'Online' : 'Offline';
                        statusClass = status === 'Online' ? 'bg-success' : 'bg-danger';
                        break;
                    case 'gpu cluster':
                        status = Math.random() > 0.05 ? 'Active' : 'Maintenance';
                        statusClass = status === 'Active' ? 'bg-success' : 'bg-warning';
                        break;
                    case 'storage':
                        const usage = Math.floor(Math.random() * 20) + 75;
                        status = `${usage}% Used`;
                        statusClass = usage > 90 ? 'bg-danger' : usage > 80 ? 'bg-warning' : 'bg-success';
                        break;
                    case 'backup':
                        status = Math.random() > 0.2 ? 'Updated' : 'Pending';
                        statusClass = status === 'Updated' ? 'bg-success' : 'bg-warning';
                        break;
                    default:
                        return;
                }

                badge.textContent = status;
                badge.className = `status-badge ${statusClass}`;
            });
        }

        /**
         * Show detailed status information
         * @param {string} statusType - Type of status
         */
        function showStatusDetails(statusType) {
            const details = {
                'API Status': 'All API endpoints are operational. Response time: 120ms',
                'GPU Cluster': '8 GPUs active, processing 24 concurrent requests',
                'Storage': 'Using 23.4GB of 30GB allocated storage',
                'Backup': 'Last backup completed 2 hours ago'
            };

            AIKIT.showNotification(details[statusType] || `${statusType} information`, 'info');
        }

        /**
         * Initialize activity feed
         */
        function initializeActivityFeed() {
            // Load initial activities
            loadActivityFeed();

            // Simulate new activities
            setInterval(addRandomActivity, 45000); // Add activity every 45 seconds
        }

        /**
         * Load activity feed with sample data
         */
        function loadActivityFeed() {
            const activities = [
                {
                    icon: 'fas fa-brain bg-primary',
                    title: 'GPT-4 Model Training Completed',
                    description: 'Advanced language model training finished successfully',
                    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                    type: 'success'
                },
                {
                    icon: 'fas fa-image bg-success',
                    title: 'Image Generation Batch Complete',
                    description: 'Generated 50 images using DALL-E model',
                    time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                    type: 'success'
                },
                {
                    icon: 'fas fa-chart-bar bg-warning',
                    title: 'Analytics Report Generated',
                    description: 'Monthly performance report is ready for review',
                    time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                    type: 'info'
                }
            ];

            activities.forEach(activity => addActivityItem(activity));
        }

        /**
         * Add activity item to feed
         * @param {Object} activity - Activity data
         */
        function addActivityItem(activity) {
            const activityList = document.querySelector('.activity-list');
            if (!activityList) return;

            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.innerHTML = `
                <div class="activity-icon ${activity.icon}">
                    <i class="${activity.icon.replace('bg-', '').replace('fas fa-', 'fas fa-')}"></i>
                </div>
                <div class="activity-content">
                    <h6>${activity.title}</h6>
                    <p>${activity.description}</p>
                    <small class="text-muted">${AIKIT.formatRelativeTime(activity.time)}</small>
                </div>
            `;

            // Add fade-in animation
            activityElement.style.opacity = '0';
            activityElement.style.transform = 'translateY(20px)';

            activityList.insertBefore(activityElement, activityList.firstChild);

            // Animate in
            setTimeout(() => {
                activityElement.style.transition = 'all 0.3s ease-out';
                activityElement.style.opacity = '1';
                activityElement.style.transform = 'translateY(0)';
            }, 10);

            // Keep only the latest 10 activities
            const activities = activityList.querySelectorAll('.activity-item');
            if (activities.length > 10) {
                activities[activities.length - 1].remove();
            }

            // Store in dashboard data
            dashboardData.activities.unshift(activity);
            if (dashboardData.activities.length > 10) {
                dashboardData.activities.pop();
            }
        }

        /**
         * Add random activity for demonstration
         */
        function addRandomActivity() {
            const randomActivities = [
                {
                    icon: 'fas fa-upload bg-info',
                    title: 'New Model Uploaded',
                    description: 'Custom classification model has been uploaded',
                    time: new Date(),
                    type: 'info'
                },
                {
                    icon: 'fas fa-user bg-success',
                    title: 'New User Registered',
                    description: 'A new user has joined the platform',
                    time: new Date(),
                    type: 'success'
                },
                {
                    icon: 'fas fa-cog bg-warning',
                    title: 'System Maintenance',
                    description: 'Routine system maintenance completed',
                    time: new Date(),
                    type: 'warning'
                },
                {
                    icon: 'fas fa-download bg-primary',
                    title: 'Model Updated',
                    description: 'GPT-4 model has been updated to latest version',
                    time: new Date(),
                    type: 'info'
                }
            ];

            const randomActivity = randomActivities[Math.floor(Math.random() * randomActivities.length)];
            addActivityItem(randomActivity);
        }

        /**
         * Initialize real-time updates
         */
        function initializeRealtimeUpdates() {
            // Simulate WebSocket connection for real-time updates
            console.log('Initializing real-time updates...');

            // Update timestamps every minute
            setInterval(updateTimestamps, 60000);

            // Simulate real-time notifications
            setInterval(simulateRealtimeNotification, 120000); // Every 2 minutes
        }

        /**
         * Update all timestamps on the page
         */
        function updateTimestamps() {
            const timeElements = document.querySelectorAll('[data-time]');
            timeElements.forEach(element => {
                const timestamp = element.getAttribute('data-time');
                if (timestamp) {
                    element.textContent = AIKIT.formatRelativeTime(new Date(timestamp));
                }
            });

            // Update activity timestamps
            const activityTimes = document.querySelectorAll('.activity-content small');
            activityTimes.forEach((timeElement, index) => {
                if (dashboardData.activities[index]) {
                    timeElement.textContent = AIKIT.formatRelativeTime(dashboardData.activities[index].time);
                }
            });
        }

        /**
         * Simulate real-time notifications
         */
        function simulateRealtimeNotification() {
            const notifications = [
                { message: 'New API key generated successfully', type: 'success' },
                { message: 'Model training progress: 75% complete', type: 'info' },
                { message: 'Storage usage warning: 85% full', type: 'warning' },
                { message: 'Daily backup completed', type: 'success' }
            ];

            if (Math.random() > 0.5) { // 50% chance of showing notification
                const notification = notifications[Math.floor(Math.random() * notifications.length)];
                AIKIT.showNotification(notification.message, notification.type);
            }
        }

        /**
         * Export dashboard functions for external use
         */
        window.AIKIT_Dashboard = {
            updateStatsCards,
            addActivityItem,
            updateSystemStatus,
            handleQuickAction
        };

        // Add dashboard-specific CSS
        const dashboardCSS = `
        .stat-card {
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .activity-item {
            transition: all 0.3s ease;
        }

        .activity-item:hover {
            background-color: rgba(var(--primary), 0.05);
            border-radius: 8px;
            transform: translateX(5px);
        }

        .quick-action-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .update-indicator {
            animation: fadeInOut 3s ease-in-out;
        }

        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(10px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
        }

        .status-item {
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 8px;
            margin: -8px;
            border-radius: 6px;
        }

        .status-item:hover {
            background-color: rgba(var(--primary), 0.05);
        }
        `;

        // Add the CSS to the document
        if (!document.getElementById('aikit-dashboard-styles')) {
            const style = document.createElement('style');
            style.id = 'aikit-dashboard-styles';
            style.textContent = dashboardCSS;
            document.head.appendChild(style);
        }
    });
} (jQuery) );
