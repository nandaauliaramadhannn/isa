/* ===================================
   AIKIT - Charts JavaScript
   =================================== */
(function ($) {
    'use strict';

    $(document).ready(function() {

        // Chart configurations and data
        let usageChart, performanceChart;

        // Initialize charts when DOM is ready
        initializeCharts();


        /**
         * Initialize all dashboard charts
         */
        function initializeCharts() {
            initializeUsageChart();
            initializePerformanceChart();
        }

        /**
         * Initialize AI Usage Analytics Chart
         */
        function initializeUsageChart() {
            const ctx = document.getElementById('usageChart');
            if (!ctx) return;

            // Sample data for AI usage analytics
            const usageData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'API Calls',
                        data: [1200, 1900, 3000, 5000, 4000, 3000, 4500, 6000, 5500, 7000, 8000, 7200],
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Images Generated',
                        data: [800, 1200, 1800, 2200, 2800, 2400, 3200, 3800, 3400, 4200, 4800, 4400],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Models Trained',
                        data: [20, 35, 45, 60, 55, 48, 65, 75, 70, 85, 95, 88],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            };

            const config = {
                type: 'line',
                data: usageData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                color: getTextColor()
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                color: getGridColor()
                            },
                            ticks: {
                                color: getTextColor()
                            }
                        },
                        y: {
                            display: true,
                            grid: {
                                color: getGridColor()
                            },
                            ticks: {
                                color: getTextColor()
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            };

            usageChart = new Chart(ctx, config);
        }

        /**
         * Initialize Model Performance Chart
         */
        function initializePerformanceChart() {
            const ctx = document.getElementById('performanceChart');
            if (!ctx) return;

            // Sample data for model performance
            const performanceData = {
                labels: ['GPT-4', 'DALL-E 3', 'Claude', 'Midjourney', 'Stable Diffusion'],
                datasets: [{
                    label: 'Performance Score',
                    data: [95, 88, 92, 85, 90],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 2
                }]
            };

            const config = {
                type: 'doughnut',
                data: performanceData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15,
                                color: getTextColor()
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            };

            performanceChart = new Chart(ctx, config);
        }

        /**
         * Update charts for theme changes
         */
        function updateChartsForTheme() {
            if (usageChart) {
                usageChart.options.plugins.legend.labels.color = getTextColor();
                usageChart.options.scales.x.grid.color = getGridColor();
                usageChart.options.scales.x.ticks.color = getTextColor();
                usageChart.options.scales.y.grid.color = getGridColor();
                usageChart.options.scales.y.ticks.color = getTextColor();
                usageChart.update();
            }

            if (performanceChart) {
                performanceChart.options.plugins.legend.labels.color = getTextColor();
                performanceChart.update();
            }
        }

        /**
         * Get text color based on current theme
         */
        function getTextColor() {
            const theme = document.documentElement.getAttribute('data-theme');
            return theme === 'dark' ? '#e5e7eb' : '#374151';
        }

        /**
         * Get grid color based on current theme
         */
        function getGridColor() {
            const theme = document.documentElement.getAttribute('data-theme');
            return theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        }

        /**
         * Destroy charts (for cleanup)
         */
        function destroyCharts() {
            if (usageChart) {
                usageChart.destroy();
                usageChart = null;
            }
            if (performanceChart) {
                performanceChart.destroy();
                performanceChart = null;
            }
        }

        // Export functions for external use
        window.AIKIT_Charts = {
            initializeCharts,
            updateChartsForTheme,
            destroyCharts
        };

        // Social Media Manager Charts
        $(document).ready(function() {
            // Engagement chart data
            const engagementData = {
                likes: {
                    label: 'Likes',
                    data: [2400, 3200, 2800, 4100, 3600, 5200, 4800],
                    borderColor: '#6c63ff',
                    backgroundColor: 'rgba(108, 99, 255, 0.1)'
                },
                shares: {
                    label: 'Shares',
                    data: [1000, 640, 560, 200, 720, 270, 960],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)'
                },
                comments: {
                    label: 'Comments',
                    data: [320, 1001, 380, 590, 510, 100, 1200],
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)'
                }
            };

            // Engagement Trends Chart
            const engagementCanvas = $('#engagementTrendsChart')[0];
            if (!engagementCanvas) return;
            const engagementCtx = engagementCanvas.getContext('2d');
            const engagementChart = new Chart(engagementCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: engagementData.likes.label,
                        data: engagementData.likes.data,
                        borderColor: engagementData.likes.borderColor,
                        backgroundColor: engagementData.likes.backgroundColor,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });

            // Radio button event listeners with jQuery
            $('input[name="engagementChart"]').on('change', function() {
                const selectedType = $(this).attr('id').replace('engagement', '').toLowerCase();
                const selectedData = engagementData[selectedType];
                
                if (selectedData) {
                    engagementChart.data.datasets[0].label = selectedData.label;
                    engagementChart.data.datasets[0].data = selectedData.data;
                    engagementChart.data.datasets[0].borderColor = selectedData.borderColor;
                    engagementChart.data.datasets[0].backgroundColor = selectedData.backgroundColor;
                    engagementChart.update('active');
                }
            });

            // Platform Distribution Chart
            const platformCanvas = $('#platformDistributionChart')[0];
            if (!platformCanvas) return;
            const platformCtx = platformCanvas.getContext('2d');
            new Chart(platformCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Instagram', 'Twitter', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube'],
                    datasets: [{
                        data: [35, 25, 20, 10, 7, 3],
                        backgroundColor: [
                            '#E4405F',
                            '#1DA1F2',
                            '#000000',
                            '#0077B5',
                            '#1877F2',
                            '#FF0000'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });

            // Optimal Posting Times Chart
            const postingTimesCanvas = $('#postingTimesChart')[0];
            if (!postingTimesCanvas) return;
            const postingTimesCtx = postingTimesCanvas.getContext('2d');
            new Chart(postingTimesCtx, {
                type: 'radar',
                data: {
                    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                    datasets: [{
                        label: 'Engagement Rate',
                        data: [30, 75, 85, 95, 90, 60],
                        backgroundColor: 'rgba(108, 99, 255, 0.2)',
                        borderColor: '#6c63ff',
                        pointBackgroundColor: '#6c63ff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });

            // Hashtag Performance Chart
            const hashtagCanvas = $('#hashtagPerformanceChart')[0];
            if (!hashtagCanvas) return;
            const hashtagCtx = hashtagCanvas.getContext('2d');
            new Chart(hashtagCtx, {
                type: 'bar',
                data: {
                    labels: ['#TechTrends', '#AIRevolution', '#Innovation', '#Future', '#Digital'],
                    datasets: [{
                        label: 'Reach',
                        data: [8500, 6200, 5800, 4900, 4200],
                        backgroundColor: 'rgba(108, 99, 255, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        });
    });

} (jQuery) );