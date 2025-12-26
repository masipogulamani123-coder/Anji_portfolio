// ===== SIMPLE GLOW CURSOR =====
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor interactions with glow effect
document.querySelectorAll('a, button, .bento-item, .floating-card, .cert-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.boxShadow = '0 0 25px var(--primary), 0 0 40px var(--primary), 0 0 60px var(--accent)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.boxShadow = '0 0 15px var(--primary), 0 0 25px var(--primary)';
    });
});

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate progress bars
            if (entry.target.classList.contains('skill-card-new')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.setProperty('--progress-width', progress + '%');
                }
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card-new, .bento-item, .timeline-card, .about-content, .about-image-wrapper').forEach(el => {
    observer.observe(el);
});

// ===== PROJECT MODAL =====
const projectData = {
    1: {
        title: '2D Plan | Staircase',
        description: 'Detailed AutoCAD drafting of staircase plan and section with precise measurements and technical specifications.',
        tools: ['AutoCAD', '2D Drafting', 'Technical Drawing'],
        details: 'This project demonstrates proficiency in creating detailed architectural drawings using AutoCAD. The staircase plan includes accurate dimensions, riser and tread calculations, and sectional views showing construction details. The drawing follows industry standards for architectural documentation and includes all necessary annotations for construction purposes.',
        image: 'first 1.png'
    },
    2: {
        title: '2D | Plan | Section',
        description: 'Complete AutoCAD drafting including plan, section, and elevation for civil engineering projects.',
        tools: ['AutoCAD', 'Civil Drawing', 'Documentation'],
        details: 'Comprehensive 2D drafting project showcasing ability to create complete construction documentation including floor plans, cross-sections, and elevation views with proper annotations and dimensions. This project demonstrates understanding of building codes, construction standards, and the ability to communicate design intent through technical drawings.',
        image: 'secon.png'
    },
    3: {
        title: 'Bedroom | 3D Modeling',
        description: 'Interior design with furniture and detailed 3D modeling using SketchUp.',
        tools: ['SketchUp', 'Interior Design', '3D Modeling'],
        details: 'Modern bedroom interior design featuring custom furniture modeling, material selection, and space planning. The design emphasizes functionality and aesthetic appeal with attention to detail in every element. Includes wardrobe design, bed modeling, lighting fixtures, and decorative elements that create a cohesive and inviting space.',
        image: 'bed 1.png'
    },
    4: {
        title: 'Kitchen | 3D Modeling',
        description: 'Modern kitchen interior with complete furniture design and layout planning.',
        tools: ['SketchUp', '3D Modeling', 'Space Planning'],
        details: 'Contemporary kitchen design with modular cabinets, appliances, and optimized workflow. The 3D model includes detailed cabinetry, countertops, and fixtures with realistic materials and textures. The design follows ergonomic principles and efficient kitchen work triangle concepts for optimal functionality.',
        image: 'kit.png'
    },
    5: {
        title: 'Home Elevation Design',
        description: 'Photorealistic exterior rendering with V-Ray lighting, shadows, reflections, and materials.',
        tools: ['SketchUp', 'V-Ray', 'Rendering', 'Visualization'],
        details: 'High-quality architectural visualization showcasing exterior design with realistic lighting, materials, and environmental context. The rendering demonstrates advanced skills in V-Ray for creating photorealistic images suitable for client presentations. Features include realistic material textures, accurate lighting simulation, atmospheric effects, and detailed landscaping elements.',
        image: 'buliding s.png'
    },
    6: {
        title: 'Hall Room Interior',
        description: 'Living room interior design with furniture and decor elements.',
        tools: ['SketchUp', 'Interior Design', '3D Visualization'],
        details: 'Elegant living room design featuring comfortable seating arrangements, entertainment units, and decorative elements. The design balances aesthetics with functionality, creating an inviting space for relaxation and entertainment. Includes custom furniture modeling, lighting design, and material selection that creates a warm and welcoming atmosphere.',
        image: 'tv.png'
    }
};

function openModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const project = projectData[projectId];

    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="modal-image" style="width: 100%; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 0 40px rgba(99, 102, 241, 0.3); border: 1px solid rgba(255, 255, 255, 0.1);">
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-primary); font-family: 'Space Grotesk', sans-serif;">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.8;">${project.description}</p>
        <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-primary); font-family: 'Space Grotesk', sans-serif;">Tools & Technologies</h3>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                ${project.tools.map(tool => `
                    <span style="padding: 0.5rem 1rem; background: linear-gradient(135deg, #6366f1, #f59e0b); color: white; border-radius: 8px; font-size: 0.875rem; font-weight: 600; box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);">${tool}</span>
                `).join('')}
            </div>
        </div>
        <div>
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-primary); font-family: 'Space Grotesk', sans-serif;">Project Details</h3>
            <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1rem;">${project.details}</p>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== 3D TILT EFFECT ON CARDS =====
document.querySelectorAll('.floating-card, .bento-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== LOAD PLACEHOLDER IMAGES =====
// Commented out since we're using actual images now
// window.addEventListener('DOMContentLoaded', () => {
//     // Create placeholder for profile image
//     const profileImg = document.getElementById('profile-image');
//     if (profileImg && !profileImg.src.includes('http')) {
//         profileImg.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e2e8f0" width="400" height="500"/%3E%3Ctext fill="%2364748b" font-family="Arial, sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProfile Photo%3C/text%3E%3C/svg%3E';
//     }

//     // Create placeholders for project images
//     const projectImages = [
//         { id: 'project1-img', text: 'Staircase Plan' },
//         { id: 'project2-img', text: 'Floor Plan' },
//         { id: 'project3-img', text: 'Bedroom Interior' },
//         { id: 'project4-img', text: 'Kitchen Design' },
//         { id: 'project5-img', text: 'Home Elevation' },
//         { id: 'project6-img', text: 'Hall Interior' }
//     ];

//     projectImages.forEach(({ id, text }) => {
//         const img = document.getElementById(id);
//         if (img && !img.src.includes('http')) {
//             img.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Cdefs%3E%3ClinearGradient id="grad${id}" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%232563eb;stop-opacity:0.8" /%3E%3Cstop offset="100%25" style="stop-color:%23f59e0b;stop-opacity:0.8" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad${id})" width="600" height="400"/%3E%3Ctext fill="white" font-family="Arial, sans-serif" font-size="28" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E${text}%3C/text%3E%3C/svg%3E`;
//         }
//     });
// });

// ===== CERTIFICATE MODAL =====
function openCertModal(imageSrc, altText) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');

    modalImg.src = imageSrc;
    modalImg.alt = altText;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close certificate modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
    }
});

// Close certificate modal on overlay click
document.getElementById('cert-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'cert-modal') {
        closeCertModal();
    }
});

console.log('🎨 Modern Portfolio Loaded Successfully!');
