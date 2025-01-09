require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());

// 如果你也想在 Node.js 内部返回CORS头(可与Nginx代理共存)
// (通常前端只需Nginx层加CORS即可，这里演示双保险)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    credentials: true,
  })
);

// 健康检查
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Node backend is running." });
});

// 发送验证码
app.post("/api/register/send", async (req, res) => {
  try {
    const { phoneNumber, useVoice, captcha } = req.body;
    // 通过 container 名 signalcli 访问
    const url = `http://signalcli:8080/v1/register/${encodeURIComponent(
      phoneNumber
    )}`;
    const payload = {
      captcha: captcha || undefined,
      use_voice: useVoice || false,
    };

    const resp = await axios.post(url, payload);
    if (resp.status === 201) {
      return res.json({ status: "ok", message: "验证码已发送" });
    } else {
      return res.status(400).json({ error: "注册失败", details: resp.data });
    }
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ error: "服务器异常", detail: err.message });
  }
});

// 校验验证码
app.post("/api/register/verify", async (req, res) => {
  try {
    const { phoneNumber, token } = req.body;
    const url = `http://signalcli:8080/v1/register/${encodeURIComponent(
      phoneNumber
    )}/verify/${encodeURIComponent(token)}`;
    const resp = await axios.post(url, {});
    if (resp.status === 201) {
      return res.json({ status: "ok", message: "注册/验证成功" });
    }
    return res.status(400).json({ error: "验证失败", details: resp.data });
  } catch (err) {
    console.error("Verify error:", err.message);
    return res.status(500).json({ error: "服务器异常", detail: err.message });
  }
});

// 创建 HTTP 服务器 & socket.io
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("ping", () => {
    socket.emit("pong", { msg: "Hello from socket.io server" });
  });
});

// 启动监听
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Node backend running on port ${PORT}`);
});
