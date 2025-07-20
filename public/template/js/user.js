/* ===================================
   USER EDIT & PROFILE ACTIONS JS
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {      
        
        // User Management

        // Sample user data
        const userData = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                role: 'admin',
                plan: 'enterprise',
                status: 'active',
                lastLogin: '2024-01-15 14:30:00',
                avatar: 'JD'
            },
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                role: 'user',
                plan: 'premium',
                status: 'active',
                lastLogin: '2024-01-14 09:15:00',
                avatar: 'JS'
            },
            {
                id: 3,
                firstName: 'Mike',
                lastName: 'Johnson',
                email: 'mike.johnson@example.com',
                role: 'moderator',
                plan: 'basic',
                status: 'pending',
                lastLogin: '2024-01-13 16:45:00',
                avatar: 'MJ'
            },
            {
                id: 4,
                firstName: 'Sarah',
                lastName: 'Williams',
                email: 'sarah.williams@example.com',
                role: 'user',
                plan: 'free',
                status: 'suspended',
                lastLogin: '2024-01-12 11:20:00',
                avatar: 'SW'
            },
            {
                id: 5,
                firstName: 'David',
                lastName: 'Brown',
                email: 'david.brown@example.com',
                role: 'user',
                plan: 'premium',
                status: 'active',
                lastLogin: '2024-01-15 08:00:00',
                avatar: 'DB'
            }
        ];

        let usersTable;

        // Initialize DataTable
        usersTable = $('#usersTable').DataTable({
            data: userData,
            responsive: true,
            columns: [
                {
                    data: null,
                    render: function(data, type, row) {
                        return `
                            <div class="d-flex align-items-center">
                                <div class="user-avatar-sm me-3">
                                    <div class="avatar-placeholder-sm">
                                        ${row.avatar}
                                    </div>
                                </div>
                                <div>
                                    <strong>${row.firstName} ${row.lastName}</strong>
                                </div>
                            </div>
                        `;
                    }
                },
                { data: 'email' },
                {
                    data: 'role',
                    render: function(data) {
                        const badges = {
                            admin: 'bg-danger',
                            moderator: 'bg-warning',
                            user: 'bg-primary'
                        };
                        return `<span class="badge ${badges[data]}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                    }
                },
                {
                    data: 'plan',
                    render: function(data) {
                        const badges = {
                            free: 'bg-secondary',
                            basic: 'bg-info',
                            premium: 'bg-success',
                            enterprise: 'bg-warning'
                        };
                        return `<span class="badge ${badges[data]}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                    }
                },
                {
                    data: 'status',
                    render: function(data) {
                        const badges = {
                            active: 'bg-success',
                            pending: 'bg-warning',
                            suspended: 'bg-danger'
                        };
                        return `<span class="badge ${badges[data]}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                    }
                },
                {
                    data: 'lastLogin',
                    render: function(data) {
                        return new Date(data).toLocaleDateString() + '<br><small class="text-muted">' + new Date(data).toLocaleTimeString() + '</small>';
                    }
                },
                {
                    data: null,
                    orderable: false,
                    render: function(data, type, row) {
                        return `
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" data-action="edit" data-user-id="${row.id}" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-${row.status === 'suspended' ? 'success' : 'warning'}" 
                                        data-action="toggle-status" data-user-id="${row.id}"
                                        title="${row.status === 'suspended' ? 'Reactivate' : 'Suspend'}">
                                    <i class="fas fa-${row.status === 'suspended' ? 'user-check' : 'user-slash'}"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" data-action="delete" data-user-id="${row.id}" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `;
                    }
                }
            ],
            pageLength: 10,
            order: [[0, 'asc']],
            language: {
                search: "Search users:",
                lengthMenu: "Show _MENU_ users per page",
                info: "Showing _START_ to _END_ of _TOTAL_ users",
                paginate: {
                    previous: "<i class='fas fa-chevron-left'></i>",
                    next: "<i class='fas fa-chevron-right'></i>"
                }
            }
        });

        // Event delegation for DataTable buttons
        $(document).on('click', '[data-action]', function() {
            const action = $(this).data('action');
            const userId = parseInt($(this).data('user-id'));
            
            switch(action) {
                case 'edit':
                    editUser(userId);
                    break;
                case 'toggle-status':
                    toggleUserStatus(userId);
                    break;
                case 'delete':
                    deleteUser(userId);
                    break;
            }
        });

        // Make functions globally accessible (for modal form submissions and onclick handlers)
        window.addUser = addUser;
        window.updateUser = updateUser;
        window.showBillingHistory = showBillingHistory;
        window.showUsageStats = showUsageStats;
        window.showCancelDialog = showCancelDialog;
        window.confirmCancellation = confirmCancellation;

        function addUser() {
            const form = document.getElementById('addUserForm');
            const formData = new FormData(form);
            
            // Validate form
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Create new user object
            const newUser = {
                id: userData.length + 1,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                role: document.getElementById('role').value,
                plan: document.getElementById('plan').value,
                status: 'active',
                lastLogin: new Date().toISOString(),
                avatar: (document.getElementById('firstName').value.charAt(0) + document.getElementById('lastName').value.charAt(0)).toUpperCase()
            };
            
            // Add to data array
            userData.push(newUser);
            
            // Refresh DataTable
            usersTable.clear().rows.add(userData).draw();
            
            // Close modal and reset form
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
            form.reset();
            
            // Show success message
            alert('User added successfully!');
        }

        function editUser(userId) {
            const user = userData.find(u => u.id === userId);
            if (!user) return;
            
            // Populate form
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editRole').value = user.role;
            document.getElementById('editPlan').value = user.plan;
            document.getElementById('editStatus').value = user.status;
            
            // Show modal
            new bootstrap.Modal(document.getElementById('editUserModal')).show();
        }

        function updateUser() {
            const userId = parseInt(document.getElementById('editUserId').value);
            const userIndex = userData.findIndex(u => u.id === userId);
            
            if (userIndex === -1) return;
            
            // Update user data
            userData[userIndex] = {
                ...userData[userIndex],
                firstName: document.getElementById('editFirstName').value,
                lastName: document.getElementById('editLastName').value,
                email: document.getElementById('editEmail').value,
                role: document.getElementById('editRole').value,
                plan: document.getElementById('editPlan').value,
                status: document.getElementById('editStatus').value,
                avatar: (document.getElementById('editFirstName').value.charAt(0) + document.getElementById('editLastName').value.charAt(0)).toUpperCase()
            };
            
            // Refresh DataTable
            usersTable.clear().rows.add(userData).draw();
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
            
            alert('User updated successfully!');
        }

        function toggleUserStatus(userId) {
            const userIndex = userData.findIndex(u => u.id === userId);
            if (userIndex === -1) return;
            
            const user = userData[userIndex];
            const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
            
            if (confirm(`Are you sure you want to ${newStatus === 'suspended' ? 'suspend' : 'reactivate'} this user?`)) {
                userData[userIndex].status = newStatus;
                usersTable.clear().rows.add(userData).draw();
                alert(`User ${newStatus === 'suspended' ? 'suspended' : 'reactivated'} successfully!`);
            }
        }

        function deleteUser(userId) {
            if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                const userIndex = userData.findIndex(u => u.id === userId);
                if (userIndex !== -1) {
                    userData.splice(userIndex, 1);
                    usersTable.clear().rows.add(userData).draw();
                    alert('User deleted successfully!');
                }
            }
        }


        // USER PROFILE
        // Subscription Management Functions
        function showBillingHistory() {
            // Create billing history modal
            const modal = `
                <div class="modal fade" id="billingHistoryModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="fas fa-receipt me-2"></i>
                                    Billing History
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Feb 15, 2024</td>
                                                <td>Premium Plan - Monthly</td>
                                                <td>$29.00</td>
                                                <td><span class="badge bg-success">Paid</span></td>
                                                <td><button class="btn btn-sm btn-outline-primary">Download</button></td>
                                            </tr>
                                            <tr>
                                                <td>Jan 15, 2024</td>
                                                <td>Premium Plan - Monthly</td>
                                                <td>$29.00</td>
                                                <td><span class="badge bg-success">Paid</span></td>
                                                <td><button class="btn btn-sm btn-outline-primary">Download</button></td>
                                            </tr>
                                            <tr>
                                                <td>Dec 15, 2023</td>
                                                <td>Premium Plan - Monthly</td>
                                                <td>$29.00</td>
                                                <td><span class="badge bg-success">Paid</span></td>
                                                <td><button class="btn btn-sm btn-outline-primary">Download</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modal);
            const modalInstance = new bootstrap.Modal(document.getElementById('billingHistoryModal'));
            modalInstance.show();
            
            // Remove modal after hide
            document.getElementById('billingHistoryModal').addEventListener('hidden.bs.modal', function () {
                this.remove();
            });
        }

        function showUsageStats() {
            // Create usage statistics modal
            const modal = `
                <div class="modal fade" id="usageStatsModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i class="fas fa-chart-bar me-2"></i>
                                    Usage Statistics
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="stat-card text-center">
                                            <div class="stat-icon bg-primary">
                                                <i class="fas fa-robot"></i>
                                            </div>
                                            <h4>1,247</h4>
                                            <p>API Calls This Month</p>
                                            <small class="text-muted">12.47% of limit</small>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="stat-card text-center">
                                            <div class="stat-icon bg-info">
                                                <i class="fas fa-database"></i>
                                            </div>
                                            <h4>42.3 GB</h4>
                                            <p>Storage Used</p>
                                            <small class="text-muted">42.3% of 100 GB</small>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="stat-card text-center">
                                            <div class="stat-icon bg-success">
                                                <i class="fas fa-image"></i>
                                            </div>
                                            <h4>567</h4>
                                            <p>Images Generated</p>
                                            <small class="text-muted">11.34% of limit</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <h6>Monthly Trends</h6>
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle me-2"></i>
                                        Your usage has increased by 23% compared to last month. Consider upgrading if you're approaching your limits.
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <a href="pricing.html" class="btn btn-primary">Upgrade Plan</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modal);
            const modalInstance = new bootstrap.Modal(document.getElementById('usageStatsModal'));
            modalInstance.show();
            
            // Remove modal after hide
            document.getElementById('usageStatsModal').addEventListener('hidden.bs.modal', function () {
                this.remove();
            });
        }

        function showCancelDialog() {
            // Create cancellation modal
            const modal = `
                <div class="modal fade" id="cancelModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-danger">
                                    <i class="fas fa-exclamation-triangle me-2"></i>
                                    Cancel Subscription
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-warning">
                                    <i class="fas fa-info-circle me-2"></i>
                                    Your subscription will remain active until <strong>March 15, 2024</strong>. After that, you'll lose access to premium features.
                                </div>
                                <h6>What you'll lose:</h6>
                                <ul class="text-muted">
                                    <li>Unlimited AI Models</li>
                                    <li>Priority Support</li>
                                    <li>Advanced Analytics</li>
                                    <li>Custom Integrations</li>
                                    <li>100GB Storage</li>
                                </ul>
                                <div class="form-group mt-3">
                                    <label class="form-label">Reason for cancellation (optional):</label>
                                    <select class="form-control">
                                        <option>Too expensive</option>
                                        <option>Not using enough features</option>
                                        <option>Found alternative solution</option>
                                        <option>Technical issues</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keep Subscription</button>
                                <button type="button" class="btn btn-danger" onclick="confirmCancellation()">Confirm Cancellation</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modal);
            const modalInstance = new bootstrap.Modal(document.getElementById('cancelModal'));
            modalInstance.show();
            
            // Remove modal after hide
            document.getElementById('cancelModal').addEventListener('hidden.bs.modal', function () {
                this.remove();
            });
        }

        function confirmCancellation() {
            // Close the cancel modal
            const cancelModal = bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
            cancelModal.hide();
            
            // Show confirmation
            setTimeout(() => {
                alert('Your subscription has been scheduled for cancellation. You will continue to have access until March 15, 2024.');
            }, 300);
        }

        // Helper function for help modal (if not already defined)
        if (typeof showHelpModal === 'undefined') {
            function showHelpModal() {
                alert('Help & Support feature would open here. This is a demo implementation.');
            }
        }
        

    });
   
} (jQuery) );