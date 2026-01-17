// --- CONFIGURATION ---
const SPLASH_MESSAGES = [
    "La référence du Survie !",
    "Rejoignez l'élite !",
    "Nouveaux items disponibles !",
    "Attention aux creepers !",
    "V2.0 En ligne maintenant !",
    "Farm to win !"
];

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();      // Charger le thème sauvegardé
    loadPerfMode();   // Charger le mode performance
    initSplash();     // Lancer le texte aléatoire
    generateNotifs(); // Créer les notifications
});

// --- GESTION NAVIGATION (SPA) ---
function showPage(pageId) {
    // Cacher toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Afficher la page demandée
    document.getElementById(pageId).classList.add('active');
    
    // Fermer le menu si ouvert
    toggleMenu(false);
}

// --- GESTION MENU HAMBURGER ---
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('menu-open');
    toggleMenu(!isOpen);
});

function toggleMenu(show) {
    if (show) {
        hamburger.classList.add('active');
        mobileMenu.classList.add('menu-open');
    } else {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('menu-open');
    }
}

// --- GESTION IP CARD ---
function toggleIpCard() {
    document.getElementById('ip-card').classList.toggle('expanded');
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copié : " + text); // On pourrait faire une notif plus jolie
    }).catch(err => console.error('Erreur copie', err));
}

// --- GESTION THEMES & PARAMETRES ---
function openSettings() {
    document.getElementById('settings-overlay').classList.add('show');
    toggleMenu(false); // Fermer le menu hamburger
}

function setTheme(themeName) {
    document.body.className = ''; // Reset classes
    
    // Garder le mode perf si actif
    if(localStorage.getItem('perfMode') === 'true') {
        document.body.classList.add('perf-mode');
    }

    if (themeName !== 'glass') {
        document.body.classList.add('theme-' + themeName);
    }
    
    localStorage.setItem('selectedTheme', themeName);
    
    // Reset couleur perso si on change de thème
    if(themeName === 'neon') {
        document.documentElement.style.setProperty('--accent-color', '#ff00ff');
    }
}

function changeAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
    // Si thème néon, on met à jour l'ombre
    if(document.body.classList.contains('theme-neon')) {
        document.documentElement.style.setProperty('--shadow', `0 0 20px ${color}`);
    }
}

function togglePerfMode(isPerf) {
    if(isPerf) {
        document.body.classList.add('perf-mode');
    } else {
        document.body.classList.remove('perf-mode');
    }
    localStorage.setItem('perfMode', isPerf);
}

// Charger les préférences
function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'glass';
    setTheme(savedTheme);
}
function loadPerfMode() {
    const isPerf = localStorage.getItem('perfMode') === 'true';
    document.getElementById('perf-mode-toggle').checked = isPerf;
    togglePerfMode(isPerf);
}

// --- GESTION MODALES GÉNÉRIQUE ---
function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

// --- SPLASH TEXT ---
function initSplash() {
    const el = document.getElementById('splash-text');
    const randomMsg = SPLASH_MESSAGES[Math.floor(Math.random() * SPLASH_MESSAGES.length)];
    el.innerText = randomMsg;
}

// --- NOTIFICATIONS ---
const notifications = [
    { id: 1, text: "Bienvenue sur la V2 de Elysium !" },
    { id: 2, text: "Maintenance ce soir 20h" },
    { id: 3, text: "Votez pour gagner des clés !" }
];

function generateNotifs() {
    const list = document.getElementById('notif-list');
    const indicator = document.getElementById('notif-indicator');
    list.innerHTML = '';

    if(notifications.length > 0) {
        indicator.style.display = 'block';
        notifications.forEach(notif => {
            const div = document.createElement('div');
            div.className = 'notif-item';
            div.innerHTML = `
                <span>${notif.text}</span>
                <button class="delete-notif" onclick="removeNotif(this, ${notif.id})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            list.appendChild(div);
        });
    } else {
        indicator.style.display = 'none';
        list.innerHTML = '<p style="text-align:center; opacity:0.5;">Aucune notification.</p>';
    }
}

function removeNotif(btn, id) {
    // Animation de suppression
    const item = btn.parentElement;
    item.style.opacity = '0';
    setTimeout(() => {
        item.remove();
        // Vérifier s'il reste des notifs
        if(document.getElementById('notif-list').children.length === 0) {
            document.getElementById('notif-indicator').style.display = 'none';
            document.getElementById('notif-list').innerHTML = '<p style="text-align:center; opacity:0.5;">Aucune notification.</p>';
        }
    }, 300);
}

// Ouvrir notifs
document.getElementById('notif-btn').addEventListener('click', () => {
    document.getElementById('notif-overlay').classList.add('show');
});
