// AI Customer Support Monitor Charts
(function ($) {
    'use strict';

    $(document).ready(function() {
        // Ticket volume chart data
        const ticketData = {
            new: {
                label: 'New Tickets',
                data: [45, 52, 38, 67, 73, 81, 69, 58, 64, 71, 77, 69],
                borderColor: '#6c63ff',
                backgroundColor: 'rgba(108, 99, 255, 0.1)'
            },
            resolved: {
                label: 'Resolved Tickets',
                data: [38, 47, 41, 59, 68, 75, 62, 54, 58, 65, 71, 64],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)'
            },
            pending: {
                label: 'Pending Tickets',
                data: [12, 18, 15, 23, 19, 16, 21, 17, 14, 19, 22, 18],
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)'
            }
        };

        // Ticket Volume Trends Chart
        const ticketVolumeCtx = $('#ticketVolumeChart')[0].getContext('2d');
        const ticketVolumeChart = new Chart(ticketVolumeCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: ticketData.new.label,
                    data: ticketData.new.data,
                    borderColor: ticketData.new.borderColor,
                    backgroundColor: ticketData.new.backgroundColor,
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

        // Radio button event listeners for ticket chart
        $('input[name="ticketChart"]').on('change', function() {
            const selectedType = $(this).attr('id').replace('ticket', '').toLowerCase();
            const selectedData = ticketData[selectedType];
            
            if (selectedData) {
                ticketVolumeChart.data.datasets[0].label = selectedData.label;
                ticketVolumeChart.data.datasets[0].data = selectedData.data;
                ticketVolumeChart.data.datasets[0].borderColor = selectedData.borderColor;
                ticketVolumeChart.data.datasets[0].backgroundColor = selectedData.backgroundColor;
                ticketVolumeChart.update('active');
            }
        });

        // Support Channels Distribution Chart
        const channelCtx = $('#channelDistributionChart')[0].getContext('2d');
        new Chart(channelCtx, {
            type: 'doughnut',
            data: {
                labels: ['Email', 'Live Chat', 'Phone', 'Social Media', 'Help Desk'],
                datasets: [{
                    data: [35, 28, 20, 12, 5],
                    backgroundColor: [
                        '#007bff',
                        '#28a745',
                        '#ffc107',
                        '#e83e8c',
                        '#6c757d'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                }
            }
        });

        // Response Time Analysis Chart
        const responseTimeCtx = $('#responseTimeChart')[0].getContext('2d');
        new Chart(responseTimeCtx, {
            type: 'bar',
            data: {
                labels: ['< 1 min', '1-5 min', '5-15 min', '15-30 min', '30-60 min', '> 1 hour'],
                datasets: [{
                    label: 'Ticket Count',
                    data: [125, 189, 234, 167, 89, 45],
                    backgroundColor: [
                        '#28a745',
                        '#20c997',
                        '#17a2b8',
                        '#ffc107',
                        '#fd7e14',
                        '#dc3545'
                    ]
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

        // Customer Sentiment Analysis Chart
        const sentimentCtx = $('#sentimentChart')[0].getContext('2d');
        new Chart(sentimentCtx, {
            type: 'polarArea',
            data: {
                labels: ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
                datasets: [{
                    data: [145, 289, 156, 78, 23],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(32, 201, 151, 0.8)',
                        'rgba(108, 117, 125, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(220, 53, 69, 0.8)'
                    ],
                    borderColor: [
                        '#28a745',
                        '#20c997',
                        '#6c757d',
                        '#ffc107',
                        '#dc3545'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 10
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });

        // Real-time updates simulation
        setInterval(function() {
            // Simulate real-time metric updates
            const metrics = [
                { selector: '.metric-card:nth-child(1) .metric-number', value: Math.floor(Math.random() * 50) + 220 },
                { selector: '.metric-card:nth-child(2) .metric-number', value: (Math.random() * 2 + 3).toFixed(1) + 'm' },
                { selector: '.metric-card:nth-child(3) .metric-number', value: (Math.random() * 5 + 92).toFixed(1) + '%' },
                { selector: '.metric-card:nth-child(4) .metric-number', value: (Math.random() * 10 + 75).toFixed(1) + '%' }
            ];

            metrics.forEach(metric => {
                const element = $(metric.selector);
                if (element.length) {
                    const currentText = element.text();
                    const newValue = metric.value;
                    // Only update the number part, preserve the change indicator
                    element.html(newValue + element.find('.metric-change')[0].outerHTML);
                }
            });
        }, 30000); // Update every 30 seconds

        // Interactive tooltips for priority tags
        $('.priority-tag').each(function() {
            const priority = $(this).text().toLowerCase();
            let tooltipText = '';
            
            switch(priority) {
                case 'low':
                    tooltipText = 'Response within 24 hours';
                    break;
                case 'medium':
                    tooltipText = 'Response within 8 hours';
                    break;
                case 'high':
                    tooltipText = 'Response within 2 hours';
                    break;
                case 'urgent':
                    tooltipText = 'Immediate response required';
                    break;
            }
            
            $(this).attr('title', tooltipText).tooltip();
        });

        // Interactive satisfaction score animation
        $('.satisfaction-score').on('mouseenter', function() {
            $(this).css('transform', 'scale(1.1)');
        }).on('mouseleave', function() {
            $(this).css('transform', 'scale(1)');
        });

        // Agent performance progress bars animation
        $('.progress-bar').each(function() {
            const width = $(this).css('width');
            $(this).css('width', '0').animate({ width: width }, 1500);
        });

        // Simulate new ticket notifications
        let notificationCount = 0;
        setInterval(function() {
            if (Math.random() > 0.7) { // 30% chance every 10 seconds
                notificationCount++;
                
                // Create notification element
                const notification = $(`
                    <div class="alert alert-info alert-dismissible fade show position-fixed" 
                         style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                        <i class="fas fa-ticket-alt me-2"></i>
                        <strong>New Ticket #CS-${2848 + notificationCount}</strong><br>
                        <small>Customer: ${getRandomCustomerName()} | Priority: ${getRandomPriority()}</small>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `);
                
                $('body').append(notification);
                
                // Auto-dismiss after 5 seconds
                setTimeout(function() {
                    notification.alert('close');
                }, 5000);
            }
        }, 10000); // Check every 10 seconds

        // Helper functions for notifications
        function getRandomCustomerName() {
            const names = ['John Smith', 'Emma Davis', 'Michael Johnson', 'Sarah Wilson', 'David Brown', 'Lisa Garcia'];
            return names[Math.floor(Math.random() * names.length)];
        }

        function getRandomPriority() {
            const priorities = ['Low', 'Medium', 'High', 'Urgent'];
            const weights = [40, 35, 20, 5]; // Weighted probability
            const random = Math.random() * 100;
            let cumulative = 0;
            
            for (let i = 0; i < priorities.length; i++) {
                cumulative += weights[i];
                if (random <= cumulative) {
                    return priorities[i];
                }
            }
            return 'Low';
        }

        // Search functionality for tickets table
        if ($('#ticketSearch').length === 0) {
            $('.table-responsive').before(`
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="ticketSearch" placeholder="Search tickets...">
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" id="statusFilter">
                            <option value="">All Status</option>
                            <option value="open">Open</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>
            `);
        }

        // Ticket search and filter functionality
        $('#ticketSearch, #statusFilter').on('input change', function() {
            const searchTerm = $('#ticketSearch').val().toLowerCase();
            const statusFilter = $('#statusFilter').val().toLowerCase();
            
            $('table tbody tr').each(function() {
                const row = $(this);
                const text = row.text().toLowerCase();
                const status = row.find('.ticket-status').text().toLowerCase();
                
                const matchesSearch = searchTerm === '' || text.includes(searchTerm);
                const matchesStatus = statusFilter === '' || status.includes(statusFilter);
                
                row.toggle(matchesSearch && matchesStatus);
            });
        });
    }); 

} (jQuery) );