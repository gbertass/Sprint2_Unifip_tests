# Automacao_Playwright_UNIFIP

This project was developed as part of the **Mestre QA Bootcamp**, during a sprint focused on introducing test automation using the **Playwright** framework, focused on best practices and applied the knowledge learned during the course.

The main goal was to apply automated UI testing on a real application: the academic platform of **UNIFIP**, a university in Brazil. The application was already available to end users.

- User authentication (login)
- Navigation between system pages
- Verification of essential UI elements
- Button and link interactions

## Technologies Used

- [Playwright](https://playwright.dev/) – End-to-end test automation framework  
- [Node.js](https://nodejs.org/) – JavaScript runtime environment

---

## 🛠️ How to use:

### 1. Prerequisites

a. Make sure you have **Node.js** installed on your machine;  
b. Install **Playwright** (if not already installed):

```bash
npm init playwright@latest
```

### 2. Steps
a.Clone the repository:

```
git clone https://github.com/your_username/Automacao_Playwright_UNIFIP
```

b.Navigate to the project directory:
```
cd Automacao_Playwright_UNIFIP
```

c. Install dependencies:
```
npm install
```

d. Run the tests:
```
npx playwright test
```

- You can also run the tests with the Playwright interactive UI:
```
npx playwright test --ui
```
