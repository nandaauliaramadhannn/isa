(function ($) {
    'use strict';

    $(document).ready(function() {

        // Initialize analytics charts
        initializeAnalyticsCharts();

        function initializeAnalyticsCharts() {
            // Usage Trends Chart
            const usageTrendsCtx = document.getElementById('usageTrendsChart').getContext('2d');
            new Chart(usageTrendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'API Calls',
                        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 3200, 2800, 3500, 4200, 2847],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });

            // Model Distribution Chart
            const modelDistCtx = document.getElementById('modelDistributionChart').getContext('2d');
            new Chart(modelDistCtx, {
                type: 'doughnut',
                data: {
                    labels: ['GPT-4 Turbo', 'DALL-E 3', 'GPT-3.5', 'CodePilot'],
                    datasets: [{
                        data: [1247, 567, 892, 341],
                        backgroundColor: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Response Time Chart
            const responseTimeCtx = document.getElementById('responseTimeChart').getContext('2d');
            new Chart(responseTimeCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Avg Response Time (s)',
                        data: [1.2, 1.1, 1.3, 1.0, 1.4, 0.9, 1.1],
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Seconds'
                            }
                        }
                    }
                }
            });

            // Error Rate Chart
            const errorRateCtx = document.getElementById('errorRateChart').getContext('2d');
            new Chart(errorRateCtx, {
                type: 'line',
                data: {
                    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                    datasets: [{
                        label: 'Error Rate (%)',
                        data: [0.1, 0.9, 0.6, 0.1, 0.5, 0.1],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 1,
                            title: {
                                display: true,
                                text: 'Error Rate (%)'
                            }
                        }
                    }
                }
            });

            // Time Usage Chart
            const timeUsageCtx = document.getElementById('timeUsageChart').getContext('2d');
            new Chart(timeUsageCtx, {
                type: 'radar',
                data: {
                    labels: ['00-04', '04-08', '08-12', '12-16', '16-20', '20-00'],
                    datasets: [{
                        label: 'API Calls',
                        data: [120, 80, 450, 380, 420, 290],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        pointBackgroundColor: '#8b5cf6'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    });
   
} (jQuery) );