// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Chat Widget Toggle
const chatButton = document.getElementById('chatButton');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');

if (chatButton && chatWidget) {
    chatButton.addEventListener('click', () => {
        chatWidget.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });
}

// Chat Form Handler
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.querySelector('.chat-body');

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user';
            userMessage.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
            chatBody.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot';
                botMessage.innerHTML = `<p>Thanks for your message! Our team will get back to you within 24 hours. For immediate assistance, please call us or book a consultation.</p>`;
                chatBody.appendChild(botMessage);
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    });
}

// Snowflake Calculator
const warehouseSizes = {
    'XS': 1,
    'S': 2,
    'M': 4,
    'L': 8,
    'XL': 16,
    '2XL': 32,
    '3XL': 64,
    '4XL': 128
};

const creditCosts = {
    'aws': { 'us-east': 2.00, 'us-west': 2.20, 'eu-west': 2.40, 'asia': 2.60 },
    'azure': { 'us-east': 2.00, 'us-west': 2.20, 'eu-west': 2.40, 'asia': 2.60 },
    'gcp': { 'us-east': 2.00, 'us-west': 2.20, 'eu-west': 2.40, 'asia': 2.60 }
};

function calculateSnowflakeCosts() {
    const warehouseSize = document.getElementById('warehouseSize').value;
    const dailyHours = parseFloat(document.getElementById('dailyHours').value);
    const warehouseCount = parseInt(document.getElementById('warehouseCount').value);
    const storageVolume = parseFloat(document.getElementById('storageVolume').value);
    const cloudProvider = document.getElementById('cloudProvider').value;
    const region = document.getElementById('region').value;
    
    // Calculate compute costs
    const creditsPerHour = warehouseSizes[warehouseSize];
    const creditCost = creditCosts[cloudProvider][region];
    const monthlyHours = dailyHours * 30;
    const totalCredits = creditsPerHour * monthlyHours * warehouseCount;
    const computeCost = totalCredits * creditCost;
    
    // Calculate storage costs (approximately $23 per TB per month)
    const storageCost = storageVolume * 23;
    
    // Total cost
    const totalCost = computeCost + storageCost;
    
    // Update display
    document.getElementById('computeCost').textContent = `$${computeCost.toFixed(2)}`;
    document.getElementById('storageCost').textContent = `$${storageCost.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
    
    // Update optimization tips based on usage
    updateOptimizationTips(dailyHours, warehouseSize, totalCost);
}

function updateOptimizationTips(dailyHours, warehouseSize, totalCost) {
    const tipsContainer = document.getElementById('optimizationTips');
    const tips = [];
    
    if (dailyHours < 8) {
        tips.push('Consider using auto-suspend with a shorter timeout to reduce idle time');
    }
    
    if (warehouseSizes[warehouseSize] >= 8) {
        tips.push('Evaluate if a smaller warehouse size could handle your workload');
    }
    
    if (totalCost > 5000) {
        tips.push('Consider Reserved Capacity pricing for significant discounts');
        tips.push('Implement resource monitors to control costs');
    }
    
    tips.push('Use query optimization techniques to reduce compute time');
    tips.push('Implement data clustering for frequently queried tables');
    
    tipsContainer.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
}

// Add event listeners for calculator inputs
const calculatorInputs = ['warehouseSize', 'dailyHours', 'warehouseCount', 'storageVolume', 'cloudProvider', 'region'];
calculatorInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('change', calculateSnowflakeCosts);
        element.addEventListener('input', calculateSnowflakeCosts);
    }
});

// Initialize calculator on page load
if (document.getElementById('snowflakeCalculator')) {
    calculateSnowflakeCosts();
}

// Download Report Function
function downloadReport() {
    const computeCost = document.getElementById('computeCost').textContent;
    const storageCost = document.getElementById('storageCost').textContent;
    const totalCost = document.getElementById('totalCost').textContent;
    
    const report = `
Fair Data Support - Snowflake Cost Analysis Report
=================================================

Date: ${new Date().toLocaleDateString()}

Cost Breakdown:
--------------
Compute Costs: ${computeCost}
Storage Costs: ${storageCost}
Total Monthly Cost: ${totalCost}

Configuration:
-------------
Warehouse Size: ${document.getElementById('warehouseSize').value}
Daily Runtime: ${document.getElementById('dailyHours').value} hours
Number of Warehouses: ${document.getElementById('warehouseCount').value}
Storage Volume: ${document.getElementById('storageVolume').value} TB
Cloud Provider: ${document.getElementById('cloudProvider').value}
Region: ${document.getElementById('region').value}

Optimization Recommendations:
---------------------------
${Array.from(document.getElementById('optimizationTips').children).map(li => '• ' + li.textContent).join('\n')}

Next Steps:
----------
1. Schedule a consultation with our experts
2. Get a detailed cost optimization plan
3. Implement best practices for cost reduction

Contact us at info@fairdatasupport.com for personalized recommendations.
    `;
    
    // Create blob and download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snowflake-cost-report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Schedule Consultation Function
function scheduleConsultation() {
    document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
if (testimonials.length > 0) {
    setInterval(nextTestimonial, 5000);
}

// Form Submission Handler
const consultationForm = document.getElementById('consultationForm');

if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send this to your backend
        console.log('Form submission:', data);
        
        // Show success message
        alert('Thank you for your interest! We\'ll contact you within 24 hours to schedule your free consultation.');
        
        // Reset form
        consultationForm.reset();
    });
}

// Animate numbers on scroll
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target') || number.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                number.textContent = Math.ceil(current) + (number.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target + (number.textContent.includes('+') ? '+' : '');
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (this.form && this.form.checkValidity()) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                this.innerHTML = this.textContent.replace('Processing...', 'Submit');
            }, 2000);
        }
    });
});