const rounds = [

    {
        title:
            "Confidence Interval for One Population Proportion",

        badge:
            "One Proportion",

        scenario:
            "In a random sample of 200 students, 126 said they regularly use a study planner. Construct a 95% confidence interval for the population proportion of students who regularly use a study planner.",

        confidence:
            0.95,

        data: [
            ["Sample size", "200"],
            ["Successes", "126"],
            ["Confidence", "95%"]
        ],

        type:
            "one",

        pHat:
            126 / 200,

        zStar:
            1.96,

        interpretationParameter:
            "population proportion of students who regularly use a study planner"
    },


    {
        title:
            "Confidence Interval for the Difference of Two Population Proportions",

        badge:
            "Two Proportions",

        scenario:
            "In a random sample of 150 students at School A, 102 prefer later school start times. In a random sample of 140 students at School B, 82 prefer later start times. Construct a 95% confidence interval for p₁ − p₂.",

        confidence:
            0.95,

        data: [
            ["School A", "102 / 150"],
            ["School B", "82 / 140"],
            ["Confidence", "95%"]
        ],

        type:
            "two",

        p1:
            102 / 150,

        p2:
            82 / 140,

        n1:
            150,

        n2:
            140,

        zStar:
            1.96,

        interpretationParameter:
            "difference in the population proportions who prefer later school start times, School A minus School B"
    }

];


let currentRound = 0;


/* =========================
   Elements
   ========================= */

const scenario =
    document.getElementById("scenario");

const dataDisplay =
    document.getElementById("dataDisplay");

const calculatorFields =
    document.getElementById("calculatorFields");

const roundTitle =
    document.getElementById("roundTitle");

const roundBadge =
    document.getElementById("roundBadge");

const roundNumber =
    document.getElementById("roundNumber");

const writeStep =
    document.getElementById("writeStep");

const interpretStep =
    document.getElementById("interpretStep");

const calculationFeedback =
    document.getElementById("calculationFeedback");

const intervalFeedback =
    document.getElementById("intervalFeedback");

const sampleInterpretation =
    document.getElementById("sampleInterpretation");

const calculationInstruction =
    document.getElementById("calculationInstruction");

const intervalResponse =
    document.getElementById("intervalResponse");

const interpretation =
    document.getElementById("interpretation");


/* =========================
   Calculate interval
   ========================= */

function getInterval(round) {

    if (round.type === "one") {

        const pHat =
            round.pHat;

        const se =
            Math.sqrt(
                pHat *
                (1 - pHat) /
                200
            );

        const margin =
            round.zStar * se;

        return {
            estimate: pHat,
            se: se,
            margin: margin,
            lower: pHat - margin,
            upper: pHat + margin
        };

    }


    const difference =
        round.p1 - round.p2;


    const se =
        Math.sqrt(

            round.p1 *
            (1 - round.p1) /
            round.n1

            +

            round.p2 *
            (1 - round.p2) /
            round.n2

        );


    const margin =
        round.zStar * se;


    return {
        estimate: difference,
        se: se,
        margin: margin,
        lower: difference - margin,
        upper: difference + margin
    };

}


/* =========================
   Display round
   ========================= */

function displayRound() {

    const round =
        rounds[currentRound];


    const interval =
        getInterval(round);


    roundNumber.textContent =
        currentRound + 1;


    roundTitle.textContent =
        round.title;


    roundBadge.textContent =
        round.badge;


    scenario.textContent =
        round.scenario;


    document.getElementById(
        "confidenceLevelText"
    ).textContent =
        `${round.confidence * 100}%`;


    dataDisplay.innerHTML = "";


    round.data.forEach(item => {

        dataDisplay.innerHTML += `

            <div class="data-box">

                <span>
                    ${item[0]}
                </span>

                <strong>
                    ${item[1]}
                </strong>

            </div>

        `;

    });


    buildCalculatorFields(
        round
    );


    calculationInstruction.value = "";

    intervalResponse.value = "";

    interpretation.value = "";


    calculationFeedback.textContent = "";

    intervalFeedback.textContent = "";


    calculationFeedback.className =
        "feedback";

    intervalFeedback.className =
        "feedback";


    sampleInterpretation.innerHTML = "";

    sampleInterpretation.classList.remove(
        "visible"
    );


    writeStep.classList.add(
        "locked"
    );


    interpretStep.classList.add(
        "locked"
    );


    updateRoles();

}


/* =========================
   Calculator fields
   ========================= */

function buildCalculatorFields(round) {

    if (round.type === "one") {

        calculatorFields.innerHTML = `

            <div class="calculation-grid">

                <div>

                    <label for="estimateInput">
                        Sample proportion p̂
                    </label>

                    <input
                        id="estimateInput"
                        type="number"
                        step="0.001"
                    >

                </div>


                <div>

                    <label for="seInput">
                        Standard error
                    </label>

                    <input
                        id="seInput"
                        type="number"
                        step="0.001"
                    >

                </div>


                <div>

                    <label for="marginInput">
                        Margin of error
                    </label>

                    <input
                        id="marginInput"
                        type="number"
                        step="0.001"
                    >

                </div>

            </div>

        `;

    }

    else {

        calculatorFields.innerHTML = `

            <div class="calculation-grid">

                <div>

                    <label for="estimateInput">
                        p̂₁ − p̂₂
                    </label>

                    <input
                        id="estimateInput"
                        type="number"
                        step="0.001"
                    >

                </div>


                <div>

                    <label for="seInput">
                        Standard error
                    </label>

                    <input
                        id="seInput"
                        type="number"
                        step="0.001"
                    >

                </div>


                <div>

                    <label for="marginInput">
                        Margin of error
                    </label>

                    <input
                        id="marginInput"
                        type="number"
                        step="0.001"
                    >

                </div>

            </div>

        `;

    }

}


/* =========================
   Check calculations
   ========================= */

document
    .getElementById(
        "checkCalculation"
    )
    .addEventListener(
        "click",
        function () {

            const round =
                rounds[currentRound];


            const correct =
                getInterval(round);


            const estimate =
                Number(
                    document.getElementById(
                        "estimateInput"
                    ).value
                );


            const se =
                Number(
                    document.getElementById(
                        "seInput"
                    ).value
                );


            const margin =
                Number(
                    document.getElementById(
                        "marginInput"
                    ).value
                );


            const tolerance =
                0.005;


            if (
                Math.abs(
                    estimate -
                    correct.estimate
                ) < tolerance

                &&

                Math.abs(
                    se -
                    correct.se
                ) < tolerance

                &&

                Math.abs(
                    margin -
                    correct.margin
                ) < tolerance
            ) {

                calculationFeedback.textContent =
                    "Calculations look correct. Now construct the interval.";

                calculationFeedback.className =
                    "feedback correct";


                writeStep.classList.remove(
                    "locked"
                );

            }

            else {

                calculationFeedback.textContent =
                    "Check the calculations with your partner.";

                calculationFeedback.className =
                    "feedback incorrect";

            }

        }
    );


/* =========================
   Check interval
   ========================= */

document
    .getElementById(
        "checkInterval"
    )
    .addEventListener(
        "click",
        function () {

            const correct =
                getInterval(
                    rounds[currentRound]
                );


            const numbers =
                intervalResponse.value
                    .match(
                        /-?\d*\.?\d+/g
                    );


            if (
                !numbers ||
                numbers.length < 2
            ) {

                intervalFeedback.textContent =
                    "Enter both endpoints of the interval.";

                intervalFeedback.className =
                    "feedback incorrect";

                return;

            }


            const lower =
                Number(numbers[0]);

            const upper =
                Number(numbers[1]);


            const tolerance =
                0.01;


            if (
                Math.abs(
                    lower -
                    correct.lower
                ) < tolerance

                &&

                Math.abs(
                    upper -
                    correct.upper
                ) < tolerance
            ) {

                intervalFeedback.textContent =
                    "Correct interval.";

                intervalFeedback.className =
                    "feedback correct";


                interpretStep.classList.remove(
                    "locked"
                );

            }

            else {

                intervalFeedback.textContent =
                    "Check the estimate ± margin of error.";

                intervalFeedback.className =
                    "feedback incorrect";

            }

        }
    );


/* =========================
   Sample interpretation
   ========================= */

document
    .getElementById(
        "revealInterpretation"
    )
    .addEventListener(
        "click",
        function () {

            const round =
                rounds[currentRound];


            const interval =
                getInterval(round);


            const lower =
                interval.lower.toFixed(3);


            const upper =
                interval.upper.toFixed(3);


            sampleInterpretation.innerHTML = `

                <strong>
                    Sample interpretation:
                </strong>

                <p>
                    We are 95% confident that the interval
                    from ${lower} to ${upper} captures the true
                    ${round.interpretationParameter}.
                </p>

            `;


            sampleInterpretation.classList.add(
                "visible"
            );

        }
    );


/* =========================
   Switch roles
   ========================= */

function updateRoles() {

    const partnerARole =
        document.getElementById(
            "partnerARole"
        );


    const partnerBRole =
        document.getElementById(
            "partnerBRole"
        );


    const partnerADescription =
        document.getElementById(
            "partnerADescription"
        );


    const partnerBDescription =
        document.getElementById(
            "partnerBDescription"
        );


    if (currentRound === 0) {

        partnerARole.textContent =
            "Calculator Operator";

        partnerBRole.textContent =
            "Scribe";


        partnerADescription.textContent =
            "You may perform calculations, but you may not type written explanations.";

        partnerBDescription.textContent =
            "You may enter written work, but you may not perform calculations.";

    }

    else {

        partnerARole.textContent =
            "Scribe";

        partnerBRole.textContent =
            "Calculator Operator";


        partnerADescription.textContent =
            "You may enter written work, but you may not perform calculations.";

        partnerBDescription.textContent =
            "You may perform calculations, but you may not type written explanations.";

    }

}


/* =========================
   Next round
   ========================= */

document
    .getElementById(
        "nextRound"
    )
    .addEventListener(
        "click",
        function () {

            currentRound++;


            if (
                currentRound >=
                rounds.length
            ) {

                currentRound = 0;

            }


            displayRound();

        }
    );


/* =========================
   Reset
   ========================= */

document
    .getElementById(
        "resetActivity"
    )
    .addEventListener(
        "click",
        function () {

            currentRound = 0;

            displayRound();

        }
    );


/* =========================
   Start
   ========================= */

displayRound();