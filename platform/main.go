package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

type CodeSubmission struct {
	Code   string `json:"code"`
	TestID string `json:"testId"`
	UserID string `json:"userId"`
}

type TestResult struct {
	Success      bool     `json:"success"`
	Output       string   `json:"output"`
	ErrorMessage string   `json:"errorMessage,omitempty"`
	TestsPassed  int      `json:"testsPassed"`
	TotalTests   int      `json:"totalTests"`
	Details      []string `json:"details,omitempty"`
}

type Quiz struct {
	ID        string     `json:"id"`
	Title     string     `json:"title"`
	Questions []Question `json:"questions"`
}

type Question struct {
	ID      string   `json:"id"`
	Text    string   `json:"text"`
	Options []string `json:"options"`
	Answer  int      `json:"answer"`
}

type Challenge struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Difficulty  string `json:"difficulty"`
	Template    string `json:"template"`
}

type User struct {
	ID           string                 `json:"id"`
	Username     string                 `json:"username"`
	Email        string                 `json:"email"`
	PasswordHash string                 `json:"-"`
	Progress     map[string]interface{} `json:"progress"`
	CreatedAt    time.Time              `json:"createdAt"`
}

type UserProgress struct {
	CompletedChallenges map[string]ChallengeProgress `json:"completedChallenges"`
	CompletedQuizzes    map[string]QuizProgress      `json:"completedQuizzes"`
	LastActive          time.Time                    `json:"lastActive"`
}

type ChallengeProgress struct {
	CompletedAt time.Time `json:"completedAt"`
	Score       int       `json:"score"`
	Code        string    `json:"code"`
}

type QuizProgress struct {
	CompletedAt time.Time      `json:"completedAt"`
	Score       float64        `json:"score"`
	Answers     map[string]int `json:"answers"`
}

var (
	store        = sessions.NewCookieStore([]byte("go-learning-platform-secret-key"))
	userProgress = make(map[string]UserProgress)
)

func main() {
	r := mux.NewRouter()

	fs := http.FileServer(http.Dir("./static"))
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", fs))

	r.HandleFunc("/api/challenges", getChallenges).Methods("GET")
	r.HandleFunc("/api/challenges/{id}", getChallenge).Methods("GET")
	r.HandleFunc("/api/submit", handleCodeSubmission).Methods("POST")

	r.HandleFunc("/api/quizzes", getQuizzes).Methods("GET")
	r.HandleFunc("/api/quizzes/{id}", getQuiz).Methods("GET")
	r.HandleFunc("/api/quizzes/{id}/submit", submitQuizAnswers).Methods("POST")

	r.HandleFunc("/api/register", registerUser).Methods("POST")
	r.HandleFunc("/api/login", loginUser).Methods("POST")
	r.HandleFunc("/api/logout", logoutUser).Methods("POST")
	r.HandleFunc("/api/user/progress", getUserProgress).Methods("GET")
	r.HandleFunc("/api/user/profile", getUserProfile).Methods("GET")

	r.HandleFunc("/", serveIndex)

	ensureDirectories()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Сервер запущен на порту %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

func ensureDirectories() {
	dirs := []string{"./tests", "./quizzes", "./challenges", "./users"}
	for _, dir := range dirs {
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			os.MkdirAll(dir, 0755)
		}
	}
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/index.html")
}

func getChallenges(w http.ResponseWriter, r *http.Request) {
	files, err := ioutil.ReadDir("./challenges")
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	var challenges []Challenge
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".json") {
			data, err := ioutil.ReadFile(filepath.Join("./challenges", file.Name()))
			if err != nil {
				continue
			}

			var challenge Challenge
			if err := json.Unmarshal(data, &challenge); err != nil {
				continue
			}

			challenge.Template = ""
			challenges = append(challenges, challenge)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(challenges)
}

func getChallenge(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	challengePath := filepath.Join("./challenges", id+".json")
	if _, err := os.Stat(challengePath); os.IsNotExist(err) {
		http.Error(w, "Задача не найдена", http.StatusNotFound)
		return
	}

	data, err := ioutil.ReadFile(challengePath)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func handleCodeSubmission(w http.ResponseWriter, r *http.Request) {
	var submission CodeSubmission
	if err := json.NewDecoder(r.Body).Decode(&submission); err != nil {
		http.Error(w, "Неверный формат запроса", http.StatusBadRequest)
		return
	}

	tmpDir, err := ioutil.TempDir("", "gotest")
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}
	defer os.RemoveAll(tmpDir)

	cmd := exec.Command("go", "mod", "init", "solution")
	cmd.Dir = tmpDir
	if err := cmd.Run(); err != nil {
		http.Error(w, "Ошибка инициализации модуля", http.StatusInternalServerError)
		return
	}

	solutionPath := filepath.Join(tmpDir, "solution.go")
	if err := ioutil.WriteFile(solutionPath, []byte(submission.Code), 0644); err != nil {
		http.Error(w, "Ошибка сохранения решения", http.StatusInternalServerError)
		return
	}

	testPath := filepath.Join("tests", submission.TestID+".go")
	testContent, err := ioutil.ReadFile(testPath)
	if err != nil {
		http.Error(w, "Тест не найден", http.StatusNotFound)
		return
	}

	tmpTestPath := filepath.Join(tmpDir, "solution_test.go")
	if err := ioutil.WriteFile(tmpTestPath, testContent, 0644); err != nil {
		http.Error(w, "Ошибка подготовки теста", http.StatusInternalServerError)
		return
	}

	cmd = exec.Command("go", "test", "-v")
	cmd.Dir = tmpDir
	output, err := cmd.CombinedOutput()

	result := TestResult{
		Output:      string(output),
		TestsPassed: 0,
		TotalTests:  0,
	}

	if err != nil {
		result.Success = false
		if strings.Contains(string(output), "undefined") {
			result.ErrorMessage = "Функция не найдена или содержит ошибки"
		} else if strings.Contains(string(output), "compilation failed") {
			result.ErrorMessage = "Ошибка компиляции"
		} else {
			result.ErrorMessage = "Тесты не пройдены"
		}
	} else {
		result.Success = true
	}

	lines := strings.Split(string(output), "\n")
	for _, line := range lines {
		if strings.Contains(line, "--- PASS") {
			result.TestsPassed++
		}
		if strings.Contains(line, "--- FAIL") {
			result.Details = append(result.Details, line)
		}
	}

	result.TotalTests = strings.Count(string(output), "--- ")
	if result.TotalTests == 0 {
		result.TotalTests = 1
	}

	if result.Success && submission.UserID != "" {
		updateUserProgress(submission.UserID, submission.TestID, result)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func getTestCode(testID string) (string, error) {
	testPath := filepath.Join("./tests", testID+".go")

	if _, err := os.Stat(testPath); os.IsNotExist(err) {
		return "", fmt.Errorf("тест не найден")
	}

	testCode, err := ioutil.ReadFile(testPath)
	if err != nil {
		return "", err
	}

	return string(testCode), nil
}

func getQuizzes(w http.ResponseWriter, r *http.Request) {
	files, err := ioutil.ReadDir("./quizzes")
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	var quizzes []map[string]string
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".json") {
			data, err := ioutil.ReadFile(filepath.Join("./quizzes", file.Name()))
			if err != nil {
				continue
			}

			var quiz Quiz
			if err := json.Unmarshal(data, &quiz); err != nil {
				continue
			}

			quizzes = append(quizzes, map[string]string{
				"id":    quiz.ID,
				"title": quiz.Title,
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quizzes)
}

func getQuiz(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	quizID := vars["id"]

	quizPath := filepath.Join("./quizzes", quizID+".json")

	if _, err := os.Stat(quizPath); os.IsNotExist(err) {
		http.Error(w, "Тест не найден", http.StatusNotFound)
		return
	}

	quizData, err := ioutil.ReadFile(quizPath)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	var quiz Quiz
	if err := json.Unmarshal(quizData, &quiz); err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	for i := range quiz.Questions {
		quiz.Questions[i].Answer = -1
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quiz)
}

func submitQuizAnswers(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	quizID := vars["id"]

	var answers map[string]int
	if err := json.NewDecoder(r.Body).Decode(&answers); err != nil {
		http.Error(w, "Неверный формат запроса", http.StatusBadRequest)
		return
	}

	quizPath := filepath.Join("./quizzes", quizID+".json")
	quizData, err := ioutil.ReadFile(quizPath)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	var quiz Quiz
	if err := json.Unmarshal(quizData, &quiz); err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	correct := 0
	total := len(quiz.Questions)

	for _, q := range quiz.Questions {
		if userAnswer, ok := answers[q.ID]; ok && userAnswer == q.Answer {
			correct++
		}
	}

	percentage := float64(correct) / float64(total) * 100

	session, _ := store.Get(r, "user-session")
	if userID, ok := session.Values["userID"].(string); ok {
		updateUserQuizProgress(userID, quizID, percentage, answers)
	}

	result := map[string]interface{}{
		"correct":    correct,
		"total":      total,
		"percentage": percentage,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func registerUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Неверный формат запроса", http.StatusBadRequest)
		return
	}

	user.ID = fmt.Sprintf("user_%d", time.Now().UnixNano())
	user.CreatedAt = time.Now()
	user.Progress = make(map[string]interface{})

	userData, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	userPath := filepath.Join("./users", user.ID+".json")
	if err := ioutil.WriteFile(userPath, userData, 0644); err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	progress := UserProgress{
		CompletedChallenges: make(map[string]ChallengeProgress),
		CompletedQuizzes:    make(map[string]QuizProgress),
		LastActive:          time.Now(),
	}
	userProgress[user.ID] = progress

	session, _ := store.Get(r, "user-session")
	session.Values["userID"] = user.ID
	session.Values["username"] = user.Username
	session.Save(r, w)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"id":       user.ID,
		"username": user.Username,
	})
}

func loginUser(w http.ResponseWriter, r *http.Request) {
	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		http.Error(w, "Неверный формат запроса", http.StatusBadRequest)
		return
	}

	userID := fmt.Sprintf("user_%d", time.Now().UnixNano())
	username := strings.Split(credentials.Email, "@")[0]

	session, _ := store.Get(r, "user-session")
	session.Values["userID"] = userID
	session.Values["username"] = username
	session.Save(r, w)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"id":       userID,
		"username": username,
	})
}

func logoutUser(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "user-session")
	session.Values = make(map[interface{}]interface{})
	session.Save(r, w)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func getUserProgress(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "user-session")
	userID, ok := session.Values["userID"].(string)
	if !ok {
		http.Error(w, "Пользователь не авторизован", http.StatusUnauthorized)
		return
	}

	progress, ok := userProgress[userID]
	if !ok {
		progress = UserProgress{
			CompletedChallenges: make(map[string]ChallengeProgress),
			CompletedQuizzes:    make(map[string]QuizProgress),
			LastActive:          time.Now(),
		}
		userProgress[userID] = progress
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(progress)
}

func getUserProfile(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "user-session")
	userID, ok := session.Values["userID"].(string)
	if !ok {
		http.Error(w, "Пользователь не авторизован", http.StatusUnauthorized)
		return
	}

	username, _ := session.Values["username"].(string)

	profile := map[string]interface{}{
		"id":       userID,
		"username": username,
		"progress": userProgress[userID],
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

func updateUserProgress(userID, challengeID string, result TestResult) {
	progress, ok := userProgress[userID]
	if !ok {
		progress = UserProgress{
			CompletedChallenges: make(map[string]ChallengeProgress),
			CompletedQuizzes:    make(map[string]QuizProgress),
			LastActive:          time.Now(),
		}
	}

	progress.CompletedChallenges[challengeID] = ChallengeProgress{
		CompletedAt: time.Now(),
		Score:       int(float64(result.TestsPassed) / float64(result.TotalTests) * 100),
		Code:        result.Output,
	}

	progress.LastActive = time.Now()
	userProgress[userID] = progress
}

func updateUserQuizProgress(userID, quizID string, score float64, answers map[string]int) {
	progress, ok := userProgress[userID]
	if !ok {
		progress = UserProgress{
			CompletedChallenges: make(map[string]ChallengeProgress),
			CompletedQuizzes:    make(map[string]QuizProgress),
			LastActive:          time.Now(),
		}
	}

	progress.CompletedQuizzes[quizID] = QuizProgress{
		CompletedAt: time.Now(),
		Score:       score,
		Answers:     answers,
	}

	progress.LastActive = time.Now()
	userProgress[userID] = progress
}
