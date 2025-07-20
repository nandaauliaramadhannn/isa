/* ===================================
   AI TLD JS
   =================================== */

(function ($) {
    'use strict';

    $(document).ready(function() {
        // Simulate domain generation
        const demoDomains = {
            'Food Blog': ['tastyspark.com', 'yumjournal.com', 'foodiefolio.com'],
            'Fitness Website': ['activevibe.net', 'muscleupnow.net', 'fitspirationhub.net'],
            'Tech Review Site': ['gadgetscope.com', 'techwisehub.com', 'reviewpilot.net'],
            'Personal Portfolio': ['janedoe.dev', 'johnsmith.me', 'mycreativespace.com'],
            'Fashion Blog': ['trendflare.com', 'stylepulse.net', 'couturelane.com'],
            'Educational Platform': ['learnfinity.org', 'eduspark.net', 'brainybase.com'],
            'E-commerce Store': ['shopwise.com', 'cartpilot.net', 'buysparkle.com'],
            'Photography Website': ['snapfolio.com', 'picverse.net', 'lenscraft.org'],
            'Music Blog': ['soundjournal.net', 'melodylane.com', 'beatspot.org'],
            'Health and Wellness Blog': ['wellnesswave.com', 'healthspire.net', 'fitlifeblog.org']
        };

        function showDomains(domains, tld = '.net') {
            const list = document.getElementById('tldResultsList');
            list.innerHTML = '';
            domains.forEach(domain => {
                list.innerHTML += `<li class="tld-finder-domain-item">
                    <div class="tld-finder-domain-info">
                        <i class="fas fa-lock"></i>
                        <span class="tld-finder-domain-name">${domain}</span>
                        <span class="tld-finder-domain-available"><i class="fas fa-check-circle"></i> AVAILABLE</span>
                    </div>
                    <button class="btn btn-dark tld-finder-domain-register">Register Domain</button>
                </li>`;
            });
        }

        document.querySelectorAll('.prompt-chip').forEach(chip => {
            chip.addEventListener('click', function() {
                const prompt = this.textContent.trim();
                document.getElementById('tldPromptInput').value = `Help me name my ${prompt} on the .net tld.`;
                document.getElementById('tldLoading').style.display = 'block';
                document.getElementById('tldResultsList').innerHTML = '';
                setTimeout(() => {
                    document.getElementById('tldLoading').style.display = 'none';
                    showDomains(demoDomains[prompt] || demoDomains['Fitness Website']);
                }, 1200);
            });
        });

        document.getElementById('tldGenerateBtn').addEventListener('click', function() {
            const val = document.getElementById('tldPromptInput').value.trim();
            let found = false;
            
            // Show loading immediately on click
            document.getElementById('tldLoading').style.display = 'block';
            document.getElementById('tldResultsBox').style.display = 'block';
            document.getElementById('tldResultsList').innerHTML = '';
            
            for (const key in demoDomains) {
                if (val.toLowerCase().includes(key.toLowerCase())) {
                    found = key;
                    break;
                }
            }

            setTimeout(() => {
                document.getElementById('tldLoading').style.display = 'none';
                showDomains(found ? demoDomains[found] : demoDomains['Fitness Website']);
            }, 1200);
        });
    });
   
} (jQuery) );