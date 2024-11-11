class Education{
    constructor(institution,period,degree){
        this.institution=institution;
        this.period=period;
        this.degree=degree;
    }
}
class Experience{
    constructor(role,period,company,description){
        this.role=role;
        this.period=period;
        this.company=company;
        this.description=description;
    }
}
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
    constructor(firstName,lastName,email,tel,gitHub,linkedIn,group){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.tel=tel;
        this.gitHub=gitHub;
        this.linkedIn=linkedIn;
        this.group=group;
        this.educations=[];
        this.experiences=[];
        this.projects=[];
    }
}

//************* index page   *************// 

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const gitHub=document.getElementById('gitHub');
    const linkedIn=document.getElementById('linkedIn');
    const group = document.getElementById('group');
    const inputs = document.querySelectorAll('input, select');
    let  students = [];


function addStudent(){
    if(validStudent()){
        const newStudent = new  Student(firstName.value.trim(),lastName.value.trim(),email.value,tel.value,gitHub.value,linkedIn.value,group.value);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        students.push(newStudent);
        window.localStorage.setItem("students", JSON.stringify(students));
        document.getElementById('form').reset();
        inputs.forEach(input => {input.style.borderColor = '';});
        window.location.href = "education.html";
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
    if(gitHub.value.trim() == ""){
        showError("gitHubError","Please enter the link of your GitHub profile.");
        gitHub.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^(https:\/\/)?github\.com\/([a-zA-Z0-9-]+)\/?$/.test(gitHub.value)){
            showError("gitHubError","Please enter a valid link of your GitHub profile.");
            gitHub.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("gitHubError");
            gitHub.style.borderColor="var(--success)";
        } 
    if(linkedIn.value.trim() == ""){
        showError("linkedInError","Please enter the link of your LinkedIn profile.");
        linkedIn.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^(https:\/\/)?(www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)\/?$/.test(linkedIn.value)){
            showError("linkedInError","Please enter a valid link of your LinkedIn profile.");
            linkedIn.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("linkedInError");
            linkedIn.style.borderColor="var(--success)";
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
//************* Education Page   *************// 

    const institution = document.getElementById('institution');
    const periodEduc = document.getElementById('period');
    const degree = document.getElementById('degree');

function addEducation(){
    if(validEducation()){
        const newEducation = new Education(institution.value,periodEduc.value,degree.value);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        let i = students.length-1;
        const student = students[i];
        student.educations.push(newEducation);
        educationCart(newEducation);
        window.localStorage.setItem("students", JSON.stringify(students));
        document.getElementById('form').reset();
        inputs.forEach(input => {input.style.borderColor = '';});
    }
}

function validEducation(){
    let valid=true;
    if(institution.value.trim() == ""){
        showError("institutionError","Please enter the name of the institution.");
        institution.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(institution.value)){
            showError("institutionError","Please enter a valid name  for the institution.");
            institution.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("institutionError");
            institution.style.borderColor="var(--success)";
        }

    if(periodEduc.value == ""){
        showError("periodError","Please enter the start and the end date of the institution.");
        periodEduc.style.borderColor="var(--error)";
        valid=false;
        }else if(!/^(0[1-9]|1[0-2])\.(19[0-9]{2}|201[0-9]|202[0-4])\s-\s(0[1-9]|1[0-2])\.(19[0-9]{2}|201[0-9]|202[0-4])$/.test(periodEduc.value)){
            showError("periodError","Please enter a valid the start and the end date for the institution .");
            periodEduc.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("periodError");
            periodEduc.style.borderColor="var(--success)";
        }

        if(degree.value.trim() == ""){
            showError("degreeError","Please enter the name of the degree.");
            degree.style.borderColor="var(--error)";
            valid=false;
        }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(degree.value)){
                showError("degreeError","Please enter a valid name for the degree.");
                degree.style.borderColor="var(--error)";
                valid=false;
            }else{
                hideError("degreeError");
                degree.style.borderColor="var(--success)";
            }
        
    return valid;
}

function educationCart(education){
    const educationList = document.getElementById('educationList');
    let educationItem = document.createElement('div');
    educationItem.className="educationItem";
    educationItem.innerHTML = `
                                <h3>${education.degree}</h3>
                                <h5>${education.period}</h5>
                                <p> ${education.institution}</p>`;
    educationList.appendChild(educationItem);
}

//************* Experiences Page   *************// 

const role = document.getElementById('role');
const periodExp = document.getElementById('period');
const company = document.getElementById('company');
const description = document.getElementById('description');

function addExperience(){
    if(validExperience()){
    const newExperience = new Experience(role.value,periodExp.value,company.value,description.value);
    students = JSON.parse(window.localStorage.getItem("students")) || [];
    let i = students.length-1;
    const student = students[i];
    student.experiences.push(newExperience);
    experienceCart(newExperience);
    window.localStorage.setItem("students", JSON.stringify(students));
    document.getElementById('form').reset();
    inputs.forEach(input => {input.style.borderColor = '';});
    }
}

function validExperience(){
    let valid=true;
    if(role.value.trim() == ""){
    showError("roleError","Please enter the name of the role.");
    role.style.borderColor="var(--error)";
    valid=false;
    }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(role.value)){
        showError("roleError","Please enter a valid name  for the role.");
        role.style.borderColor="var(--error)";
        valid=false;
    }else{
        hideError("roleError");
        role.style.borderColor="var(--success)";
    }
    if(company.value.trim() == ""){
        showError("companyError","Please enter the name of the company.");
        company.style.borderColor="var(--error)";
        valid=false;
    }else if(!/^[a-zA-Z0-9\s\._'-]+$/.test(company.value)){
            showError("companyError","Please enter a valid name for the company.");
            company.style.borderColor="var(--error)";
            valid=false;
        }else{
            hideError("companyError");
            company.style.borderColor="var(--success)";
        }

    if(periodExp.value == ""){
    showError("periodError","Please enter the start date and the end date.");
    periodExp.style.borderColor="var(--error)";
    valid=false;
    }else if(!/^(0[1-9]|1[0-2])\.(19[0-9]{2}|201[0-9]|202[0-4])\s-\s(0[1-9]|1[0-2])\.(19[0-9]{2}|201[0-9]|202[0-4])$/.test(periodExp.value)){
        showError("periodError","Please enter a valid start date and end date .");
        periodExp.style.borderColor="var(--error)";
        valid=false;
    }else{
        hideError("periodError");
        periodExp.style.borderColor="var(--success)";
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
    return valid;
}

function experienceCart(experience){
    const experienceSection = document.getElementById('experiencesList');
    let experienceItem = document.createElement('div');
    experienceItem.className="experienceItem";
    experienceItem.innerHTML = `
                                <h3> ${experience.role} - ${experience.company}</h3>
                                <h5> ${experience.period}</h5>
                                <p>${experience.description}</p>`;
    experienceSection.appendChild(experienceItem);
     
}


//************* Project page   *************// 

    const title = document.getElementById('title');
    const link = document.getElementById('link');
    const date = document.getElementById('date');
    const currentDate = new Date().toISOString().split('T')[0];
    let skills;
   
function addProject(){
    if(validPoject()){
        skills =  Array.from(document.querySelectorAll('input[name="skills"]:checked'), (checkbox) => checkbox.value);
        const newProject = new Project (title.value,description.value,link.value,date.value,skills);
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

function projectCart(project){
    const projectsList = document.getElementById('projectsList');
    let projectItem = document.createElement('div');
    projectItem.className="projectItem";
    projectItem.innerHTML= `<h3>${project.title}</h3>
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
    projectsList.appendChild(projectItem);
     
}
//************* portfolio page   *************// 

function portfolioPage(){

    students = JSON.parse(window.localStorage.getItem("students")) || [];
    let i = students.length-1;
    const student = students[i];
    
    if (student.projects.length === 0) {
        confirm();
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
        document.getElementById("logo").innerHTML=`${student.firstName} ${student.lastName}`;
        const home = document.getElementById('about');
        let personInfo = document.createElement('div');
        personInfo.className='personInfo'
        personInfo.innerHTML = `
                                <h2>Hello, I'm  ${student.firstName} ${student.lastName}</h2>
                                <p>Passionate Web Weveloper with experience in front-end and back-end.</br>
                                   I love building beautiful and functional websites.</p>
                                <a href="#projects" class="btnPortfolio">View my portfolio</a>`;
        home.appendChild(personInfo);
        let icon = document.createElement('div');
        icon.className='socialLinks'
        icon.innerHTML = `<ul>
                                <a href="${student.gitHub}" target="_blank" ><i class="fab fa-github"></i></a>
                                <a href="https://${student.linkedIn}"target="_blank"><i class="fab fa-linkedin"></i></a>
                                <a href="mailto:${student.email}"><i class="fas fa-envelope"></i></a>
                                <a href="${student.tel}"><i class="fab fa-whatsapp"></i> </a>
                            </ul>
                        </div>
                       `;
        home.appendChild(icon);

        const educations = student.educations || [];
        if(educations.length > 0){
            for(let i=0; i<educations.length;i++){
                educationCart(educations[i]);
            }
        }else{
            document.getElementById('education').style.display='none';
            document.getElementById('educNav').style.display='none';
            document.getElementById('educFooter').style.display='none';
        }

        const experiences = student.experiences || [];
        if(experiences.length > 0){
            for(let i=0; i<experiences.length;i++){
                experienceCart(experiences[i]);
            }
        }else{
            document.getElementById('experience').style.display='none';
            document.getElementById('expNav').style.display='none';
            document.getElementById('expFooter').style.display='none';
        }    
        const projects = student.projects || [];
            for(let i=0; i<projects.length;i++){
                projectCart(projects[i]);
            }
        const contact=document.getElementById('contact');
        let contactInfo= document.createElement('div');
        contactInfo.className='contactContent';
        contactInfo.innerHTML = `
                                <form id="contactForm">
                                <p>Feel free to contact me; I will respond as soon as possible.</p>
                                    <input type="text" id="name" placeholder="Your name">
                                    <input type="email" id="email" placeholder="Your email">
                                    <textarea id="message" placeholder="Your message" ></textarea>
                                    <button type="submit">Send</button>
                                </form>
                                <div id="contactInfo">
                                    <h3>Contact Info</h3>
                                    <i class="fas fa-envelope"></i> 
                                    <p>${student.email}</p>
                                    <i class="fas fa-phone"></i> 
                                    <p>${student.tel}</p>
                                </div>`;
        contact.appendChild(contactInfo);

        const footerSection=document.getElementById('footer');
        let footer=document.createElement('div');
        footer.className='footerContent'
        footer.innerHTML=`<p>© 2024 - ${student.firstName} ${student.lastName}. All rights reserved.</p>
                        <div class="socialLinks">
                            <ul>
                                <a href="${student.gitHub}" target="_blank" ><i class="fab fa-github"></i></a>
                                <a href="https://${student.linkedIn}"target="_blank"><i class="fab fa-linkedin"></i></a>
                                <a href="mailto:${student.email}"><i class="fas fa-envelope"></i></a>
                                <a href="${student.tel}"><i class="fab fa-whatsapp"></i> </a>
                            </ul>
                        </div>`;
        footerSection.appendChild(footer);                

    
}
    

function download(){
    
        const content = document.getElementById('content');

        const options = {
            margin:       0,     
            filename:     'mon_portfolio.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, scrollY: 0, scrollX: 0 },
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'landscape' }
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

function confirm() {
    const popDiv = document.getElementById("popUp");
    popDiv.style.display = 'block';
}

function ok(){
    const popDiv = document.getElementById("popUp");
    popDiv.style.display = 'none';
}
