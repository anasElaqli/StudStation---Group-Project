// Retrieve the selected system from the URL using the URLSearchParams API. 
const urlParams = new URLSearchParams(window.location.search);
const selectedSystem = urlParams.get('system');
// alert(selectedSystem)

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

    if (selectedSystem === "percentage") {
        createInputsPercent();
    }
    else if (selectedSystem === "france") {
        createInputsFrench();
    }
    else if (selectedSystem === "hungary") {
        createInputsHun();
    }
    return true;
}


// Create the inputs for the user to enter their grades in percentage
function createInputsPercent() {
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
    avgBtn.style.fontFamily = 'Ubuntu';
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

        gradeInput.addEventListener('input', function () {
            if (this.value < -100 || this.value > 100) {
                alert("Please enter a valid percentage (-100-100).");
                this.value = ''; // Clear the input field
            }
        });



        aDiv1.appendChild(NameInput);
        aDiv2.appendChild(gradeInput);

        userCard.appendChild(label);
        userCard.appendChild(aDiv1);
        userCard.appendChild(aDiv2);

    }

    // Create the input for the user to enter their wished average grade
    let label2 = document.createElement("h4");
    label2.innerHTML = 'Your aimed average grade:';
    label2.style.margin = '0';
    let wishInput = document.createElement("input");
    wishInput.addEventListener('input', function () {
        if (this.value < -100 || this.value > 100) {
            alert("Please enter a valid percentage (-100-100).");
            this.value = ''; // Clear the input field
        }
    });
    wishInput.setAttribute('class', 'wish-input');
    wishInput.setAttribute('type', 'number');
    wishInput.setAttribute('name', `wish-input`);
    wishInput.setAttribute('placeholder', `What is the average grade that you want to get?`);
    userCard.appendChild(label2);
    userCard.appendChild(wishInput);

}

function calculateAverage() {
    let numSubjects = document.getElementById("numSubjects").value;
    let results = document.getElementById("results");
    results.innerHTML = "";



    let totalGrade = 0;
    let totalGPA = 0;
    let totalFrench = 0;
    let totalHungarian = 0;
    let validInputs = true;
    let maxGrade = 0;
    let minGrade = 0;

    let gradesArray = []; //add grades to an array

    for (let i = 1; i <= numSubjects; i++) {
        const grade = parseInt(document.getElementsByName(`subject${i}Grade`)[0].value);

        if (isNaN(grade)) {
            validInputs = false;
            break;
        }

        // take the max and min grades
        gradesArray.push(grade);


        totalGrade += grade;
        totalGPA += calculateGPA(grade);
        totalFrench += calculateFrench(grade);
        totalHungarian += calculateHungarian(grade);
    }

    if (!validInputs) {
        results.innerHTML = "Please enter valid grades for all subjects";
        alert("Please enter valid grades for all subjects");
        return;
    }

    // take max and min from gradesArray
    maxGrade = Math.max(...gradesArray);
    minGrade = Math.min(...gradesArray);

    let maxResult = document.createElement('div');
    let minResult = document.createElement('div');

    maxResult.innerHTML = `<ul>
    <li>${maxGrade.toFixed(2)}%</li>
    <li>${calculateGPA(maxGrade).toFixed(2)} (GPA)</li>
    <li>${calculateFrench(maxGrade).toFixed(2)} (French System)</li>
    <li>${calculateHungarian(maxGrade).toFixed(2)} (Hungarian System)</li>
    </ul>`;

    minResult.innerHTML = `<ul>
    <li>${minGrade.toFixed(2)}%</li>
    <li>${calculateGPA(minGrade).toFixed(2)} (GPA)</li>
    <li>${calculateFrench(minGrade).toFixed(2)} (French System)</li>
    <li>${calculateHungarian(minGrade).toFixed(2)} (Hungarian System)</li>
    </ul>`;


    const averageGrade = totalGrade / numSubjects;
    const averageGPA = totalGPA / numSubjects;
    const averageFrench = totalFrench / numSubjects;
    const averageHungarian = totalHungarian / numSubjects;

    results.innerHTML = `
    <ul>
      <li>Your average grade in percentage is: <b>${averageGrade.toFixed(2)}%</b></li>
      <li>Your average GPA is: <b>${averageGPA.toFixed(2)}/4.00</b></li>
      <li>Your average French grade is: <b>${averageFrench.toFixed(2)}/20.00</b></li>
      <li>Your average Hungarian grade is: <b>${averageHungarian.toFixed(2)}/5.00</b></li>
    <ul> `;

    let evalution = document.createElement('div');
    let difference = Math.abs(50 - averageGrade).toFixed(2);
    let comparison = averageGrade > 50 ? "more" : "less";
    let wishedGrade = parseFloat(document.getElementsByName('wish-input')[0].value);
    let wishedDifference = Math.abs(wishedGrade - averageGrade).toFixed(2);
    let wishedComparison = averageGrade < wishedGrade ? `away from your goal (${wishedGrade}%)` : `more than you wanted (${wishedGrade}%)`;

    evalution.innerHTML = `<ul>
    <li>${(100 - averageGrade).toFixed(2)}% away from 100%</li>
    <li>${difference}% ${comparison} than 50%</li>
    </ul>
    <h1>${wishedDifference}% ${wishedComparison}</h1>`;

    //Hide grades form
    document.getElementById('calculator-card').style.display = 'none';



    // Create a container element to hold the results
    let showResult = document.getElementById('show-result');
    showResult.appendChild(results);
    let showMax = document.getElementById('show-max');
    showMax.appendChild(maxResult);
    let showMin = document.getElementById('show-min');
    showMin.appendChild(minResult);

    let showEvaluation = document.getElementById('show-evaluation');
    showEvaluation.appendChild(evalution);

    // Show results 
    let resultDiv = document.getElementById('result-div');
    resultDiv.style.display = 'grid';

    let maxDiv = document.getElementById('best-grade');
    maxDiv.style.display = 'grid';

    let minDiv = document.getElementById('worst-grade');
    minDiv.style.display = 'grid';

    let evaluationDiv = document.getElementById('evaluation-div');
    evaluationDiv.style.display = 'grid';


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
    return grade / 5.0;
}

function calculateHungarian(grade) {

    return grade / 20.0;
}


// Create the inputs for the user to enter their grades in French System
function createInputsFrench() {
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
    avgBtn.setAttribute('onclick', 'calculateAverageFR()');
    avgBtn.textContent = 'Calculate Average';
    avgBtn.style.borderRadius = '10px';
    avgBtn.style.width = '20rem';
    avgBtn.style.fontFamily = 'Ubuntu';
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
        gradeInput.setAttribute('max', '20');
        gradeInput.setAttribute('placeholder', 'Grade (out of 20)');
        gradeInput.style.marginBottom = '1.5rem';

        gradeInput.addEventListener('input', function () {
            if (this.value < -20 || this.value > 20) {
                alert("Please enter a valid percentage (-20-20).");
                this.value = ''; // Clear the input field
            }
        });



        aDiv1.appendChild(NameInput);
        aDiv2.appendChild(gradeInput);

        userCard.appendChild(label);
        userCard.appendChild(aDiv1);
        userCard.appendChild(aDiv2);

    }

    // Create the input for the user to enter their wished average grade
    let label2 = document.createElement("h4");
    label2.innerHTML = 'Your aimed average grade:';
    label2.style.margin = '0';
    let wishInput = document.createElement("input");
    wishInput.setAttribute('class', 'wish-input');
    wishInput.addEventListener('input', function () {
        if (this.value < -20 || this.value > 20) {
            alert("Please enter a valid percentage (-20-20).");
            this.value = ''; // Clear the input field
        }
    });
    wishInput.setAttribute('type', 'number');
    wishInput.setAttribute('name', 'wish-input');
    wishInput.setAttribute('placeholder', 'What is the average grade that you want to get?');
    userCard.appendChild(label2);
    userCard.appendChild(wishInput);

}

function calculateAverageFR() {
    let numSubjects = document.getElementById("numSubjects").value;
    let results = document.getElementById("results");
    results.innerHTML = "";



    let totalGrade = 0;
    let totalGPA = 0;
    let totalPercent = 0;
    let totalHungarian = 0;
    let validInputs = true;
    let maxGrade = 0;
    let minGrade = 0;

    let gradesArray = []; //add grades to an array

    for (let i = 1; i <= numSubjects; i++) {
        const grade = parseInt(document.getElementsByName(`subject${i}Grade`)[0].value);

        if (isNaN(grade)) {
            validInputs = false;
            break;
        }

        // take the max and min grades
        gradesArray.push(grade);


        totalGrade += grade;
        totalGPA += calculateGPAFR(grade);
        totalPercent += calculatePercentFR(grade);
        totalHungarian += calculateHungarianFR(grade);
    }

    if (!validInputs) {
        results.innerHTML = "Please enter valid grades for all subjects";
        alert("Please enter valid grades for all subjects");
        return;
    }

    // take max and min from gradesArray
    maxGrade = Math.max(...gradesArray);
    minGrade = Math.min(...gradesArray);

    let maxResult = document.createElement('div');
    let minResult = document.createElement('div');

    maxResult.innerHTML = `<ul>
    <li>${maxGrade.toFixed(2)}/20.00 </li>
    <li>${calculatePercentFR(maxGrade).toFixed(2)}%</li>
    <li>~${calculateGPAFR(maxGrade).toFixed(2)}/4.00 (GPA)</li>
    <li>${calculateHungarianFR(maxGrade).toFixed(2)}/5.00 (Hungarian System)</li>
    </ul>`;

    minResult.innerHTML = `<ul>
    <li>${minGrade.toFixed(2)}/20.00 </li>
    <li>${calculatePercentFR(minGrade).toFixed(2)}%</li>
    <li>~${calculateGPAFR(minGrade).toFixed(2)}/4.00 (GPA)</li>
    <li>${calculateHungarianFR(minGrade).toFixed(2)}/5.00 (Hungarian System)</li>
    </ul>`;



    const averageGrade = totalGrade / numSubjects;
    const averageGPA = totalGPA / numSubjects;
    const averagePercent = totalPercent / numSubjects;
    const averageHungarian = totalHungarian / numSubjects;

    results.innerHTML = `
    <ul>
      <li>Your average French grade is: <b>${averageGrade.toFixed(2)}/20.00</b></li>
      <li>Your average grade in percentage is: <b>${averagePercent.toFixed(2)}%</b></li>
      <li>Your average GPA is: around <b>~${averageGPA.toFixed(2)}/4.00</b></li>
      <li>Your average Hungarian grade is: <b>${averageHungarian.toFixed(2)}/5.00</b></li>
    <ul> `;

    let evalution = document.createElement('div');
    let difference = Math.abs(10 - averageGrade).toFixed(2);
    let comparison = averageGrade > 10 ? "more" : "less";
    let wishedGrade = parseFloat(document.getElementsByName('wish-input')[0].value);
    let wishedDifference = Math.abs(wishedGrade - averageGrade).toFixed(2);
    let wishedComparison = averageGrade < wishedGrade ? `points away from your goal (${wishedGrade.toFixed(2)})` : `more points than you wanted (${wishedGrade.toFixed(2)})`;

    evalution.innerHTML = `<ul>
    <li>${(20 - averageGrade).toFixed(2)} points away from 20/20</li>
    <li>${difference} ${comparison} points than 10/20</li>
    </ul>
    <h1>${wishedDifference} ${wishedComparison}</h1>`;

    //Hide grades form
    document.getElementById('calculator-card').style.display = 'none';

    // Create a container element to hold the results
    let showResult = document.getElementById('show-result');
    showResult.appendChild(results);
    let showMax = document.getElementById('show-max');
    showMax.appendChild(maxResult);
    let showMin = document.getElementById('show-min');
    showMin.appendChild(minResult);

    let showEvaluation = document.getElementById('show-evaluation');
    showEvaluation.appendChild(evalution);

    // Show results 
    let resultDiv = document.getElementById('result-div');
    resultDiv.style.display = 'grid';

    let maxDiv = document.getElementById('best-grade');
    maxDiv.style.display = 'grid';

    let minDiv = document.getElementById('worst-grade');
    minDiv.style.display = 'grid';

    let evaluationDiv = document.getElementById('evaluation-div');
    evaluationDiv.style.display = 'grid';


}

function calculateGPAFR(grade) {
    if (grade >= 17) {
        return 4.0;
    } else if (grade >= 14) {
        return 3.0;
    } else if (grade >= 12) {
        return 2.0;
    } else if (grade >= 10) {
        return 1.0;
    } else {
        return 0.0;
    }
}

function calculatePercentFR(grade) {
    return (grade / 20) * 100;
}

function calculateHungarianFR(grade) {
    return (grade / 20) * 5;
}



// Create the inputs for the user to enter their grades in Hungarian System
function createInputsHun() {
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
    avgBtn.setAttribute('onclick', 'calculateAverageHU()');
    avgBtn.textContent = 'Calculate Average';
    avgBtn.style.borderRadius = '10px';
    avgBtn.style.width = '20rem';
    avgBtn.style.fontFamily = 'Ubuntu';
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
        gradeInput.setAttribute('max', '20');
        gradeInput.setAttribute('placeholder', 'Grade (out of 5)');
        gradeInput.style.marginBottom = '1.5rem';

        gradeInput.addEventListener('input', function () {
            if (this.value < -5 || this.value > 5) {
                alert("Please enter a valid percentage (-5 - 5).");
                this.value = ''; // Clear the input field
            }
        });



        aDiv1.appendChild(NameInput);
        aDiv2.appendChild(gradeInput);

        userCard.appendChild(label);
        userCard.appendChild(aDiv1);
        userCard.appendChild(aDiv2);

    }

    // Create the input for the user to enter their wished average grade
    let label2 = document.createElement("h4");
    label2.innerHTML = 'Your aimed average grade:';
    label2.style.margin = '0';
    let wishInput = document.createElement("input");
    wishInput.setAttribute('class', 'wish-input');
    wishInput.addEventListener('input', function () {
        if (this.value < -5 || this.value > 5) {
            alert("Please enter a valid percentage (-5 - 5).");
            this.value = ''; // Clear the input field
        }
    });
    wishInput.setAttribute('type', 'number');
    wishInput.setAttribute('name', 'wish-input');
    wishInput.setAttribute('placeholder', 'What is the average grade that you want to get?');
    userCard.appendChild(label2);
    userCard.appendChild(wishInput);

}

function calculateAverageHU() {
    let numSubjects = document.getElementById("numSubjects").value;
    let results = document.getElementById("results");
    results.innerHTML = "";



    let totalGrade = 0;
    let totalGPA = 0;
    let totalPercent = 0;
    let totalFrench= 0;
    let validInputs = true;
    let maxGrade = 0;
    let minGrade = 0;

    let gradesArray = []; //add grades to an array

    for (let i = 1; i <= numSubjects; i++) {
        const grade = parseInt(document.getElementsByName(`subject${i}Grade`)[0].value);

        if (isNaN(grade)) {
            validInputs = false;
            break;
        }

        // take the max and min grades
        gradesArray.push(grade);


        totalGrade += grade;
        totalGPA += calculateGPAHU(grade);
        totalPercent += calculatePercentHU(grade);
        totalFrench += calculateFrenchHU(grade);
    }

    if (!validInputs) {
        results.innerHTML = "Please enter valid grades for all subjects";
        alert("Please enter valid grades for all subjects");
        return;
    }

    // take max and min from gradesArray
    maxGrade = Math.max(...gradesArray);
    minGrade = Math.min(...gradesArray);

    let maxResult = document.createElement('div');
    let minResult = document.createElement('div');

    maxResult.innerHTML = `<ul>
    <li>${maxGrade.toFixed(2)}/5.00 </li>
    <li>${calculatePercentHU(maxGrade).toFixed(2)}%</li>
    <li>~${calculateGPAHU(maxGrade).toFixed(2)}/4.00 (GPA)</li>
    <li>${calculateFrenchHU(maxGrade).toFixed(2)}/20.00 (French System)</li>
    </ul>`;

    minResult.innerHTML = `<ul>
    <li>${minGrade.toFixed(2)}/5.00 </li>
    <li>${calculatePercentHU(minGrade).toFixed(2)}%</li>
    <li>~${calculateGPAHU(minGrade).toFixed(2)}/4.00 (GPA)</li>
    <li>${calculateFrenchHU(minGrade).toFixed(2)}/20.00 (French System)</li>
    </ul>`;



    const averageGrade = totalGrade / numSubjects;
    const averageGPA = totalGPA / numSubjects;
    const averagePercent = totalPercent / numSubjects;
    const averageFrench = totalFrench / numSubjects;

    results.innerHTML = `
    <ul>
      <li>Your average Hungarian grade is: <b>${averageGrade.toFixed(2)}/5.00</b></li>
      <li>Your average grade in percentage is: <b>${averagePercent.toFixed(2)}%</b></li>
      <li>Your average GPA is: around <b>~${averageGPA.toFixed(2)}/4.00</b></li>
      <li>Your average French grade is: <b>${averageFrench.toFixed(2)}/20.00</b></li>
    <ul> `;

    let evalution = document.createElement('div');
    let difference = Math.abs(2 - averageGrade).toFixed(2);
    let comparison = averageGrade > 2 ? "more" : "less";
    let wishedGrade = parseFloat(document.getElementsByName('wish-input')[0].value);
    let wishedDifference = Math.abs(wishedGrade - averageGrade).toFixed(2);
    let wishedComparison = averageGrade < wishedGrade ? `points away from your goal (${wishedGrade.toFixed(2)})` : `more points than you wanted (${wishedGrade.toFixed(2)})`;

    evalution.innerHTML = `<ul>
    <li>${(5 - averageGrade).toFixed(2)} points away from 5.00</li>
    <li>${difference} ${comparison} points than 2.00</li>
    </ul>
    <h1>${wishedDifference} ${wishedComparison}</h1>`;

    //Hide grades form
    document.getElementById('calculator-card').style.display = 'none';

    // Create a container element to hold the results
    let showResult = document.getElementById('show-result');
    showResult.appendChild(results);
    let showMax = document.getElementById('show-max');
    showMax.appendChild(maxResult);
    let showMin = document.getElementById('show-min');
    showMin.appendChild(minResult);

    let showEvaluation = document.getElementById('show-evaluation');
    showEvaluation.appendChild(evalution);

    // Show results 
    let resultDiv = document.getElementById('result-div');
    resultDiv.style.display = 'grid';

    let maxDiv = document.getElementById('best-grade');
    maxDiv.style.display = 'grid';

    let minDiv = document.getElementById('worst-grade');
    minDiv.style.display = 'grid';

    let evaluationDiv = document.getElementById('evaluation-div');
    evaluationDiv.style.display = 'grid';


}

function calculateGPAHU(grade) {
    if (grade >= 5) {
        return 4.0;
    } else if (grade >= 4) {
        return 3.0;
    } else if (grade >= 2) {
        return 2.0;
    } else if (grade >= 1) {
        return 1.0;
    } else {
        return 0.0;
    }
}

function calculatePercentHU(grade) {
    return (grade / 5) * 100;
}

function calculateFrenchHU(grade) {
    return (grade / 5) * 20;
}










