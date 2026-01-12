const fs = require('fs');
const http = require('http');
const path = require('path');
const base = require(path.resolve(__dirname, '..', 'payload.json'));
const pdfModule = require('pdf-parse');

function postPayload(payload, outName) {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(JSON.stringify(payload));
    const options = {hostname:'localhost',port:3000,path:'/api/generate-pdf',method:'POST',headers:{'Content-Type':'application/json','Content-Length':data.length}};
    const req = http.request(options,(res)=>{
      if (res.statusCode!==200) return reject(new Error('Status '+res.statusCode));
      const file = fs.createWriteStream(outName);
      res.pipe(file);
      file.on('finish', ()=>{ file.close(); resolve(outName); });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function getPageCount(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  let pdfFn = typeof pdfModule === 'function' ? pdfModule : (pdfModule && pdfModule.default) ? pdfModule.default : null;
  if (pdfFn && typeof pdfFn !== 'function') pdfFn = null;
  if (!pdfFn) {
    try {
      const imported = await import('pdf-parse');
      pdfFn = imported && (imported.default || imported) ? (imported.default || imported) : null;
      if (pdfFn && typeof pdfFn !== 'function') pdfFn = null;
    } catch (e) {
      // ignore
    }
  }
  if (!pdfFn) return null;
  const data = await pdfFn(dataBuffer);
  return data.numpages || null;
}

function countPagesHeuristic(filePath) {
  const buf = fs.readFileSync(filePath);
  const s = buf.toString('latin1');
  const matches = s.match(/\/Type\s*\/Page\b/g);
  if (!matches) return 1;
  return matches.length;
}

(async ()=>{
  const tests = [];

  // 1: baseline
  tests.push({name: 'baseline', payload: base});

  // 2: long texts to force wrapping
  const long = JSON.parse(JSON.stringify(base));
  long.tool1Data.documentationLabel = 'תיאור ארוך '.repeat(60);
  long.tool2Data.errorDetectionLabel = 'פרטי זיהוי שגיאות '.repeat(40);
  tests.push({name: 'long-texts', payload: long});

  // 3: large numbers to enlarge table values
  const big = JSON.parse(JSON.stringify(base));
  if (big.tool3Data && big.tool3Data.monthlyBreakdown) {
    big.tool3Data.monthlyBreakdown = big.tool3Data.monthlyBreakdown.map(m=>({ ...m, cumulativeSavings: m.cumulativeSavings * 10 }));
  }
  tests.push({name: 'big-numbers', payload: big});

  // 4: many months (simulate 12 months)
  const many = JSON.parse(JSON.stringify(base));
  many.tool3Data.monthlyBreakdown = Array.from({length:12}, (_,i)=>({
    month: i+1,
    laborSaved: 10000 + i*500,
    learningCost: 2000,
    maintenanceCost: 500,
    toolCost: 1000,
    netSavings: 10000 - 3500,
    cumulativeSavings: (i+1)*(10000-3500)
  }));
  tests.push({name: 'many-months', payload: many});

  // 5: no monthly breakdown
  const none = JSON.parse(JSON.stringify(base));
  none.tool3Data.monthlyBreakdown = [];
  tests.push({name: 'no-data', payload: none});

  console.log('Running', tests.length, 'tests — this will generate PDFs in project root');

  const results = [];
  for (const t of tests) {
    const out = path.resolve(`${t.name}-report.pdf`);
    try {
      process.stdout.write('Generating ' + t.name + '... ');
      await postPayload(t.payload, out);
      process.stdout.write('done. ');
      let pages = await getPageCount(out);
      if (pages===null) {
        pages = countPagesHeuristic(out);
        console.log('pages (heuristic):', pages);
      } else {
        console.log('pages:', pages);
      }
      results.push({test: t.name, file: out, pages});
    } catch (err) {
      console.error('FAILED', t.name, err.message);
      results.push({test: t.name, error: err.message});
    }
  }

  console.log('\nSummary:');
  results.forEach(r=>console.log(JSON.stringify(r)));
})();
