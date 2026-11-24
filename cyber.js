// Scene-specific presentation; all examination findings remain in reports.js.
const standardShow=show,standardHome=home,standardProfile=profile,standardManifest=manifest;
function cyberMode(on){document.body.classList.remove('surveillance-mode');document.body.classList.toggle('cyber-mode',on);document.querySelector('header>span').textContent=on?'SASCL / CYBERCRIME & DIGITAL FORENSICS':'FORENSIC INFORMATION SYSTEM';}
home=function(){cyberMode(false);standardHome();};
profile=function(){cyberMode(false);standardProfile();};
manifest=function(serial=''){cyberMode(false);standardManifest(serial);};
show=function(i,tab='findings'){if(i===2){surveillance();return;}standardShow(i,tab);cyberMode(i===1);if(i!==1)return;
main.querySelector('.eyebrow').textContent='CYBERCRIME DIVISION / DIGITAL EVIDENCE REVIEW';
const title=main.querySelector('h1');title.innerHTML='<span class="division-title">Cybercrime Division</span><span class="case-title">S.S. Bulker / device examination</span>';title.insertAdjacentHTML('afterend','<div class="cyber-subtitle">MARITIME ELECTRONICS / EXAMINATION 02</div>');
const notice=main.querySelector('.notice');notice.insertAdjacentHTML('afterend',`<section class="cyber-console" aria-label="Digital examination summary"><div class="console-bar"><span>DIGITAL EVIDENCE WORKSPACE</span><span>PRELIMINARY RELEASE</span></div><div class="console-grid"><div class="device-visual" aria-hidden="true"><div class="orbital orbital-one"></div><div class="orbital orbital-two"></div><div class="device-core"><svg viewBox="0 0 120 120" width="90" height="90" fill="none" stroke="currentColor" stroke-width="2"><rect x="30" y="28" width="60" height="68" rx="5"/><rect x="42" y="40" width="36" height="24"/><path d="M42 76h22m-22 8h36M44 28V14m32 14V14M15 44h15m-15 16h15m60-16h15M90 60h15"/><circle cx="76" cy="76" r="3"/></svg></div><span class="visual-label">RECOVERED DEVICE</span></div><div class="console-readout"><div><span>CLASSIFICATION</span><strong>TRACKING + INTERFERENCE</strong></div><div><span>REMOTE ACCESS</span><strong>CONNECTION RECORDS RECOVERED</strong></div><div><span>SUBSCRIBER RETURN</span><strong>KNOX APARTMENT CONNECTION</strong></div><div class="unconfirmed"><span>INDIVIDUAL OPERATOR</span><strong>NOT ESTABLISHED</strong></div></div></div><div class="console-footer">STATIC EXAMINATION SUMMARY <span>NO LIVE VESSEL CONNECTION</span></div></section>`);
main.querySelector('.meta').before(main.querySelector('.cyber-console'));
main.querySelectorAll('details.finding:not(.requestpanel)').forEach((el,n)=>{el.querySelector('summary>span').insertAdjacentHTML('afterbegin',`<small class="module-code">DF / ${String(n+1).padStart(2,'0')}</small>`)});
};
route();
