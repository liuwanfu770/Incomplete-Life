document.getElementById('loadAccounts').addEventListener('click', () => {
  fetch('http://localhost:8080/v1/accounts')
    .then(r => {
      if (!r.ok) throw new Error('请求失败');
      return r.json();
    })
    .then(accounts => {
      const ul = document.getElementById('accounts');
      ul.innerHTML = '';
      if (accounts.length === 0) {
        const li = document.createElement('li');
        li.innerText = '无账号';
        ul.appendChild(li);
        return;
      }
      accounts.forEach(acc => {
        const li = document.createElement('li');
        li.innerText = acc;
        ul.appendChild(li);
      });
    })
    .catch(e => {
      console.error(e);
      document.getElementById('accounts').innerText = '加载失败';
    });
});