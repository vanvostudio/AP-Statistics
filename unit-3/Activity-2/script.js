const problems = [

    {
        context:
            "A school administrator wants to determine whether more than 60% of students participate in at least one extracurricular activity.",

        null:
            "p = 0.60",

        alternative:
            "p > 0.60",

        pValue: 0.032,

        alpha: 0.05,

        claim:
            "more than 60% of students participate in at least one extracurricular activity"
    },


    {
        context:
            "A manufacturer claims that 5% of its products are defective. A quality-control inspector tests whether the true defective rate differs from 5%.",

        null:
            "p = 0.05",

        alternative:
            "p ≠ 0.05",

        pValue: 0.184,

        alpha: 0.05,

        claim:
            "the true proportion of defective products differs from 5%"
    },


    {
        context:
            "Researchers want to determine whether a new treatment produces a higher recovery rate than the standard treatment.",

        null:
            "p₁ = p₂",

        alternative:
            "p₁ > p₂",

        pValue: 0.008,

        alpha: 0.01,

        claim:
            "the new treatment has a higher recovery rate than the standard treatment"
    },


    {
        context:
            "A teacher wants to determine whether the mean test score for students using a new study method is greater than 75.",

        null:
            "μ = 75",

        alternative:
            "μ > 75",

        pValue: 0.071,

        alpha: 0.05,

        claim:
            "the mean test score for students using the new study method is greater than 75"
    },


    {
        context:
            "A researcher investigates whether class year and preferred study location are associated among students at a university.",

        null:
            "Class year and preferred study location are independent.",

        alternative:
            "Class year and preferred study location are associated.",

        pValue: 0.021,

        alpha: 0.05,

        claim:
            "there is an association between class year and preferred study location"
    },


    {
        context:
            "A researcher wants to determine whether the distribution of transportation preferences differs among students at three schools.",

        null:
            "The distribution of transportation preference is the same at all three schools.",

        alternative:
            "The distribution of transportation preference is not the same at all three schools.",

        pValue: 0.126,

        alpha: 0.10,

        claim:
            "the distribution of transportation preference differs among the three schools"
    }

];


let currentProblem = 0;


/* =========================
   Elements
   ========================= */

const context =
    document.getElementById("context");

const nullHypothesis =
    document.getElementById("nullHypothesis");

const alternativeHypothesis =
    document.getElementById("alternativeHypothesis");

const pValue =
    document.getElementById("pValue");

const alpha =
    document.getElementById("alpha");

const problemNumber =
    document.getElementById("problemNumber");

const problemTotal =
    document.getElementById("problemTotal");

const comparisonFeedback =
    document.getElementById("comparisonFeedback");

const decisionFeedback =
    document.getElementById("decisionFeedback");

const decisionStep =
    document.getElementById("decisionStep");

const conclusionStep =
    document.getElementById("conclusionStep");

const sentenceStarter =
    document.getElementById("sentenceStarter");

const studentConclusion =
    document.getElementById("studentConclusion");

const sampleConclusion =
    document.getElementById("sampleConclusion");


problemTotal.textContent =
    problems.length;


/* =========================
   Correct decision
   ========================= */

function getDecision(problem) {

    if (
        problem.pValue <=
        problem.alpha
    ) {

        return "reject";

    }

    return "fail";

}


/* =========================
   Display problem
   ========================= */

function displayProblem() {

    const problem =
        problems[currentProblem];


    problemNumber.textContent =
        currentProblem + 1;


    context.textContent =
        problem.context;


    nullHypothesis.textContent =
        problem.null;


    alternativeHypothesis.textContent =
        problem.alternative;


    pValue.textContent =
        problem.pValue;


    alpha.textContent =
        problem.alpha;


    comparisonFeedback.textContent = "";

    comparisonFeedback.className =
        "feedback";


    decisionFeedback.textContent = "";

    decisionFeedback.className =
        "feedback";


    decisionStep.classList.add(
        "locked"
    );


    conclusionStep.classList.add(
        "locked"
    );


    studentConclusion.value = "";


    sampleConclusion.innerHTML = "";

    sampleConclusion.classList.remove(
        "visible"
    );


    document
        .querySelectorAll(
            ".choice-group button"
        )
        .forEach(button => {

            button.classList.remove(
                "selected"
            );

        });


    buildSentenceStarter();

}


/* =========================
   Sentence starter
   ========================= */

function buildSentenceStarter() {

    sentenceStarter.innerHTML = `

        There is

        <span class="blank">
           
        </span>

        evidence to conclude that

        <span class="blank">
            
        </span>.

    `;

}


/* =========================
   Compare p-value and alpha
   ========================= */

document
    .querySelectorAll(
        ".comparison-choice"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const problem =
                    problems[currentProblem];


                const correctComparison =
                    problem.pValue <=
                    problem.alpha
                        ? "less"
                        : "greater";


                document
                    .querySelectorAll(
                        ".comparison-choice"
                    )
                    .forEach(choice => {

                        choice.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                if (
                    button.dataset.comparison ===
                    correctComparison
                ) {

                    comparisonFeedback.textContent =
                        "Correct comparison.";

                    comparisonFeedback.className =
                        "feedback correct";


                    decisionStep.classList.remove(
                        "locked"
                    );

                }

                else {

                    comparisonFeedback.textContent =
                        "Check the two numerical values again.";

                    comparisonFeedback.className =
                        "feedback incorrect";

                }

            }
        );

    });


/* =========================
   Make decision
   ========================= */

document
    .querySelectorAll(
        ".decision-choice"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const problem =
                    problems[currentProblem];


                const correctDecision =
                    getDecision(problem);


                document
                    .querySelectorAll(
                        ".decision-choice"
                    )
                    .forEach(choice => {

                        choice.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                const selected =
                    button.dataset.decision;


                if (
                    selected === "accept"
                ) {

                    decisionFeedback.innerHTML = `

                        Avoid saying
                        <strong>"accept H₀."</strong>

                        A large p-value does not show that
                        H₀ is true. It means we do not have
                        sufficient evidence to reject it.

                    `;


                    decisionFeedback.className =
                        "feedback incorrect";

                    return;

                }


                if (
                    selected ===
                    correctDecision
                ) {

                    decisionFeedback.textContent =
                        selected === "reject"
                            ? "Correct. Reject H₀."
                            : "Correct. Fail to reject H₀.";


                    decisionFeedback.className =
                        "feedback correct";


                    conclusionStep.classList.remove(
                        "locked"
                    );

                }

                else {

                    decisionFeedback.textContent =
                        "Check the relationship between the p-value and α.";

                    decisionFeedback.className =
                        "feedback incorrect";

                }

            }
        );

    });


/* =========================
   Reveal conclusion
   ========================= */

document
    .getElementById(
        "revealConclusion"
    )
    .addEventListener(
        "click",
        function () {

            const problem =
                problems[currentProblem];


            const decision =
                getDecision(problem);


            let conclusion;


            if (
                decision === "reject"
            ) {

                conclusion = `

                    Because the p-value
                    (${problem.pValue})
                    is less than or equal to α
                    (${problem.alpha}),
                    we reject H₀.

                    There is sufficient evidence
                    to conclude that
                    ${problem.claim}.

                `;

            }

            else {

                conclusion = `

                    Because the p-value
                    (${problem.pValue})
                    is greater than α
                    (${problem.alpha}),
                    we fail to reject H₀.

                    There is not sufficient evidence
                    to conclude that
                    ${problem.claim}.

                `;

            }


            sampleConclusion.innerHTML = `

                <strong>
                    Sample conclusion:
                </strong>

                <p>
                    ${conclusion}
                </p>

            `;


            sampleConclusion.classList.add(
                "visible"
            );

        }
    );


/* =========================
   Next problem
   ========================= */

document
    .getElementById(
        "nextProblem"
    )
    .addEventListener(
        "click",
        function () {

            currentProblem++;


            if (
                currentProblem >=
                problems.length
            ) {

                currentProblem = 0;

            }


            displayProblem();

        }
    );


/* =========================
   Previous problem
   ========================= */

document
    .getElementById(
        "previousProblem"
    )
    .addEventListener(
        "click",
        function () {

            currentProblem--;


            if (
                currentProblem < 0
            ) {

                currentProblem =
                    problems.length - 1;

            }


            displayProblem();

        }
    );


/* =========================
   Start
   ========================= */

displayProblem();