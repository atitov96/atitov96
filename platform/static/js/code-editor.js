let currentChallenge = null;
let editor = null;

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        language: 'go',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
            enabled: false
        },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: 'line',
        tabSize: 4,
        insertSpaces: true,
        wordWrap: 'on'
    });
});

async function startChallenge(challengeId) {
    try {
        const response = await fetch(`/api/challenges/${challengeId}`);
        currentChallenge = await response.json();

        document.getElementById('challenge-title').textContent = currentChallenge.title;
        document.getElementById('challenge-description').innerHTML = `
            <h3>Описание</h3>
            <p>${currentChallenge.description}</p>
        `;
        
        if (editor) {
            editor.setValue(currentChallenge.template);
        }
        
        showPage('code-editor');
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка загрузки задачи');
    }
}

document.getElementById('back-to-challenges').addEventListener('click', () => {
    showPage('code-challenges');
});

document.getElementById('run-code').addEventListener('click', async () => {
    if (!currentUser) {
        alert('Пожалуйста, войдите в систему для отправки решения');
        return;
    }

    const code = editor ? editor.getValue() : '';
    const resultContent = document.getElementById('result-content');
    const results = document.getElementById('results');

    results.classList.remove('hidden');
    resultContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><span>Проверка решения...</span></div>';

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                testId: currentChallenge.id,
                userId: currentUser.id
            })
        });

        const result = await response.json();
        
        if (result.success) {
            resultContent.innerHTML = `
                <div class="result-success">
                    <i class="fas fa-check-circle"></i> Все тесты пройдены!
                </div>
                <div class="result-details">
                    <p>Пройдено тестов: ${result.testsPassed}/${result.totalTests}</p>
                    <pre class="output">${result.output}</pre>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-error">
                    <i class="fas fa-times-circle"></i> Есть ошибки
                </div>
                <div class="result-details">
                    <p>Пройдено тестов: ${result.testsPassed}/${result.totalTests}</p>
                    <pre class="error-output">${result.errorMessage}</pre>
                    ${result.details ? `<pre class="test-details">${result.details.join('\n')}</pre>` : ''}
                </div>
            `;
        }
    } catch (error) {
        console.error('Ошибка:', error);
        resultContent.innerHTML = '<p class="error">Ошибка отправки решения</p>';
    }
}); 