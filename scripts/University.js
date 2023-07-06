class University {
    constructor(id, universityName, facultyName, military, score, fee, templateClass) {
        this.id = id
        this.universityName = universityName;
        this.facultyName = facultyName;
        this.military = military;
        this.score = score;
        this.fee = fee;
        this.template = templateClass;
    }

    createField() {
        const cardsSection = document.querySelector('.elements');

        //const url = "http://localhost:9090";
        const url = "http://77.105.139.66:9090";

        const cardElement = document
            .querySelector(this.template)
            .content.querySelector('.card')
            .cloneNode(true);

        cardElement.id = this.id;
        cardElement.querySelector(".card-university-name").textContent = this.universityName;
        cardElement.querySelector(".card-faculty-name").textContent = this.facultyName;
        cardElement.querySelector(".card-military").textContent = this.military;
        cardElement.querySelector(".card-score").textContent = this.score;
        cardElement.querySelector(".card-fee").textContent = this.fee;

        this.deleteButton = cardElement.querySelector('.card-delete-button');
        this.deleteButton.addEventListener('click', () => {
            fetch(url + "/delete?id=" + this.id, {
                method: "DELETE"
            }).then(response => {
                const element = document.getElementById(this.id);
                element.classList.add("hide");
                setTimeout(() => element.remove(), 200);
            })
            .catch(error => {
                console.error(error);
            });
        });
        return cardElement;
    }
}

export default University;