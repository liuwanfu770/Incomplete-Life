require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // 或者填写前端确切域名，如 ['http://127.0.0.1:5500', 'http://localhost:8080']
  })
);

const server = http.createServer(app);
const io = socketIo(server);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Node backend is running." });
});

app.post("/api/register/send", async (req, res) => {
  const { phoneNumber, useVoice, captcha } = req.body;
  const url = `http://${
    process.env.SIGNAL_CLI_HOST || "signalcli"
  }:8080/v1/register/${encodeURIComponent(phoneNumber)}`;
  const payload = {
    captcha: captcha || undefined,
    use_voice: useVoice || false,
  };
  try {
    const resp = await axios.post(url, payload);
    if (resp.status === 201) {
      res.status(201).json({ message: "验证码已发送" });
    } else {
      res.status(400).json({ message: "发送验证码失败" });
    }
  } catch (err) {
    res.status(500).json({ message: "服务器错误", error: err.message });
  }
});

app.post("/api/register/verify", async (req, res) => {
  const { phoneNumber, token } = req.body;
  const url = `http://${
    process.env.SIGNAL_CLI_HOST || "signalcli"
  }:8080/v1/register/${encodeURIComponent(
    phoneNumber
  )}/verify/${encodeURIComponent(token)}`;
  try {
    const resp = await axios.post(url, {});
    if (resp.status === 201) {
      res.status(201).json({ message: "验证成功" });
    } else {
      res.status(400).json({ message: "验证失败" });
    }
  } catch (err) {
    res.status(500).json({ message: "服务器错误", error: err.message });
  }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("ping", () => {
    socket.emit("pong", { msg: "Hello from socket.io server" });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Node backend running on port ${PORT}`);
});
