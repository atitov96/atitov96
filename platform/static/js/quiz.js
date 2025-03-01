let currentQuiz = null;
let userAnswers = {};

async function startQuiz(quizId) {
    try {
        const response = await fetch(`/api/quizzes/${quizId}`);
        currentQuiz = await response.json();

        document.getElementById('quiz-title').textContent = currentQuiz.title;
        renderQuizQuestions();
        showPage('quiz-page');
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка загрузки теста');
    }
}

function renderQuizQuestions() {
    const questionsContainer = document.getElementById('quiz-questions');
    questionsContainer.innerHTML = currentQuiz.questions.map((question, index) => `
        <div class="quiz-question">
            <h3>Вопрос ${index + 1}</h3>
            <p>${question.text}</p>
            <div class="quiz-options">
                ${question.options.map((option, optIndex) => `
                    <div class="quiz-option" data-question="${question.id}" data-answer="${optIndex}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    questionsContainer.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', handleOptionSelect);
    });
}

function handleOptionSelect(e) {
    const option = e.target;
    const questionId = option.dataset.question;
    const answer = parseInt(option.dataset.answer);

    option.closest('.quiz-options').querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    option.classList.add('selected');
    userAnswers[questionId] = answer;
}

document.getElementById('back-to-quizzes').addEventListener('click', () => {
    showPage('quizzes');
    currentQuiz = null;
    userAnswers = {};
});

document.getElementById('submit-quiz').addEventListener('click', async () => {
    if (Object.keys(userAnswers).length < currentQuiz.questions.length) {
        alert('Пожалуйста, ответьте на все вопросы');
        return;
    }

    try {
        const response = await fetch(`/api/quizzes/${currentQuiz.id}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userAnswers)
        });

        const result = await response.json();
        
        const resultContent = document.getElementById('quiz-result-content');
        resultContent.innerHTML = `
            <div class="quiz-score">
                <h4>Ваш результат:</h4>
                <p class="score">${result.percentage.toFixed(1)}%</p>
                <p>Правильных ответов: ${result.correct} из ${result.total}</p>
            </div>
        `;

        document.getElementById('quiz-results').classList.remove('hidden');
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка отправки ответов');
    }
}); 