// Evidence link board. Every connection carries a status so the board never claims more than the reports do.
// Status: confirmed = laboratory finding, reported = intelligence reporting only, unresolved = open question.
const boardNodes=[
{id:'knox',label:'Jayla Knox',sub:'Named in exhibits',x:110,y:250,detail:'Fingerprints and DNA on a drinking glass, prints on the Micro SMG and a print under the crate lid. A subscriber record ties an apartment in her name to the device connection. None of this establishes when she handled items or who operated the device.',open:'show(0)',openLabel:'Open Harbor Terminal report'},
{id:'ortega',label:'Luis Ortega',sub:'Reapers MC intermediary',x:110,y:400,detail:'Matched through INTERPOL comparison to the second drinking glass. Task Force reporting describes him as an intermediary for the Reapers with Castañeda Family associations, and as highly violent.',open:'profile()',openLabel:'Open Task Force profile'},
{id:'reapers',label:'Reapers MC',sub:'Motorcycle club',x:110,y:540,detail:'Intelligence reporting only. The chapter was disrupted after the Los Santos safehouse attack.',open:'profile()',openLabel:'Open Task Force profile'},
{id:'castaneda',label:'Castañeda Family',sub:'Operating out of Mexico',x:110,y:670,detail:'Intelligence reporting only. Reported to use Ortega to build connections for expansion.',open:'profile()',openLabel:'Open Task Force profile'},
{id:'glassA',label:'Glass A',sub:'DNA + latent prints',x:430,y:60,detail:'Two separate DNA profiles were recovered from two glasses. Glass A matches Jayla Knox on both DNA and fingerprints. The match does not say when the glass was used.',open:"show(0);jumpFinding(0)",openLabel:'Open glasses finding'},
{id:'glassB',label:'Glass B',sub:'No local match · INTERPOL',x:430,y:160,detail:'No match in local or state databases. Identifying material was referred through INTERPOL and returned a match to Luis Ortega.',open:"show(0);jumpFinding(0)",openLabel:'Open glasses finding'},
{id:'smg',label:'Micro SMG',sub:'Serial SH-MSM-2611847',x:430,y:260,detail:'Shrewsbury Micro SMG. Serial matches the stolen Popular Street delivery manifest. Identifiable fingerprints match Jayla Knox. The Hawk & Little pistol also matches the manifest, with its fingerprint examination still pending.',open:"show(0);jumpFinding(2)",openLabel:'Open firearms finding'},
{id:'crate',label:'Ammu-Nation crate',sub:'Print under lid',x:430,y:360,detail:'Crate markings correspond to the stolen consignment. Most surfaces yielded no usable prints, consistent with possible wiping. One print on the underside of the lid matches Jayla Knox, positioned as if holding the lid open.',open:"show(0);jumpFinding(4)",openLabel:'Open crate finding'},
{id:'note',label:'Handwritten note',sub:'Writer not identified',x:430,y:460,detail:'No usable prints. The handwriting does not match the available Knox exemplars. A second portion in a different hand reads “Knox wants confirmation directly.”',open:"show(0);jumpFinding(5)",openLabel:'Open note finding'},
{id:'blueprints',label:'Blueprints',sub:'City Planning review',x:430,y:560,detail:'Preliminary comparison shows similarities with several warehouse layouts near the Port of Los Santos. No exact property has been established.',open:"show(0);jumpFinding(3)",openLabel:'Open blueprint finding'},
{id:'meeting',label:'Harbor Terminal meeting',sub:'Scene 1 · Autopia Parkway',x:840,y:110,detail:'Where the glasses, firearms, crate, note and blueprints were recovered. ATF liaison confirmed the meeting was conducted without prior agency knowledge.',open:'show(0)',openLabel:'Open Harbor Terminal report'},
{id:'shipment',label:'Popular Street shipment',sub:'32 firearms + Coil crate',x:840,y:310,detail:'The stolen Ammu-Nation delivery of 21 November 2026. Two firearms and the crate are recovered, and the rest are outstanding.',open:'manifest()',openLabel:'Open manifest and register'},
{id:'premises',label:'Operating premises',sub:'Not identified',x:840,y:560,detail:'No confirmed operating location. The blueprints may point to a warehouse near the port, but nothing has been matched.',open:"show(0);jumpFinding(3)",openLabel:'Open blueprint finding'},
{id:'device',label:'S.S. Bulker device',sub:'Tracker + interference',x:430,y:710,detail:'Combined vessel tracker and interference device. No fingerprints were found. Remote-access records were recovered. No successful disruption of the vessel has been confirmed.',open:'show(1)',openLabel:'Open device report'},
{id:'ip',label:'Apartment connection',sub:'Registered to Knox',x:430,y:810,detail:'The recorded source IP was referred for subscriber verification. Provider records associate it with internet service at an apartment registered in Jayla Knox’s name. This does not identify the person, computer or phone used.',open:"show(1,'intelligence')",openLabel:'Open digital connections'},
{id:'operator',label:'Device operator',sub:'Unconfirmed',x:840,y:810,detail:'No individual operator has been established. A subscriber return identifies a connection, not a person.',open:"show(1,'intelligence')",openLabel:'Open digital connections'},
{id:'van',label:'E2 electrical van',sub:'Two stops · over 1 hr each',x:840,y:710,detail:'Dark service van with Electrical Team / E2 branding and roof equipment. Stationary for over an hour at two vessel locations with no one seen entering or leaving. No plate, owner or occupant identification has been issued.',open:'surveillance()',openLabel:'Open surveillance report'},
{id:'daisy',label:'Daisy Lee',sub:'Second vessel location',x:840,y:630,detail:'The same van appears in camera coverage at the Daisy Lee. The third camera has no finding issued and remains unresolved.',open:'surveillance()',openLabel:'Open surveillance report'}
];
const boardLinks=[
['glassA','knox','confirmed','DNA and fingerprints match'],
['glassB','ortega','confirmed','DNA and prints via INTERPOL'],
['glassA','meeting','confirmed','Recovered at scene'],
['glassB','meeting','confirmed','Recovered at scene'],
['smg','knox','confirmed','Knox prints on the weapon'],
['crate','knox','confirmed','Print under the lid'],
['smg','shipment','confirmed','Serial matches the manifest'],
['crate','shipment','confirmed','Markings match the consignment'],
['smg','meeting','confirmed','Recovered at scene'],
['crate','meeting','confirmed','Recovered at scene'],
['note','meeting','confirmed','Recovered at scene'],
['note','knox','unresolved','Not her handwriting; “Knox wants confirmation directly”'],
['knox','ortega','unresolved','Items at the same scene, timing not established'],
['ortega','shipment','unresolved','Involvement in the theft is under investigation'],
['ortega','reapers','reported','Intermediary for the club'],
['ortega','castaneda','reported','Associated with the family'],
['reapers','castaneda','reported','Club used Ortega to build connections'],
['blueprints','premises','unresolved','No property identified'],
['blueprints','meeting','confirmed','Recovered at scene'],
['device','ip','confirmed','Remote-access records recovered'],
['ip','knox','confirmed','Apartment registered in her name'],
['ip','operator','unresolved','Connection is not a person'],
['knox','operator','unresolved','Not established'],
['device','van','unresolved','No connection established'],
['van','daisy','confirmed','Same van on camera'],
['van','operator','unresolved','Occupant not identified']
];
const STATUS_LABEL={confirmed:'Confirmed finding',reported:'Intelligence only',unresolved:'Unresolved'};
function nodeById(id){return boardNodes.find(n=>n.id===id)}
function linksFor(id){return boardLinks.filter(l=>l[0]===id||l[1]===id)}
let boardFilter='all';
function boardSvg(sel){
  const W=190,H=54;
  const edges=boardLinks.map((l,k)=>{const a=nodeById(l[0]),b=nodeById(l[1]);const hot=sel&&(l[0]===sel||l[1]===sel);const dim=sel&&!hot;
    return `<line class="edge ${l[2]}${hot?' hot':''}${dim?' dim':''}" data-status="${l[2]}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"><title>${a.label} to ${b.label}: ${l[3]}</title></line>`}).join('');
  const nodes=boardNodes.map(n=>{const linked=sel&&(n.id===sel||linksFor(sel).some(l=>l[0]===n.id||l[1]===n.id));const dim=sel&&!linked;
    return `<g class="node${n.id===sel?' selected':''}${dim?' dim':''}" tabindex="0" role="button" aria-label="${n.label}. ${n.sub}" onclick="board('${n.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();board('${n.id}')}"><rect x="${n.x-W/2}" y="${n.y-H/2}" width="${W}" height="${H}" rx="4"/><text x="${n.x}" y="${n.y-3}" class="nl">${n.label}</text><text x="${n.x}" y="${n.y+15}" class="ns">${n.sub}</text></g>`}).join('');
  const lanes=[[430,'HARBOR TERMINAL · EXHIBITS'],[840,'SCENE CONTEXT'],[110,'PEOPLE & ORGANIZATIONS']].map(([x,t])=>`<text x="${x}" y="22" class="lane">${t}</text>`).join('')+`<text x="430" y="665" class="lane">S.S. BULKER · PORT</text><line x1="20" y1="640" x2="980" y2="640" class="divider"/>`;
  return `<svg class="boardsvg filter-${boardFilter}" viewBox="0 0 1000 860" role="group" aria-label="Evidence link board">${lanes}${edges}${nodes}</svg>`;
}
function board(id){
  const keepY=(id&&location.hash==='#board')?window.scrollY:0;
  cyberMode(false);setHash('board');setNav(6);
  const n=id?nodeById(id):null;
  const detail=n?`<section class="board-detail"><span class="eyebrow">SELECTED / ${n.sub.toUpperCase()}</span><h2>${n.label}</h2><p>${n.detail}</p><h3>Connections</h3><ul class="conn-list">${linksFor(n.id).map(l=>{const o=nodeById(l[0]===n.id?l[1]:l[0]);return `<li class="${l[2]}"><span class="badge ${l[2]==='confirmed'?'':'pending'}">${STATUS_LABEL[l[2]]}</span> <button class="textlink" onclick="board('${o.id}')">${o.label}</button><br><small>${l[3]}</small></li>`}).join('')}</ul><div class="toolbar"><button class="primary" onclick="${n.open}">${n.openLabel}</button><button class="secondary" onclick="board()">Clear selection</button></div></section>`:`<section class="board-detail"><span class="eyebrow">HOW TO READ THIS BOARD</span><h2>Select any card</h2><p>Each line is a single relationship, labelled by how well it is supported. A confirmed line is a laboratory finding. A gold dashed line is intelligence reporting that the lab has not verified. A grey dotted line is an open question, which is often where the next lead is.</p></section>`;
  const rows=boardLinks.map(l=>{const a=nodeById(l[0]),b=nodeById(l[1]);return `<tr class="${l[2]}"><td>${a.label}</td><td>${b.label}</td><td><span class="badge ${l[2]==='confirmed'?'':'pending'}">${STATUS_LABEL[l[2]]}</span></td><td>${l[3]}</td></tr>`}).join('');
  main.innerHTML=`<div class="eyebrow">CASE ANALYSIS / CONNECTIONS</div><h1>Evidence link board</h1><p class="lead">People, places and exhibits across both scenes and the port surveillance review. Nothing here is a new finding. It maps what the reports already say, and what they do not.</p><div class="toolbar"><button class="secondary" onclick="home()">Case directory</button><button class="primary" onclick="printReport()">Print / save PDF</button></div><div class="legend" role="group" aria-label="Filter connections">${['all','confirmed','reported','unresolved'].map(f=>`<button class="${f===boardFilter?'selected':''} ${f}" onclick="boardSet('${f}','${id||''}')">${f==='all'?'All connections':STATUS_LABEL[f]}</button>`).join('')}</div><div class="board-layout"><div class="board-wrap">${boardSvg(id)}</div>${detail}</div><h2>All connections</h2><div class="table-scroll"><table class="conn-table"><thead><tr><th>From</th><th>To</th><th>Status</th><th>Basis</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  window.scrollTo(0,keepY);
}
function boardSet(f,id){boardFilter=f;board(id||undefined)}
