/* ===================================
   Social Media Charts
   =================================== */

(function ($) {
    'use strict';

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
        const engagementCtx = $('#engagementTrendsChart')[0].getContext('2d');
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
        const platformCtx = $('#platformDistributionChart')[0].getContext('2d');
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
        const postingTimesCtx = $('#postingTimesChart')[0].getContext('2d');
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
        const hashtagCtx = $('#hashtagPerformanceChart')[0].getContext('2d');
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
   
} (jQuery) );