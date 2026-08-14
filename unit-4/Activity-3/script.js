const problems = [

    {
        scenario:
            "A school administrator wants to determine whether more than 70% of students at the school own a laptop.",

        phrases: [
            "determine whether",
            "more than 70%",
            "students",
            "own a laptop"
        ],

        goal:
            "test",

        variable:
            "proportion",

        groups:
            "one",

        procedure:
            "one-proportion-test",

        explanation:
            "The phrase 'determine whether' indicates a significance test. Laptop ownership is a yes/no categorical variable, so the parameter is a population proportion. There is one population, so a one-proportion z-test is appropriate."
    },


    {
        scenario:
            "A researcher wants to estimate the proportion of all college students who regularly use public transportation.",

        phrases: [
            "estimate",
            "proportion",
            "all college students",
            "use public transportation"
        ],

        goal:
            "interval",

        variable:
            "proportion",

        groups:
            "one",

        procedure:
            "one-proportion-interval",

        explanation:
            "The word 'estimate' signals a confidence interval. The response is categorical, and the parameter is one population proportion."
    },


    {
        scenario:
            "Researchers want to determine whether the proportion of students who pass an exam differs between students taught with Method A and students taught with Method B.",

        phrases: [
            "determine whether",
            "proportion",
            "differs between",
            "Method A",
            "Method B"
        ],

        goal:
            "test",

        variable:
            "proportion",

        groups:
            "two",

        procedure:
            "two-proportion-test",

        explanation:
            "This asks whether two population proportions differ, so the appropriate procedure is a two-proportion z-test."
    },


    {
        scenario:
            "A teacher wants to estimate the difference in the mean number of hours students study per week at School A and School B.",

        phrases: [
            "estimate",
            "difference",
            "mean number of hours",
            "School A",
            "School B"
        ],

        goal:
            "interval",

        variable:
            "mean",

        groups:
            "two",

        procedure:
            "two-mean-interval",

        explanation:
            "The goal is estimation, so use a confidence interval. Study time is quantitative, so the parameter involves means. Two populations are being compared."
    },


    {
        scenario:
            "A coffee shop claims that customers wait an average of 4 minutes for their orders. A manager wants to test whether the true mean waiting time is greater than 4 minutes.",

        phrases: [
            "average of 4 minutes",
            "test whether",
            "true mean",
            "greater than 4 minutes"
        ],

        goal:
            "test",

        variable:
            "mean",

        groups:
            "one",

        procedure:
            "one-mean-test",

        explanation:
            "Waiting time is quantitative, and the problem asks about one population mean. Because the goal is to test a claim, use a one-sample t-test."
    },


    {
        scenario:
            "Researchers survey a random sample of university students and record both class year and preferred study location. They want to determine whether the two variables are associated.",

        phrases: [
            "class year",
            "preferred study location",
            "two variables",
            "associated"
        ],

        goal:
            "test",

        variable:
            "categorical",

        groups:
            "multiple",

        procedure:
            "chi-independence",

        explanation:
            "Two categorical variables are measured on individuals from one population, and the question asks whether the variables are associated. This calls for a chi-square test for independence."
    },


    {
        scenario:
            "Separate random samples of students from three high schools are asked which type of school lunch they prefer. Researchers want to determine whether the distribution of lunch preference is the same across the schools.",

        phrases: [
            "separate random samples",
            "three high schools",
            "distribution",
            "same across the schools"
        ],

        goal:
            "test",

        variable:
            "categorical",

        groups:
            "multiple",

        procedure:
            "chi-homogeneity",

        explanation:
            "Separate samples come from several populations and the goal is to compare the distribution of one categorical variable across those populations. Use a chi-square test for homogeneity."
    },


    {
        scenario:
            "A company claims that customers choose four package designs in proportions 0.20, 0.30, 0.30, and 0.20. Researchers want to determine whether the observed distribution follows these claimed proportions.",

        phrases: [
            "four package designs",
            "proportions",
            "observed distribution",
            "follows these claimed proportions"
        ],

        goal:
            "test",

        variable:
            "categorical",

        groups:
            "one",

        procedure:
            "chi-gof",

        explanation:
            "One categorical variable is being compared with a claimed population distribution, so the appropriate procedure is a chi-square goodness-of-fit test."
    }

];


let currentProblem = 0;


/* =========================
   Elements
   ========================= */

const scenario =
    document.getElementById(
        "scenario"
    );

const phraseContainer =
    document.getElementById(
        "phraseContainer"
    );

const inferenceType =
    document.getElementById(
        "inferenceType"
    );

const variableType =
    document.getElementById(
        "variableType"
    );

const groups =
    document.getElementById(
        "groups"
    );

const procedure =
    document.getElementById(
        "procedure"
    );

const feedback =
    document.getElementById(
        "feedback"
    );

const explanation =
    document.getElementById(
        "explanation"
    );

const problemNumber =
    document.getElementById(
        "problemNumber"
    );

const problemTotal =
    document.getElementById(
        "problemTotal"
    );


problemTotal.textContent =
    problems.length;


/* =========================
   Display Problem
   ========================= */

function displayProblem() {

    const problem =
        problems[currentProblem];


    scenario.textContent =
        problem.scenario;


    problemNumber.textContent =
        currentProblem + 1;


    inferenceType.value = "";
    variableType.value = "";
    groups.value = "";
    procedure.value = "";


    feedback.textContent = "";
    feedback.className =
        "feedback";


    explanation.innerHTML = "";
    explanation.classList.remove(
        "visible"
    );


    buildPhrases(problem);

}


/* =========================
   Build Highlight Phrases
   ========================= */

function buildPhrases(problem) {

    phraseContainer.innerHTML = "";


    problem.phrases.forEach(
        phraseText => {

            const phrase =
                document.createElement(
                    "span"
                );


            phrase.className =
                "phrase";


            phrase.textContent =
                phraseText;


            phrase.addEventListener(
                "click",
                function () {

                    phrase.classList.toggle(
                        "highlighted"
                    );

                }
            );


            phraseContainer.appendChild(
                phrase
            );

        }
    );

}


/* =========================
   Check Answer
   ========================= */

document
    .getElementById(
        "checkAnswer"
    )
    .addEventListener(
        "click",
        function () {

            const problem =
                problems[currentProblem];


            let classificationCorrect =
                true;


            if (
                inferenceType.value !==
                problem.goal
            ) {

                classificationCorrect =
                    false;

            }


            if (
                variableType.value !==
                problem.variable
            ) {

                classificationCorrect =
                    false;

            }


            if (
                groups.value !==
                problem.groups
            ) {

                classificationCorrect =
                    false;

            }


            const procedureCorrect =
                procedure.value ===
                problem.procedure;


            if (
                classificationCorrect &&
                procedureCorrect
            ) {

                feedback.textContent =
                    "Correct. Your clues and classification lead to the appropriate procedure.";

                feedback.className =
                    "feedback correct";


                explanation.innerHTML = `

                    <strong>
                        Why this procedure?
                    </strong>

                    <p>
                        ${problem.explanation}
                    </p>

                `;


                explanation.classList.add(
                    "visible"
                );

            }

            else if (
                procedureCorrect
            ) {

                feedback.textContent =
                    "You selected the correct procedure, but check how you classified the problem.";

                feedback.className =
                    "feedback incorrect";

            }

            else {

                feedback.textContent =
                    "Not quite. Revisit the key phrases and work through: goal → parameter → number of groups.";

                feedback.className =
                    "feedback incorrect";

            }

        }
    );


/* =========================
   Next
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
   Previous
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