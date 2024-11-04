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

   
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const group = document.getElementById('group');
    let  students = [];

function addStudent(){
    if(validStudent()){
        const newStudent = new  Student(firstName.value,lastName.value,email.value,tel.value,group.value);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        students.push(newStudent);
        window.localStorage.setItem("students", JSON.stringify(students));
        window.location.href = "projets.html";
    }
}

function validStudent(){
    let valid=true;
    if(firstName.value == ""){
        showError("firstNameError","Please enter your first name.");
        valid=false;
    }else if(!/^[a-zA-Z\s']+$/.test(firstName.value)){
            showError("firstNameError","Please enter a valid first name.");
            valid=false;
        }else{
            hideError("firstNameError");
        }

    if(lastName.value == ""){
        showError("lastNameError","Please enter your last name.");
        valid=false;
    }else if(!/^[a-zA-Z\s']+$/.test(lastName.value)){
            showError("lastNameError","Please enter a valid last name.");
            valid=false;
        }else{
            hideError("lastNameError");
        }

    if(email.value == ""){
        showError("emailError","Please enter your email address.");
        valid=false;
    }else if(!/^[a-zA-Z0-9\s'-_.]+@gmail.\w+$/.test(email.value)){
            showError("emailError","Please enter a valid Gmail address");
            valid=false;
        }else{
            hideError("emailError");
        }
    
    if(tel.value == ""){
        showError("telError","Please enter your phone number.");
        valid=false;
    }else if(!/^0(6||7||8)\d{8}$/.test(tel.value)){
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

function showError(id,msg){
    document.getElementById(id).innerHTML=msg;
}

function hideError(id){
    document.getElementById(id).innerHTML="";
}

    const title = document.getElementById('title');
    const link = document.getElementById('link');
    const date = document.getElementById('date');
    let skills;
    
function addProject(){
    if(validPoject()){
        skills =  Array.from(document.querySelectorAll('input[name="skills"]:checked'), (checkbox) => checkbox.value);
        console.log(skills);
        const newProject = new Project(title.value,link.value,date.value,skills);
        students = JSON.parse(window.localStorage.getItem("students")) || [];
        let i = students.length-1;
        const student = students[i];
        student.projects.push(newProject);
        window.localStorage.setItem("students", JSON.stringify(students));
    }
}

function validPoject(){
    let valid=true;
    if(title.value == ""){
        showError("titleError","Please enter the title of the project.");
        valid=false;
    }else if(!/^[a-zA-Z0-9\s\.-_']+$/.test(title.value)){
            showError("titleError","Please enter a valid title for the project.");
            valid=false;
        }else{
            hideError("titleError");
        }

    if(link.value == ""){
        showError("linkError","Please enter the link of the project.");
        valid=false;
    }else if(!/^(https:\/\/)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+(\.git)?$/.test(link.value)){
            showError("linkError","Please enter a valid GitHub link of the project.");
            valid=false;
        }else{
            hideError("linkError");
        }

    if(date.value == ""){
        showError("dateError","Please enter the date of the project.");
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

// Appeler showStudent uniquement si la page est portfolio.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith("portfolio.html")) {
        showStudent(); 
    }
});

// window.addEventListener('popstate', () => {
//     if (window.location.href.includes("portfolio.html")) {
//         showStudent();
//     }
// });

function showStudent(){
    // window.location.href = 'portfolio.html';
    let  students = JSON.parse(window.localStorage.getItem("students")) || [];
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
    if (projects.length === 0) {
        projectsSection.innerHTML += "<p>No projects found.</p>";
    }else{
        for(let i=0; i<projects.length;i++){
            const projectsSection = document.getElementById('projectsSection');
        let projectSection = document.createElement('div');
        projectSection.className="project";
        projectSection.innerHTML = ` <h3>${projects[i].title}</h3>
                                    <p><span>GitHub link:</span> <a href="${projects[i].gitHubLink}">${projects[i].gitHubLink}</a> </p>
                                    <p><span>Date:</span> ${projects[i].date}</p>
                                    <p><span>Skills:</span> ${projects[i].skills.join(', ')}</p>`;
        projectsSection.appendChild(projectSection);
        }
    }
    
}

// document.getElementById('download').addEventListener('click', download());

function download(){
    
        // Sélectionner le contenu à exporter
        const content = document.getElementById('content');

        // Options pour la génération du PDF
        const options = {
            margin:       0.5,        
            filename:     'mon_portfolio.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Convertir le contenu en PDF
        html2pdf().set(options).from(content).save();
    
}

// function downloadImage(url, filename) {
//     // Crée un élément <a>
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename; // Nom du fichier à télécharger

//     // Ajoute l'élément <a> au document pour qu'il soit cliquable
//     document.body.appendChild(a);

//     // Simule un clic pour démarrer le téléchargement
//     a.click();

//     // Supprime l'élément <a> du document
//     document.body.removeChild(a);
// }

// // Exemple d'utilisation
// downloadImage('https://example.com/image.jpg', 'mon_image.jpg');
// document.getElementById('fileInput').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         alert(`Fichier sélectionné : ${file.name}`);
//         // Ici, tu peux ajouter du code pour traiter le fichier sélectionné
//     }
// });

// //localStorage
// window.localStorage.setItem("student", JSON.stringify(student));
// window.localStorage.getItem("key");
// window.localStorage.student;
// window.localStorage.removeItem("key");
// window.localStorage.clear();
// window.localStorage.key(i);
