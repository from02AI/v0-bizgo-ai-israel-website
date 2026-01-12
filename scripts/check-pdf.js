const fs = require('fs');
const pdfModule = require('pdf-parse');

(async ()=>{
  try{
    const dataBuffer = fs.readFileSync('sample-report.pdf');
    const pdfFn = typeof pdfModule === 'function' ? pdfModule : (pdfModule && pdfModule.default) ? pdfModule.default : null;
    if (!pdfFn) {
      console.log('pdf-parse not available as callable; file exists.');
      const s = fs.statSync('sample-report.pdf');
      console.log('size:', s.size, 'bytes');
      return;
    }
    const data = await pdfFn(dataBuffer);
    console.log('pages:', data.numpages);
    console.log('text length:', (data.text||'').length);
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();
