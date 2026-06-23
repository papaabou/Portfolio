const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe slide-in
document.querySelectorAll('.slide-in').forEach(el => {
    observer.observe(el);
});

// Gestion du formulaire
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const successMessage = document.getElementById('successMessage');

// Validation en temps réel
const inputs = contactForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const errorSpan = field.nextElementSibling;
    let isValid = true;
    let errorMessage = '';

    // Validation selon le type de champ
    switch(field.type) {
        case 'text':
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Ce champ doit contenir au moins 2 caractères';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
            break;
        case 'select-one':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Veuillez sélectionner un sujet';
            }
            break;
        default:
            if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Le message doit contenir au moins 10 caractères';
            }
    }

    // Affichage de l'erreur
    if (!isValid) {
        field.classList.add('border-red-400');
        errorSpan.textContent = errorMessage;
        errorSpan.classList.remove('hidden');
    } else {
        field.classList.remove('border-red-400');
        errorSpan.classList.add('hidden');
    }

    return isValid;
}

function clearError(e) {
    const field = e.target;
    const errorSpan = field.nextElementSibling;
    field.classList.remove('border-red-400');
    errorSpan.classList.add('hidden');
}

// Soumission du formulaire
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validation de tous les champs
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        return;
    }

    // Animation du bouton
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    btnIcon.className = 'fas fa-spinner fa-spin ml-2';

    // Simulation d'envoi (remplacez par votre logique d'envoi)
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Succès
        btnText.textContent = 'Message envoyé !';
        btnIcon.className = 'fas fa-check ml-2';
        successMessage.classList.remove('hidden');
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'Envoyer le message';
            btnIcon.className = 'fas fa-paper-plane ml-2';
            successMessage.classList.add('hidden');
        }, 3000);
        
    } catch (error) {
        // Erreur
        btnText.textContent = 'Erreur - Réessayer';
        btnIcon.className = 'fas fa-exclamation-triangle ml-2';
        submitBtn.disabled = false;
        
        setTimeout(() => {
            btnText.textContent = 'Envoyer le message';
            btnIcon.className = 'fas fa-paper-plane ml-2';
        }, 3000);
    }
});
