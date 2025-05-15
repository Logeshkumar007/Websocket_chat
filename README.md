
# 💬 Real-Time Chat Application

This is a real-time chat application built using **Spring Boot** for the backend and **React.js** for the frontend. It supports bi-directional communication via **WebSockets** using **STOMP over SockJS**.

---

## 🚀 Features

- Real-time message exchange using WebSockets
- User input dialog before entering chat
- Responsive chat UI with scrollable message history
- Styled using Material UI components
- Backend and frontend fully decoupled

---

## 🛠️ Tech Stack

### Backend
- Java 21+
- Spring Boot
- WebSocket (STOMP, SockJS)

### Frontend
- React.js
- @stomp/stompjs
- sockjs-client
- Material UI (MUI)

---

## 📦 Installation & Setup

### 🔧 Backend Setup

1. Ensure Java 21+ is installed.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   OR
   ```bash
   ./gradlew bootRun
   ```

   The backend server will start at `http://localhost:8080`.

### 💻 Frontend Setup

1. Ensure Node.js and npm are installed.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the React app:
   ```bash
   npm start
   ```

   The frontend will run at `http://localhost:3000`.

---

## 🌐 WebSocket Endpoints

- **STOMP Endpoint:** `/ws`
- **Client Sends To:** `/app/chat`
- **Client Subscribes To:** `/topic/message`

---

## 📦 Message Format

```json
{
  "name": "User",
  "message": "Hello, world!"
}
```

---

## 📝 Usage

1. Start both backend and frontend.
2. On the web page, enter your name and age.
3. Begin sending and receiving messages in real time.

---

## 🔐 CORS Configuration

Ensure CORS is enabled on the backend if frontend and backend are running on different ports.

---

## 🙌 Author

**Logeshkumar M**

---

## 📄 License

This project is licensed under the MIT License.
