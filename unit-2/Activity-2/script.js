const formulas = [

    {
        value: "complement",
        label:
            "Complement Rule: P(Aᶜ) = 1 − P(A)"
    },

    {
        value: "mutually-exclusive",
        label:
            "Mutually Exclusive: P(A ∪ B) = P(A) + P(B)"
    },

    {
        value: "conditional",
        label:
            "Conditional Probability: P(A | B) = P(A ∩ B) / P(B)"
    },

    {
        value: "general-multiplication",
        label:
            "General Multiplication: P(A ∩ B) = P(A)P(B | A)"
    },

    {
        value: "independent",
        label:
            "Independent Events: P(A ∩ B) = P(A)P(B)"
    }

];


const selects =
    document.querySelectorAll(
        ".answer-select"
    );


/* =========================
   Shuffle function
   ========================= */

function shuffle(array) {

    const copy =
        [...array];


    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

    }


    return copy;
}


/* =========================
   Add formulas to dropdowns
   ========================= */

function populateDropdowns() {

    selects.forEach(select => {

        const shuffled =
            shuffle(formulas);


        select.innerHTML = `

            <option value="">
                Select a formula
            </option>

        `;


        shuffled.forEach(
            formula => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    formula.value;


                option.textContent =
                    formula.label;


                select.appendChild(
                    option
                );

            }
        );

    });

}


populateDropdowns();


/* =========================
   Check answers
   ========================= */

const checkButton =
    document.getElementById(
        "checkAnswers"
    );


checkButton.addEventListener(
    "click",
    function () {

        const questions =
            document.querySelectorAll(
                ".question-card"
            );


        let correctCount = 0;


        questions.forEach(
            question => {

                const correctAnswer =
                    question.dataset.answer;


                const select =
                    question.querySelector(
                        ".answer-select"
                    );


                const feedback =
                    question.querySelector(
                        ".feedback"
                    );


                question.classList.remove(
                    "correct",
                    "incorrect"
                );


                if (
                    select.value === ""
                ) {

                    feedback.textContent =
                        "Choose a formula.";

                    return;
                }


                if (
                    select.value ===
                    correctAnswer
                ) {

                    question.classList.add(
                        "correct"
                    );


                    feedback.textContent =
                        "Correct match.";

                    correctCount++;

                }

                else {

                    question.classList.add(
                        "incorrect"
                    );


                    feedback.textContent =
                        "Try again. Focus on what the question is asking you to find.";

                }

            }
        );


        const score =
            document.getElementById(
                "score"
            );


        if (
            correctCount === 5
        ) {

            score.textContent =
                "5 / 5 — All formulas matched correctly.";

        }

        else {

            score.textContent =
                `${correctCount} / 5 correct`;

        }

    }
);


/* =========================
   Reset
   ========================= */

const resetButton =
    document.getElementById(
        "resetActivity"
    );


resetButton.addEventListener(
    "click",
    function () {

        selects.forEach(
            select => {

                select.value = "";

            }
        );


        document
            .querySelectorAll(
                ".question-card"
            )
            .forEach(
                question => {

                    question
                        .classList
                        .remove(
                            "correct",
                            "incorrect"
                        );


                    question
                        .querySelector(
                            ".feedback"
                        )
                        .textContent = "";

                }
            );


        document.getElementById(
            "score"
        ).textContent = "";

    }
);