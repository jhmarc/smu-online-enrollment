// Authentication: login and logout
function login(){const n=$("lu").value.trim().toLowerCase(),pw=$("lp").value,matches=S.users.filter(x=>String(x.u).trim().toLowerCase()==n&&x.p==pw);
 if(matches.length!=1){$("le").textContent="Incorrect email/username or password. Students must use their registered email.";return}
 const u=matches[0];
 S.user=u;if(u.role=="Student")S.sel=u.sid;view="Dashboard";render()}
function setupAdmin(){
 const name=$("an").value.trim(),username=$("au").value.trim().toLowerCase(),password=$("ap").value,confirm=$("ac").value,err=m=>{$("ae").textContent=m};
 if(S.users.some(u=>u.role=="Administrator"&&!u.demo))return err("An administrator account already exists. Please log in.");
 if(!name||!username||!password||!confirm)return err("Complete all fields.");
 if(!/^\S+@\S+\.\S+$/.test(username))return err("Enter a valid email address for the administrator username.");
 if(S.users.some(u=>String(u.u).trim().toLowerCase()==username))return err("That username is already in use.");
 if(password.length<12)return err("Use a password with at least 12 characters.");
 if(password!==confirm)return err("The passwords do not match.");
 S.users.push({u:username,p:password,role:"Administrator",name});save();page="login";render();
 $("lu").value=username;$("le").textContent="Administrator account created. Sign in with your new credentials.";
}
function logout(){S.user=null;page="home";render()}
function useDemoLogin(){$("lu").value="demo@smu.edu.ph";$("lp").value="Demo123!";login()}

function nextNo(){let n=S.students.length+1,no;do{no="2026-"+String(n++).padStart(4,"0")}while(S.students.some(s=>s.no==no));return no}
function register(){
 const g=id=>$(id).value.trim(),err=m=>{$("le").textContent=m},f=g("rf"),l=g("rl"),b=g("rb"),e=g("re").toLowerCase();
 if(!f||!l||!b||!e)return err("Please fill in first name, last name, birth date and email.");
 if(!/^\S+@\S+\.\S+$/.test(e))return err("Enter a valid email address.");
 if(S.students.some(s=>s.email?.trim().toLowerCase()==e))return err("This email is already registered. Log in with it or contact the Registrar.");
 if(S.students.some(s=>s.first.toLowerCase()==f.toLowerCase()&&s.last.toLowerCase()==l.toLowerCase()&&s.birth==b))return err("You are already registered. Please log in using your registered email.");
 const id=Date.now(),no=nextNo(),pw="smu"+Math.floor(1000+Math.random()*9000);
 S.students.push({id,no,first:f,middle:g("rm"),last:l,birth:b,gender:$("rg").value,email:e,contact:g("rc"),pid:+$("rp").value,year:+$("ry").value,on:1});
 S.users.push({u:e,p:pw,role:"Student",sid:id,name:f+" "+l});
 issued={no,pw,email:e,name:f+" "+l};save();page="done";render()}
function goLogin(){page="login";render();$("lu").value=issued.email;$("lp").focus()}
