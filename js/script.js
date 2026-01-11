// Podaci za meni
const menuData = [
    {
        id: 1,
        name: "Bruschetta Classica",
        description: "Prženi hleb sa svežim paradajzom, bosiljkom, maslinovim uljem i belim lukom",
        price: 750,
        category: "predjela",
        image: "../images/bruschetta.jpg"
    },
    {
        id: 2,
        name: "Kalamari na Žaru",
        description: "Sveži lignji pripremljeni na žaru sa limunom, maslinovim uljem i začinima",
        price: 1250,
        category: "predjela",
        image: "../images/kalamari.webp"
    },
    {
        id: 3,
        name: "Riblji Paprikaš",
        description: "Miks sveže ribe sa paprikom, paradajzom i mediteranskim začinima",
        price: 1950,
        category: "glavna",
        image: "../images/paprikas.jpg"
    },
    {
        id: 4,
        name: "Pasta Carbonara",
        description: "Domaća pasta sa pancetom, jajima, parmezanom i crnim biberom",
        price: 1450,
        category: "glavna",
        image: "../images/karbonara.jpg"
    },
    {
        id: 5,
        name: "Tiramisu",
        description: "Klasični italijanski desert sa maskarpone sirom, kafom i kakao prahom",
        price: 850,
        category: "deserti",
        image: "../images/tiramisu.jpg"
    },
    {
        id: 6,
        name: "Panna Cotta",
        description: "Kremasti desert sa vanilom, jagodama i karamel sosom",
        price: 750,
        category: "deserti",
        image: "../images/panna.jpg"
    },
    {
        id: 7,
        name: "Kućno Vino",
        description: "Kućno belo ili crno vino (0.2L) od lokalnog proizvođača",
        price: 450,
        category: "pica",
        image: "../images/vino.jpg"
    },
    {
        id: 8,
        name: "Mediteranska Salata",
        description: "Sveža salata sa feta sirom, maslinama, paradajzom i mediteranskim prelivom",
        price: 950,
        category: "predjela",
        image: "../images/salata.webp"
    },
    {
        id: 9,
        name: "Piletina sa Rozmarinom",
        description: "Pileća prsa sa svežim rozmarinom, limunom i pečenim krompirom",
        price: 1650,
        category: "glavna",
        image: "../images/piletina.jpg"
    },
    {
        id: 10,
        name: "Čokoladni Fondan",
        description: "Topljeni čokoladni kolač sa vanila sladoledom",
        price: 950,
        category: "deserti",
        image: "../images/fondan.webp"
    }
];

// Podaci za tim
const teamData = [
    {
        name: "Antonio Rossi",
        role: "Glavni Kuhar",
        bio: "Sa preko 20 godina iskustva u mediteranskoj kuhinji, Antonio je duša našeg restorana.",
        image: "../images/glavni-kuvar.jpg"
    },
    {
        name: "Maria Lombardi",
        role: "Sous Chef",
        bio: "Specijalizovana za italijansku kuhinju, Maria donosi autentične recepte iz svoje rodne Sicilije.",
        image: "../images/kuvar.jpg"
    },
    {
        name: "Luca Bianchi",
        role: "Sommelier",
        bio: "Naš vinski stručnjak sa sertifikatom iz Italije, Luca će vam pomoći da odaberete savršeno vino za vaš obrok.",
        image: "../images/sommelier.jpg"
    },
    {
        name: "Sofia Conti",
        role: "Menadžer Restorana",
        bio: "Sofia vodi naš tim i brine se da svaki gost ima nezaboravno iskustvo.",
        image: "../images/menadzer.jpg"
    }
];

// Inicijalizacija aplikacije
document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizuj navigaciju
    initNavigation();
    
    // Inicijalizuj meni ako smo na meni stranici
    if (document.getElementById('menuItemsContainer')) {
        initMenu();
    }
    
    // Inicijalizuj specijalitete ako smo na početnoj stranici
    if (document.getElementById('specialtiesGrid')) {
        initSpecialties();
    }
    
    // Inicijalizuj tim ako smo na about stranici
    if (document.getElementById('teamGrid')) {
        initTeam();
    }
    
    // Inicijalizuj formu ako postoji
    if (document.getElementById('reservationForm')) {
        initForm();
        initFloatingLabels();
    }
    
    // Postavi aktivni link u navigaciji
    setActiveNavLink();
});

// 1. Navigacija
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Zatvori meni kada se klikne na link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 2. Postavi aktivni link u navigaciji
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Ukloni aktivnu klasu sa svih linkova
        link.classList.remove('active');
        
        // Proveri koji link treba da bude aktivan
        if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Dodatna provera za hash linkove
        if (linkHref === '#' && currentPage === 'index.html') {
            link.classList.add('active');
        }
    });
}

// 3. Meni funkcionalnosti
function initMenu() {
    const menuContainer = document.getElementById('menuItemsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!menuContainer) return;
    
    // Prikazuje sva jela inicijalno
    displayMenuItems(menuData);
    
    // Dodaj event listenere za filter dugmad
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ukloni aktivnu klasu sa svih dugmadi
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            
            // Dodaj aktivnu klasu na kliknuto dugme
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Filtriraj jela
            const filter = this.getAttribute('data-filter');
            filterMenuItems(filter);
        });
        
        // Hover efekat za filter dugmad
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function filterMenuItems(filter) {
    let filteredItems;
    
    if (filter === 'all') {
        filteredItems = menuData;
    } else {
        filteredItems = menuData.filter(item => item.category === filter);
    }
    
    displayMenuItems(filteredItems);
}

function displayMenuItems(items) {
    const menuContainer = document.getElementById('menuItemsContainer');
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    
    if (items.length === 0) {
        menuContainer.innerHTML = `
            <div class="no-items-message">
                <p>Trenutno nema stavki u ovoj kategoriji.</p>
            </div>
        `;
        return;
    }
    
    items.forEach(item => {
        const menuItemHTML = `
            <div class="menu-item-card" data-category="${item.category}">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <span class="menu-item-price">${item.price} RSD</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <span class="menu-item-category">${getCategoryName(item.category)}</span>
                </div>
            </div>
        `;
        
        menuContainer.innerHTML += menuItemHTML;
    });
    
    // Dodaj event listenere za selektovanje jela
    initMenuSelection();
}

function getCategoryName(category) {
    const categories = {
        'predjela': 'Predjelo',
        'glavna': 'Glavno jelo',
        'deserti': 'Desert',
        'pica': 'Piće'
    };
    
    return categories[category] || category;
}

// 4. Selektovanje jela u meniju
function initMenuSelection() {
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    menuItems.forEach(item => {
        // Dodaj hover efekat
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Klik za selektovanje
        item.addEventListener('click', function() {
            // Ukloni selektovanu klasu sa svih jela
            menuItems.forEach(i => {
                i.classList.remove('selected');
                i.style.border = 'none';
                if (!i.classList.contains('selected')) {
                    i.style.transform = 'translateY(0)';
                }
            });
            
            // Dodaj selektovanu klasu na kliknuto jelo
            this.classList.add('selected');
            this.style.transform = 'translateY(-10px)';
            
            // Animiraj selektovano jelo
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// 5. Specijaliteti na početnoj
function initSpecialties() {
    const specialtiesGrid = document.getElementById('specialtiesGrid');
    if (!specialtiesGrid) return;
    
    // Prikazi samo 4 jela kao specijalitete
    const specialItems = menuData.slice(0, 4);
    
    specialItems.forEach(item => {
        const specialtyHTML = `
            <div class="specialty-card">
                <div class="specialty-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="specialty-content">
                    <div class="specialty-header">
                        <h3 class="specialty-name">${item.name}</h3>
                        <span class="specialty-price">${item.price} RSD</span>
                    </div>
                    <p class="specialty-description">${item.description}</p>
                    <span class="specialty-category">${getCategoryName(item.category)}</span>
                </div>
            </div>
        `;
        
        specialtiesGrid.innerHTML += specialtyHTML;
    });
}

// 6. Tim na about stranici
function initTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    
    teamData.forEach(member => {
        const teamHTML = `
            <div class="team-card">
                <div class="team-image">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="team-content">
                    <h3 class="team-name">${member.name}</h3>
                    <p class="team-role">${member.role}</p>
                    <p class="team-bio">${member.bio}</p>
                </div>
            </div>
        `;
        
        teamGrid.innerHTML += teamHTML;
    });
}

// 7. Floating labels za formu
function initFloatingLabels() {
    const inputs = document.querySelectorAll('.floating-label input, .floating-label select');
    
    inputs.forEach(input => {
        // Proverava da li input vec ima vrednost pri ucitavanju
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.classList.add('active');
            }
        }
        
        // Dodaj event listenere
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.classList.add('active');
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const label = this.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.classList.remove('active');
                }
            }
        });
    });
}

// 8. Validacija forme sa obaveznim imenom i prezimenom
function initForm() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (!reservationForm) return;
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Resetuj prethodne greške
        clearFormErrors();
        
        // Validiraj polja
        const isValid = validateForm();
        
        if (isValid) {
            processReservation();
        }
    });
    
    // Real-time validacija
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const guestsInput = document.getElementById('guests');
    const timeInput = document.getElementById('time');
    
    // Postavi min datum na današnji
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Dodaj event listenere za validaciju
    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (phoneInput) phoneInput.addEventListener('blur', validatePhone);
    if (dateInput) dateInput.addEventListener('change', validateDate);
    if (guestsInput) guestsInput.addEventListener('change', validateGuests);
    if (timeInput) timeInput.addEventListener('change', validateTime);
}

// Regularni izrazi za validaciju
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?[0-9]{9,12}$/;
// Ime i prezime mora imati bar dve reci (ime i prezime)
const nameRegex = /^[A-Za-zÀ-ž]+(?:\s+[A-Za-zÀ-ž]+)+$/;

function validateForm() {
    let isValid = true;
    
    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validateDate()) isValid = false;
    if (!validateGuests()) isValid = false;
    if (!validateTime()) isValid = false;
    
    return isValid;
}

function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (!nameInput || !nameError) return true;
    
    const name = nameInput.value.trim();
    
    if (!name) {
        showError(nameError, 'Ime i prezime je obavezno polje.');
        nameInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    // Proveri da li ima bar dve reci (
    const words = name.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length < 2) {
        showError(nameError, 'Molimo unesite i ime i prezime (bar dve reči).');
        nameInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (!nameRegex.test(name)) {
        showError(nameError, 'Ime i prezime mogu sadržati samo slova i razmake.');
        nameInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    showError(nameError, '');
    nameInput.style.borderColor = '#2ecc71';
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput || !emailError) return true;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showError(emailError, 'Email adresa je obavezno polje.');
        emailInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailError, 'Unesite validnu email adresu.');
        emailInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    showError(emailError, '');
    emailInput.style.borderColor = '#2ecc71';
    return true;
}

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    
    if (!phoneInput || !phoneError) return true;
    
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        showError(phoneError, 'Telefon je obavezno polje.');
        phoneInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    // Ukloni sve razmake i specijalne karaktere osim +
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
        showError(phoneError, 'Unesite validan broj telefona (9-12 cifara).');
        phoneInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    showError(phoneError, '');
    phoneInput.style.borderColor = '#2ecc71';
    return true;
}

function validateDate() {
    const dateInput = document.getElementById('date');
    const dateError = document.getElementById('dateError');
    
    if (!dateInput || !dateError) return true;
    
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!dateInput.value) {
        showError(dateError, 'Datum je obavezno polje.');
        dateInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (selectedDate < today) {
        showError(dateError, 'Datum ne može biti u prošlosti.');
        dateInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    showError(dateError, '');
    dateInput.style.borderColor = '#2ecc71';
    return true;
}

function validateGuests() {
    const guestsInput = document.getElementById('guests');
    const guestsError = document.getElementById('guestsError');
    
    if (!guestsInput || !guestsError) return true;
    
    if (!guestsInput.value) {
        showError(guestsError, 'Broj gostiju je obavezno polje.');
        guestsInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    showError(guestsError, '');
    guestsInput.style.borderColor = '#2ecc71';
    return true;
}

function validateTime() {
    const timeInput = document.getElementById('time');
    const timeError = document.getElementById('timeError');
    
    if (!timeInput || !timeError) return true;
    
    if (!timeInput.value) {
        showError(timeError, 'Vreme je obavezno polje.');
        timeInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    showError(timeError, '');
    timeInput.style.borderColor = '#2ecc71';
    return true;
}

function showError(element, message) {
    if (element) {
        element.textContent = message;
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('.modern-form input, .modern-form select');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function processReservation() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message') ? document.getElementById('message').value.trim() : ''
    };
    
    // Generisi broj rezervacije
    const reservationId = 'MED' + Date.now().toString().slice(-6);
    
    // Formatiraj datum
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('sr-RS', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Prikazi uspesnu poruku
    const formResult = document.getElementById('formResult');
    if (formResult) {
        formResult.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h4>Rezervacija je uspešno poslata!</h4>
                <p>Hvala vam, <strong>${formData.name}</strong>.</p>
                <p>Vaš broj rezervacije je: <strong>${reservationId}</strong></p>
                <p>Očekujemo vas <strong>${formattedDate}</strong> u <strong>${formData.time}</strong></p>
                <p>Potvrdu smo vam poslali na email.</p>
            </div>
        `;
        formResult.className = 'form-result success';
        formResult.style.display = 'block';
        
        // Resetuj formu
        document.getElementById('reservationForm').reset();
        
        // Resetuj floating labels
        const labels = document.querySelectorAll('.floating-label label');
        labels.forEach(label => {
            label.classList.remove('active');
        });
        
        // Sakrij poruku nakon 10 sekundi
        setTimeout(() => {
            formResult.style.display = 'none';
        }, 10000);
        
        // Scrolluj do rezultata
        formResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Dodaj CSS animaciju za pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-10px) scale(1); }
        50% { transform: translateY(-10px) scale(1.05); }
        100% { transform: translateY(-10px) scale(1); }
    }
`;
document.head.appendChild(style);