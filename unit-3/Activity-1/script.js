const problems = [

    /* ========================================
       ONE-PROPORTION TESTS
       ======================================== */

    {
        type: "One-Proportion Test",

        scenario:
            "A school claims that 60% of its students participate in an extracurricular activity. A student wants to test whether the true proportion is greater than 60%.",

        proposed:
            ["H₀: p̂ = 0.60", "Hₐ: p̂ > 0.60"],

        error: "statistic",

        reason:
            "Hypotheses must describe a population parameter, not a sample statistic. Use p, not p̂.",

        correct:
            ["H₀: p = 0.60", "Hₐ: p > 0.60"]
    },


    {
        type: "One-Proportion Test",

        scenario:
            "A company claims that 8% of its products are defective. An inspector wants to determine whether the true proportion is different from 8%.",

        proposed:
            ["H₀: p ≠ 0.08", "Hₐ: p = 0.08"],

        error: "equality",

        reason:
            "The equality belongs in the null hypothesis.",

        correct:
            ["H₀: p = 0.08", "Hₐ: p ≠ 0.08"]
    },


    {
        type: "One-Proportion Test",

        scenario:
            "Historically, 40% of customers choose the premium plan. The company wants to determine whether the proportion has decreased.",

        proposed:
            ["H₀: p = 0.40", "Hₐ: p > 0.40"],

        error: "direction",

        reason:
            "The question asks whether the population proportion has decreased, so the alternative must use <.",

        correct:
            ["H₀: p = 0.40", "Hₐ: p < 0.40"]
    },


    {
        type: "One-Proportion Test",

        scenario:
            "A candidate claims to have support from 50% of voters. A poll is conducted to determine whether the candidate has majority support.",

        proposed:
            ["H₀: p = 0.50", "Hₐ: p ≠ 0.50"],

        error: "direction",

        reason:
            "Majority support means more than 50%, so the alternative should be p > 0.50.",

        correct:
            ["H₀: p = 0.50", "Hₐ: p > 0.50"]
    },


    {
        type: "One-Proportion Test",

        scenario:
            "A website historically converts 12% of visitors into customers. A redesign is tested to determine whether the conversion rate has changed.",

        proposed:
            ["H₀: p = 0.10", "Hₐ: p ≠ 0.10"],

        error: "value",

        reason:
            "The hypothesized population proportion should be the historical value of 0.12.",

        correct:
            ["H₀: p = 0.12", "Hₐ: p ≠ 0.12"]
    },


    /* ========================================
       TWO-PROPORTION TESTS
       ======================================== */

    {
        type: "Two-Proportion Test",

        scenario:
            "Researchers compare the proportion of students who pass an exam using Method 1 with the proportion who pass using Method 2.",

        proposed:
            ["H₀: p̂₁ = p̂₂", "Hₐ: p̂₁ ≠ p̂₂"],

        error: "statistic",

        reason:
            "The hypotheses concern the two population proportions, so use p₁ and p₂ rather than sample proportions.",

        correct:
            ["H₀: p₁ = p₂", "Hₐ: p₁ ≠ p₂"]
    },


    {
        type: "Two-Proportion Test",

        scenario:
            "A researcher wants to determine whether the proportion of customers who purchase a product is higher for Advertisement A than Advertisement B.",

        proposed:
            ["H₀: p₁ = p₂", "Hₐ: p₁ < p₂"],

        error: "direction",

        reason:
            "If p₁ represents Advertisement A, 'higher for A' means p₁ > p₂.",

        correct:
            ["H₀: p₁ = p₂", "Hₐ: p₁ > p₂"]
    },


    {
        type: "Two-Proportion Test",

        scenario:
            "Researchers want to determine whether vaccination rates differ between two counties.",

        proposed:
            ["H₀: p₁ ≠ p₂", "Hₐ: p₁ = p₂"],

        error: "equality",

        reason:
            "Equality belongs in the null hypothesis. The claim of a difference belongs in the alternative.",

        correct:
            ["H₀: p₁ = p₂", "Hₐ: p₁ ≠ p₂"]
    },


    {
        type: "Two-Proportion Test",

        scenario:
            "A study investigates whether the proportion of voters supporting a proposal differs between voters under age 30 and voters age 30 or older.",

        proposed:
            ["H₀: p₁ - p₂ = 1", "Hₐ: p₁ - p₂ ≠ 1"],

        error: "value",

        reason:
            "No difference between population proportions corresponds to a difference of 0, not 1.",

        correct:
            ["H₀: p₁ - p₂ = 0", "Hₐ: p₁ - p₂ ≠ 0"]
    },


    {
        type: "Two-Proportion Test",

        scenario:
            "A teacher compares the proportion of students earning an A in an online course with the proportion earning an A in an in-person course.",

        proposed:
            ["H₀: x₁ = x₂", "Hₐ: x₁ ≠ x₂"],

        error: "parameter",

        reason:
            "The hypotheses should compare population proportions, not the numbers of successes in the samples.",

        correct:
            ["H₀: p₁ = p₂", "Hₐ: p₁ ≠ p₂"]
    },


    /* ========================================
       CHI-SQUARE INDEPENDENCE
       ======================================== */

    {
        type: "Chi-Square Test for Independence",

        scenario:
            "A random sample of students is classified by grade level and preferred lunch option. The researcher wants to determine whether the two variables are associated.",

        proposed:
            [
                "H₀: Grade level and lunch preference are dependent.",
                "Hₐ: Grade level and lunch preference are independent."
            ],

        error: "chisquare",

        reason:
            "For a chi-square test for independence, the null states that the two categorical variables are independent.",

        correct:
            [
                "H₀: Grade level and lunch preference are independent.",
                "Hₐ: Grade level and lunch preference are associated."
            ]
    },


    {
        type: "Chi-Square Test for Independence",

        scenario:
            "Researchers classify adults by exercise category and sleep-quality category and investigate whether the variables are associated.",

        proposed:
            [
                "H₀: p = 0.50",
                "Hₐ: p ≠ 0.50"
            ],

        error: "chisquare",

        reason:
            "A chi-square test for independence concerns the relationship between two categorical variables, not a single population proportion.",

        correct:
            [
                "H₀: Exercise category and sleep-quality category are independent.",
                "Hₐ: Exercise category and sleep-quality category are associated."
            ]
    },


    {
        type: "Chi-Square Test for Independence",

        scenario:
            "A survey records students' class year and preferred study location. Researchers want to determine whether there is an association.",

        proposed:
            [
                "H₀: Class year = study location.",
                "Hₐ: Class year ≠ study location."
            ],

        error: "chisquare",

        reason:
            "The hypotheses describe whether the categorical variables are independent or associated; the variables themselves are not set equal to one another.",

        correct:
            [
                "H₀: Class year and preferred study location are independent.",
                "Hₐ: Class year and preferred study location are associated."
            ]
    },


    {
        type: "Chi-Square Test for Independence",

        scenario:
            "Researchers record pet ownership and housing type for a random sample of adults.",

        proposed:
            [
                "H₀: Pet ownership and housing type are independent.",
                "Hₐ: Pet ownership and housing type are independent."
            ],

        error: "chisquare",

        reason:
            "The alternative must contradict the null. It should state that the variables are associated.",

        correct:
            [
                "H₀: Pet ownership and housing type are independent.",
                "Hₐ: Pet ownership and housing type are associated."
            ]
    },


    {
        type: "Chi-Square Test for Independence",

        scenario:
            "A school surveys students about class year and whether they participate in a school sport.",

        proposed:
            [
                "H₀: Class year and sports participation are associated.",
                "Hₐ: Class year and sports participation are not associated."
            ],

        error: "chisquare",

        reason:
            "The null hypothesis for a test of independence states that the variables are independent.",

        correct:
            [
                "H₀: Class year and sports participation are independent.",
                "Hₐ: Class year and sports participation are associated."
            ]
    },


    /* ========================================
       CHI-SQUARE HOMOGENEITY
       ======================================== */

    {
        type: "Chi-Square Test for Homogeneity",

        scenario:
            "Separate random samples of students from three schools are asked which of four lunch options they prefer. Researchers want to compare the distributions of preferences.",

        proposed:
            [
                "H₀: The distributions of lunch preference differ among the three schools.",
                "Hₐ: The distributions are the same."
            ],

        error: "chisquare",

        reason:
            "For a test of homogeneity, the null states that the population distributions are the same.",

        correct:
            [
                "H₀: The distribution of lunch preference is the same for all three schools.",
                "Hₐ: The distribution of lunch preference is not the same for all three schools."
            ]
    },


    {
        type: "Chi-Square Test for Homogeneity",

        scenario:
            "Random samples from four age groups are asked to select their preferred news source.",

        proposed:
            [
                "H₀: p₁ = p₂",
                "Hₐ: p₁ ≠ p₂"
            ],

        error: "chisquare",

        reason:
            "There are multiple categorical distributions being compared, so the hypotheses should describe whether those distributions are the same across populations.",

        correct:
            [
                "H₀: The distribution of preferred news source is the same for all four age groups.",
                "Hₐ: The distribution of preferred news source is not the same for all four age groups."
            ]
    },


    {
        type: "Chi-Square Test for Homogeneity",

        scenario:
            "Researchers sample customers from three stores and record their satisfaction category: dissatisfied, neutral, or satisfied.",

        proposed:
            [
                "H₀: Store and satisfaction are independent.",
                "Hₐ: Store and satisfaction are associated."
            ],

        error: "chisquare",

        reason:
            "Because separate samples were taken from several populations, this is framed as a test for homogeneity. The hypotheses compare the distributions of satisfaction across stores.",

        correct:
            [
                "H₀: The distribution of satisfaction is the same for all three stores.",
                "Hₐ: The distribution of satisfaction is not the same for all three stores."
            ]
    },


    {
        type: "Chi-Square Test for Homogeneity",

        scenario:
            "Separate random samples of residents from three cities are asked which transportation method they use most often.",

        proposed:
            [
                "H₀: The transportation distributions are the same for all three cities.",
                "Hₐ: The transportation distributions are the same for all three cities."
            ],

        error: "chisquare",

        reason:
            "The alternative must state that the distributions are not all the same.",

        correct:
            [
                "H₀: The distribution of transportation method is the same for all three cities.",
                "Hₐ: The distribution of transportation method is not the same for all three cities."
            ]
    },


    {
        type: "Chi-Square Test for Homogeneity",

        scenario:
            "Researchers compare political-news consumption categories among random samples from four different regions.",

        proposed:
            [
                "H₀: Every category has probability 0.25.",
                "Hₐ: At least one category has probability different from 0.25."
            ],

        error: "chisquare",

        reason:
            "Those hypotheses describe a goodness-of-fit test. A homogeneity test asks whether the distribution of the categorical response is the same across the populations.",

        correct:
            [
                "H₀: The distribution of news-consumption category is the same across all four regions.",
                "Hₐ: The distribution of news-consumption category is not the same across all four regions."
            ]
    }

];


/* ========================================
   VARIABLES
   ======================================== */

let currentProblem = 0;


const scenario =
    document.getElementById("scenario");

const hypotheses =
    document.getElementById("hypotheses");

const testType =
    document.getElementById("testType");

const problemNumber =
    document.getElementById("problemNumber");

const problemTotal =
    document.getElementById("problemTotal");

const errorType =
    document.getElementById("errorType");

const explanation =
    document.getElementById("explanation");

const correctedHypotheses =
    document.getElementById("correctedHypotheses");

const feedback =
    document.getElementById("feedback");

const answer =
    document.getElementById("answer");


problemTotal.textContent =
    problems.length;


/* ========================================
   DISPLAY PROBLEM
   ======================================== */

function displayProblem() {

    const problem =
        problems[currentProblem];


    problemNumber.textContent =
        currentProblem + 1;


    testType.textContent =
        problem.type;


    scenario.textContent =
        problem.scenario;


    hypotheses.innerHTML = `

        <div class="hypothesis-line">
            ${problem.proposed[0]}
        </div>

        <div class="hypothesis-line">
            ${problem.proposed[1]}
        </div>

    `;


    errorType.value = "";

    explanation.value = "";

    correctedHypotheses.value = "";


    feedback.textContent = "";

    feedback.className =
        "feedback";


    answer.innerHTML = "";

    answer.classList.remove(
        "visible"
    );

}


/* ========================================
   CHECK ERROR
   ======================================== */

document
    .getElementById("checkError")
    .addEventListener(
        "click",
        function () {

            const problem =
                problems[currentProblem];


            if (
                errorType.value === ""
            ) {

                feedback.textContent =
                    "Select the error you found.";

                feedback.className =
                    "feedback incorrect";

                return;

            }


            if (
                errorType.value ===
                problem.error
            ) {

                feedback.textContent =
                    "Correct. You identified the main error.";

                feedback.className =
                    "feedback correct";

            }

            else {

                feedback.textContent =
                    "Not quite. Look carefully at the parameters, symbols, and relationship between H₀ and Hₐ.";

                feedback.className =
                    "feedback incorrect";

            }

        }
    );


/* ========================================
   REVEAL CORRECTION
   ======================================== */

document
    .getElementById("revealAnswer")
    .addEventListener(
        "click",
        function () {

            const problem =
                problems[currentProblem];


            answer.innerHTML = `

                <strong>
                    Why it is incorrect:
                </strong>

                <p>
                    ${problem.reason}
                </p>

                <strong>
                    Correct hypotheses:
                </strong>

                <div class="correct-hypotheses">

                    <div>
                        ${problem.correct[0]}
                    </div>

                    <div>
                        ${problem.correct[1]}
                    </div>

                </div>

            `;


            answer.classList.add(
                "visible"
            );

        }
    );


/* ========================================
   NEXT
   ======================================== */

document
    .getElementById("nextProblem")
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


/* ========================================
   PREVIOUS
   ======================================== */

document
    .getElementById("previousProblem")
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


/* ========================================
   START
   ======================================== */

displayProblem();