let currentUser = null;
let currentPage = 'home';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAuth();
    loadUserData();
});

function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('.nav-link').dataset.page;
            showPage(page);
        });
    });

    document.getElementById('start-challenges').addEventListener('click', () => {
        showPage('code-challenges');
    });

    document.getElementById('start-quizzes').addEventListener('click', () => {
        showPage('quizzes');
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    currentPage = pageId;

    switch(pageId) {
        case 'code-challenges':
            loadChallenges();
            break;
        case 'quizzes':
            loadQuizzes();
            break;
        case 'profile':
            loadProfile();
            break;
    }
}

function initAuth() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    registerBtn.addEventListener('click', () => {
        registerModal.classList.add('active');
    });

    logoutBtn.addEventListener('click', logout);

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            currentUser = data;
            updateAuthUI();
            document.getElementById('login-modal').classList.remove('active');
        } else {
            alert('Ошибка входа');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка сервера');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

    if (password !== passwordConfirm) {
        alert('Пароли не совпадают');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            const data = await response.json();
            currentUser = data;
            updateAuthUI();
            document.getElementById('register-modal').classList.remove('active');
        } else {
            alert('Ошибка регистрации');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка сервера');
    }
}

function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');

    if (currentUser) {
        loginBtn.classList.add('hidden');
        registerBtn.classList.add('hidden');
        userInfo.classList.remove('hidden');
        usernameDisplay.textContent = currentUser.username;
    } else {
        loginBtn.classList.remove('hidden');
        registerBtn.classList.remove('hidden');
        userInfo.classList.add('hidden');
    }
}

async function logout() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        currentUser = null;
        updateAuthUI();
        showPage('home');
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function loadChallenges() {
    const challengeList = document.getElementById('challenge-list');
    challengeList.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><span>Загрузка задач...</span></div>';

    try {
        const response = await fetch('/api/challenges');
        const challenges = await response.json();

        challengeList.innerHTML = challenges.map(challenge => `
            <div class="challenge-card">
                <h3>${challenge.title}</h3>
                <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                <p>${challenge.description}</p>
                <button class="btn btn-primary start-challenge" data-id="${challenge.id}">Начать</button>
            </div>
        `).join('');

        challengeList.querySelectorAll('.start-challenge').forEach(btn => {
            btn.addEventListener('click', () => startChallenge(btn.dataset.id));
        });
    } catch (error) {
        console.error('Ошибка:', error);
        challengeList.innerHTML = '<p class="error">Ошибка загрузки задач</p>';
    }
}

async function loadQuizzes() {
    const quizList = document.getElementById('quiz-list');
    quizList.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><span>Загрузка тестов...</span></div>';

    try {
        const response = await fetch('/api/quizzes');
        const quizzes = await response.json();

        quizList.innerHTML = quizzes.map(quiz => `
            <div class="quiz-card">
                <h3>${quiz.title}</h3>
                <button class="btn btn-primary start-quiz" data-id="${quiz.id}">Начать тест</button>
            </div>
        `).join('');

        quizList.querySelectorAll('.start-quiz').forEach(btn => {
            btn.addEventListener('click', () => startQuiz(btn.dataset.id));
        });
    } catch (error) {
        console.error('Ошибка:', error);
        quizList.innerHTML = '<p class="error">Ошибка загрузки тестов</p>';
    }
}

async function loadProfile() {
    if (!currentUser) {
        document.getElementById('profile-content').classList.add('hidden');
        document.getElementById('login-required').classList.remove('hidden');
        return;
    }

    document.getElementById('profile-content').classList.remove('hidden');
    document.getElementById('login-required').classList.add('hidden');

    try {
        const response = await fetch('/api/user/progress');
        const progress = await response.json();
        updateProfileUI(progress);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function updateProfileUI(progress) {
    document.getElementById('profile-username').textContent = currentUser.username;
    document.getElementById('profile-email').textContent = currentUser.email;

    const challengesTotal = Object.keys(progress.completedChallenges).length;
    const quizzesTotal = Object.keys(progress.completedQuizzes).length;

    document.getElementById('challenges-progress').textContent = `${challengesTotal} выполнено`;
    document.getElementById('quizzes-progress').textContent = `${quizzesTotal} выполнено`;

    updateCompletedLists(progress);
}

function updateCompletedLists(progress) {
    const challengesList = document.getElementById('completed-challenges-list');
    const quizzesList = document.getElementById('completed-quizzes-list');

    challengesList.innerHTML = Object.entries(progress.completedChallenges)
        .map(([id, data]) => `
            <li>
                <span class="item-title">Задача ${id}</span>
                <span class="item-date">${new Date(data.completedAt).toLocaleDateString()}</span>
                <span class="item-score">${data.score}%</span>
            </li>
        `).join('');

    quizzesList.innerHTML = Object.entries(progress.completedQuizzes)
        .map(([id, data]) => `
            <li>
                <span class="item-title">Тест ${id}</span>
                <span class="item-date">${new Date(data.completedAt).toLocaleDateString()}</span>
                <span class="item-score">${data.score}%</span>
            </li>
        `).join('');
}

async function loadUserData() {
    try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
            currentUser = await response.json();
            updateAuthUI();
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
