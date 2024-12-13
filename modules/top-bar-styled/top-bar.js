function setCurrentAccount(account) {
  document.getElementById('current-account').innerText = account ? '当前账号:' + account : '当前无账号登录';
}

// 默认状态
setCurrentAccount(null);