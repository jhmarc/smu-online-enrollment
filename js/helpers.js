// Helpers: roles/access, formatting, assessment and balance computation
let view="Dashboard",page="home";const ACC={Administrator:NAV,Registrar:["Dashboard","Students","Enrollment","Confirmation"],Cashier:["Dashboard","Payment","Confirmation"],Coordinator:["Dashboard","Programs","Courses"],Student:["Dashboard","Enrollment","Payment","Confirmation"]};const EN=()=>S.user.role=="Student"?S.enrollments.filter(e=>e.sid==S.user.sid):S.enrollments;const $=id=>document.getElementById(id);
const peso=n=>"₱"+Number(n).toLocaleString();
const by=(a,id)=>a.find(x=>x.id==id);
const toast=(m,bad)=>{const t=$("toast");t.textContent=m;t.className=bad?"err":"";t.style.display="block";clearTimeout(t.h);t.h=setTimeout(()=>t.style.display="none",3000)};
const nameOf=s=>s.first+" "+s.last;
function calc(ids){const cs=ids.map(id=>by(S.courses,id)),u=cs.reduce((a,c)=>a+c.units,0),oth=(cs.some(c=>c.lab>0)?FEE.lab:0)+FEE.misc+FEE.reg;return{units:u,tuition:u*FEE.perUnit,other:oth,total:u*FEE.perUnit+oth}}
function assess(e){return calc(e.courses)}
const avail=s=>S.courses.filter(c=>c.on&&c.pid==s.pid&&c.year==s.year&&c.sem==S.term);
const paid=e=>S.payments.filter(p=>p.eid==e.id).reduce((a,p)=>a+p.amt,0);
function go(v){view=v;render()}
const opts=(a,l,sel)=>a.map(x=>`<option value="${x.id}" ${x.id==sel?"selected":""}>${l(x)}</option>`).join("");
