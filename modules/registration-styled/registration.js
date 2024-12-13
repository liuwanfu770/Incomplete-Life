function showStatus(msg) {
  document.getElementById('status').innerText = msg;
}

document.getElementById('registerBtn').addEventListener('click', () => {
  const phone = document.getElementById('phone').value.trim();
  const captchaToken = document.getElementById('captchaToken').value.trim();
  
  if(!phone || !captchaToken) {
    showStatus('请输入手机号和验证Token');
    return;
  }
  
  fetch('http://localhost:8080/v1/register/'+encodeURIComponent(phone), {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({captcha: captchaToken})
  }).then(r=>{
    if(r.ok) {
      showStatus('注册请求已发送，请查收短信验证码');
    } else {
      showStatus('注册失败');
    }
  }).catch(e=>{
    console.error(e);
    showStatus('网络错误');
  })
});

document.getElementById('verifyBtn').addEventListener('click', () => {
  const phone = document.getElementById('phone').value.trim();
  const code = document.getElementById('smsCode').value.trim();
  
  if(!phone || !code) {
    showStatus('请输入手机号和短信验证码');
    return;
  }
  
  fetch('http://localhost:8080/v1/register/'+encodeURIComponent(phone)+'/verify/'+encodeURIComponent(code), {
    method:'POST',
    headers:{'Content-Type':'application/json'}
  }).then(r=>{
    if(r.ok) {
      showStatus('注册成功');
    } else {
      showStatus('验证失败');
    }
  }).catch(e=>{
    console.error(e);
    showStatus('网络错误');
  })
});