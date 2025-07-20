/* ===================================
   AUTH Pages JS
   =================================== */

   const loginPostUrl = "{{ route('login.post') }}";

   (function ($) {
       'use strict';

       $(document).ready(function () {

           /* ========================
              PASSWORD TOGGLE
           ======================== */
           window.togglePassword = function (inputId) {
               const $input = $('#' + inputId);
               const $icon = $input.parent().find('.password-toggle i');

               if ($input.attr('type') === 'password') {
                   $input.attr('type', 'text');
                   $icon.removeClass('fa-eye').addClass('fa-eye-slash');
               } else {
                   $input.attr('type', 'password');
                   $icon.removeClass('fa-eye-slash').addClass('fa-eye');
               }
           };

           /* ========================
              LOGIN FORM SUBMISSION
           ======================== */
           $('.auth-login-form').on('submit', function (e) {
               // Optional: client-side validation
               const email = $('#email').val();
               const password = $('#password').val();

               if (!email || !password) {
                   alert('Please enter both email and password.');
                   e.preventDefault(); // Stop form if invalid
                   return;
               }

               // Let Laravel handle the post
               this.submit();
           });

           /* ========================
              TWO FACTOR VERIFICATION
           ======================== */
           initializeVerification();

           function initializeVerification() {
               const $codeInputs = $('.code-input');
               const $verifyBtn = $('#verifyBtn');
               const $resendBtn = $('#resendBtn');

               $codeInputs.each(function (index) {
                   const $input = $(this);

                   $input.on('input', function () {
                       const value = $(this).val().replace(/\D/g, '');
                       $(this).val(value);

                       if (value && index < $codeInputs.length - 1) {
                           $codeInputs.eq(index + 1).focus();
                       }

                       updateVerifyButton();
                       updateInputStates();
                   });

                   $input.on('keydown', function (e) {
                       if (e.key === 'Backspace' && !$(this).val() && index > 0) {
                           $codeInputs.eq(index - 1).focus().val('');
                           updateVerifyButton();
                           updateInputStates();
                       }
                   });

                   $input.on('paste', function (e) {
                       e.preventDefault();
                       const data = e.originalEvent.clipboardData.getData('text').replace(/\D/g, '');
                       for (let i = 0; i < Math.min(data.length, $codeInputs.length - index); i++) {
                           $codeInputs.eq(index + i).val(data[i]);
                       }

                       updateVerifyButton();
                       updateInputStates();
                   });
               });

               $('#verificationForm').on('submit', function (e) {
                   e.preventDefault();
                   verifyCode();
               });

               $resendBtn.on('click', resendCode);

               // Email autofill from URL
               const email = new URLSearchParams(window.location.search).get('email');
               if (email) {
                   $('#userEmail').text(email);
               }
           }

           function updateVerifyButton() {
               const filled = $('.code-input').toArray().every(i => $(i).val().length === 1);
               $('#verifyBtn').prop('disabled', !filled);
           }

           function updateInputStates() {
               $('.code-input').each(function () {
                   $(this).removeClass('filled error');
                   if ($(this).val()) $(this).addClass('filled');
               });
           }

           function verifyCode() {
               const code = $('.code-input').toArray().map(i => $(i).val()).join('');
               const $verifyBtn = $('#verifyBtn');
               $verifyBtn.html('<i class="fas fa-spinner fa-spin"></i> Verifying...').prop('disabled', true);

               setTimeout(() => {
                   if (code === '123456' || code === '000000') {
                       new bootstrap.Modal($('#successModal')[0]).show();
                   } else {
                       $('.code-input').addClass('error').val('');
                       showNotification('Invalid verification code. Please try again.', 'error');
                       setTimeout(() => {
                           $('.code-input').removeClass('error').first().focus();
                       }, 500);
                       $verifyBtn.html('<i class="fas fa-check-circle"></i> Verify Email');
                       updateVerifyButton();
                   }
               }, 2000);
           }

           function resendCode() {
               const $btn = $('#resendBtn');
               const $timer = $('#resendTimer');

               $btn.prop('disabled', true).hide();
               $timer.show();

               let countdown = 60;
               const timer = setInterval(() => {
                   countdown--;
                   $('#countdown').text(countdown);
                   if (countdown <= 0) {
                       clearInterval(timer);
                       $btn.prop('disabled', false).show();
                       $timer.hide();
                   }
               }, 1000);

               $('.code-input').val('').removeClass('filled error').first().focus();
               updateVerifyButton();
               showNotification('Verification code sent successfully!', 'success');
           }

           /* ========================
              NOTIFICATION TOAST
           ======================== */
           function showNotification(message, type) {
               const $notif = $(`
                   <div class="alert alert-${type === 'error' ? 'danger' : 'success'} notification-toast">
                       <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}
                   </div>
               `).css({
                   position: 'fixed',
                   top: '20px',
                   right: '20px',
                   zIndex: 9999,
                   borderRadius: '8px',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                   animation: 'slideIn 0.3s ease'
               });

               $('body').append($notif);

               setTimeout(() => {
                   $notif.css('animation', 'slideOut 0.3s ease');
                   setTimeout(() => $notif.remove(), 300);
               }, 3000);
           }

           $('<style>').text(`
               @keyframes slideIn { from {transform: translateX(100%); opacity: 0} to {transform: translateX(0); opacity: 1} }
               @keyframes slideOut { from {transform: translateX(0); opacity: 1} to {transform: translateX(100%); opacity: 0} }
           `).appendTo('head');

           /* ========================
              OPTIONAL: Password Strength
           ======================== */
           $('#password').on('input', function () {
               const password = $(this).val();
               const strengthBar = $('#strengthBar');
               const strengthText = $('#strengthText');

               let strength = 0;
               if (password.length >= 8) strength++;
               if (/[A-Z]/.test(password)) strength++;
               if (/[a-z]/.test(password)) strength++;
               if (/[0-9]/.test(password)) strength++;
               if (/[^A-Za-z0-9]/.test(password)) strength++;

               const percent = (strength / 5) * 100;
               let label = 'Weak', color = 'rgb(239, 68, 68)';
               if (strength >= 4) {
                   label = 'Strong';
                   color = 'rgb(34, 197, 94)';
               } else if (strength >= 3) {
                   label = 'Good';
                   color = 'rgb(245, 158, 11)';
               } else if (strength >= 2) {
                   label = 'Fair';
                   color = 'rgb(245, 158, 11)';
               }

               strengthBar.css({ width: percent + '%', background: color });
               strengthText.text(`Password strength: ${label}`);
           });

       });

   })(jQuery);
