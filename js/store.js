// Data layer: fees, navigation, seed data, localStorage save/load
const FEE={perUnit:1500,lab:2000,misc:1500,reg:500},MAXU=30;
const NAV=["Dashboard","Students","Programs","Courses","Enrollment","Payment","Confirmation"];

// Curricula. Row format: year|term(1,2,M=midyear)|code|title|lec|lab|units|prerequisite
// BSIT: read from the SMU curriculum sheet (CMO 25 s.2015, effective AY 2024-2025)
const BSIT=`
1|1|CC101|Introduction to Computing|2|3|3|
1|1|CC102|Computer Programming 1|2|3|3|
1|1|GPCOM|Purposive Communication|3|0|3|
1|1|DM101|Discrete Mathematics|3|0|3|
1|1|GFIL1|Komunikasyon sa Akademikong Filipino|3|0|3|
1|1|GRPH|Readings in Philippine History|3|0|3|
1|1|OCW101|Oral Communication in the Workplace|3|0|3|
1|1|PATHFIT1|Movement Competency Training|2|0|2|
1|1|CFE101|God's Journey with His People|3|0|3|
1|1|NSTP1|Foundation of Service|3|0|3|
1|2|HCI101|Introduction to Human Computer Interactions|2|3|3|CC101
1|2|CC103|Computer Programming 2|2|3|3|CC102
1|2|GSTS|Science, Technology and Society|3|0|3|
1|2|PE1|Professional Elective 1|2|3|3|
1|2|GMMW|Mathematics in the Modern World|3|0|3|
1|2|AOC101|Advanced Oral Communication|3|0|3|OCW101
1|2|PATHFIT2|Exercise-Based Fitness Activities|2|0|2|PATHFIT1
1|2|CFE102|Christian Morality in Our Times|3|0|3|
1|2|NSTP2|Social Awareness and Empowerment for Service|3|0|3|NSTP1
1|M|SP101|Social Issues and Professional Practice|3|0|3|HCI101
1|M|QM101|Quantitative Methods|2|3|3|GMMW
1|M|GAA|Art Appreciation|3|0|3|
2|1|CC104|Data Structures and Algorithms|2|3|3|CC103
2|1|PF101|Event-Driven Programming|2|3|3|CC103
2|1|PF102|Object Oriented Programming|2|3|3|CC103
2|1|PE2|Professional Elective 2|2|3|3|
2|1|PEECO|People and the Earth's Ecosystems|3|0|3|
2|1|GCWORLD|The Contemporary World|3|0|3|
2|1|GSELF|Understanding the Self|3|0|3|
2|1|PATHFIT3|Dance, Combative and Outdoor and Adventure Activities|2|0|2|
2|1|CFE103|Catholic Foundation of Mission|3|0|3|
2|2|CC105|Information Management|2|3|3|CC104
2|2|NET101A|Fundamentals of Networking|2|3|3|PF102
2|2|PE3|Professional Elective 3|2|3|3|
2|2|TECHNO101|Technopreneurship|3|0|3|
2|2|GFIL2|Panitikang Pilipino|3|0|3|
2|2|GPIC|Philippine Indigenous Communities|3|0|3|
2|2|PATHFIT4|Sports|2|0|2|
2|2|CFE104|CICM Missionary Identity|3|0|3|CFE103
2|M|IM102|Advanced Database Management System|2|3|3|CC105
2|M|SDP101|System Analysis, Design and Prototyping|2|3|3|CC105
3|1|IAS101|Fundamentals of Information Assurance and Security|2|3|3|CC105
3|1|SE101|Software Engineering|2|3|3|SDP101
3|1|NET102A|Advanced Networking|2|3|3|NET101A
3|1|IPT101|Integrative Programming and Technologies 1|2|3|3|WS101
3|1|PE4|Professional Elective 4|2|3|3|
3|1|GRIZAL|Life and Works of Rizal|3|0|3|
3|2|IAS102A|Advanced Topics of Information Assurance and Security|2|3|3|IAS101
3|2|CAP101|Capstone Project 1|3|0|3|SE101
3|2|CC106|Applications Development and Emerging Technology|2|3|3|SE101
3|2|SIA101A|System Integration and Architecture 1|2|3|3|IPT101
3|2|GETHICS|Ethics|3|0|3|
3|2|PE5|Professional Elective 5|2|3|3|
4|1|SAM101|System Administration and Maintenance|2|3|3|IPT102
4|1|CAP102|Capstone Project 2|2|3|3|CAP101
4|1|DA101A|Data Analytics|2|3|3|SIA101
4|1|IOT101|Internet of Things|2|3|3|
4|2|PRC101|Practicum (486 hours)|6|0|6|CAP102, SAM101, Elective 5, 4th year standing
`;
// BSBA and BSED: SAMPLE curricula built from CHED CMO 17 s.2017 (BSBA) and CMO 74/75 s.2017 (teacher education).
// Replace with the official SMU prospectus. "Major/Specialization Course n" rows are placeholders.
const BSBA=`
1|1|GSELF|Understanding the Self|3|0|3|
1|1|GPCOM|Purposive Communication|3|0|3|
1|1|GMMW|Mathematics in the Modern World|3|0|3|
1|1|BA101|Basic Microeconomics|3|0|3|
1|1|BUS101|Business Communication|3|0|3|
1|1|PATHFIT1|Movement Competency Training|2|0|2|
1|1|NSTP1|National Service Training Program 1|3|0|3|
1|2|GRPH|Readings in Philippine History|3|0|3|
1|2|GAA|Art Appreciation|3|0|3|
1|2|GSTS|Science, Technology and Society|3|0|3|
1|2|BUS102|Business Finance|3|0|3|
1|2|BA102|Human Resource Management|3|0|3|
1|2|PATHFIT2|Exercise-Based Fitness Activities|2|0|2|PATHFIT1
1|2|NSTP2|National Service Training Program 2|3|0|3|NSTP1
2|1|GCWORLD|The Contemporary World|3|0|3|
2|1|GETHICS|Ethics|3|0|3|
2|1|GE1|General Education Elective 1|3|0|3|
2|1|BA201|Good Governance and Social Responsibility|3|0|3|
2|1|MAJ201|Major Course 1|3|0|3|
2|1|MAJ202|Major Course 2|3|0|3|
2|1|PATHFIT3|Dance, Combative and Outdoor Activities|2|0|2|
2|2|GE2|General Education Elective 2|3|0|3|
2|2|BA202|Business Law (Obligations and Contracts)|3|0|3|
2|2|BA203|Business and Transfer Taxation|3|0|3|
2|2|MAJ203|Major Course 3|3|0|3|
2|2|MAJ204|Major Course 4|3|0|3|
2|2|PATHFIT4|Sports|2|0|2|
3|1|GRIZAL|Life and Works of Rizal|3|0|3|
3|1|BA301|International Business and Trade|3|0|3|BA101
3|1|MAJ301|Major Course 5|3|0|3|
3|1|MAJ302|Major Course 6|3|0|3|
3|1|FE1|Free Elective 1|3|0|3|
3|2|BA302|Business Research|3|0|3|3rd year standing
3|2|BA303|Digitalization in Business|3|0|3|
3|2|MAJ303|Major Course 7|3|0|3|
3|2|MAJ304|Major Course 8|3|0|3|
3|2|FE2|Free Elective 2|3|0|3|
4|1|MAJ401|Major Course 9|3|0|3|
4|1|MAJ402|Major Course 10|3|0|3|
4|1|FE3|Free Elective 3|3|0|3|
4|2|PRC401|Practicum (600 hours)|6|0|6|4th year standing
`;
const BSED=`
1|1|GSELF|Understanding the Self|3|0|3|
1|1|GPCOM|Purposive Communication|3|0|3|
1|1|GMMW|Mathematics in the Modern World|3|0|3|
1|1|ED101|The Child and Adolescent Learners and Learning Principles|3|0|3|
1|1|ED102|The Teaching Profession|3|0|3|
1|1|PATHFIT1|Movement Competency Training|2|0|2|
1|1|NSTP1|National Service Training Program 1|3|0|3|
1|2|GRPH|Readings in Philippine History|3|0|3|
1|2|GCWORLD|The Contemporary World|3|0|3|
1|2|GAA|Art Appreciation|3|0|3|
1|2|ED103|Foundation of Special and Inclusive Education|3|0|3|
1|2|ED104|Facilitating Learner-Centered Teaching|3|0|3|
1|2|PATHFIT2|Exercise-Based Fitness Activities|2|0|2|PATHFIT1
1|2|NSTP2|National Service Training Program 2|3|0|3|NSTP1
2|1|GSTS|Science, Technology and Society|3|0|3|
2|1|GETHICS|Ethics|3|0|3|
2|1|GE1|General Education Elective 1|3|0|3|
2|1|ED201|Technology for Teaching and Learning 1|3|0|3|
2|1|ED202|Assessment in Learning 1|3|0|3|
2|1|SPC201|Specialization Course 1|3|0|3|
2|1|PATHFIT3|Dance, Combative and Outdoor Activities|2|0|2|
2|2|GRIZAL|Life and Works of Rizal|3|0|3|
2|2|GE2|General Education Elective 2|3|0|3|
2|2|ED203|The Teacher and the School Curriculum|3|0|3|
2|2|ED204|Building and Enhancing New Literacies Across the Curriculum|3|0|3|
2|2|SPC202|Specialization Course 2|3|0|3|
2|2|SPC203|Specialization Course 3|3|0|3|
2|2|PATHFIT4|Sports|2|0|2|
3|1|ED301|Assessment in Learning 2|3|0|3|ED202
3|1|GE3|General Education Elective 3|3|0|3|
3|1|SPC301|Specialization Course 4|3|0|3|
3|1|SPC302|Specialization Course 5|3|0|3|
3|1|SPC303|Specialization Course 6|3|0|3|
3|2|ED302|Field Study 1 (Observation of Teaching-Learning in Actual School Environment)|3|0|3|
3|2|SPC304|Specialization Course 7|3|0|3|
3|2|SPC305|Specialization Course 8|3|0|3|
3|2|SPC306|Specialization Course 9|3|0|3|
4|1|ED401|Field Study 2 (Participation and Teaching Assistantship)|3|0|3|ED302
4|1|SPC401|Specialization Course 10|3|0|3|
4|1|SPC402|Specialization Course 11|3|0|3|
4|2|ED402|Teaching Internship|6|0|6|ED302, ED401
`;
let cid=0;
const parse=(t,pid)=>t.trim().split("\n").map(r=>{const[y,s,code,title,lec,lab,u,pre]=r.split("|");return{id:++cid,code,title,lec:+lec,lab:+lab,units:+u,pid,year:+y,sem:s,pre:pre||"",on:1}});
const TERM={"1":"1st Semester","2":"2nd Semester","M":"Midyear"};
const ELECTIVES=[["IPT102","Integrative Programming and Technologies 2"],["PT101","Platform Technologies"],["WS101","Web Systems and Technologies"],["PF103","Object-Oriented Programming 2"],["SIA102","System Integration and Architecture 2"],["SA300","SAP and SPSS"],["CSS101","Computer System Servicing"],["MA300","Multimedia Applications"]];
const seed=()=>({
 programs:[{id:1,code:"BSIT",name:"BS Information Technology",dept:"Engineering, Architecture & IT",on:1},{id:2,code:"BSBA",name:"BS Business Administration",dept:"Accountancy & Business",on:1},{id:3,code:"BSED",name:"BS Secondary Education",dept:"Teacher Education & Humanities",on:1}],
 courses:parse(BSIT,1).concat(parse(BSBA,2),parse(BSED,3)),
 students:[],
 enrollments:[],payments:[],cart:[],sel:0,term:"1",cf:1,cfy:0,user:null,users:[]});
let S;try{S=JSON.parse(localStorage.getItem("smu_oes2"))}catch(e){}S=S||seed();
// Remove the old sample student from browsers that already saved the previous seed data.
const demo=S.students.find(s=>s.id==1&&s.no=="2026-0001"&&!s.birth);
if(demo){
 const enrollmentIds=S.enrollments.filter(e=>e.sid==demo.id).map(e=>e.id);
 S.students=S.students.filter(s=>s.id!=demo.id);
 S.users=S.users.filter(u=>!(u.role=="Student"&&u.sid==demo.id));
 S.enrollments=S.enrollments.filter(e=>e.sid!=demo.id);
 S.payments=S.payments.filter(p=>!enrollmentIds.includes(p.eid));
 if(S.sel==demo.id)S.sel=S.students[0]?.id||0;
 if(S.user?.role=="Student"&&S.user.sid==demo.id)S.user=null;
}
S.users=S.users.filter(u=>!(u.role=="Student"&&u.u=="2026-0001"&&u.sid==1&&!S.students.some(s=>s.id==u.sid)));
// Existing student accounts now use the email address on their student record.
S.students.forEach(s=>{
 const u=S.users.find(x=>x.role=="Student"&&x.sid==s.id);
 if(u&&s.email)u.u=s.email.trim().toLowerCase();
});
if(S.user?.role=="Student"){
 S.user=S.users.find(u=>u.role=="Student"&&u.sid==S.user.sid)||null;
}
const save=()=>{try{localStorage.setItem("smu_oes2",JSON.stringify(S))}catch(e){}};
save();
