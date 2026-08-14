const prompts = [

    {
        prompt:
            "Describe how to construct a sampling distribution of a statistic.",

        seconds: 120,

        difficulty:
            "2 minutes",

        sample: `
            <ol>
                <li>Take a random sample of a fixed size from the population.</li>
                <li>Calculate the statistic of interest for the sample.</li>
                <li>Repeat the sampling process many times using the same sample size.</li>
                <li>Calculate the statistic for every sample.</li>
                <li>Plot the resulting values of the statistic.</li>
            </ol>

            <p>
                The distribution of those statistic values is the
                sampling distribution.
            </p>
        `
    },


    {
        prompt:
            "Explain the difference between a population distribution, a sample distribution, and a sampling distribution.",

        seconds: 180,

        difficulty:
            "3 minutes",

        sample: `
            <p>
                A <strong>population distribution</strong> describes the
                values of a variable for every individual in the population.
            </p>

            <p>
                A <strong>sample distribution</strong> describes the
                observed values from one particular sample.
            </p>

            <p>
                A <strong>sampling distribution</strong> describes the
                values of a statistic obtained from many possible samples
                of the same size.
            </p>
        `
    },


    {
        prompt:
            "Describe how increasing sample size affects the sampling distribution of a sample mean.",

        seconds: 120,

        difficulty:
            "2 minutes",

        sample: `
            <p>
                Increasing the sample size does not change the center of
                the sampling distribution of the sample mean, but it
                decreases its variability.
            </p>

            <p>
                Since the standard deviation of the sampling distribution
                is σ / √n, larger samples produce less variable sample
                means. The sampling distribution also tends to become
                more nearly normal as the sample size increases.
            </p>
        `
    },


    {
        prompt:
            "Explain why a statistic can vary from sample to sample even when every sample comes from the same population.",

        seconds: 120,

        difficulty:
            "2 minutes",

        sample: `
            <p>
                Random samples contain different individuals or
                observations. Because the observations differ from one
                sample to another, the statistic calculated from those
                observations also changes.
            </p>

            <p>
                This natural variation is called sampling variability.
            </p>
        `
    },


    {
        prompt:
            "Describe how you could use a simulation to investigate the sampling distribution of a sample proportion.",

        seconds: 180,

        difficulty:
            "3 minutes",

        sample: `
            <ol>
                <li>Specify a population proportion p.</li>
                <li>Generate a random sample of a fixed size n.</li>
                <li>Record whether each observation is a success or failure.</li>
                <li>Calculate the sample proportion p̂.</li>
                <li>Repeat the simulation many times.</li>
                <li>Plot all of the resulting sample proportions.</li>
            </ol>

            <p>
                The resulting distribution approximates the sampling
                distribution of p̂.
            </p>
        `
    }

];


let currentPrompt = 0;
let timerInterval = null;
let remainingSeconds = 0;


/* =========================
   Elements
   ========================= */

const promptText =
    document.getElementById(
        "promptText"
    );

const promptNumber =
    document.getElementById(
        "promptNumber"
    );

const promptTotal =
    document.getElementById(
        "promptTotal"
    );

const difficulty =
    document.getElementById(
        "difficulty"
    );

const timer =
    document.getElementById(
        "timer"
    );

const startTimer =
    document.getElementById(
        "startTimer"
    );

const writingArea =
    document.getElementById(
        "writingArea"
    );

const studentResponse =
    document.getElementById(
        "studentResponse"
    );

const wordCount =
    document.getElementById(
        "wordCount"
    );

const revealButton =
    document.getElementById(
        "revealButton"
    );

const sampleResponse =
    document.getElementById(
        "sampleResponse"
    );

const timeMessage =
    document.getElementById(
        "timeMessage"
    );


promptTotal.textContent =
    prompts.length;


/* =========================
   Format timer
   ========================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remaining =
        seconds % 60;


    return (
        minutes +
        ":" +
        String(remaining)
            .padStart(2, "0")
    );

}


/* =========================
   Display prompt
   ========================= */

function displayPrompt() {

    clearInterval(
        timerInterval
    );


    const item =
        prompts[currentPrompt];


    promptText.textContent =
        item.prompt;


    promptNumber.textContent =
        currentPrompt + 1;


    difficulty.textContent =
        item.difficulty;


    remainingSeconds =
        item.seconds;


    timer.textContent =
        formatTime(
            remainingSeconds
        );


    timer.classList.remove(
        "finished"
    );


    startTimer.disabled =
        false;


    startTimer.textContent =
        "Start Writing";


    writingArea.classList.add(
        "locked"
    );


    studentResponse.value =
        "";


    wordCount.textContent =
        "0";


    revealButton.disabled =
        true;


    sampleResponse.innerHTML =
        "";


    sampleResponse.classList.remove(
        "visible"
    );


    timeMessage.textContent =
        "";

}


/* =========================
   Start timer
   ========================= */

startTimer.addEventListener(
    "click",
    function () {

        if (timerInterval) {
            return;
        }


        writingArea.classList.remove(
            "locked"
        );


        studentResponse.focus();


        startTimer.disabled =
            true;


        startTimer.textContent =
            "Writing...";


        timerInterval =
            setInterval(
                function () {

                    remainingSeconds--;


                    timer.textContent =
                        formatTime(
                            remainingSeconds
                        );


                    if (
                        remainingSeconds <= 0
                    ) {

                        clearInterval(
                            timerInterval
                        );


                        timerInterval =
                            null;


                        timer.textContent =
                            "0:00";


                        timer.classList.add(
                            "finished"
                        );


                        timeMessage.textContent =
                            "Time is up. Finish your current thought, then compare your response.";


                        revealButton.disabled =
                            false;

                    }

                },
                1000
            );

    }
);


/* =========================
   Word count
   ========================= */

studentResponse.addEventListener(
    "input",
    function () {

        const text =
            studentResponse.value
                .trim();


        if (text === "") {

            wordCount.textContent =
                "0";

            return;

        }


        const words =
            text.split(
                /\s+/
            );


        wordCount.textContent =
            words.length;

    }
);


/* =========================
   Reveal sample
   ========================= */

revealButton.addEventListener(
    "click",
    function () {

        const item =
            prompts[currentPrompt];


        sampleResponse.innerHTML = `

            <strong>
                One possible response:
            </strong>

            ${item.sample}

        `;


        sampleResponse.classList.add(
            "visible"
        );

    }
);


/* =========================
   Next
   ========================= */

document
    .getElementById(
        "nextPrompt"
    )
    .addEventListener(
        "click",
        function () {

            currentPrompt++;


            if (
                currentPrompt >=
                prompts.length
            ) {

                currentPrompt = 0;

            }


            displayPrompt();

        }
    );


/* =========================
   Previous
   ========================= */

document
    .getElementById(
        "previousPrompt"
    )
    .addEventListener(
        "click",
        function () {

            currentPrompt--;


            if (
                currentPrompt < 0
            ) {

                currentPrompt =
                    prompts.length - 1;

            }


            displayPrompt();

        }
    );


/* =========================
   Start
   ========================= */

displayPrompt();