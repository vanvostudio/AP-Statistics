const students = [
    "Student A",
    "Student B",
    "Student C",
    "Student D"
];


const problems = [

    {
        title:
            "One-Proportion Significance Test",

        text:
            "A school claims that 65% of students participate in at least one extracurricular activity. In a random sample of 120 students, 86 participate. Test whether the true proportion is greater than 65% at α = 0.05."
    },


    {
        title:
            "One-Proportion Confidence Interval",

        text:
            "In a random sample of 180 students, 117 report getting at least 8 hours of sleep on school nights. Construct and interpret a 95% confidence interval for the population proportion."
    },


    {
        title:
            "Two-Proportion Significance Test",

        text:
            "At School A, 78 of 120 sampled students prefer a later school start time. At School B, 69 of 130 sampled students prefer a later start. Test whether the two population proportions differ."
    },


    {
        title:
            "Two-Proportion Confidence Interval",

        text:
            "In a sample of 160 students who used Study Method A, 112 passed an exam. In a sample of 150 students who used Study Method B, 93 passed. Construct and interpret a 95% confidence interval for pA − pB."
    }

];


let round = 0;


/*
Each entry stores the response written
for that problem and any review that came
from the next student.
*/

const work = problems.map(() => ({
    response: "",
    review: ""
}));


/* =========================
   Elements
   ========================= */

const roundNumber =
    document.getElementById(
        "roundNumber"
    );

const studentName =
    document.getElementById(
        "studentName"
    );

const paperOwner =
    document.getElementById(
        "paperOwner"
    );

const problemNumber =
    document.getElementById(
        "problemNumber"
    );

const problemTitle =
    document.getElementById(
        "problemTitle"
    );

const problemText =
    document.getElementById(
        "problemText"
    );

const previousWorkSection =
    document.getElementById(
        "previousWorkSection"
    );

const previousResponse =
    document.getElementById(
        "previousResponse"
    );

const reviewResponse =
    document.getElementById(
        "reviewResponse"
    );

const studentResponse =
    document.getElementById(
        "studentResponse"
    );

const feedback =
    document.getElementById(
        "feedback"
    );

const problemCard =
    document.querySelector(
        ".problem-card"
    );

const finalSection =
    document.getElementById(
        "finalSection"
    );

const finalSummary =
    document.getElementById(
        "finalSummary"
    );


/* =========================
   Display Round
   ========================= */

function displayRound() {

    const currentProblem =
        problems[round];


    /*
    In the physical activity, the paper rotates.

    We simulate that by changing the student
    handling the paper each round.
    */

    const currentStudent =
        students[round];


    roundNumber.textContent =
        round + 1;


    studentName.textContent =
        currentStudent;


    paperOwner.textContent =
        students[0];


    problemNumber.textContent =
        round + 1;


    problemTitle.textContent =
        currentProblem.title;


    problemText.textContent =
        currentProblem.text;


    studentResponse.value =
        work[round].response;


    reviewResponse.value = "";


    feedback.textContent = "";


    /*
    Beginning with Round 2, students review
    the previous student's work before solving
    the next problem.
    */

    if (round > 0) {

        previousWorkSection.classList.remove(
            "hidden"
        );


        previousResponse.textContent =
            work[round - 1].response;

    }

    else {

        previousWorkSection.classList.add(
            "hidden"
        );

    }

}


/* =========================
   Submit Round
   ========================= */

document
    .getElementById(
        "submitRound"
    )
    .addEventListener(
        "click",
        function () {

            const response =
                studentResponse.value.trim();


            if (response === "") {

                feedback.textContent =
                    "Complete the current problem before passing the paper.";

                return;

            }


            work[round].response =
                response;


            /*
            Save review of previous problem.
            */

            if (round > 0) {

                work[round - 1].review =
                    reviewResponse.value.trim();

            }


            round++;


            if (round >= problems.length) {

                /*
                The fourth student has completed
                Problem 4. Their review belongs to
                Problem 3.

                The paper now returns to its owner.
                */

                showFinalPaper();

                return;

            }


            displayRound();

        }
    );


/* =========================
   Final Paper
   ========================= */

function showFinalPaper() {

    problemCard.classList.add(
        "hidden"
    );


    finalSection.classList.remove(
        "hidden"
    );


    finalSummary.innerHTML = "";


    problems.forEach(
        (problem, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "summary-item";


            let reviewText =
                work[index].review;


            if (
                reviewText === ""
            ) {

                if (
                    index ===
                    problems.length - 1
                ) {

                    reviewText =
                        "This final response returns to the paper owner for review.";

                }

                else {

                    reviewText =
                        "No written peer review was recorded.";

                }

            }


            item.innerHTML = `

                <h3>
                    Problem ${index + 1}:
                    ${problem.title}
                </h3>

                <strong>
                    Response
                </strong>

                <p>
                    ${work[index].response}
                </p>

                <strong>
                    Peer Review
                </strong>

                <p>
                    ${reviewText}
                </p>

            `;


            finalSummary.appendChild(
                item
            );

        });

}


/* =========================
   Restart
   ========================= */

document
    .getElementById(
        "restartActivity"
    )
    .addEventListener(
        "click",
        function () {

            round = 0;


            work.forEach(item => {

                item.response = "";
                item.review = "";

            });


            problemCard.classList.remove(
                "hidden"
            );


            finalSection.classList.add(
                "hidden"
            );


            displayRound();

        }
    );


/* =========================
   Start
   ========================= */

displayRound();