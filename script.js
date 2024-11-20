document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item a');
    const body = document.body;

    // Toggle menu with animation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navLinks.contains(e.target) && 
            navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  // Toggle theme
  themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Optional: Add animation to body
      document.body.style.transition = 'background-color 0.3s ease';
  });
  
  // Handle system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          html.setAttribute('data-theme', newTheme);
      }
  });
});

// Add smooth transition when switching themes
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'background-color 0.3s ease';
});
// Scroll Progress Circle
document.addEventListener('DOMContentLoaded', () => {
    const progressCircle = document.querySelector('.progress-ring-circle');
    const progressText = document.querySelector('.progress-text');
    const progressContainer = document.querySelector('.scroll-progress-container');
    
    // Set circle properties
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
    
    // Calculate and update progress
    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${Math.round(percent)}%`;
    }
    
    // Update progress on scroll
    function updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / windowHeight) * 100;
        
        setProgress(progress);
        
        // Show/hide progress circle based on scroll position
        if (scrolled > 100) {
            progressContainer.classList.add('visible');
        } else {
            progressContainer.classList.remove('visible');
        }
    }
    
    // Scroll to top when clicked
    progressContainer.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', updateProgress);
    
    // Initial progress
    updateProgress();
});