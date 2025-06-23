class Header {
    constructor(containerId = 'header-container') {
        this.containerId = containerId;
    }

    async render() {
        const res = await fetch('/components/Header/Header.html');
        document.getElementById(this.containerId).innerHTML = await res.text();
        this.initEvents();
    }

    initEvents() {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user) {
            window.location.href = '/index.html';
            return;
        }
        document.getElementById('header-user-name').textContent = user.name;
        document.getElementById('header-logout-btn').onclick = function() {
            localStorage.removeItem('user');
            localStorage.removeItem('favorites');
            window.location.href = '/index.html';
        };
    }
} 