document.getElementById('loadMessages').addEventListener('click', () => {
  const acc = document.getElementById('account').value.trim();
  const ul = document.getElementById('messages');
  ul.innerHTML = '';

  if (!acc) {
    ul.innerHTML = '<li>请填写账号</li>';
    return;
  }

  // 实际应调用后端消息获取接口，这里先模拟
  ul.innerHTML = '<li>此处显示从后端获取的消息数据(需后端正常)。</li>';
});