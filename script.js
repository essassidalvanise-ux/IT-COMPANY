// Animate on scroll
const animatedElements = document.querySelectorAll('.animate');
function revealOnScroll() {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();



// Testimonials carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 4000);

// Newsletter form
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('newsletterResponse').textContent = "Thanks for subscribing!";
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('formResponse').textContent = "Thanks for reaching out! We'll get back to you soon.";
});

// Chatbot logic
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');

chatToggle.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
  userInput.focus();
});

userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    handleInput(userInput.value.trim());
    userInput.value = '';
  }
});

voiceBtn.addEventListener('click', () => {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      handleInput(transcript);
    };
    recognition.start();
  } else {
    alert("Voice recognition not supported in this browser.");
  }
});

function handleInput(input) {
  if (!input) return;
  addMessage('user', input);
  respondToUser(input.toLowerCase());
}

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatWindow.insertBefore(msg, userInput);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function respondToUser(input) {
  let response = "I'm not sure I understand. Pouvez-vous reformuler cela ?";

  if (input.includes('hello') || input.includes('hi') || input.includes('bonjour')) {
    response = "Hello! 👋 How can I help you today?";
  } else if (input.includes('services') || input.includes('offres') || input.includes('solutions')) {
    response = "We offer cloud infrastructure, cybersecurity, AI automation, and IT consulting.";
  } else if (input.includes('price') || input.includes('tarif') || input.includes('pricing')) {
    response = "Our plans start at $99/month. Want details on Starter, Professional, or Enterprise?";
  } else if (input.includes('contact') || input.includes('email') || input.includes('support')) {
    response = "You can reach us via the contact form or email: support@ttsetglobal.com";
  } else if (input.includes('merci') || input.includes('thank')) {
    response = "You're very welcome! 😊";
  } else if (input.includes('aide') || input.includes('help')) {
    response = "Sure! Let me know what you're looking for—services, pricing, or support.";
  }

  addMessage('bot', response);
}