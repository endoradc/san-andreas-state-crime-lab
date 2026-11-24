// JOINT TASK FORCE RESTRICTED FILE: edit this file to add information.
//
// SIGN-IN (change these two values to whatever you like):
const JTF_ACCESS={name:'Captain Jackson Bradford',badge:'JTF-0417',passcode:'blood-debt'};
//
// IMPORTANT: this sign-in is roleplay gating, not real security. The page runs in the visitor's browser,
// so anyone who views the page source can read this file. Do not put anything here that must stay private.
//
// HOW TO ADD INFORMATION
//   Each section has a list of entries. An entry is { title, status, text } where status is one of
//   'pending' (an empty slot waiting for content), 'reported' (undercover reporting), 'confirmed' (verified)
//   or 'open' (an open question). text may use <p>, <ul><li>, <strong>.
//   Wrap words in [[double brackets]] to show them as a black redaction bar.
//   Replace a pending entry by changing its status and text, or add a new { ... } line.
const JTF_FILE={
  operation:'[Operation name to be added]',
  reference:'JTF-OP-2026-XXXX',
  lead:'Captain Jackson Bradford',
  status:'ACTIVE',
  opened:'[Date to be added]',
  summary:'<p>Undercover reporting gathered inside the Reapers Motorcycle Club, with information developed in <strong>Ely, Nevada</strong> and in <strong>Mexico</strong>. This file is for Task Force command only.</p><p>Entries marked <strong>Pending</strong> are slots waiting for reporting to be added.</p>',
  sections:[
    {id:'ely',code:'01',title:'Ely, Nevada',tag:'Undercover reporting',intro:'Information obtained while embedded with the Reapers in Ely.',entries:[
      {title:'Overview of Ely activity',status:'pending',text:''},
      {title:'Locations, yards and vehicles observed',status:'pending',text:''},
      {title:'Persons observed and their roles',status:'pending',text:''},
      {title:'Meetings, shipments and communications',status:'pending',text:''}
    ]},
    {id:'mexico',code:'02',title:'Mexico',tag:'Undercover reporting',intro:'Information obtained in Mexico, including any contact with the Castañeda Family.',entries:[
      {title:'Overview of Mexico activity',status:'pending',text:''},
      {title:'Castañeda Family structure and contacts',status:'pending',text:''},
      {title:'How the club and the family communicate',status:'pending',text:''},
      {title:'Routes, crossings and supply',status:'pending',text:''}
    ]},
    {id:'reapers',code:'03',title:'Reapers Motorcycle Club',tag:'Organization',intro:'Chapter structure and leadership as understood from inside the club.',entries:[
      {title:'Leadership and chapter structure',status:'pending',text:''},
      {title:'Luis Ortega, role inside the club',status:'reported',text:'<p>Released Task Force reporting identifies Ortega as an intermediary used by the club, with associations to the Castañeda Family. See the released subject profile. Detailed undercover reporting on Ortega is to be added here.</p>'},
      {title:'Source protection and operational personnel',status:'pending',text:''}
    ]},
    {id:'link',code:'04',title:'Link to the Harbor Terminal and port cases',tag:'Cross-reference',intro:'How the undercover file relates to the evidence already released to SASP.',entries:[
      {title:'ATF position on the harbor meeting',status:'reported',text:'<p>Interagency coordination confirmed the harbor meeting and associated arrangements were conducted <strong>without prior agency knowledge</strong>. Operational concerns are to be addressed within the Task Force.</p>'},
      {title:'Ortega on the second drinking glass',status:'confirmed',text:'<p>DNA and fingerprints on the second glass matched Ortega through INTERPOL comparison. Whether the undercover file already placed him at the harbor is to be added.</p>'}
    ]},
    {id:'questions',code:'05',title:'Open questions',tag:'Analysis',intro:'Items the released lab findings leave unresolved. Undercover reporting may answer some of them.',entries:[
      {title:'Who wrote the second half of the note?',status:'open',text:'<p>The handwriting does not match Knox exemplars. The line reads “Knox wants confirmation directly.”</p>'},
      {title:'Who operated the S.S. Bulker device?',status:'open',text:'<p>The remote connection traces to an apartment registered to Knox. The operator is not identified.</p>'},
      {title:'Who is in the E2 van, and why was it at two vessels?',status:'open',text:'<p>Stationary for over an hour at the S.S. Bulker and the Daisy Lee. No plate, owner or occupant identified.</p>'},
      {title:'Where is the operating premises?',status:'open',text:'<p>The blueprints resemble warehouse layouts near the port. No property confirmed.</p>'},
      {title:'Where are the 30 outstanding firearms?',status:'open',text:'<p>20 AR-pattern rifles and 10 shotguns from the Popular Street shipment remain unreconciled.</p>'}
    ]},
    {id:'actions',code:'06',title:'Recommended actions',tag:'Command',intro:'',entries:[
      {title:'Next steps',status:'pending',text:''}
    ]}
  ]
};
