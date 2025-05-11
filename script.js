const app = {
    // Configuration
    GITHUB_USERNAME: 'shinzxyz',
    GITHUB_TOKEN: '', // awalnya kosong
    REPO: 'webku',
    FILE_PATH: 'data.json',
    THEME_KEY: 'selectedTheme',

    // Global variables
    data: {
        apis: [],
        scripts: [],
        codes: [],
        music: null
    },
    isLoggedIn: false,
    currentUsername: '',
    currentToken: '',
    currentTheme: 'default',

currentCodeFilter: ['case', 'function', 'plugin'], // Default semua filter aktif

applyCodeFilter: function() {
    const checkboxes = document.querySelectorAll('.code-filter input[type="checkbox"]:checked');
    this.currentCodeFilter = Array.from(checkboxes).map(cb => cb.value);
    this.renderCodeItems();
},

handleItemTypeChange: function () {
    const type = document.getElementById('itemType').value;

    // Sembunyikan semua
    document.querySelectorAll('.api-field, .script-field, .code-field, .music-field').forEach(el => {
        el.style.display = 'none';
    });

    // Tampilkan nama (kecuali music)
    document.getElementById('itemName').style.display = (type !== 'music') ? 'block' : 'none';

    if (type === 'apis') {
        document.querySelectorAll('.api-field').forEach(el => el.style.display = 'block');
    } else if (type === 'scripts') {
        document.querySelectorAll('.script-field').forEach(el => el.style.display = 'block');
    } else if (type === 'codes') {
        document.querySelectorAll('.code-field').forEach(el => el.style.display = 'block');
    } else if (type === 'music') {
        document.querySelector('.music-field').style.display = 'block';
    }
},

    // Initialize the app
    init: function() {
        this.checkSession();
        this.setupEventListeners();
        this.loadData();
        this.setupSectionNavigation();
        this.showSection('apis');
    setTimeout(() => {
        this.showWelcomeAlert();
    }, 1000);
let messageShown = false;
let hideTimeout;
let lastMessage = '';

// Fungsi untuk menampilkan notifikasi dengan animasi
function showNotification(element, message) {
    if (element.textContent === message) return; // Hindari animasi ulang untuk pesan sama
    
    element.textContent = message;
    element.classList.remove('exit');
    element.style.display = 'block';
    
    // Trigger reflow untuk restart animasi
    void element.offsetWidth;
    
    element.classList.add('show');
}

// Fungsi untuk menyembunyikan notifikasi dengan animasi
function hideNotification(element) {
    element.classList.remove('show');
    element.classList.add('exit');
    
    // Hapus element setelah animasi selesai
    element.addEventListener('animationend', function handler(e) {
        if (e.animationName === 'slideOut') {
            element.style.display = 'none';
            element.classList.remove('exit');
            element.removeEventListener('animationend', handler);
        }
    });
}

setInterval(() => {
    const now = new Date();
    const clock = document.getElementById('clock');
    const notice = document.getElementById('timeNotice');
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Update jam
    const pad = (n) => n.toString().padStart(2, '0');
    clock.textContent = `Waktu: ${pad(hour)}:${pad(minute)}:${pad(second)}`;

    // Cek waktu sholat
    let message = '';
    if (hour === 4 || (hour === 5 && minute === 0)) {
        message = "⏰ Jangan lupa sholat subuh ya";
    } else if ((hour === 11 && minute >= 30) || (hour === 12 && minute <= 30)) {
        message = "🕌 Jangan lupa sholat dzuhur ya";
    } else if ((hour === 14 && minute >= 40) || (hour === 15 && minute <= 30)) {
        message = "📿 Jangan lupa sholat ashar ya";
    } else if ((hour === 17 && minute >= 30) || (hour === 18 && minute <= 30)) {
        message = "🌙 Jangan lupa sholat maghrib ya";
    } else if ((hour === 18 && minute >= 55) || (hour === 19 && minute <= 30)) {
        message = "🌟 Jangan lupa sholat isya ya";
    }

    // Logika notifikasi
    if (message && !messageShown) {
        showNotification(notice, message);
        messageShown = true;
        lastMessage = message;

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            hideNotification(notice);
            messageShown = false;
        }, 10000); // Notif akan hilang setelah 10 detik
    } else if (!message && messageShown) {
        hideNotification(notice);
        messageShown = false;
        lastMessage = '';
        clearTimeout(hideTimeout);
    }

}, 1000);
        // Initialize music player
        const music = document.getElementById('bgMusic');
        music.volume = 0.3;
        
        // Initialize theme
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
        this.applyTheme();
    },

    // Theme functions
    showThemeSelector: function() {
        document.getElementById('themeModal').style.display = 'block';
    },

    closeThemeModal: function() {
        document.getElementById('themeModal').style.display = 'none';
    },

    changeTheme: function(themeName) {
        this.currentTheme = themeName;
        this.applyTheme();
        localStorage.setItem(this.THEME_KEY, themeName);
        this.closeThemeModal();
    },

    applyTheme: function() {
        const root = document.documentElement;
        
        switch(this.currentTheme) {
    case 'neon':
    root.style.setProperty('--primary-color', '#39ff14');
    root.style.setProperty('--secondary-color', '#0affef');
    root.style.setProperty('--accent-color', '#ff0266');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#ffffff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#0affef');
    root.style.setProperty('--button-label-color', '#000000');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'ocean':
    root.style.setProperty('--primary-color', '#0077be');
    root.style.setProperty('--secondary-color', '#3399cc');
    root.style.setProperty('--accent-color', '#005f8b');
    root.style.setProperty('--dark-color', '#002f4b');
    root.style.setProperty('--light-color', '#cceeff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#005f8b');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'fire':
    root.style.setProperty('--primary-color', '#ff4500');
    root.style.setProperty('--secondary-color', '#ff6347');
    root.style.setProperty('--accent-color', '#ffa500');
    root.style.setProperty('--dark-color', '#330000');
    root.style.setProperty('--light-color', '#ffe5b4');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#ff6347');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'sakura':
    root.style.setProperty('--primary-color', '#ffb7c5');
    root.style.setProperty('--secondary-color', '#ffe4ec');
    root.style.setProperty('--accent-color', '#ffdce0');
    root.style.setProperty('--dark-color', '#c47a92');
    root.style.setProperty('--light-color', '#fff6f9');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#5c2a3c');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-label-color', '#5c2a3c');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'monochrome':
    root.style.setProperty('--primary-color', '#cccccc');
    root.style.setProperty('--secondary-color', '#aaaaaa');
    root.style.setProperty('--accent-color', '#888888');
    root.style.setProperty('--dark-color', '#333333');
    root.style.setProperty('--light-color', '#f0f0f0');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-label-color', '#222222');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'lavender':
    root.style.setProperty('--primary-color', '#b497bd');
    root.style.setProperty('--secondary-color', '#d4b8e7');
    root.style.setProperty('--accent-color', '#e6c7f1');
    root.style.setProperty('--dark-color', '#5e4b63');
    root.style.setProperty('--light-color', '#f9f5fc');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3e2f4f');
    root.style.setProperty('--button-bg', '#ffffff');
    root.style.setProperty('--button-label-color', '#3e2f4f');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'arctic':
    root.style.setProperty('--primary-color', '#d0f0ff');
    root.style.setProperty('--secondary-color', '#a0d8ef');
    root.style.setProperty('--accent-color', '#70c1e5');
    root.style.setProperty('--dark-color', '#3a506b');
    root.style.setProperty('--light-color', '#f0faff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#1a1a1a');
    root.style.setProperty('--button-bg', '#a0d8ef');
    root.style.setProperty('--button-label-color', '#1a1a1a');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'bronze':
    root.style.setProperty('--primary-color', '#cd7f32');
    root.style.setProperty('--secondary-color', '#b87333');
    root.style.setProperty('--accent-color', '#8c5a2d');
    root.style.setProperty('--dark-color', '#4b3621');
    root.style.setProperty('--light-color', '#f5e0c3');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#2d1b0f');
    root.style.setProperty('--button-bg', '#b87333');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'emerald':
    root.style.setProperty('--primary-color', '#50c878');
    root.style.setProperty('--secondary-color', '#3cb371');
    root.style.setProperty('--accent-color', '#2e8b57');
    root.style.setProperty('--dark-color', '#1e4d3a');
    root.style.setProperty('--light-color', '#d8fce1');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#0f2a1f');
    root.style.setProperty('--button-bg', '#3cb371');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'candy':
    root.style.setProperty('--primary-color', '#ff69b4');
    root.style.setProperty('--secondary-color', '#ffb6c1');
    root.style.setProperty('--accent-color', '#ffa07a');
    root.style.setProperty('--dark-color', '#ff1493');
    root.style.setProperty('--light-color', '#fff0f5');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#730047');
    root.style.setProperty('--button-bg', '#ffb6c1');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'desert':
    root.style.setProperty('--primary-color', '#edc9af');
    root.style.setProperty('--secondary-color', '#e0b084');
    root.style.setProperty('--accent-color', '#c2a56c');
    root.style.setProperty('--dark-color', '#8b6f47');
    root.style.setProperty('--light-color', '#fdf6e3');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3b2e19');
    root.style.setProperty('--button-bg', '#e0b084');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'cyberpunk':
    root.style.setProperty('--primary-color', '#ff0090');
    root.style.setProperty('--secondary-color', '#2f004f');
    root.style.setProperty('--accent-color', '#00ffe7');
    root.style.setProperty('--dark-color', '#0d0d0d');
    root.style.setProperty('--light-color', '#ffffff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#0d0d0d');
    root.style.setProperty('--button-bg', '#00ffe7');
    root.style.setProperty('--button-label-color', '#000000');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'forest':
    root.style.setProperty('--primary-color', '#2e8b57');
    root.style.setProperty('--secondary-color', '#3cb371');
    root.style.setProperty('--accent-color', '#228b22');
    root.style.setProperty('--dark-color', '#1a3a1a');
    root.style.setProperty('--light-color', '#d0f0d0');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#102610');
    root.style.setProperty('--button-bg', '#3cb371');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'sunset':
    root.style.setProperty('--primary-color', '#ff7e5f');
    root.style.setProperty('--secondary-color', '#feb47b');
    root.style.setProperty('--accent-color', '#ff6e7f');
    root.style.setProperty('--dark-color', '#4b2c5e');
    root.style.setProperty('--light-color', '#fff0ec');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#4b2c5e');
    root.style.setProperty('--button-bg', '#feb47b');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'matrix':
    root.style.setProperty('--primary-color', '#003b00');
    root.style.setProperty('--secondary-color', '#006400');
    root.style.setProperty('--accent-color', '#00aa00');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#ccffcc');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#00aa00');
    root.style.setProperty('--button-label-color', '#000000');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'pastel':
    root.style.setProperty('--primary-color', '#ffd1dc');
    root.style.setProperty('--secondary-color', '#c1f0f6');
    root.style.setProperty('--accent-color', '#dcd3ff');
    root.style.setProperty('--dark-color', '#aaa');
    root.style.setProperty('--light-color', '#ffffff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#444444');
    root.style.setProperty('--button-bg', '#c1f0f6');
    root.style.setProperty('--button-label-color', '#444444');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'dark':
    root.style.setProperty('--primary-color', '#1e1e1e');
    root.style.setProperty('--secondary-color', '#2c2c2c');
    root.style.setProperty('--accent-color', '#3d3d3d');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#4a4a4a');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#3d3d3d');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'vintage':
    root.style.setProperty('--primary-color', '#c9b29b');
    root.style.setProperty('--secondary-color', '#a67c52');
    root.style.setProperty('--accent-color', '#66533c');
    root.style.setProperty('--dark-color', '#3b3024');
    root.style.setProperty('--light-color', '#f4e8d1');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3b3024');
    root.style.setProperty('--button-bg', '#a67c52');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'midnight':
    root.style.setProperty('--primary-color', '#1a1a40');
    root.style.setProperty('--secondary-color', '#2e2e60');
    root.style.setProperty('--accent-color', '#3a3a80');
    root.style.setProperty('--dark-color', '#0d0d1a');
    root.style.setProperty('--light-color', '#4d4d80');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#3a3a80');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'coffee':
    root.style.setProperty('--primary-color', '#6f4e37');
    root.style.setProperty('--secondary-color', '#a67b5b');
    root.style.setProperty('--accent-color', '#d2b48c');
    root.style.setProperty('--dark-color', '#3b2f2f');
    root.style.setProperty('--light-color', '#f5f5dc');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#2e1a0f');
    root.style.setProperty('--button-bg', '#a67b5b');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'blue':
    root.style.setProperty('--primary-color', '#7da6ff');
    root.style.setProperty('--secondary-color', '#a7c4ff');
    root.style.setProperty('--accent-color', '#5c89c5');
    root.style.setProperty('--dark-color', '#4a6fa5');
    root.style.setProperty('--light-color', '#eef4ff');
    root.style.setProperty('--text-color', '#1e2a3a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#7da6ff');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#1e2a3a');
    break;

case 'ice':
    root.style.setProperty('--primary-color', '#b3e5fc');
    root.style.setProperty('--secondary-color', '#81d4fa');
    root.style.setProperty('--accent-color', '#4fc3f7');
    root.style.setProperty('--dark-color', '#0288d1');
    root.style.setProperty('--light-color', '#e1f5fe');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#01579b');
    root.style.setProperty('--button-bg', '#81d4fa');
    root.style.setProperty('--button-label-color', '#01579b');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'space':
    root.style.setProperty('--primary-color', '#0b0033');
    root.style.setProperty('--secondary-color', '#3700b3');
    root.style.setProperty('--accent-color', '#51257D');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#d1c4e9');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#6200ea');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;
case 'aqua':
    root.style.setProperty('--primary-color', '#00ffff');
    root.style.setProperty('--secondary-color', '#7fffd4');
    root.style.setProperty('--accent-color', '#e0ffff');
    root.style.setProperty('--dark-color', '#008b8b');
    root.style.setProperty('--light-color', '#f0ffff');
    root.style.setProperty('--text-color', '#004d4d');
    root.style.setProperty('--button-text', '#004d4d');
    root.style.setProperty('--button-bg', '#00ffff');
    root.style.setProperty('--button-label-color', '#000000');
    root.style.setProperty('--title-color', '#004d4d');
    break;

case 'sky':
    root.style.setProperty('--primary-color', '#87ceeb');
    root.style.setProperty('--secondary-color', '#b0e0e6');
    root.style.setProperty('--accent-color', '#d0f0ff');
    root.style.setProperty('--dark-color', '#4682b4');
    root.style.setProperty('--light-color', '#e6f7ff');
    root.style.setProperty('--text-color', '#003366');
    root.style.setProperty('--button-text', '#003366');
    root.style.setProperty('--button-bg', '#87ceeb');
    root.style.setProperty('--button-label-color', '#000000');
    root.style.setProperty('--title-color', '#003366');
    break;

case 'teal':
    root.style.setProperty('--primary-color', '#008080');
    root.style.setProperty('--secondary-color', '#20b2aa');
    root.style.setProperty('--accent-color', '#40e0d0');
    root.style.setProperty('--dark-color', '#004d4d');
    root.style.setProperty('--light-color', '#ccffff');
    root.style.setProperty('--text-color', '#002929');
    root.style.setProperty('--button-text', '#002929');
    root.style.setProperty('--button-bg', '#20b2aa');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#002929');
    break;

case 'sapphire':
    root.style.setProperty('--primary-color', '#0f52ba');
    root.style.setProperty('--secondary-color', '#4682b4');
    root.style.setProperty('--accent-color', '#a9c9ff');
    root.style.setProperty('--dark-color', '#002147');
    root.style.setProperty('--light-color', '#ddeeff');
    root.style.setProperty('--text-color', '#001733');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#0f52ba');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#001733');
    break;

case 'navy':
    root.style.setProperty('--primary-color', '#000080');
    root.style.setProperty('--secondary-color', '#0000cd');
    root.style.setProperty('--accent-color', '#4169e1');
    root.style.setProperty('--dark-color', '#00004d');
    root.style.setProperty('--light-color', '#dbe9ff');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#0000cd');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#ffffff');
    break;

case 'lavender':
    root.style.setProperty('--primary-color', '#e6e6fa');
    root.style.setProperty('--secondary-color', '#d8bfd8');
    root.style.setProperty('--accent-color', '#f3e8ff');
    root.style.setProperty('--dark-color', '#9370db');
    root.style.setProperty('--light-color', '#faf5ff');
    root.style.setProperty('--text-color', '#4b0082');
    root.style.setProperty('--button-text', '#4b0082');
    root.style.setProperty('--button-bg', '#d8bfd8');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#4b0082');
    break;

case 'blossom':
    root.style.setProperty('--primary-color', '#ffb7c5');
    root.style.setProperty('--secondary-color', '#ffa6c9');
    root.style.setProperty('--accent-color', '#ffd5e5');
    root.style.setProperty('--dark-color', '#ff69b4');
    root.style.setProperty('--light-color', '#fff0f5');
    root.style.setProperty('--text-color', '#8b1c62');
    root.style.setProperty('--button-text', '#8b1c62');
    root.style.setProperty('--button-bg', '#ffb7c5');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#8b1c62');
    break;

case 'maroon':
    root.style.setProperty('--primary-color', '#800000');
    root.style.setProperty('--secondary-color', '#a52a2a');
    root.style.setProperty('--accent-color', '#cd5c5c');
    root.style.setProperty('--dark-color', '#400000');
    root.style.setProperty('--light-color', '#ffcccc');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#a52a2a');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#ffffff');
    break;

case 'onyx':
    root.style.setProperty('--primary-color', '#353839');
    root.style.setProperty('--secondary-color', '#43464b');
    root.style.setProperty('--accent-color', '#696969');
    root.style.setProperty('--dark-color', '#111314');
    root.style.setProperty('--light-color', '#a9a9a9');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#43464b');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#ffffff');
    break;

case 'bronze':
    root.style.setProperty('--primary-color', '#cd7f32');
    root.style.setProperty('--secondary-color', '#b87333');
    root.style.setProperty('--accent-color', '#e0b074');
    root.style.setProperty('--dark-color', '#5b3a0a');
    root.style.setProperty('--light-color', '#f5e0c3');
    root.style.setProperty('--text-color', '#3a2506');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#b87333');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#3a2506');
    break;

case 'emerald':
    root.style.setProperty('--primary-color', '#50c878');
    root.style.setProperty('--secondary-color', '#3eb489');
    root.style.setProperty('--accent-color', '#a1e8af');
    root.style.setProperty('--dark-color', '#20603d');
    root.style.setProperty('--light-color', '#e0f8e0');
    root.style.setProperty('--text-color', '#104020');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#3eb489');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#104020');
    break;

case 'jade':
    root.style.setProperty('--primary-color', '#00a86b');
    root.style.setProperty('--secondary-color', '#5bb381');
    root.style.setProperty('--accent-color', '#a2f5bf');
    root.style.setProperty('--dark-color', '#11694e');
    root.style.setProperty('--light-color', '#d9fff0');
    root.style.setProperty('--text-color', '#003d2c');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#5bb381');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#003d2c');
    break;

case 'forest':
    root.style.setProperty('--primary-color', '#228b22');
    root.style.setProperty('--secondary-color', '#32cd32');
    root.style.setProperty('--accent-color', '#90ee90');
    root.style.setProperty('--dark-color', '#145214');
    root.style.setProperty('--light-color', '#d9f5d9');
    root.style.setProperty('--text-color', '#0a320a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#32cd32');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#0a320a');
    break;

case 'midnight':
    root.style.setProperty('--primary-color', '#191970');
    root.style.setProperty('--secondary-color', '#000080');
    root.style.setProperty('--accent-color', '#4169e1');
    root.style.setProperty('--dark-color', '#00004d');
    root.style.setProperty('--light-color', '#e0e8ff');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#000080');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#ffffff');
    break;

case 'obsidian':
    root.style.setProperty('--primary-color', '#0b0c10');
    root.style.setProperty('--secondary-color', '#1f2833');
    root.style.setProperty('--accent-color', '#45a29e');
    root.style.setProperty('--dark-color', '#000000');
    root.style.setProperty('--light-color', '#c5c6c7');
    root.style.setProperty('--text-color', '#66fcf1');
    root.style.setProperty('--button-text', '#66fcf1');
    root.style.setProperty('--button-bg', '#1f2833');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#66fcf1');
    break;
case 'mint':
    root.style.setProperty('--primary-color', '#a2e0d0');
    root.style.setProperty('--secondary-color', '#c7f0e0');
    root.style.setProperty('--accent-color', '#e0f7f0');
    root.style.setProperty('--dark-color', '#5a8c7d');
    root.style.setProperty('--light-color', '#f5fffc');
    root.style.setProperty('--text-color', '#2d4a43');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#5a8c7d');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#2d4a43');
    break;

case 'peach':
    root.style.setProperty('--primary-color', '#ffb7a0');
    root.style.setProperty('--secondary-color', '#ffd5c2');
    root.style.setProperty('--accent-color', '#ffe8dd');
    root.style.setProperty('--dark-color', '#c97c5d');
    root.style.setProperty('--light-color', '#fff5f0');
    root.style.setProperty('--text-color', '#5a3a2d');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#c97c5d');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#5a3a2d');
    break;

case 'lilac':
    root.style.setProperty('--primary-color', '#d0a2e0');
    root.style.setProperty('--secondary-color', '#e0c7f0');
    root.style.setProperty('--accent-color', '#f0e0f7');
    root.style.setProperty('--dark-color', '#7d5a8c');
    root.style.setProperty('--light-color', '#faf5ff');
    root.style.setProperty('--text-color', '#4a2d5a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#7d5a8c');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#4a2d5a');
    break;

case 'honey':
    root.style.setProperty('--primary-color', '#ffd700');
    root.style.setProperty('--secondary-color', '#ffe55c');
    root.style.setProperty('--accent-color', '#fff2aa');
    root.style.setProperty('--dark-color', '#b38f00');
    root.style.setProperty('--light-color', '#fffae5');
    root.style.setProperty('--text-color', '#4a3d00');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#b38f00');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#4a3d00');
    break;

case 'sage':
    root.style.setProperty('--primary-color', '#b8c8a0');
    root.style.setProperty('--secondary-color', '#d0e0b8');
    root.style.setProperty('--accent-color', '#e8f0d0');
    root.style.setProperty('--dark-color', '#6a7d5a');
    root.style.setProperty('--light-color', '#f5faf0');
    root.style.setProperty('--text-color', '#3a4a2d');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#6a7d5a');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#3a4a2d');
    break;

case 'sky':
    root.style.setProperty('--primary-color', '#87ceeb');
    root.style.setProperty('--secondary-color', '#b0e0e6');
    root.style.setProperty('--accent-color', '#d0f0f7');
    root.style.setProperty('--dark-color', '#4682b4');
    root.style.setProperty('--light-color', '#f0faff');
    root.style.setProperty('--text-color', '#2d4a5a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#4682b4');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#2d4a5a');
    break;

case 'blush':
    root.style.setProperty('--primary-color', '#ffb6c1');
    root.style.setProperty('--secondary-color', '#ffd1d6');
    root.style.setProperty('--accent-color', '#ffe8eb');
    root.style.setProperty('--dark-color', '#c97d8c');
    root.style.setProperty('--light-color', '#fff5f7');
    root.style.setProperty('--text-color', '#5a2d3a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#c97d8c');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#5a2d3a');
    break;

case 'mocha':
    root.style.setProperty('--primary-color', '#d2b48c');
    root.style.setProperty('--secondary-color', '#e0c7a8');
    root.style.setProperty('--accent-color', '#f0e0c7');
    root.style.setProperty('--dark-color', '#8c6d4a');
    root.style.setProperty('--light-color', '#faf5f0');
    root.style.setProperty('--text-color', '#4a3a2d');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#8c6d4a');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#4a3a2d');
    break;

case 'seafoam':
    root.style.setProperty('--primary-color', '#9fe2bf');
    root.style.setProperty('--secondary-color', '#c1f0d0');
    root.style.setProperty('--accent-color', '#e0f7e8');
    root.style.setProperty('--dark-color', '#5a8c7d');
    root.style.setProperty('--light-color', '#f0fff5');
    root.style.setProperty('--text-color', '#2d5a4a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#5a8c7d');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#2d5a4a');
    break;

case 'orchid':
    root.style.setProperty('--primary-color', '#da70d6');
    root.style.setProperty('--secondary-color', '#e8a0e6');
    root.style.setProperty('--accent-color', '#f5d0f0');
    root.style.setProperty('--dark-color', '#8c4a88');
    root.style.setProperty('--light-color', '#faf0fa');
    root.style.setProperty('--text-color', '#5a2d58');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#8c4a88');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#5a2d58');
    break;
// Additional Theme Cases
case 'rosegold':
    root.style.setProperty('--primary-color', '#e0bfb8');
    root.style.setProperty('--secondary-color', '#f0d7d0');
    root.style.setProperty('--accent-color', '#fae8e5');
    root.style.setProperty('--dark-color', '#b38b82');
    root.style.setProperty('--light-color', '#fff5f2');
    root.style.setProperty('--text-color', '#4a3a35');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#b38b82');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#4a3a35');
    break;

case 'amethyst':
    root.style.setProperty('--primary-color', '#9966cc');
    root.style.setProperty('--secondary-color', '#c5a3e6');
    root.style.setProperty('--accent-color', '#e0d0f0');
    root.style.setProperty('--dark-color', '#6a3d8c');
    root.style.setProperty('--light-color', '#f5f0ff');
    root.style.setProperty('--text-color', '#3d2d5a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#6a3d8c');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#3d2d5a');
    break;

case 'honeydew':
    root.style.setProperty('--primary-color', '#f0fff0');
    root.style.setProperty('--secondary-color', '#e0f0e0');
    root.style.setProperty('--accent-color', '#c0e0c0');
    root.style.setProperty('--dark-color', '#8cb38c');
    root.style.setProperty('--light-color', '#f5fff5');
    root.style.setProperty('--text-color', '#2d4a2d');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#8cb38c');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#2d4a2d');
    break;

case 'twilight':
    root.style.setProperty('--primary-color', '#58427c');
    root.style.setProperty('--secondary-color', '#7d5a8c');
    root.style.setProperty('--accent-color', '#a38cb3');
    root.style.setProperty('--dark-color', '#382a4a');
    root.style.setProperty('--light-color', '#e0d0f0');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#7d5a8c');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'pear':
    root.style.setProperty('--primary-color', '#d1e231');
    root.style.setProperty('--secondary-color', '#e0f050');
    root.style.setProperty('--accent-color', '#f0ff80');
    root.style.setProperty('--dark-color', '#8ca82d');
    root.style.setProperty('--light-color', '#f5ffd0');
    root.style.setProperty('--text-color', '#3a4a1d');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#8ca82d');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#3a4a1d');
    break;

case 'denim':
    root.style.setProperty('--primary-color', '#1560bd');
    root.style.setProperty('--secondary-color', '#5b9bd5');
    root.style.setProperty('--accent-color', '#a7c7e7');
    root.style.setProperty('--dark-color', '#0d3c78');
    root.style.setProperty('--light-color', '#e0e8f0');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#0d3c78');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;

case 'buttercup':
    root.style.setProperty('--primary-color', '#f5d300');
    root.style.setProperty('--secondary-color', '#ffe55c');
    root.style.setProperty('--accent-color', '#fff2aa');
    root.style.setProperty('--dark-color', '#c7a500');
    root.style.setProperty('--light-color', '#fffae5');
    root.style.setProperty('--text-color', '#4a3d00');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#c7a500');
    root.style.setProperty('--button-label-color', '#000000');
    root.style.setProperty('--title-color', '#4a3d00');
    break;

case 'slate':
    root.style.setProperty('--primary-color', '#708090');
    root.style.setProperty('--secondary-color', '#98a8b8');
    root.style.setProperty('--accent-color', '#c0d0e0');
    root.style.setProperty('--dark-color', '#4a5a6a');
    root.style.setProperty('--light-color', '#f0f5fa');
    root.style.setProperty('--text-color', '#2d3a4a');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#4a5a6a');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#2d3a4a');
    break;

case 'tangerine':
    root.style.setProperty('--primary-color', '#f28500');
    root.style.setProperty('--secondary-color', '#ffa54f');
    root.style.setProperty('--accent-color', '#ffc08a');
    root.style.setProperty('--dark-color', '#c05a00');
    root.style.setProperty('--light-color', '#fff5e5');
    root.style.setProperty('--text-color', '#5a3a1d');
    root.style.setProperty('--button-text', '#ffffff');
    root.style.setProperty('--button-bg', '#c05a00');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#5a3a1d');
    break;

case 'mystic':
    root.style.setProperty('--primary-color', '#8a2be2');
    root.style.setProperty('--secondary-color', '#b57edc');
    root.style.setProperty('--accent-color', '#d0a3f0');
    root.style.setProperty('--dark-color', '#5f00a8');
    root.style.setProperty('--light-color', '#f0e5ff');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#000000');
    root.style.setProperty('--button-bg', '#5f00a8');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
    break;
default: // Default theme
    root.style.setProperty('--primary-color', '#ff5c8a');
    root.style.setProperty('--secondary-color', '#ff99aa');
    root.style.setProperty('--accent-color', '#ffccd5');
    root.style.setProperty('--dark-color', '#7a2e4d');
    root.style.setProperty('--light-color', '#fff0f5');
    root.style.setProperty('--text-color', '#000000');
    root.style.setProperty('--button-text', '#3d1f2b');
    root.style.setProperty('--button-bg', '#ff99aa');
    root.style.setProperty('--button-label-color', '#ffffff');
    root.style.setProperty('--title-color', '#000000');
}
    },

    loadLocalThemes: function() {
        const localThemes = JSON.parse(localStorage.getItem(this.LOCAL_THEMES_KEY)) || [];
        const container = document.getElementById('localThemes');
        container.innerHTML = '';
        
        localThemes.forEach(theme => {
            const button = document.createElement('button');
            button.className = 'theme-option pixel-button';
            button.onclick = () => this.changeTheme(theme.name);
            button.innerHTML = `
                <div class="theme-preview" style="background: ${theme.color}"></div>
                ${theme.name}
            `;
            container.appendChild(button);
        });
    },

    addCustomTheme: function() {
        const themeName = document.getElementById('themeName').value.trim();
        if (!themeName) {
            this.showAlert('Please enter a theme name');
            return;
        }
        
        const localThemes = JSON.parse(localStorage.getItem(this.LOCAL_THEMES_KEY)) || [];
        
        const newTheme = {
            name: themeName,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        
        localThemes.push(newTheme);
        localStorage.setItem(this.LOCAL_THEMES_KEY, JSON.stringify(localThemes));
        this.loadLocalThemes();
        document.getElementById('themeName').value = '';
        this.showAlert('Theme added!');
    },

    // Music Player Functionality
    toggleMusic: function() {
        const music = document.getElementById('bgMusic');
        const musicStatus = document.getElementById('musicStatus');
        
        if (music.children.length === 0) {
            const source = document.createElement('source');
            source.type = 'audio/mpeg';
            music.appendChild(source);
        }
        
        const source = music.querySelector('source');
        source.src = this.data.music || 'https://files.catbox.moe/igy3ft.mp3';
        
        if (music.paused) {
            music.play()
                .then(() => musicStatus.textContent = 'Pause')
                .catch(e => this.showAlert('Autoplay blocked: ' + e.message));
        } else {
            music.pause();
            musicStatus.textContent = 'Play';
        }
    },

    changeMusic: function(type) {
        const music = document.getElementById('bgMusic');
        const musicStatus = document.getElementById('musicStatus');
        const currentMusicName = document.getElementById('currentMusicName');
        
        if (type === 'default') {
            // Clear existing sources
            while (music.firstChild) {
                music.removeChild(music.firstChild);
            }
            
            const source = document.createElement('source');
            source.src = 'https://files.catbox.moe/igy3ft.mp3';
            source.type = 'audio/mpeg';
            music.appendChild(source);
            
            currentMusicName.textContent = 'Default';
            this.data.music = null;
        } else if (type === 'custom' && this.data.music) {
            // Already set up in loadData()
            currentMusicName.textContent = 'Custom';
        }
        
        music.load();
        if (musicStatus.textContent === 'Pause') {
            music.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        }
    },

    closeMusicModal: function() {
        document.getElementById('musicModal').style.display = 'none';
    },

    confirmAlert: function(message) {
    return new Promise((resolve) => {
        const alertBox = document.getElementById('pixelAlert');
        const alertMessage = document.getElementById('pixelAlertMessage');
        const alertClose = document.getElementById('pixelAlertClose');
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        document.body.appendChild(overlay);

        alertMessage.innerHTML = `
            <p>${message}</p>
            <div class="confirm-buttons">
                <button id="confirmYes" class="pixel-button">Yes</button>
                <button id="confirmNo" class="pixel-button">No</button>
            </div>
        `;
        alertBox.style.display = 'block';
        overlay.style.display = 'block';

        // Fungsi untuk menutup alert
        const closeAlert = (result) => {
            alertBox.style.display = 'none';
            overlay.style.display = 'none';
            document.body.removeChild(overlay); // Pastikan overlay dihapus
            resolve(result);
        };

        document.getElementById('confirmYes').onclick = () => closeAlert(true);
        document.getElementById('confirmNo').onclick = () => closeAlert(false);
        alertClose.onclick = () => closeAlert(false);
    });
},

showAlert: function(message) {  // Hapus parameter `duration`
    const alertBox = document.getElementById('pixelAlert');
    const alertMessage = document.getElementById('pixelAlertMessage');
    const alertClose = document.getElementById('pixelAlertClose');
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    document.body.appendChild(overlay);

    alertMessage.textContent = message;
    alertBox.style.display = 'block';
    overlay.style.display = 'block';

    alertClose.onclick = () => {
        alertBox.style.display = 'none';
        overlay.style.display = 'none';
        document.body.removeChild(overlay); // Pastikan overlay dihapus
    };
},

    setupSectionNavigation: function() {
        const nav = document.querySelector('.pixel-nav');
        
        nav.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-section]');
            if (button) {
                this.showSection(button.dataset.section);
            }
        });
    },

    showSection: function(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.querySelectorAll('.pixel-nav button').forEach(button => {
            button.classList.remove('active');
        });
        
        const section = document.getElementById(sectionId);
        if (section) section.classList.add('active');
        
        const activeBtn = document.querySelector(`.pixel-nav button[data-section="${sectionId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    },

    setupEventListeners: function() {
        document.getElementById('itemType').addEventListener('change', (e) => {
            const type = e.target.value;
            
            // Hide all fields first
            document.getElementById('itemName').style.display = 'none';
            document.getElementById('welcomeOverlay').style.display = 'block';
            document.querySelectorAll('.api-field').forEach(field => field.style.display = 'none');
            document.querySelectorAll('.script-field').forEach(field => field.style.display = 'none');
            document.getElementById('itemCode').style.display = 'none';
            document.querySelector('.music-field').style.display = 'none';
            
            // Show relevant fields
            if (type === 'apis') {
                document.getElementById('itemName').style.display = 'block';
                document.querySelectorAll('.api-field').forEach(field => field.style.display = 'block');
            } else if (type === 'scripts') {
                document.getElementById('itemName').style.display = 'block';
                document.querySelectorAll('.script-field').forEach(field => field.style.display = 'block');
            } else if (type === 'codes') {
                document.getElementById('itemName').style.display = 'block';
                document.getElementById('itemCode').style.display = 'block';
            } else if (type === 'music') {
                document.querySelector('.music-field').style.display = 'block';
            }
        });
    },

    copyToClipboard: function(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showAlert('Copied to clipboard!');
            } else {
                throw new Error('Copy command failed');
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showAlert('Failed to copy: ' + err.message);
        } finally {
            document.body.removeChild(textarea);
        }
    },

    copyCode: function(code) {
        navigator.clipboard.writeText(code).then(() => {
            this.showAlert('Code copied to clipboard!');
        }).catch(err => {
            this.showAlert('Failed to copy code.');
            console.error('Copy failed:', err);
        });
    },

    checkSession: function() {
        const username = sessionStorage.getItem('githubUsername');
        const token = sessionStorage.getItem('githubToken');
        
        if (username && token && username === this.GITHUB_USERNAME && token === this.GITHUB_TOKEN) {
            this.currentUsername = username;
            this.currentToken = token;
            this.isLoggedIn = true;
            this.updateUI();
        }
    },

login: function() {
    const username = document.getElementById('githubUsername').value.trim();
    const token = document.getElementById('githubToken').value.trim();

    if (!username || !token) {
        this.showAlert('Please enter both username and token');
        return;
    }

    if (!token.startsWith('github_pat_11')) {
        this.showAlert('Password Salah');
        return;
    }

    // Simpan hanya jika token valid
    this.currentUsername = username;
    this.GITHUB_TOKEN = token;
    this.isLoggedIn = true;

    sessionStorage.setItem('githubUsername', username);
    sessionStorage.setItem('githubToken', token);

    this.updateUI();
    this.loadData();
},

logout: function() {
    this.isLoggedIn = false;
    this.currentUsername = '';
    this.GITHUB_TOKEN = ''; // Kosongkan kembali token saat logout

    sessionStorage.removeItem('githubUsername');
    sessionStorage.removeItem('githubToken');

    location.reload(); // Full refresh agar UI benar-benar bersih
},

    updateUI: function() {
        if (this.isLoggedIn) {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('userInfo').style.display = 'flex';
            document.getElementById('addBtn').style.display = 'block';
            document.getElementById('loggedInUser').textContent = `Logged in as ${this.currentUsername}`;
        } else {
            document.getElementById('loginForm').style.display = 'flex';
            document.getElementById('userInfo').style.display = 'none';
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('addForm').style.display = 'none';
        }
    },

    async loadData() {
    try {
        console.time('Total loadData'); // Mulai pengukuran waktu
        
        // URL dengan cache busting
        const url = `https://raw.githubusercontent.com/shinzxyz/webku/refs/heads/main/data.json`;
        
        console.time('Fetch data');
        const response = await fetch(url);
        
        if (!response.ok) {
            const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
            console.warn(`Rate limit remaining: ${rateLimitRemaining}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.timeEnd('Fetch data');

        console.time('Parse content');
        const content = await response.text();
        console.log(`File size: ${(content.length / 1024).toFixed(2)} KB`);
        
        this.data = JSON.parse(content);
        console.timeEnd('Parse content');

        // Render data terlebih dahulu sebelum memuat musik
        console.time('Render data');
        this.renderData();
        console.timeEnd('Render data');

        // Load musik secara asynchronous setelah render utama
        if (this.data.music) {
            console.time('Load music');
            await this.loadMusicAsync(this.data.music);
            console.timeEnd('Load music');
        }

        console.timeEnd('Total loadData');
    } catch (error) {
        console.error('Error loading data:', error);
        this.showAlert('Failed to load data. ' + error.message);

        // Fallback data
        this.data = {
            apis: [],
            scripts: [],
            codes: [],
            music: null
        };
        this.renderData();
    }
},

// Fungsi terpisah untuk memuat musik
async loadMusicAsync(musicUrl) {
    return new Promise((resolve) => {
        const music = document.getElementById('bgMusic');
        
        // Kosongkan player terlebih dahulu
        while (music.firstChild) {
            music.removeChild(music.firstChild);
        }

        const source = document.createElement('source');
        source.src = musicUrl;
        source.type = 'audio/mpeg';
        music.appendChild(source);

        // Event handler untuk ketika musik siap
        const onMusicLoaded = () => {
            music.removeEventListener('canplaythrough', onMusicLoaded);
            
            const musicLabel = document.getElementById('currentMusicName');
            if (musicLabel) {
                musicLabel.textContent = 'Custom';
            }
            
            resolve();
        };

        music.addEventListener('canplaythrough', onMusicLoaded);
        music.load();
    });
},

    renderData: function() {
        this.renderApiItems();
        this.renderScriptItems();
        this.renderCodeItems();
    },

    renderApiItems: function() {
    const container = document.getElementById('apiItems');
    container.innerHTML = '';
    
    this.data.apis.forEach((api, index) => {
        const card = document.createElement('div');
        card.className = 'item-card pixel-box';
        
        const shortEndpoint = api.endpoint.length > 30 
            ? api.endpoint.substring(0, 27) + '...' 
            : api.endpoint;
            
        card.innerHTML = `
            <h3>${api.name}</h3>
            <p><strong>Endpoint:</strong> 
                <span title="${api.endpoint}">${shortEndpoint}</span>
            </p>
            <p><strong>Type:</strong> ${api.type}</p>
            <div class="item-actions">
                <button onclick="app.tryApi('${api.endpoint}', '${api.type}')" class="pixel-button">Try it</button>
                <button onclick="app.copyToClipboard('${api.endpoint}')" class="pixel-button">Copy Endpoint</button>
                ${app.isLoggedIn ? `
                    <button onclick="app.editItem('apis', ${index})" class="pixel-button edit-btn">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="app.deleteItem('apis', ${index})" class="pixel-button delete-btn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
},

renderScriptItems: function() {
    const container = document.getElementById('scriptItems');
    container.innerHTML = '';
    
    this.data.scripts.forEach((script, index) => {
        const card = document.createElement('div');
        card.className = 'item-card pixel-box';
        card.innerHTML = `
            <h3>${script.name}</h3>
            <p><strong>Link:</strong> ${script.link}</p>
            <div class="item-actions">
                <button onclick="window.open('${script.link}', '_blank')" class="pixel-button">Go to Link</button>
                <button onclick="app.copyToClipboard('${script.link}')" class="pixel-button">Copy Link</button>
                ${this.isLoggedIn ? `
                    <button onclick="app.editItem('scripts', ${index})" class="pixel-button edit-btn">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="app.deleteItem('scripts', ${index})" class="pixel-button delete-btn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
},

showWelcomeAlert: function() {
    // Buat elemen secara dinamis jika tidak ada
    if (!document.getElementById('welcomeOverlay')) {
        const welcomeHTML = `
        <div id="welcomeOverlay" class="welcome-overlay">
          <div id="welcomeAlert" class="pixel-welcome-alert">
            <span class="pixel-close" onclick="app.closeWelcomeAlert()">&times;</span>
            <h3>Welcome to YoedzX-Codez</h3>
            <p>Jangan lupa follow channel informasi update</p>
            <a href="https://whatsapp.com/channel/0029Vb0v3F71yT264EejzJ3e" target="_blank" class="pixel-button whatsapp-btn">
              <i class="fab fa-whatsapp"></i> Follow
            </a>
          </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', welcomeHTML);
    }
    document.getElementById('welcomeOverlay').style.display = 'block';
},

closeWelcomeAlert: function() {
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
},

renderCodeItems: function() {
    const container = document.getElementById('codeItems');
    container.innerHTML = '';

    // Filter codes berdasarkan kategori yang dipilih
    const filteredCodes = this.data.codes.filter(code => {
        return this.currentCodeFilter.includes(code.category);
    });

    filteredCodes.forEach((code, index) => {
        const card = document.createElement('div');
        card.className = 'item-card pixel-box';

        const codeContent = document.createElement('div');
        codeContent.className = 'code-container';
        codeContent.innerHTML = `<pre><code>${this.escapeHtml(code.code)}</code></pre>`;

        const copyButton = document.createElement('button');
        copyButton.className = 'pixel-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
        copyButton.addEventListener('click', () => {
            this.copyToClipboard(code.code);
        });

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'item-actions';
        actionsDiv.appendChild(copyButton);

        if (this.isLoggedIn) {
            const editButton = document.createElement('button');
            editButton.className = 'pixel-button edit-btn';
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editButton.addEventListener('click', () => this.editItem('codes', index));
            actionsDiv.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'pixel-button delete-btn';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
            deleteButton.addEventListener('click', () => this.deleteItem('codes', index));
            actionsDiv.appendChild(deleteButton);
        }

        const title = document.createElement('div');
        title.className = 'item-title';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = code.name || 'Untitled';
        title.appendChild(nameSpan);

        if (code.category) {
            const tag = document.createElement('span');
            tag.className = 'item-category';
            tag.textContent = `</${code.category}>`;
            title.appendChild(tag);
        }

        card.appendChild(title);
        card.appendChild(codeContent);
        card.appendChild(actionsDiv);

        container.appendChild(card);
    });
},

editItem: function(type, index) {
    if (!this.isLoggedIn) {
        this.showAlert('You must be logged in to edit items');
        return;
    }

    const item = this.data[type][index];
    
    // Create edit modal
    const editModal = document.createElement('div');
    editModal.id = 'editModal';
    editModal.className = 'pixel-modal';
    editModal.innerHTML = `
        <div class="pixel-modal-content">
            <span class="pixel-close" onclick="app.closeEditModal()">&times;</span>
            <h2>Edit ${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <form id="editForm" class="pixel-form">
                <input type="hidden" id="editItemType" value="${type}">
                <input type="hidden" id="editItemIndex" value="${index}">
                
                <div class="pixel-form-group">
                    <label for="editItemName">Name:</label>
                    <input type="text" id="editItemName" class="pixel-input" value="${this.escapeHtml(item.name)}" required>
                </div>
                
                ${type === 'apis' ? `
                    <div class="pixel-form-group">
                        <label for="editItemEndpoint">Endpoint:</label>
                        <input type="text" id="editItemEndpoint" class="pixel-input" value="${this.escapeHtml(item.endpoint)}" required>
                    </div>
                    <div class="pixel-form-group">
                        <label for="editItemApiType">Type:</label>
                        <select id="editItemApiType" class="pixel-input">
                            <option value="json" ${item.type === 'json' ? 'selected' : ''}>JSON</option>
                            <option value="media" ${item.type === 'media' ? 'selected' : ''}>Media</option>
                        </select>
                    </div>
                ` : ''}
                
                ${type === 'scripts' ? `
                    <div class="pixel-form-group">
                        <label for="editItemLink">Link:</label>
                        <input type="text" id="editItemLink" class="pixel-input" value="${this.escapeHtml(item.link)}" required>
                    </div>
                ` : ''}
                
                ${type === 'codes' ? `
                    <div class="pixel-form-group">
                        <label for="editItemCode">Code:</label>
                        <textarea id="editItemCode" class="pixel-input" rows="6" required>${this.escapeHtml(item.code)}</textarea>
                    </div>
                ` : ''}
                
                <div class="pixel-form-actions">
                    <button type="button" onclick="app.saveEditedItem()" class="pixel-button">Save Changes</button>
                    <button type="button" onclick="app.closeEditModal()" class="pixel-button cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editModal);
    editModal.style.display = 'block';
},

closeEditModal: function() {
    const editModal = document.getElementById('editModal');
    if (editModal) {
        editModal.remove();
    }
},

async saveEditedItem() {
    const type = document.getElementById('editItemType').value;
    const index = parseInt(document.getElementById('editItemIndex').value);
    const name = document.getElementById('editItemName').value.trim();
    
    if (!name) {
        this.showAlert('Please enter a name');
        return;
    }
    
    let updatedItem;
    
    if (type === 'apis') {
        const endpoint = document.getElementById('editItemEndpoint').value.trim();
        const apiType = document.getElementById('editItemApiType').value;
        
        if (!endpoint) {
            this.showAlert('Please enter an endpoint');
            return;
        }
        
        updatedItem = {
            name,
            endpoint,
            type: apiType
        };
    } else if (type === 'scripts') {
        const link = document.getElementById('editItemLink').value.trim();
        
        if (!link) {
            this.showAlert('Please enter a link');
            return;
        }
        
        updatedItem = {
            name,
            link
        };
    } else if (type === 'codes') {
    const code = document.getElementById('itemCode').value.trim();
    const category = document.getElementById('itemCodeCategory').value;

    if (!code) {
        this.showAlert('Please enter code');
        return;
    }

    newItem = {
        name,
        code,
        category
    };
}
    
    try {
        this.data[type][index] = updatedItem;
        await this.saveData();
        this.renderData();
        this.closeEditModal();
        this.showAlert('Item updated successfully!');
    } catch (error) {
        this.showAlert('Failed to update item: ' + error.message);
    }
},

    async tryApi(endpoint, type) {
    if (type === 'json') {
        const modal = document.getElementById('outputModal');
        const output = document.getElementById('apiOutput');
        
        output.innerHTML = '<div class="loading-spinner"></div><p>Loading...</p>';
        modal.style.display = 'block';

        try {
            if (!endpoint.startsWith('http')) {
                throw new Error('Invalid URL - must start with http:// or https://');
            }

            const response = await fetch(endpoint, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();
            const formattedJson = JSON.stringify(jsonData, null, 2);
            
            // Buat elemen secara terpisah untuk menghindari masalah escaping
            output.innerHTML = `
                <div class="endpoint-display">
                    <h4>Endpoint:</h4>
                    <div class="endpoint-container">
                        <code>${endpoint}</code>
                        <button onclick="app.copyToClipboard('${endpoint.replace(/'/g, "\\'")}')" class="pixel-button small">
                            <i class="fas fa-copy"></i> Copy URL
                        </button>
                    </div>
                </div>
                <div class="response-header">
                    <h4>JSON Response</h4>
                    <button id="copyJsonBtn" class="pixel-button small">
                        <i class="fas fa-copy"></i> Copy JSON
                    </button>
                </div>
                <pre id="jsonContent">${formattedJson}</pre>
            `;

            // Tambahkan event listener setelah elemen dibuat
            document.getElementById('copyJsonBtn').addEventListener('click', () => {
                app.copyToClipboard(formattedJson);
            });

        } catch (error) {
            output.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Error</h4>
                    <p>${error.message}</p>
                </div>
            `;
        }
    } else {
        window.open(endpoint, '_blank');
    }
},

    closeModal: function() {
        document.getElementById('outputModal').style.display = 'none';
    },

    showAddForm: function(type = null) {
        document.getElementById('addForm').style.display = 'block';
        document.getElementById('itemName').value = '';
        document.getElementById('itemEndpoint').value = '';
        document.getElementById('itemScriptLink').value = '';
        document.getElementById('itemCode').value = '';
        document.getElementById('itemMusicUrl').value = '';
        
        if (type) {
            document.getElementById('itemType').value = type;
        } else {
            document.getElementById('itemType').value = 'apis';
        }
        
        // Trigger change event to show correct fields
        const event = new Event('change');
        document.getElementById('itemType').dispatchEvent(event);
    },

    hideAddForm: function() {
        document.getElementById('addForm').style.display = 'none';
    },

    async addItem() {
        const type = document.getElementById('itemType').value;
        
        if (type === 'music') {
            const musicUrl = document.getElementById('itemMusicUrl').value.trim();
            
            if (!musicUrl) {
                this.showAlert('Please enter a music URL');
                return;
            }
            
            if (!musicUrl.startsWith('http://') && !musicUrl.startsWith('https://')) {
                this.showAlert('Please enter a valid URL starting with http:// or https://');
                return;
            }
            
            if (!musicUrl.toLowerCase().endsWith('.mp3')) {
                this.showAlert('Warning: The URL might not be an MP3 file');
            }
            
            this.data.music = musicUrl;
            await this.saveData();
            this.showAlert('Custom music saved!');
            this.hideAddForm();
            
            // Update the player
            const music = document.getElementById('bgMusic');
            const source = music.querySelector('source') || document.createElement('source');
            source.src = musicUrl;
            source.type = 'audio/mpeg';
            if (!music.contains(source)) {
                music.appendChild(source);
            }
            music.load();
            return;
        }
        
        const name = document.getElementById('itemName').value.trim();
        
        if (!name) {
            this.showAlert('Please enter a name');
            return;
        }
        
        let newItem;
        
        if (type === 'apis') {
            const endpoint = document.getElementById('itemEndpoint').value.trim();
            const apiType = document.getElementById('itemApiType').value;
            
            if (!endpoint) {
                this.showAlert('Please enter an endpoint');
                return;
            }
            
            newItem = {
                name,
                endpoint,
                type: apiType
            };
        } else if (type === 'scripts') {
            const link = document.getElementById('itemScriptLink').value.trim();
            
            if (!link) {
                this.showAlert('Please enter a link');
                return;
            }
            
            newItem = {
                name,
                link
            };
        } else if (type === 'codes') {
    const code = document.getElementById('itemCode').value.trim();
    const category = document.getElementById('itemCodeCategory').value.trim();

    if (!code) {
        this.showAlert('Please enter code');
        return;
    }

    newItem = {
        name,
        code,
        category // <-- kita tambahkan properti category di sini
    };
}
        
        try {
            this.data[type].push(newItem);
            await this.saveData();
            this.renderData();
            this.hideAddForm();
            this.showAlert('Item added successfully!');
        } catch (error) {
            this.showAlert('Failed to add item: ' + error.message);
        }
    },
   editItem: function(type, index) {
    if (!this.isLoggedIn) {
        this.showAlert('You must be logged in to edit items');
        return;
    }

    const item = this.data[type][index];
    this.showEditForm(type, item, index);
},

showEditForm: function(type, item, index) {
    if (!this.isLoggedIn) {
        this.showAlert('You must be logged in to edit items.');
        return;
    }
    // Create or show edit modal
    let editModal = document.getElementById('editModal');
    if (!editModal) {
        editModal = document.createElement('div');
        editModal.id = 'editModal';
        editModal.className = 'pixel-modal';
        editModal.innerHTML = `
            <div class="pixel-modal-content">
                <span class="pixel-close" onclick="app.closeEditModal()">&times;</span>
                <h2>Edit ${type === 'apis' ? 'API' : type === 'scripts' ? 'Script' : 'Code'}</h2>
                <form id="editForm" class="pixel-form">
                    <input type="hidden" id="editItemType" value="${type}">
                    <input type="hidden" id="editItemIndex" value="${index}">
                    
                    <div class="pixel-form-group">
                        <label for="editItemName">Name:</label>
                        <input type="text" id="editItemName" class="pixel-input" value="${this.escapeHtml(item.name)}" required>
                    </div>
                    
                    ${type === 'apis' ? `
                        <div class="pixel-form-group">
                            <label for="editItemEndpoint">Endpoint:</label>
                            <input type="text" id="editItemEndpoint" class="pixel-input" value="${this.escapeHtml(item.endpoint)}" required>
                        </div>
                        <div class="pixel-form-group">
                            <label for="editItemApiType">Type:</label>
                            <select id="editItemApiType" class="pixel-input">
                                <option value="json" ${item.type === 'json' ? 'selected' : ''}>JSON</option>
                                <option value="media" ${item.type === 'media' ? 'selected' : ''}>Media</option>
                            </select>
                        </div>
                    ` : ''}
                    
                    ${type === 'scripts' ? `
                        <div class="pixel-form-group">
                            <label for="editItemLink">Link:</label>
                            <input type="text" id="editItemLink" class="pixel-input" value="${this.escapeHtml(item.link)}" required>
                        </div>
                    ` : ''}
                    
                    ${type === 'codes' ? `
                        <div class="pixel-form-group">
                            <label for="editItemCode">Code:</label>
                            <textarea id="editItemCode" class="pixel-input" rows="6" required>${this.escapeHtml(item.code)}</textarea>
                        </div>
                    ` : ''}
                    
                    <div class="pixel-form-actions">
                        <button type="button" onclick="app.saveEditedItem()" class="pixel-button">Save Changes</button>
                        <button type="button" onclick="app.closeEditModal()" class="pixel-button cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(editModal);
    } else {
        // Update existing modal content
        document.getElementById('editItemType').value = type;
        document.getElementById('editItemIndex').value = index;
        document.getElementById('editItemName').value = item.name;
        
        if (type === 'apis') {
            document.getElementById('editItemEndpoint').value = item.endpoint;
            document.getElementById('editItemApiType').value = item.type;
        } else if (type === 'scripts') {
            document.getElementById('editItemLink').value = item.link;
        } else if (type === 'codes') {
            document.getElementById('editItemCode').value = item.code;
        }
    }
    
    editModal.style.display = 'block';
},

closeEditModal: function() {
    const editModal = document.getElementById('editModal');
    if (editModal) {
        editModal.style.display = 'none';
    }
},

async saveEditedItem() {
    const type = document.getElementById('editItemType').value;
    const index = parseInt(document.getElementById('editItemIndex').value);
    const name = document.getElementById('editItemName').value.trim();
    
    if (!name) {
        this.showAlert('Please enter a name');
        return;
    }
    
    let updatedItem;
    
    if (type === 'apis') {
        const endpoint = document.getElementById('editItemEndpoint').value.trim();
        const apiType = document.getElementById('editItemApiType').value;
        
        if (!endpoint) {
            this.showAlert('Please enter an endpoint');
            return;
        }
        
        updatedItem = {
            name,
            endpoint,
            type: apiType
        };
    } else if (type === 'scripts') {
        const link = document.getElementById('editItemLink').value.trim();
        
        if (!link) {
            this.showAlert('Please enter a link');
            return;
        }
        
        updatedItem = {
            name,
            link
        };
    } else if (type === 'codes') {
        const code = document.getElementById('editItemCode').value.trim();
        
        if (!code) {
            this.showAlert('Please enter code');
            return;
        }
        
        updatedItem = {
            name,
            code
        };
    }
    
    try {
        this.data[type][index] = updatedItem;
        await this.saveData();
        this.renderData();
        this.closeEditModal();
        this.showAlert('Item updated successfully!');
    } catch (error) {
        this.showAlert('Failed to update item: ' + error.message);
    }
},

    async deleteItem(type, index) {
    const confirmed = await this.confirmAlert('Are you sure you want to delete this item?');
    if (!confirmed) return;

    try {
        this.data[type].splice(index, 1);
        await this.saveData();
        this.renderData();
        this.showAlert('Item deleted successfully!');
    } catch (error) {
        this.showAlert('Failed to delete item: ' + error.message);
    }
},

    async saveData() {
        if (!this.isLoggedIn) {
            throw new Error('You must be logged in to make changes');
        }
        
        try {
            const getResponse = await fetch(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.REPO}/contents/${this.FILE_PATH}`, {
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (!getResponse.ok) {
                throw new Error('Failed to fetch current file data');
            }
            
            const fileData = await getResponse.json();
            const sha = fileData.sha;
            const content = JSON.stringify(this.data, null, 2);
            const encodedContent = btoa(unescape(encodeURIComponent(content)));
            
            const updateResponse = await fetch(`https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.REPO}/contents/${this.FILE_PATH}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update data.json',
                    content: encodedContent,
                    sha: sha
                })
            });
            
            if (!updateResponse.ok) {
                throw new Error('Failed to update file');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    escapeHtml: function(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    escapeJsString: function(str) {
        return str
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    },
    
       // Fungsi untuk menampilkan/menghilangkan form login
    toggleLoginForm: function() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';  // Tampilkan form login
        } else {
            loginForm.style.display = 'none';   // Sembunyikan form login
        }
    },
    // Start the application
    start: function() {
        document.addEventListener('DOMContentLoaded', () => this.init());
    }
};

// Initialize the app
app.start();