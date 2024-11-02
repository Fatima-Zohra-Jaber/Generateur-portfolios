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

function addStudent(){
    const newStudent = new  Student(firstName.value,lastName.value,email.value,tel.value,group.value);
    let  students = JSON.parse(window.localStorage.getItem("students")) || [];
    students.push(newStudent);
    window.localStorage.setItem("students", JSON.stringify(students));
    window.location.href = "projets.html";
}

function addProject(){
    const title = document.getElementById('title');
    const link = document.getElementById('link');
    const date = document.getElementById('date');
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked'), checkbox => checkbox.value);
    // const skills =[];
    // skillsBox.forEach(function(checkbox) {
    //     skills.push(checkbox.value);
    // });

    console.log(skills);
    const newProject = new Project(title.value,link.value,date.value,skills);
    let  students = JSON.parse(window.localStorage.getItem("students")) || [];
    let i = students.length-1;
    const student = students[i];
    student.projects.push(newProject);
    window.localStorage.setItem("students", JSON.stringify(students));
}


// Appeler showStudent uniquement si la page est portfolio.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith("portfolio.html")) {
        showStudent(); 
    }
});

function showStudent(){
    let  students = JSON.parse(window.localStorage.getItem("students")) || [];
    let i = students.length-1;
    const student = students[i];
    const personSection = document.getElementById('studentSection');
    let personInfo = document.createElement('div');
    personInfo.innerHTML = `<p>First name : ${student.firstName}</p>
                            <p>Last name : ${student.lastName}</p>
                            <p>E-mail : ${student.email}</p>
                            <p>Phone : ${student.tel}</p>
                            <p>Group : ${student.group}</p>`;
    personSection.appendChild(personInfo);
    
    const projects = student.projects || [];
    if (projects.length === 0) {
        projectsSection.innerHTML += "<p>No projects found.</p>";
    }else{
        for(let i=0; i<projects.length;i++){
            const projectsSection = document.getElementById('projectsSection');
        let projectSection = document.createElement('div');
        projectSection.innerHTML = `<h3> Project num ${(i+1)}</h3>
                                    <p>Title: ${projects[i].title}</p>
                                    <p>GitHub link: ${projects[i].gitHubLink}</p>
                                    <p>Date: ${projects[i].date}</p>
                                    <p>Skills: ${projects[i].skills.join(', ')}</p>`;
        projectsSection.appendChild(projectSection);
        }
    }
    
}
window.localStorage.removeItem("0");
// function showProject(i){
    
    
// }
// //localStorage
// window.localStorage.setItem("student", JSON.stringify(student));
// window.localStorage.getItem("key");
// window.localStorage.student;
// window.localStorage.removeItem("key");
// window.localStorage.clear();
// window.localStorage.key(i);