class Project{
    constructor(title,link,date,skills){
        this.title=title;
        this.gitHubLink=link;
        this.date=date;
        this.skills=skills;
    }
}

class Student{
    constructor(firstName,lastName,email,tel,group){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.tel=tel;
        this.group=group;
        this.projects=[];
    }
}

//************* index page   *************// 

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const group = document.getElementById('group');
    let  students = [];


function addStudent(){
    if(validStudent()){
        const newStudent = new  Student(firstName.value.trim(),lastName.value.trim(),email.value,tel.value,group.value);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        students.push(newStudent);
        window.localStorage.setItem("students", JSON.stringify(students));
        document.getElementById('form').reset();
        window.location.href = "projets.html";
    }
}

function validStudent(){
    let valid=true;
    const regExpEmail= new RegExp(`^${lastName.value.trim().replace(' ','')}\.${firstName.value.trim().replace(' ','')}\.solicode@gmail.com$`);
    if(firstName.value.trim() == ""){
            showError("firstNameError","Please enter your first name.");
            valid=false;
    }else if(!/^[a-zA-Z\s']+$/.test(firstName.value.trim())){
            showError("firstNameError","Please enter a valid first name.");
            valid=false;
        }else{
            hideError("firstNameError");
        }

    if(lastName.value.trim() == ""){
            showError("lastNameError","Please enter your last name.");
            valid=false;
    }else if(!/^[a-zA-Z\s']+$/.test(lastName.value.trim())){
            showError("lastNameError","Please enter a valid last name.");
            valid=false;
        }else{
            hideError("lastNameError");
        }

    if(email.value.trim() == ""){
        showError("emailError","Please enter your email address.");
        valid=false;
    }else if(!regExpEmail.test(email.value.trim())){
            showError("emailError","Please enter a valid Gmail address");
            valid=false;
        }else{
            hideError("emailError");
        }
    
    if(tel.value == ""){
        showError("telError","Please enter your phone number.");
        valid=false;
    }else if(!/^\+212\d{3}-\d{2}-\d{2}-\d{2}$/.test(tel.value)){
            showError("telError","Please enter a valid phone number.");
            valid=false;
        }else{
            hideError("telError");
        }

    if(group.value == ""){
        showError("groupError","Please select your group.");
        valid=false;
    }else{
            hideError("groupError");
    } 
    return valid;
}

//************* student page   *************// 

    const title = document.getElementById('title');
    const link = document.getElementById('link');
    const date = document.getElementById('date');
    let skills;
   
    
function addProject(){
    if(validPoject()){
        skills =  Array.from(document.querySelectorAll('input[name="skills"]:checked'), (checkbox) => checkbox.value);
        const newProject = new Project(title.value,link.value,date.value,skills);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        let i = students.length-1;
        const student = students[i];
        student.projects.push(newProject);
        projectCart(newProject);
        window.localStorage.setItem("students", JSON.stringify(students));
        document.getElementById('form').reset();
    }
}

function validPoject(){
    let valid=true;
    let currentDate = new Date();
    // const year= currentDate.getFullYear();
    // const month= currentDate.getMonth();
    // const day=currentDate.getDay();
    // currentDate=`${year}-${month}-${day}`;
    console.log(date.value);
    if(title.value.trim() == ""){
        showError("titleError","Please enter the title of the project.");
        valid=false;
    }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(title.value)){
            showError("titleError","Please enter a valid title for the project.");
            valid=false;
        }else{
            hideError("titleError");
        }

    if(link.value.trim() == ""){
        showError("linkError","Please enter the link of the project.");
        valid=false;
    }else if(!/^(https:\/\/)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+(\.git)?$/.test(link.value)){
            showError("linkError","Please enter a valid GitHub link of the project.");
            valid=false;
        }else{
            hideError("linkError");
        }

    if(date.value > currentDate){
        showError("dateError","Please enter the date of the project.");
        valid=false;
        }else if(date.value > currentDate ){
            showError("linkError","Please enter a valid GitHub link of the project.");
            valid=false;
        }else{
            hideError("dateError");
        }
 skills = Array.from(document.querySelectorAll('input[name="skills"]:checked'));
    if(skills.length === 0){
        showError("skillsError","Please select at least one skill.");
        valid=false;
    }else{
            hideError("skillsError");
    } 
    return valid;
}

//************* portfolio page   *************// 

// document.addEventListener('DOMContentLoaded', () => {
//     if (window.location.pathname.endsWith("portfolio.html")) {
//         showStudent(); 
//     }
// });


function showStudent(){

    let  students = JSON.parse(window.localStorage.getItem("students")) || [];
    let i = students.length-1;
    const student = students[i];
    if(student.projects.length == 0){
        alert('Add project');
    }else{
        window.location.href="portfolio.html"
        const personSection = document.getElementById('studentBlock');
        let personInfo = document.createElement('div');
        personInfo.className='personInfo'
        personInfo.innerHTML = `<h1> ${student.firstName} ${student.lastName}</h1>
                                <h2>Web Developer </h2>
                                <p><i class="fa-solid fa-at"></i>${student.email}</p>
                                <p><i class="fa-solid fa-phone"></i> ${student.tel}</p>
                                <p><i class="fa-solid fa-user-group"></i> ${student.group}</p>`;
        personSection.appendChild(personInfo);
        
        const projects = student.projects || [];
            for(let i=0; i<projects.length;i++){
                projectCart(projects[i]);
            }
    }
}



function download(){
    
        const content = document.getElementById('content');

        const options = {
            margin:       0.5,        
            filename:     'mon_portfolio.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(content).save();
    
}

//************* global functions   *************// 

function showError(id,msg){
    document.getElementById(id).innerHTML=msg;
}

function hideError(id){
    document.getElementById(id).innerHTML="";
}

function projectCart(project){
    const projectsSection = document.getElementById('projectsSection');
    let projectSection = document.createElement('div');
    projectSection.className="project";
    projectSection.innerHTML = ` <h3>${project.title}</h3>
                                <p><span>GitHub link:</span> <a href="${project.gitHubLink}">${project.gitHubLink}</a> </p>
                                <p><span>Release in:</span> ${project.date}</p>
                                <p><span>Skills:</span> ${project.skills.join(', ')}</p>`;
    projectsSection.appendChild(projectSection);
}



// //localStorage
// window.localStorage.setItem("student", JSON.stringify(student));
// window.localStorage.getItem("key");
// window.localStorage.student;
// window.localStorage.removeItem("key");
// window.localStorage.clear();
// window.localStorage.key(i);
