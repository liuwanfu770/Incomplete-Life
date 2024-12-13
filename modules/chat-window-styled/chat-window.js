function show(msg) {
  document.getElementById('chat-status').innerText = msg;
}

document.getElementById('send-btn').addEventListener('click', () => {
  const acc = document.getElementById('acc').value.trim();
  const recipient = document.getElementById('recipient').value.trim();
  const msg = document.getElementById('chat-input').value.trim();
  const chatArea = document.getElementById('chat-area');

  if (!acc || !recipient || !msg) {
    show('请填写账号、目标号码和消息');
    return;
  }

  fetch('http://localhost:8080/v2/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: acc, recipients: [recipient], message: msg })
  }).then(r => {
    if (r.ok) {
      show('发送成功');
      const div = document.createElement('div');
      div.style.textAlign = 'right';
      div.innerText = '我: ' + msg;
      chatArea.appendChild(div);
      document.getElementById('chat-input').value = '';
    } else {
      show('发送失败');
    }
  }).catch(e => {
    console.error(e);
    show('网络错误');
  });
});