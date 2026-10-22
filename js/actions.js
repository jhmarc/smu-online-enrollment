// Actions: add student/course, cart, submit enrollment, payments, confirmation
function tog(t,id){const x=by(S[t],id);x.on=x.on?0:1;render()}
function addStudent(){const f=$("sf").value.trim(),l=$("sl").value.trim(),n=$("sn").value.trim(),email=$("se").value.trim().toLowerCase(),password=$("spw").value;
 if(!f||!l)return toast("Enter first and last name.",1);
 if(S.students.some(s=>s.no==n))return toast("Student number "+n+" already exists.",1);
 if(!/^\S+@\S+\.\S+$/.test(email))return toast("Enter a valid student email address.",1);
 if(S.students.some(s=>s.email?.trim().toLowerCase()==email))return toast("That email is already assigned to a student.",1);
 if(password.length<8)return toast("Set a student password with at least 8 characters.",1);
 const id=Date.now();S.students.push({id,no:n,first:f,last:l,email,pid:+$("sp").value,year:+$("sy").value,on:1});S.users.push({u:email,p:password,role:"Student",sid:id,name:f+" "+l});toast("Student saved.");render()}
function editCourse(id){const c=by(S.courses,id);if(!c)return;S.cf=c.pid;S.cfy=0;S.editCourseId=id;render()}
function cancelCourseEdit(){S.editCourseId=0;render()}
function saveCourse(){const id=+S.editCourseId||0,existing=by(S.courses,id),code=$("cc").value.trim().toUpperCase(),title=$("ct").value.trim(),pid=S.cf||1,lec=Number($("cl").value),lab=Number($("cb").value),units=Number($("cu").value),year=+$("cy").value,sem=$("cs").value;
 if(!code||!title)return toast("Enter course code and title.",1);
 if(!Number.isFinite(lec)||!Number.isFinite(lab)||!Number.isFinite(units)||lec<0||lab<0||units<1)return toast("Enter valid lecture, lab, and unit values.",1);
 if(S.courses.some(c=>c.id!=id&&c.pid==pid&&c.code.toLowerCase()==code.toLowerCase()))return toast(code+" already exists in this program.",1);
 const data={id:id||Date.now(),code,title,lec,lab,units,pid,year,sem,pre:$("cp").value.trim(),on:existing?existing.on:1};
 if(existing){Object.assign(existing,data);toast("Course updated.")}else{S.courses.push(data);toast("Course added.")}
 S.editCourseId=0;render()}
function deleteCourse(id){if(S.enrollments.some(e=>e.courses.includes(id)))return toast("This course is part of a submitted enrollment and cannot be deleted.",1);
 if(!window.confirm("Delete this course from the catalog?"))return;
 S.courses=S.courses.filter(c=>c.id!=id);S.cart=S.cart.filter(courseId=>courseId!=id);if(S.editCourseId==id)S.editCourseId=0;toast("Course deleted.");render()}
function selAll(){const s=by(S.students,S.user.role=="Student"?S.user.sid:S.sel);S.cart=avail(s).map(c=>c.id);render()}
function cart(id){const i=S.cart.indexOf(id);i<0?S.cart.push(id):S.cart.splice(i,1);render()}
function submitEnroll(){const s=by(S.students,S.user.role=="Student"?S.user.sid:S.sel)||S.students[0];
 if(!s)return toast("Register a student first.",1);
 S.sel=s.id;
 if(!s.on)return toast("Student is inactive.",1);
 if(!s.pid)return toast("Assign a program first.",1);
 if(!S.cart.length)return toast("Select at least one course.",1);
 if(S.enrollments.some(e=>e.sid==s.id&&e.term==S.term))return toast("Student is already enrolled for this term.",1);
 const u=calc(S.cart).units;
 if(u>MAXU)return toast("Maximum of "+MAXU+" units exceeded.",1);
 S.enrollments.push({id:Date.now(),sid:s.id,courses:[...S.cart],term:S.term,status:"Pending",ref:"ENR-"+String(S.enrollments.length+1).padStart(4,"0")});
 S.cart=[];toast("Enrollment submitted. Assessment generated.");go("Payment")}
function pay(eid){const e=by(S.enrollments,eid),amt=parseFloat($("pa").value),ref=$("pr").value.trim(),bal=assess(e).total-paid(e);
 if(!(amt>0))return toast("Payment must be greater than zero.",1);
 if(amt>bal)return toast("Payment exceeds balance of "+peso(bal)+".",1);
 if(S.payments.some(p=>p.ref==ref))return toast("Reference "+ref+" is already used.",1);
 S.payments.push({eid,amt,ref,method:$("pm").value,date:new Date().toLocaleDateString()});toast("Payment recorded.");render()}
function confirmE(id){const e=by(S.enrollments,id);
 if(paid(e)<=0)return toast("Record a payment before confirming.",1);
 e.status="Confirmed";toast("Enrollment confirmed.");render()}
