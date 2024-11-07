class Project{
    constructor(title,description,link,date,skills){
        this.title=title;
        this.description=description;
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
    const inputs = document.querySelectorAll('input, select');
    let  students = [];


function addStudent(){
    if(validStudent()){
        const newStudent = new  Student(firstName.value.trim(),lastName.value.trim(),email.value,tel.value,group.value);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        students.push(newStudent);
        window.localStorage.setItem("students", JSON.stringify(students));
        document.getElementById('form').reset();
        inputs.forEach(input => {input.style.borderColor = '';});
        window.location.href = "projets.html";
    }
}

function validStudent(){
    let valid=true;
    const regExpEmail= new RegExp(`^${lastName.value.trim().replace(' ','')}\.${firstName.value.trim().replace(' ','')}\.solicode@gmail.com$`);
    if(firstName.value.trim() == ""){
            showError("firstNameError","Please enter your first name.");
            firstName.style.borderColor="var(--error)";
            valid=false;
    }else if(!/^[a-zA-Z\s']+$/.test(firstName.value.trim())){
            showError("firstNameError","Please enter a valid first name.");
            firstName.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("firstNameError");
            firstName.style.borderColor="var(--success)";
        }

    if(lastName.value.trim() == ""){
            showError("lastNameError","Please enter your last name.");
            lastName.style.borderColor="var(--error)";
            valid=false;
    }else if(!/^[a-zA-Z\s']+$/.test(lastName.value.trim())){
            showError("lastNameError","Please enter a valid last name.");
            lastName.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("lastNameError");
            lastName.style.borderColor="var(--success)";
        }

    if(email.value.trim() == ""){
        showError("emailError","Please enter your email address.");
        email.style.borderColor="var(--error)";
        valid=false;
    }else if(!regExpEmail.test(email.value.trim())){
            showError("emailError","Please enter a valid Gmail address");
            email.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("emailError");
            email.style.borderColor="var(--success)";
        }
    
    if(tel.value == ""){
        showError("telError","Please enter your phone number.");
        tel.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^\+212\d{3}-\d{2}-\d{2}-\d{2}$/.test(tel.value)){
            showError("telError","Please enter a valid phone number.");
            tel.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("telError");
            tel.style.borderColor="var(--success)";
        }

    if(group.value == ""){
        showError("groupError","Please select your group.");
        group.style.borderColor="var(--error)";
        valid=false;
    }else{
            hideError("groupError");
            group.style.borderColor="var(--success)";
    } 
    return valid;
}

//************* student page   *************// 

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const link = document.getElementById('link');
    const date = document.getElementById('date');
    let skills;
   
    
function addProject(){
    if(validPoject()){
        skills =  Array.from(document.querySelectorAll('input[name="skills"]:checked'), (checkbox) => checkbox.value);
        const newProject = new Project(title.value,description.value,link.value,date.value,skills);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        let i = students.length-1;
        const student = students[i];
        student.projects.push(newProject);
        projectCart(newProject);
        window.localStorage.setItem("students", JSON.stringify(students));
        document.getElementById('form').reset();
        inputs.forEach(input => {input.style.borderColor = '';});
    }
}

function validPoject(){
    let valid=true;
    let currentDate = new Date().toISOString().split('T')[0];
    if(title.value.trim() == ""){
        showError("titleError","Please enter the title of the project.");
        title.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(title.value)){
            showError("titleError","Please enter a valid title for the project.");
            title.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("titleError");
            title.style.borderColor="var(--success)";
        }

        if(description.value.trim() == ""){
            showError("descriptionError","Please enter the description of the project.");
            description.style.borderColor="var(--error)";
            valid=false;
        }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(description.value)){
                showError("descriptionError","Please enter a valid description for the project.");
                description.style.borderColor="var(--error)";
                valid=false;
            }else{
                hideError("descriptionError");
                description.style.borderColor="var(--success)";
            }

    if(link.value.trim() == ""){
        showError("linkError","Please enter the link of the project.");
        link.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^(https:\/\/)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+(\.git)?$/.test(link.value)){
            showError("linkError","Please enter a valid GitHub link of the project.");
            link.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("linkError");
            link.style.borderColor="var(--success)";
        }

    if(date.value == ""){
        showError("dateError","Please enter the date of the project.");
        date.style.borderColor="var(--error)";
        valid=false;
        }else if(date.value > currentDate ){
            showError("dateError","Please enter a valid date for the project .");
            date.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("dateError");
            date.style.borderColor="var(--success)";
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

function portfolioPage(){

    students = JSON.parse(window.localStorage.getItem("students")) || [];
    let i = students.length-1;
    const student = students[i];
    
    if (student.projects.length === 0) {
        alert('Please add at least one project');
        return;}
         window.location.href="portfolio.html";
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith("portfolio.html")) {
        showStudent(); 
    }
});

function showStudent(){
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        let i = students.length-1;
        const student = students[i];
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
    

function download(){
    
        const content = document.getElementById('content');

        const options = {
            margin:       0,        
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
    projectSection.className="projectCard ";
    projectSection.innerHTML = `<h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <div class="date">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span> ${project.date}</span>
                                </div>
                                <a href="${project.gitHubLink}" class="githubLink">
                                    <i class="fab fa-github"></i>
                                    ${project.gitHubLink}
                                </a>
                                <div class="skills">
                                    ${project.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                                </div>`
    projectsSection.appendChild(projectSection);
     
}



// //localStorage
// window.localStorage.setItem("student", JSON.stringify(student));
// window.localStorage.getItem("key");
// window.localStorage.student;
// window.localStorage.removeItem("key");
// window.localStorage.clear();
// window.localStorage.key(i);
