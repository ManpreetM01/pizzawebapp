const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value;
    const email = form.element.email.value;
    const message = form.elements.message.value;
    alert('thank you for your message, ${name}! we will get back to you at ${name} as soon as we can.')
});

