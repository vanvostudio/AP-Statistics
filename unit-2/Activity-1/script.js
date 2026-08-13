const cards = [

    {
        title:
            "School Transportation",

        table: {
            columns:
                ["Bus", "Car", "Walk", "Total"],

            rows: [

                {
                    label: "Grade 9",
                    values: [32, 18, 10, 60]
                },

                {
                    label: "Grade 10",
                    values: [24, 26, 10, 60]
                },

                {
                    label: "Total",
                    values: [56, 44, 20, 120]
                }

            ]
        },

        question:
            "If one student is selected at random, what is the probability that the student walks to school?",

        answer:
            "20 / 120 = 1 / 6",

        explanation:
            "Use the total number of students who walk divided by the total number of students.",

        skill:
            "marginal"
    },


    {
        title:
            "After-School Activities",

        table: {
            columns:
                ["Sports", "No Sports", "Total"],

            rows: [

                {
                    label: "Club",
                    values: [28, 22, 50]
                },

                {
                    label: "No Club",
                    values: [17, 33, 50]
                },

                {
                    label: "Total",
                    values: [45, 55, 100]
                }

            ]
        },

        question:
            "What is the probability that a randomly selected student participates in both a club and a sport?",

        answer:
            "28 / 100 = 0.28",

        explanation:
            "The intersection of Club and Sports contains 28 students out of 100 total students.",

        skill:
            "joint"
    },


    {
        title:
            "Homework Completion",

        table: {
            columns:
                ["Completed", "Not Completed", "Total"],

            rows: [

                {
                    label: "Athlete",
                    values: [42, 8, 50]
                },

                {
                    label: "Not Athlete",
                    values: [35, 15, 50]
                },

                {
                    label: "Total",
                    values: [77, 23, 100]
                }

            ]
        },

        question:
            "Given that a student is an athlete, what is the probability that the student completed the homework?",

        answer:
            "42 / 50 = 0.84",

        explanation:
            "Because we are given that the student is an athlete, restrict the denominator to the 50 athletes.",

        skill:
            "conditional"
    },


    {
        title:
            "Preferred Study Method",

        table: {
            columns:
                ["Group", "Individual", "Total"],

            rows: [

                {
                    label: "Grade 11",
                    values: [36, 24, 60]
                },

                {
                    label: "Grade 12",
                    values: [22, 38, 60]
                },

                {
                    label: "Total",
                    values: [58, 62, 120]
                }

            ]
        },

        question:
            "Among Grade 12 students, what proportion prefer studying in groups?",

        answer:
            "22 / 60",

        explanation:
            "The phrase 'among Grade 12 students' tells us to use only the Grade 12 row as the denominator.",

        skill:
            "conditional"
    },


    {
        title:
            "School Lunch",

        table: {
            columns:
                ["Buys Lunch", "Brings Lunch", "Total"],

            rows: [

                {
                    label: "Grade 9",
                    values: [40, 20, 60]
                },

                {
                    label: "Grade 10",
                    values: [30, 30, 60]
                },

                {
                    label: "Total",
                    values: [70, 50, 120]
                }

            ]
        },

        question:
            "Which grade has a greater proportion of students who buy lunch?",

        answer:
            "Grade 9",

        explanation:
            "Compare the conditional proportions: Grade 9 uses 40/60 and Grade 10 uses 30/60.",

        skill:
            "comparison"
    }

];


let currentIndex = 0;


const quizCard =
    document.getElementById(
        "quizCard"
    );


const tableContainer =
    document.getElementById(
        "tableContainer"
    );


const questionTitle =
    document.getElementById(
        "questionTitle"
    );


const questionText =
    document.getElementById(
        "questionText"
    );


const studentAnswer =
    document.getElementById(
        "studentAnswer"
    );


const answerDisplay =
    document.getElementById(
        "answerDisplay"
    );


const explanation =
    document.getElementById(
        "explanation"
    );


const cardNumber =
    document.getElementById(
        "cardNumber"
    );


const cardTotal =
    document.getElementById(
        "cardTotal"
    );


cardTotal.textContent =
    cards.length;


/* =========================
   Build table
   ========================= */

function buildTable(card) {

    let html = `

        <table class="two-way-table">

            <thead>

                <tr>

                    <th></th>

    `;


    card.table.columns
        .forEach(column => {

            html += `
                <th>
                    ${column}
                </th>
            `;

        });


    html += `

                </tr>

            </thead>

            <tbody>

    `;


    card.table.rows
        .forEach((row, index) => {

            const isTotal =
                index ===
                card.table.rows.length - 1;


            html += `

                <tr
                    class="${isTotal ? "total" : ""}"
                >

                    <th>
                        ${row.label}
                    </th>

            `;


            row.values
                .forEach(value => {

                    html += `

                        <td>
                            ${value}
                        </td>

                    `;

                });


            html += `
                </tr>
            `;

        });


    html += `

            </tbody>

        </table>

    `;


    tableContainer.innerHTML =
        html;

}


/* =========================
   Display card
   ========================= */

function displayCard() {

    const card =
        cards[currentIndex];


    quizCard.classList.remove(
        "flipped"
    );


    questionTitle.textContent =
        card.title;


    questionText.textContent =
        card.question;


    answerDisplay.textContent =
        card.answer;


    explanation.textContent =
        card.explanation;


    studentAnswer.value = "";


    cardNumber.textContent =
        currentIndex + 1;


    buildTable(card);


    clearSkillSelection();

}


/* =========================
   Flip card
   ========================= */

document
    .getElementById(
        "flipButton"
    )
    .addEventListener(
        "click",
        function () {

            quizCard.classList.add(
                "flipped"
            );

        }
    );


document
    .getElementById(
        "flipBackButton"
    )
    .addEventListener(
        "click",
        function () {

            quizCard.classList.remove(
                "flipped"
            );

        }
    );


/* =========================
   New card
   ========================= */

document
    .getElementById(
        "newCardButton"
    )
    .addEventListener(
        "click",
        function () {

            currentIndex++;

            if (
                currentIndex >=
                cards.length
            ) {

                currentIndex = 0;

            }


            displayCard();

        }
    );


/* =========================
   Restart
   ========================= */

document
    .getElementById(
        "resetButton"
    )
    .addEventListener(
        "click",
        function () {

            currentIndex = 0;

            displayCard();

        }
    );


/* =========================
   Skill identification
   ========================= */

const skillButtons =
    document.querySelectorAll(
        ".skill-button"
    );


const skillFeedback =
    document.getElementById(
        "skillFeedback"
    );


skillButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            clearSkillSelection();


            button.classList.add(
                "selected"
            );


            const selectedSkill =
                button.dataset.skill;


            const correctSkill =
                cards[currentIndex]
                    .skill;


            if (
                selectedSkill ===
                correctSkill
            ) {

                skillFeedback.textContent =
                    "Correct classification.";

            }

            else {

                skillFeedback.textContent =
                    "Try again. Pay attention to which group is being used as the denominator.";

            }

        }
    );

});


function clearSkillSelection() {

    skillButtons.forEach(
        button => {

            button.classList.remove(
                "selected"
            );

        }
    );


    skillFeedback.textContent = "";

}


/* =========================
   Start activity
   ========================= */

displayCard();