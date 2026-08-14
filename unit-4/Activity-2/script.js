const conditions = [

    {
        title:
            "Randomness / Random Sample",

        answer:
            "The data should come from a random sample or from a randomized experiment.",

        why:
            "Randomization helps make the sample representative of the population and supports valid inference.",

        violation:
            "If the sample is biased or selected systematically, the results may not generalize to the population, even if the calculations are performed correctly."
    },


    {
        title:
            "Independence / 10% Condition",

        answer:
            "Individual observations should be independent. When sampling without replacement, the sample size should be no more than 10% of the population.",

        why:
            "The standard-error formula assumes that observations behave approximately independently.",

        violation:
            "If observations strongly influence one another, the estimated standard error may be wrong, which makes the t statistic, p-value, and confidence interval unreliable."
    },


    {
        title:
            "Normal / Large Sample Condition",

        answer:
            "The population should be approximately normal, or the sample should be large enough for the sampling distribution of the sample mean to be approximately normal. Small samples should not contain strong skewness or extreme outliers.",

        why:
            "The one-sample t procedure relies on the sampling distribution of the sample mean being approximately normal.",

        violation:
            "With a small, strongly skewed sample or extreme outliers, the t distribution may not approximate the sampling distribution well, so p-values and confidence intervals may be inaccurate."
    }

];


const container =
    document.getElementById(
        "conditionContainer"
    );


/* =========================
   Build cards
   ========================= */

function buildConditions() {

    container.innerHTML = "";


    conditions.forEach(
        (condition, index) => {

            const card =
                document.createElement(
                    "section"
                );


            card.className =
                "condition-card";


            card.innerHTML = `

                <div class="condition-number">
                    Condition ${index + 1}
                </div>

                <h2>
                    What condition is needed?
                </h2>


                <label>
                    Name or describe the condition.
                </label>

                <input
                    type="text"
                    class="condition-input"
                    placeholder="The condition is..."
                >


                <label>
                    Why is this condition required?
                </label>

                <textarea
                    class="why-input"
                    placeholder="This condition is important because..."
                ></textarea>


                <label>
                    What could go wrong if it were violated?
                </label>

                <textarea
                    class="violation-input"
                    placeholder="If this condition were violated..."
                ></textarea>


                <button
                    class="reveal-condition secondary-button"
                    data-index="${index}"
                >
                    Compare Answer
                </button>


                <div
                    class="sample-answer"
                    id="answer-${index}"
                >

                    <h3>
                        ${condition.title}
                    </h3>

                    <p>
                        <strong>Condition:</strong>
                        ${condition.answer}
                    </p>

                    <p>
                        <strong>Why it matters:</strong>
                        ${condition.why}
                    </p>

                    <p>
                        <strong>If violated:</strong>
                        ${condition.violation}
                    </p>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );


    addRevealListeners();

}


/* =========================
   Individual reveals
   ========================= */

function addRevealListeners() {

    document
        .querySelectorAll(
            ".reveal-condition"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        button.dataset.index;


                    document
                        .getElementById(
                            `answer-${index}`
                        )
                        .classList
                        .toggle(
                            "visible"
                        );

                }
            );

        });

}


/* =========================
   Reveal all
   ========================= */

document
    .getElementById(
        "revealAll"
    )
    .addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(
                    ".sample-answer"
                )
                .forEach(answer => {

                    answer.classList.add(
                        "visible"
                    );

                });


            document
                .getElementById(
                    "comparisonSection"
                )
                .classList.add(
                    "visible"
                );

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

            buildConditions();


            document
                .getElementById(
                    "comparisonResponse"
                )
                .value = "";


            document
                .getElementById(
                    "remainingQuestion"
                )
                .value = "";


            document
                .getElementById(
                    "comparisonSection"
                )
                .classList.remove(
                    "visible"
                );

        }
    );


/* =========================
   Start
   ========================= */

buildConditions();