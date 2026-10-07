// Main render loop and app start
function render(){
 const u=S.user;$("pub").style.display=u?"none":"block";$("shell").style.display=u?"flex":"none";
 if(!u){$("pub").innerHTML=PUB();return}
 const nv=NAV.filter(n=>ACC[u.role].includes(n));if(!nv.includes(view))view=nv[0];
 $("nav").innerHTML="<h1>"+CREST(48)+"SAINT MARY'S UNIVERSITY<br>ENROLLMENT PORTAL</h1>"+nv.map(n=>`<button class="${n==view?"on":""}" onclick="go('${n}')">${n}</button>`).join("")+`<div style="margin-top:auto;padding:8px 12px;font-size:12px;color:#b9c8ee">${u.name}<br>${u.role}</div><button onclick="logout()">Logout</button>`;
 $("main").innerHTML=V[view]();save();
}

render();
