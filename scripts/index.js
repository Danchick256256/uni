import University from "./University.js";

const universityNameForm = document.getElementById('university_name');
const facultyNameForm = document.getElementById('faculty_name');
const militaryForm = document.getElementById('military');
const scoreForm = document.getElementById('score');
const tuitionFee = document.getElementById('fee');

const cardsSection = document.querySelector('.elements');

//const url = "http://localhost:9090";
const url = "http://77.105.139.66:9090";

document.addEventListener("keypress", keyPress);

window.onload = function () {
    fetch(url + '/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const university = new University(item.id, item.universityName, item.facultyName, item.military, item.score, item.fee, '.card__template').createField();
                cardsSection.append(university);
            });
        })
        .catch(error => console.error('Error:', error));
};

function keyPress(e) {
    if (e.code === "Enter") {
        if (!universityNameForm.value || !facultyNameForm.value || !militaryForm.value || !scoreForm.value || !tuitionFee.value) {
            throw new Error('Parameter is not a number!');
        }

        const uName = universityNameForm.value;
        const fName = facultyNameForm.value;
        const military = militaryForm.value;
        const score = scoreForm.value;
        const fee = tuitionFee.value;

        universityNameForm.value = "";
        facultyNameForm.value = "";
        militaryForm.value = "";
        scoreForm.value = "";
        tuitionFee.value = "";

        const data = JSON.stringify({
            universityName: uName,
            facultyName: fName,
            military: military,
            score: score,
            fee: fee
        });

        fetch(url + "/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(response => response.json())
            .then(data => {
                const university = new University(data.id, uName, fName, military, score, fee, '.card__template').createField();
                cardsSection.append(university);
            })
            .catch(error => {
                console.error(error);
            });
    }
}
