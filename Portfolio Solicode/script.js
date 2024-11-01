class Project{
    constructor(title,skills,link,date){
        this.title=title;
        this.skills=skills;
        this.gitHubLink=link;
        this.date=date;
    }
}

class Student{
    constructor(firstName,lastName,email,tel,group){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.tel=tel;
        this.group=group;
        this.projets=[];
    }
    addProjet(projet) {
        this.projets.push(projet);
      }
}

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const group = document.getElementById('group');

function addStudent(){
    const student = new  Student(firstName.value,lastName.value,email.value,tel.value,group.value);
    // window.localStorage.setItem("student", JSON.stringify(student));
    // console.log("Étudiant sauvegardé :", student);
    
    // Récupère la liste d'étudiants depuis le stockage local
    const students = JSON.parse(window.localStorage.getItem("students")) || [];

    // Ajoute le nouvel étudiant à la liste
    students.push(student);

    // Sauvegarde la liste mise à jour dans le stockage local
    window.localStorage.setItem("students", JSON.stringify(students));
    console.log("Étudiant ajouté et sauvegardé :", student);

}

// //localStorage
// window.localStorage.setItem("student", JSON.stringify(student));
// window.localStorage.getItem("key");
// window.localStorage.student;
// window.localStorage.removeItem("key");
// window.localStorage.clear();
// window.localStorage.key(i);