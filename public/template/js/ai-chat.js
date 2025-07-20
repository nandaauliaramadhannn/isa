/* ===================================
   AI CHAT JS
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {      

        let messageCount = 0;

        // Auto-resize textarea
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // Send message on Enter (but not Shift+Enter)
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            input.value = '';
            input.style.height = 'auto';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate AI response
            setTimeout(() => {
                hideTypingIndicator();
                const responses = [
                    "That's a great question! Let me help you with that. Here's what I think...",
                    "I understand what you're looking for. Based on my analysis, I would suggest...",
                    "Interesting point! Here's my perspective on this topic...",
                    "I can definitely help you with that. Let me break it down for you..."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'ai');
            }, 1500);
        }

        function sendSuggestion(suggestion) {
            document.getElementById('messageInput').value = suggestion;
            sendMessage();
        }

        function addMessage(text, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            messageDiv.className = `message ${sender}-message`;
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">${sender === 'user' ? 'You' : 'AI Assistant'}</span>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-text">
                        <p>${text}</p>
                    </div>
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            messageCount++;
        }

        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chatMessages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai-message typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            `;
            
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        function clearChat() {
            if (confirm('Are you sure you want to clear this chat?')) {
                const messagesContainer = document.getElementById('chatMessages');
                messagesContainer.innerHTML = `
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">AI Assistant</span>
                                <span class="message-time">Now</span>
                            </div>
                            <div class="message-text">
                                <p>Chat cleared. How can I help you today?</p>
                            </div>
                        </div>
                    </div>
                `;
                messageCount = 0;
            }
        }

        function newChat() {
            clearChat();
        }
    });
   
} (jQuery) );