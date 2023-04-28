
// Make Sure the user enters a valid number of subjects
function validateForm() {
    let numInput = document.getElementById("numSubjects");
    if (numInput.value == "") {
        alert("Please enter a valid number of subjects.");
        return false;
    }
    if (isNaN(numInput.value) || numInput.value < 1) {
        alert("Please enter a valid number of subjects.");
        return false;
    }
    if (numInput.value > 30) {
        alert("max valid number of subjects is: 30");
        return false;
      }
    createInputs();
  return true;
}


// Create the inputs for the user to enter their grades
function createInputs() {
    let numSubjects = document.getElementById("numSubjects").value;
    let subjectInputs = document.getElementById("subjectInputs");
    let firstInput = document.getElementById("numSubjects");
    let nextBtn = document.getElementById("next-btn");
    let card = document.getElementById("btn-contaner");
    let userCard = document.getElementById("user-card");

    // Clear any existing inputs
    subjectInputs.innerHTML = "";
    nextBtn.remove();
    firstInput.style.display = 'none';




    // Set a new button (Calculate Average button)
    let avgBtn = document.createElement('button');
    avgBtn.setAttribute('class', 'avgBtn btb btn-primary');
    avgBtn.setAttribute('id', 'avgBtn');
    avgBtn.setAttribute('type', 'button');
    avgBtn.setAttribute('onclick', 'calculateAverage()');
    avgBtn.textContent = 'Calculate Average';
    avgBtn.style.borderRadius = '10px';
    avgBtn.style.width = '20rem';
    avgBtn.style.fontFamily =  'Ubuntu';
    card.appendChild(avgBtn);
    userCard.style.display = 'grid';


    for (let i = 1; i <= numSubjects; i++) {
        let aDiv1 = document.createElement('div');
        let aDiv2 = document.createElement('div');
        let NameInput = document.createElement("input");
        NameInput.setAttribute('class', 'name-input');
        NameInput.setAttribute('type', 'text');
        NameInput.setAttribute('name', `subject${i}Name`);
        NameInput.setAttribute('placeholder', `Name of subject #${i}`);

        let label = document.createElement("h4");
        label.innerHTML = `Subject #${i}`;
        label.style.margin = '0';
        // label.style.color='#01141c';

        let gradeInput = document.createElement("input");
        gradeInput.setAttribute('class', 'grade-input');
        gradeInput.setAttribute('type', 'number');
        gradeInput.setAttribute('name', `subject${i}Grade`);
        gradeInput.setAttribute('min', '0');
        gradeInput.setAttribute('max', '100');
        gradeInput.setAttribute('placeholder', 'Grade (out of 100)');
        gradeInput.style.marginBottom = '1.5rem';



        aDiv1.appendChild(NameInput);
        aDiv2.appendChild(gradeInput);

        userCard.appendChild(label);
        userCard.appendChild(aDiv1);
        userCard.appendChild(aDiv2);

    }

}

function calculateAverage() {
    const numSubjects = document.getElementById("numSubjects").value;
    const results = document.getElementById("results");
    results.innerHTML = "";

    let totalGrade = 0;
    let totalGPA = 0;
    let totalFrench = 0;
    let totalHungarian = 0;
    let validInputs = true;

    for (let i = 1; i <= numSubjects; i++) {
        const grade = parseInt(document.getElementsByName(`subject${i}Grade`)[0].value);

        if (isNaN(grade)) {
            validInputs = false;
            break;
        }

        totalGrade += grade;
        totalGPA += calculateGPA(grade);
        totalFrench += calculateFrench(grade);
        totalHungarian += calculateHungarian(grade);
    }

    if (!validInputs) {
        results.innerHTML = "Please enter valid grades for all subjects";
        return;
    }

    const averageGrade = totalGrade / numSubjects;
    const averageGPA = totalGPA / numSubjects;
    const averageFrench = totalFrench / numSubjects;
    const averageHungarian = totalHungarian / numSubjects;

    results.innerHTML = `
      <p>Your average grade in percentage is: ${averageGrade}%</p>
      <p>Your average GPA is: ${averageGPA.toFixed(2)}</p>
      <p>Your average French grade is: ${averageFrench.toFixed(2)}</p>
      <p>Your average Hungarian grade is: ${averageHungarian.toFixed(2)}</p>
    `;
}

function calculateGPA(grade) {
    if (grade >= 90) {
        return 4.0;
    } else if (grade >= 80) {
        return 3.0;
    } else if (grade >= 70) {
        return 2.0;
    } else if (grade >= 60) {
        return 1.0;
    } else {
        return 0.0;
    }
}

function calculateFrench(grade) {
    return grade / 20.0;
}

function calculateHungarian(grade) {
    return grade / 5.0;
}
