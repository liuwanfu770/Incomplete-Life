function getQRCode() {
  fetch('http://localhost:8080/v1/qrcodelink?device_name=cli')
    .then(response => {
      if (!response.ok) {
        throw new Error('获取二维码失败');
      }
      return response.text();
    })
    .then(imgData => {
      const qrcodeContainer = document.getElementById('qrcode-container');
      if (!imgData) {
        qrcodeContainer.innerText = '未获取到二维码数据';
        return;
      }
      qrcodeContainer.innerHTML = '<img src="data:image/png;base64,' + imgData + '" alt="QR Code" style="max-width:100%;"/>';
    })
    .catch(error => {
      console.error(error);
      document.getElementById('qrcode-container').innerText = '获取失败';
    });
}

document.getElementById('getQRBtn').addEventListener('click', getQRCode);