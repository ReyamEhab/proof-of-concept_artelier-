// ====================== SIDE MENU ======================

// Get references to menu elements
const menuBtn = document.getElementById('menuBtn');       // Button to open menu
const menuPanel = document.getElementById('menuPanel');   // Side menu panel
const closeBtn = document.getElementById('closeBtn');     // Button to close menu

// Open the menu when menuBtn is clicked
menuBtn.addEventListener('click', () => menuPanel.classList.add('open'));

// Close the menu when closeBtn is clicked
closeBtn.addEventListener('click', () => menuPanel.classList.remove('open'));


// ====================== SLIDER ======================

// Get all slides
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;       // Tracks the current active slide
let autoPlayInterval;       // Interval ID for auto-sliding

// Show slide based on index
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');   // Remove active from all slides
        if(i === index) slide.classList.add('active'); // Add active to current slide
    });
}

// Go to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to first slide
    showSlide(currentSlide);
    resetAutoPlay();  // Reset autoplay interval so timer restarts
}

// Automatically play slides every 2 seconds
function autoPlay() {
    autoPlayInterval = setInterval(() => nextSlide(), 2000);
}

// Reset autoplay by clearing interval and starting again
function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlay();
}

// Start autoplay on window load
window.onload = autoPlay;


// ====================== LANGUAGE SWITCH ======================

// Get references to language dropdown
const languageDropdown = document.getElementById('languageDropdown');
const languageOptions = document.getElementById('languageOptions');

// Toggle dropdown display when language icon is clicked
languageDropdown.addEventListener('click', () => {
    languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
});

// Object storing translations for French and Arabic
const translations = {
    'fr': {
        'sliderTitles': ['Atelier de Peinture Acrylique','Atelier de Modelage','Atelier de Peinture pour Enfants','Atelier de Poterie pour Enfants'],
        'sectionTitle': 'Nos Ateliers',
        'sectionDesc': 'Explorez nos ateliers créatifs et libérez votre potentiel artistique.',
        'cardTitles': ['Peinture Acrylique','Art du Modelage','Peinture pour Enfants','Atelier de Poterie','Art Islamique','Aquarelle','Atelier de Dessin','Sculpture en Argile'],
        'cardDescs': [
            'Apprenez à créer des œuvres acryliques vibrantes étape par étape.',
            'Explorez les techniques de création artistique à la main.',
            'Ateliers de peinture amusants spécialement conçus pour les enfants.',
            'Expérience pratique de poterie pour enfants.',
            'Découvrez la beauté de l’art islamique avec des techniques créatives.',
            'Apprenez des techniques délicates de peinture à l’aquarelle.',
            'Maîtrisez le dessin au crayon et au fusain de manière créative.',
            'Créez d’incroyables sculptures en argile lors de sessions pratiques.'
        ]
    },
    'ar': {
        'sliderTitles': ['ورشة الرسم بالأكريليك','ورشة تشكيل الفن','ورشة رسم للأطفال','ورشة الفخار للأطفال'],
        'sectionTitle': 'ورش العمل لدينا',
        'sectionDesc': 'استكشف ورشنا الإبداعية وأطلق العنان لإمكانياتك الفنية.',
        'cardTitles': ['الرسم بالأكريليك','فن التشكيل','رسم الأطفال','ورشة الفخار','الفن الإسلامي','الألوان المائية','ورشة الرسم','تماثيل الطين'],
        'cardDescs': [
            'تعلم كيفية إنشاء أعمال أكريليك حيوية خطوة بخطوة.',
            'استكشف تقنيات تشكيل القطع الفنية يدوياً',
            'ورش الرسم الممتعة المصممة خصيصاً للأطفال.',
            'تجربة عملية للفخار للأطفال للاستمتاع والتعلم.',
            'اكتشف جمال الفن الإسلامي بالتقنيات الإبداعية.',
            'تعلم مهارات الرسم بالألوان المائية بدقة.',
            'اتقن تقنيات الرسم بالقلم والفحم بطريقة إبداعية.',
            'قم بإنشاء تماثيل طينية رائعة في جلسات عملية.'
        ]
    }
};

// ====================== TEXT ANIMATION ======================

// Function to animate text changes with fade-out/fade-in effect
function animateTextChange(element, newText){
    element.classList.add('fade-out'); // Start fade-out
    setTimeout(() => {
        element.textContent = newText;  // Change text
        element.classList.remove('fade-out');
        element.classList.add('fade-in'); // Fade in
        setTimeout(() => element.classList.remove('fade-in'), 500); // Remove class after animation
    }, 400);
}

// ====================== LANGUAGE SELECTION ======================

// Loop through all language options
document.querySelectorAll('.language-options div').forEach(el => {
    el.addEventListener('click', () => {
        const lang = el.dataset.lang; // Get selected language
        languageOptions.style.display = 'none'; // Hide dropdown

        if(lang === 'fr' || lang === 'ar'){  // Apply translations
            const sliderTitles = translations[lang].sliderTitles;
            document.querySelectorAll('.slide .title').forEach((el,i) => animateTextChange(el, sliderTitles[i]));
            animateTextChange(document.getElementById('sectionTitle'), translations[lang].sectionTitle);
            animateTextChange(document.getElementById('sectionDesc'), translations[lang].sectionDesc);

            const cardTitles = document.querySelectorAll('.cardTitle');
            const cardDescs = document.querySelectorAll('.cardDesc');
            cardTitles.forEach((el,i) => animateTextChange(el, translations[lang].cardTitles[i]));
            cardDescs.forEach((el,i) => animateTextChange(el, translations[lang].cardDescs[i]));

        } else { // English default
            const englishSlider = ['Acrylic Painting Workshop','Hand building Art Workshop','Kids Painting Workshop','Pottery Workshop for Kids'];
            const englishTitles = ['Acrylic Painting','Hand Building Art','Kids Painting','Pottery Workshop','Islamic Art','Watercolor','Drawing Workshop','Clay Sculpture'];
            const englishDescs = [
                'Learn to create vibrant acrylic artworks step by step.',
                'Explore the techniques of hand-building creative art pieces.',
                'Fun painting workshops specially designed for children.',
                'Hands-on pottery experience for kids to enjoy and learn.',
                'Explore the beauty of Islamic art with creative techniques.',
                'Learn delicate watercolor painting skills for stunning results.',
                'Master pencil and charcoal drawing techniques creatively.',
                'Create amazing clay sculptures in hands-on sessions.'
            ];

            // Update slider titles
            document.querySelectorAll('.slide .title').forEach((el,i) => animateTextChange(el, englishSlider[i]));
            animateTextChange(document.getElementById('sectionTitle'), 'Our Workshops');
            animateTextChange(document.getElementById('sectionDesc'), 'Explore our creative workshops and unleash your artistic potential.');

            // Update cards
            const cardTitles = document.querySelectorAll('.cardTitle');
            const cardDescs = document.querySelectorAll('.cardDesc');
            cardTitles.forEach((el,i) => animateTextChange(el, englishTitles[i]));
            cardDescs.forEach((el,i) => animateTextChange(el, englishDescs[i]));
        }
    });
});
// === Workshop Modal ===
const workshopModal = document.getElementById('workshopModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const modalLink = document.getElementById('modalLink');

const cards = document.querySelectorAll('.card');

const workshopInfo = [
    {
        title: "Acrylic Painting",
        desc: "Dive into vibrant acrylics! Learn color blending, brush techniques, and creative expression. Explore color theory, layering techniques, and composition.",
        img: "images_art_workshop/Acrylic_Painting_Workshop.png",
        link: "#"
    },
    {
        title: "Hand Building Art",
        desc: "Discover sculpting with your hands! Shape, mold, and craft unique art pieces. Learn techniques like coiling, slab building, and texture creation.",
        img: "images_art_workshop/Hand_building_Art_Workshop.png",
        link: "#"
    },
    {
        title: "Kids Painting",
        desc: "Fun-filled painting workshop for children to explore colors, shapes, and creativity. Includes games and storytelling to inspire imagination.",
        img: "images_art_workshop/Kids_Painting_Workshop.png",
        link: "#"
    },
    {
        title: "Pottery Workshop",
        desc: "Hands-on pottery experience: spin the wheel, shape clay, and make your own creations. Learn basic pottery tools, glazing, and firing techniques.",
        img: "images_art_workshop/Pottery_Workshop_for_Kids.png",
        link: "#"
    },
    {
        title: "Islamic Art",
        desc: "Explore intricate patterns and geometric designs in the beauty of Islamic art. Learn calligraphy basics and traditional motifs.",
        img: "images_art_workshop/islamic_Art_Workshop.png",
        link: "#"
    },
    {
        title: "Watercolor",
        desc: "Learn delicate watercolor painting techniques for soft, stunning effects. Covers wet-on-wet, layering, and brush handling.",
        img: "images_art_workshop/Watercolor_Workshop.png",
        link: "#"
    },
    {
        title: "Drawing Workshop",
        desc: "Master pencil, charcoal, and sketching techniques to create stunning drawings. Includes perspective, shading, and figure drawing.",
        img: "images_art_workshop/Drawing_Workshop.png",
        link: "#"
    },
    {
        title: "Clay Sculpture",
        desc: "Hands-on clay sculpting workshop: create artistic pieces with guidance. Learn armature building, texture, and finishing techniques.",
        img: "images_art_workshop/Clay_Sculpture_Workshop.png",
        link: "#"
    }
];

// Open workshop modal
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const info = workshopInfo[index];
        modalImage.src = info.img;
        modalTitle.textContent = info.title;
        modalDesc.textContent = info.desc;
        modalLink.href = "#"; // Register triggers new popup
        workshopModal.classList.add('active');
    });
});

// Close workshop modal
modalClose.addEventListener('click', () => workshopModal.classList.remove('active'));
workshopModal.addEventListener('click', e => { if(e.target===workshopModal) workshopModal.classList.remove('active'); });

// === Registration Modal ===
const registrationModal = document.getElementById('registrationModal');
const registerClose = document.getElementById('registerClose');
const submitRegister = document.getElementById('submitRegister');
const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const registerMsg = document.getElementById('registerMsg');

// Open registration modal when "Register Now" clicked
modalLink.addEventListener('click', () => {
    workshopModal.classList.remove('active');
    registrationModal.classList.add('active');
});

// Close registration modal
registerClose.addEventListener('click', () => registrationModal.classList.remove('active'));
registrationModal.addEventListener('click', e => { if(e.target===registrationModal) registrationModal.classList.remove('active'); });

// Submit registration to MongoDB
submitRegister.addEventListener('click', async () => {
    const name = regName.value.trim();
    const email = regEmail.value.trim();

    if(!name || !email){
        alert("Please enter your name and email!");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/registrations", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, workshop: modalTitle.textContent})
        });

        const result = await res.json();
        if(result.success){
            registerMsg.textContent = "Successfully registered!";
            regName.value = "";
            regEmail.value = "";
            setTimeout(() => registrationModal.classList.remove('active'), 2000);
        } else {
            registerMsg.textContent = "Error: " + result.error;
        }
    } catch(err){
        console.error("Server error:", err);
        registerMsg.textContent = "Server error. Try again later.";
    }
});
