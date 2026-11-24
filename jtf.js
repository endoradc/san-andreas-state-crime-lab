// Restricted Joint Task Force page: sign-in screen plus the operation file defined in jtf-data.js.
let jtfFails=0,jtfLockUntil=0;
function jtfAuthed(){try{return sessionStorage.getItem('sascl-jtf')==='1'}catch(e){return window.__jtfAuth===true}}
function jtfSet(v){try{v?sessionStorage.setItem('sascl-jtf','1'):sessionStorage.removeItem('sascl-jtf')}catch(e){window.__jtfAuth=v}}
function jtfFmt(t){return String(t).replace(/\[\[(.+?)\]\]/g,'<span class="redact" aria-label="redacted">$1</span>')}
function jtfSignOut(){jtfSet(false);jtf()}
function jtfSubmit(ev){
  ev.preventDefault();
  const msg=document.getElementById('jtf-msg'),now=Date.now();
  if(now<jtfLockUntil){msg.textContent=`Terminal locked. Try again in ${Math.ceil((jtfLockUntil-now)/1000)} seconds.`;return}
  const badge=document.getElementById('jtf-badge').value.trim().toUpperCase();
  const pass=document.getElementById('jtf-pass').value;
  if(badge===JTF_ACCESS.badge.toUpperCase()&&pass===JTF_ACCESS.passcode){jtfFails=0;jtfSet(true);jtf();return}
  jtfFails++;
  document.getElementById('jtf-pass').value='';
  if(jtfFails>=3){jtfLockUntil=Date.now()+30000;jtfFails=0;msg.textContent='Three failed attempts. Terminal locked for 30 seconds. This event has been logged.'}
  else msg.textContent=`Credentials not recognized. Attempt ${jtfFails} of 3 recorded.`;
}
function jtfLogin(){
  main.innerHTML=`<div class="jtf-gate"><div class="gate-card"><div class="gate-banner">RESTRICTED · JOINT TASK FORCE</div><div class="gate-seal" aria-hidden="true">JTF</div><h1>Operation file</h1><p class="lead">Task Force command access only. Authenticate with an issued badge number and passcode. Access attempts are logged.</p><form onsubmit="jtfSubmit(event)" autocomplete="off"><label for="jtf-badge">Badge number</label><input id="jtf-badge" name="badge" type="text" placeholder="JTF-0000" autocapitalize="characters" spellcheck="false" required><label for="jtf-pass">Passcode</label><input id="jtf-pass" name="pass" type="password" placeholder="Passcode" required><button class="primary" type="submit">Authenticate</button><p id="jtf-msg" class="gate-msg" role="alert" aria-live="polite"></p></form><div class="gate-foot">This system is for authorized use only. Unauthorized access or disclosure of Task Force material may be prosecuted.</div></div></div>`;
  setTimeout(()=>{const f=document.getElementById('jtf-badge');if(f)f.focus()},50);
}
function jtfStatusBadge(s){const m={pending:['Pending','pending'],reported:['Reported',''],confirmed:['Confirmed',''],open:['Open question','pending']}[s]||['',''];return `<span class="badge ${m[1]}">${m[0]}</span>`}
function jtfFile(){
  const F=JTF_FILE;
  const total=F.sections.reduce((a,s)=>a+s.entries.length,0),done=F.sections.reduce((a,s)=>a+s.entries.filter(e=>e.status!=='pending').length,0);
  main.innerHTML=`<div class="jtf-banner">TOP SECRET / JOINT TASK FORCE / LAW ENFORCEMENT SENSITIVE</div><div class="eyebrow">JOINT TASK FORCE · OPERATION FILE · ${F.reference}</div><div class="profile-heading"><div><h1>${jtfFmt(F.operation)}</h1><p class="lead">Undercover reporting · Ely, Nevada and Mexico · Reapers MC</p></div><div class="profile-monogram" aria-hidden="true">JTF</div></div><span class="badge">${F.status}</span><div class="meta"><div><span>Signed in as</span>${JTF_ACCESS.name}</div><div><span>Case lead</span>${F.lead}</div><div><span>Opened</span>${jtfFmt(F.opened)}</div></div><div class="toolbar"><button class="secondary" onclick="home()">Case directory</button><button class="secondary" onclick="board()">Evidence link board</button><button class="secondary" onclick="jtfExpand(true)">Expand all</button><button class="secondary" onclick="jtfExpand(false)">Collapse all</button><button class="primary" onclick="printReport()">Print / save PDF</button><button class="secondary" onclick="jtfSignOut()">Sign out</button></div><div class="notice">${F.summary}</div><div class="fill-meter"><span>File completeness</span><div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-label="Entries filled"><i style="width:${Math.max(Math.round(done/total*100),2)}%"></i></div><small>${done} of ${total} entries filed</small></div>${F.sections.map((s,n)=>`<details class="finding jtf-section" ${n===0?'open':''}><summary><span><small class="module-code">${s.code}</small>${s.title}</span><span class="badge pending">${s.tag}</span></summary><div class="body">${s.intro?`<p class="review-note">${s.intro}</p>`:''}${s.entries.map(e=>`<article class="jtf-entry-card ${e.status}"><div class="jtf-entry-head"><h3>${e.title}</h3>${jtfStatusBadge(e.status)}</div>${e.status==='pending'||!e.text?'<p class="slot">ENTRY PENDING · reporting to be filed</p>':`<div class="entry-text">${jtfFmt(e.text)}</div>`}</article>`).join('')}</div></details>`).join('')}<div class="gate-foot">Source identities and operational personnel details are not recorded in this file.</div>`;
  window.scrollTo(0,0);
}
function jtfExpand(v){document.querySelectorAll('details.jtf-section').forEach(d=>d.open=v)}
function jtf(){
  cyberMode(false);setHash('jtf');setNav(7);
  jtfAuthed()?jtfFile():jtfLogin();
  window.scrollTo(0,0);
}
