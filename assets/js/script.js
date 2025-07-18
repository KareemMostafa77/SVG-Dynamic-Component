document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to code blocks for copying
    setupCodeCopy();
    
    // Tab functionality for usage section
    setupTabs();
    
    // Theme toggle functionality
    setupThemeToggle();
    
    // Back to top button
    setupBackToTop();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
});

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup back to top button functionality
 */
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup theme toggle functionality
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Transfer theme class from html to body (from the inline script)
    if (html.classList.contains('light-mode')) {
        body.classList.add('light-mode');
        html.classList.remove('light-mode');
    } else if (html.classList.contains('dark-mode')) {
        body.classList.add('dark-mode');
        html.classList.remove('dark-mode');
    }
      // Initialize theme toggle button state
    updateToggleButton();
    
    // Update Prism theme based on current theme
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    updatePrismTheme(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        toggleTheme();
    });
    
    function updateToggleButton() {
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('title', 'Switch to dark mode');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', 'Switch to light mode');
        }
    }
    
    function toggleTheme() {
        if (body.classList.contains('light-mode')) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }
      function setLightMode() {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('title', 'Switch to dark mode');
        localStorage.setItem('theme', 'light');
        updatePrismTheme('light');
    }
    
    function setDarkMode() {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('title', 'Switch to light mode');
        localStorage.setItem('theme', 'dark');
        updatePrismTheme('dark');
    }
    
    function updatePrismTheme(theme) {
        const prismTheme = document.getElementById('prism-theme');
        if (prismTheme) {
            if (theme === 'light') {
                prismTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css';
            } else {
                prismTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css';
            }
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                setDarkMode();
            } else {
                setLightMode();
            }
        }
    });
}

/**
 * Setup tab functionality for the usage section
 */
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabBtns.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to selected button
            btn.classList.add('active');
            
            // Show the corresponding pane
            const tabId = btn.getAttribute('data-tab');
            const pane = document.getElementById(tabId);
            if (pane) {
                pane.classList.add('active');
            }
        });
    });
}

/**
 * Setup click handlers for code blocks to allow copying
 */
function setupCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.setAttribute('title', 'Copy to clipboard');
        
        // Add button to pre element (parent of code)
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        // Add click handler
        copyButton.addEventListener('click', () => {
            const code = block.textContent;
            copyToClipboard(code);
        });
    });
}

/**
 * Copy text to clipboard and show notification
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showCopyNotification('Copied to clipboard!');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
            showCopyNotification('Failed to copy!', true);
        });
}

/**
 * Show a temporary notification that text was copied
 * @param {string} message - The message to show
 * @param {boolean} isError - Whether this is an error notification
 */
function showCopyNotification(message = 'Copied to clipboard!', isError = false) {
    const notification = document.getElementById('copy-notification');
    
    if (isError) {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = 'var(--success-color)';
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Add additional styles for code copy button
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        pre {
            position: relative;
        }
          .code-copy-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: var(--code-bg);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-secondary);
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
            z-index: 10;
        }
        
        .code-copy-btn:hover {
            background-color: var(--secondary-bg);
            color: var(--accent-color);
            border-color: var(--accent-color);
        }
    `;
    document.head.appendChild(style);
});
