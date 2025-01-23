# The HoroscopeCode 🌌

This project is my response to a task assigned by **Adéo**. It is a lightweight and secure horoscope application built with **Node.js** and the **Express** framework. The app provides the zodiac sign corresponding to a given birthdate, leveraging the **horoscope** library.

Additionally, the project follows best practices to ensure modularity, scalability, and maintainability. A Dockerfile is included for easy containerization, and GitHub Actions are set up to automate the Docker image build process.

---

## Features ✨

- **Query Zodiac Signs**: Input a birthdate (YYYY-MM-DD) to get the corresponding zodiac sign.
- **Security**: Implemented `helmet` for HTTP headers, `rateLimit` for rate limiting, `hpp` for HTTP parameter pollution and `expressSanitizer` to sanitize inputs .
- **Containerization**: Dockerized for seamless deployment.
- **Automated CI**: GitHub Actions workflow to build and push the Docker image.

---

## Getting Started 🚀

### Prerequisites

1. **Node.js** (v18 or higher)  
   Install Node.js from the [official website](https://nodejs.org/).
2. **Docker**  
   Install Docker from the [official website](https://www.docker.com/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MohamedSeifMbarki/HoroscopeCode.git
   cd HoroscopeCode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Scripts 📜

Here are the available scripts for this project:

- **Start the Development Server**:

  ```bash
  npm run start:dev
  ```

  Runs the server on `http://localhost:7005`.

- **Run Tests**:

  ```bash
  npm test
  ```

  Executes the test suite to ensure the app works as expected.

## API Endpoints 🌐

### **GET** `/horoscope`

#### Query Parameters:

| Parameter   | Type   | Required | Description                           |
| ----------- | ------ | -------- | ------------------------------------- |
| `birthdate` | String | Yes      | The birthdate in `YYYY-MM-DD` format. |

#### Response:

- **Success**:
  ```json
  {
    "sign": "Cancer",
    "zodiac": "Dog"
  }
  ```
- **Error**:
  ```json
  {
    "error": "Birthdate is required (format: YYYY-MM-DD)"
  }
  ```

---

## Docker 🐳

### Build Docker Image

```bash
docker build -t horoscope .
```

### Run the Container

```bash
docker run -p 7005:7005 horoscope
```

The app will be available at `http://localhost:7005`.

---

## GitHub Actions ⚙️

The project includes a **GitHub Actions** workflow (`.github/workflows/docker-build.yml`) that automates the Docker image build and push process.

### Workflow Details:

1. Triggers on pushes to the `main` branch.
2. Builds the Docker image using the `Dockerfile`.
3. Pushes the image to Docker Hub.

To use this workflow, configure the following repository secrets:

- `DOCKER_USERNAME`: Docker Hub username.
- `DOCKER_PASSWORD`: Docker Hub password.

---

## Tests 🧬

The application includes comprehensive tests using **Jest** and **Supertest**. Tests validate the API responses for various scenarios (valid dates, invalid dates, and missing query parameters).

Run the test suite:

```bash
npm test
```

---

## Feedback 🙌

If you have suggestions or improvements for this project, feel free to open an issue or submit a pull request.

Thank you, **Adéo**, for this exciting task and opportunity!
