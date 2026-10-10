/* Folio Library — dependency-free, browser-only demo */
'use strict';
window.Folio = window.Folio || {};
Folio.config = {version:1, namespace:'folio_library_', email:'fbur@gmail.com', password:'fbur&brothers', vaultPassword:'Vault@2026!', maxChars:2300000};
Folio.util = {
  today:()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;},
  date:(days=0,base)=>{const d=new Date((base||Folio.util.today())+'T12:00:00');d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;},
  days:(a,b)=>Math.max(0,Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000)),
  id:p=>p+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),
  esc:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  label:k=>k.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/^./,s=>s.toUpperCase()).replace(/ Id\b/g,' ID'),
  number:v=>new Intl.NumberFormat('en-US').format(v||0),
  money:v=>new Intl.NumberFormat('en-US',{style:'currency',currency:Folio.store?.data?.settings?.currency||'BDT',maximumFractionDigits:2}).format(v||0),
  clone:x=>JSON.parse(JSON.stringify(x)),
  active:l=>['Issued','Overdue'].includes(l.status),
  pending:r=>['Pending','Ready for Pickup'].includes(r.status),
  round:n=>Math.round((Number(n)+Number.EPSILON)*100)/100,
  assert:(v,msg)=>{if(!v)throw new Error(msg);},
  debounce:(f,ms=160)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>f(...a),ms);};}
};
Folio.defaults = ()=>({libraryName:'Folio Central Library',loanDays:14,facultyLoanDays:30,borrowingLimit:5,facultyLimit:10,renewalLimit:2,allowOverdueRenewal:false,fineRate:5,fineThreshold:500,maxReservations:3,reservationDays:7,membershipDays:365,currency:'BDT',dateFormat:'DD MMM YYYY',pageSize:25,notifications:true,vaultPassword:Folio.config.vaultPassword,profileName:'Demo Administrator',profileEmail:Folio.config.email});
