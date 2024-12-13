// main.js
// 功能：侧边栏按钮点击时，加载对应模块页面到iframe中
// 顶部栏中有显示当前账号的区域，可在后续整合时通过一些全局状态或接口更新。

const buttons = document.querySelectorAll('.sidebar button');
const frame = document.getElementById('moduleFrame');

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const url = btn.getAttribute('data-module');
    frame.src = url;
  });
});

// 如需更新当前账号信息，可在此处添加类似函数
function setCurrentAccount(account) {
  document.getElementById('current-account').innerText = account ? ('当前账号:'+account) : '当前无账号登录';
}
// 默认不显示账号
setCurrentAccount(null);