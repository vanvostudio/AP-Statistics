const n = 16;
const p = 0.5;
const repetitions = 20;


const lockPredictionButton =
    document.getElementById(
        "lockPrediction"
    );


const simulationPanel =
    document.getElementById(
        "simulationPanel"
    );


const comparePanel =
    document.getElementById(
        "comparePanel"
    );


const results =
    document.getElementById(
        "results"
    );


const summary =
    document.getElementById(
        "summary"
    );


/* =========================
   Lock prediction
   ========================= */

lockPredictionButton.addEventListener(
    "click",
    function () {

        const center =
            document.getElementById(
                "centerPrediction"
            ).value;


        const shape =
            document.getElementById(
                "shapePrediction"
            ).value;


        const text =
            document.getElementById(
                "predictionText"
            ).value.trim();


        const status =
            document.getElementById(
                "predictionStatus"
            );


        if (
            center === "" ||
            shape === "" ||
            text === ""
        ) {

            status.textContent =
                "Complete all prediction fields before continuing.";

            return;
        }


        status.textContent =
            "Prediction locked. Now run the simulation.";


        document.getElementById(
            "centerPrediction"
        ).disabled = true;


        document.getElementById(
            "shapePrediction"
        ).disabled = true;


        document.getElementById(
            "predictionText"
        ).disabled = true;


        lockPredictionButton.disabled =
            true;


        simulationPanel.classList.remove(
            "locked"
        );

    }
);


/* =========================
   Simulate one Binomial
   ========================= */

function simulateBinomial() {

    let successes = 0;


    for (
        let trial = 0;
        trial < n;
        trial++
    ) {

        if (
            Math.random() < p
        ) {

            successes++;

        }

    }


    return successes;

}


/* =========================
   Run simulation
   ========================= */

function runSimulation() {

    const simulatedValues = [];


    for (
        let i = 0;
        i < repetitions;
        i++
    ) {

        simulatedValues.push(
            simulateBinomial()
        );

    }


    drawHistogram(
        simulatedValues
    );


    displaySummary(
        simulatedValues
    );


    comparePanel.classList.remove(
        "locked"
    );

}


document
    .getElementById(
        "runSimulation"
    )
    .addEventListener(
        "click",
        runSimulation
    );


document
    .getElementById(
        "runAgain"
    )
    .addEventListener(
        "click",
        runSimulation
    );


/* =========================
   Histogram
   ========================= */

function drawHistogram(data) {

    const frequencies =
        Array(n + 1).fill(0);


    data.forEach(value => {

        frequencies[value]++;

    });


    const maxFrequency =
        Math.max(...frequencies);


    let html = `

        <h3>
            Observed Distribution
        </h3>

        <div class="histogram">

    `;


    frequencies.forEach(
        (frequency, value) => {

            const height =
                maxFrequency === 0
                    ? 0
                    : (
                        frequency /
                        maxFrequency
                    ) * 220;


            html += `

                <div class="bar-group">

                    <div class="frequency">
                        ${
                            frequency === 0
                                ? ""
                                : frequency
                        }
                    </div>

                    <div
                        class="bar"
                        style="
                            height:
                            ${height}px;
                        "
                    ></div>

                    <div class="x-label">
                        ${value}
                    </div>

                </div>

            `;

        }
    );


    html += `

        </div>

        <div class="axis-title">
            Number of Successes out of 16
        </div>

    `;


    results.innerHTML =
        html;

}


/* =========================
   Summary statistics
   ========================= */

function displaySummary(data) {

    const mean =
        data.reduce(
            (sum, value) =>
                sum + value,
            0
        ) / data.length;


    const min =
        Math.min(...data);


    const max =
        Math.max(...data);


    const frequencies = {};


    data.forEach(value => {

        frequencies[value] =
            (frequencies[value] || 0)
            + 1;

    });


    let mode = null;
    let modeFrequency = 0;


    Object.keys(
        frequencies
    ).forEach(value => {

        if (
            frequencies[value] >
            modeFrequency
        ) {

            modeFrequency =
                frequencies[value];


            mode =
                Number(value);

        }

    });


    summary.innerHTML = `

        <div class="summary-grid">

            <div class="summary-box">

                <span>
                    Observed Mean
                </span>

                <strong>
                    ${mean.toFixed(2)}
                </strong>

            </div>


            <div class="summary-box">

                <span>
                    Most Frequent Value
                </span>

                <strong>
                    ${mode}
                </strong>

            </div>


            <div class="summary-box">

                <span>
                    Observed Range
                </span>

                <strong>
                    ${min}–${max}
                </strong>

            </div>

        </div>

        <p>
            For a binomial distribution with
            n = ${n} and p = ${p},
            the theoretical mean is
            <strong>${n * p}</strong>.
        </p>

        <p>
            With only ${repetitions} simulations,
            the observed distribution may look irregular.
            Repeating the experiment many more times would
            usually produce a smoother pattern.
        </p>

    `;

}


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

            document.getElementById(
                "centerPrediction"
            ).value = "";


            document.getElementById(
                "shapePrediction"
            ).value = "";


            document.getElementById(
                "predictionText"
            ).value = "";


            document.getElementById(
                "comparisonText"
            ).value = "";


            document.getElementById(
                "centerPrediction"
            ).disabled = false;


            document.getElementById(
                "shapePrediction"
            ).disabled = false;


            document.getElementById(
                "predictionText"
            ).disabled = false;


            lockPredictionButton.disabled =
                false;


            document.getElementById(
                "predictionStatus"
            ).textContent = "";


            simulationPanel.classList.add(
                "locked"
            );


            comparePanel.classList.add(
                "locked"
            );


            results.innerHTML = `

                <p class="placeholder">
                    Your simulation results will appear here.
                </p>

            `;


            summary.innerHTML = "";

        }
    );