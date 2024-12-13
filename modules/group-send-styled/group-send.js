function gshow(m){document.getElementById('gstatus').innerText=m;}

document.getElementById('gsend').addEventListener('click',()=>{
  const acc=document.getElementById('gacc').value.trim();
  const msg=document.getElementById('gmsg').value.trim();
  const recs=document.getElementById('grecs').value.trim().split(',').map(r=>r.trim()).filter(r=>r);

  if(!acc||!msg||recs.length===0){
    gshow('请填写账号、消息、收件人');
    return;
  }

  gshow('正在群发中...');
  Promise.all(recs.map(r=>{
    return fetch('http://localhost:8080/v2/send',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({number:acc,recipients:[r],message:msg})
    });
  })).then(results=>{
    const failed = results.filter(res=>!res.ok).length;
    if(failed===0) gshow('群发完成，全部发送成功');
    else gshow('群发完成，部分发送失败');
  }).catch(e=>{
    console.error(e);
    gshow('网络错误，群发中断');
  });
});