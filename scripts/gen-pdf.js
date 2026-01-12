const fs = require('fs');
const http = require('http');
const data = fs.readFileSync('payload.json');
const options = {hostname:'localhost',port:3000,path:'/api/generate-pdf',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}};
const req = http.request(options,(res)=>{
  console.log('STATUS', res.statusCode);
  if(res.statusCode!==200){
    res.setEncoding('utf8');
    let body='';
    res.on('data',d=>body+=d);
    res.on('end',()=>console.error('BODY',body));
    return;
  }
  const file=fs.createWriteStream('sample-report.pdf');
  res.pipe(file);
  file.on('finish',()=>{ console.log('WROTE sample-report.pdf'); file.close(); });
});
req.on('error', e=>console.error('REQERR', e));
req.write(data);
req.end();
