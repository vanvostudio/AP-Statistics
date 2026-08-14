const cards = [

    {
        id: "goal",
        text: "What is the goal: estimate a parameter or test a claim?"
    },

    {
        id: "variable",
        text: "Is the variable quantitative or categorical?"
    },

    {
        id: "parameter",
        text: "Does the question involve a mean, proportion, or categorical distribution?"
    },

    {
        id: "groups",
        text: "How many populations, groups, or samples are being compared?"
    },

    {
        id: "relationship",
        text: "For categorical data: one distribution or a relationship between two variables?"
    },

    {
        id: "procedure",
        text: "Choose the inference procedure that matches these features."
    }

];


const cardBank =
    document.getElementById(
        "cardBank"
    );


const workspace =
    document.getElementById(
        "workspace"
    );


let draggedCard = null;


/* =========================
   Build Card Bank
   ========================= */

function buildCardBank() {

    cardBank.innerHTML = "";


    cards.forEach(cardData => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "flow-card";


        card.id =
            `card-${cardData.id}`;


        card.draggable =
            true;


        card.dataset.id =
            cardData.id;


        card.textContent =
            cardData.text;


        addCardEvents(card);


        cardBank.appendChild(card);

    });

}


/* =========================
   Drag Events
   ========================= */

function addCardEvents(card) {

    card.addEventListener(
        "dragstart",
        function () {

            draggedCard = card;


            setTimeout(
                function () {

                    card.style.opacity =
                        "0.4";

                },
                0
            );

        }
    );


    card.addEventListener(
        "dragend",
        function () {

            card.style.opacity =
                "1";


            draggedCard = null;

        }
    );

}


/* =========================
   Drop Zones
   ========================= */

document
    .querySelectorAll(
        ".drop-zone"
    )
    .forEach(zone => {

        zone.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();


                zone.classList.add(
                    "drag-over"
                );

            }
        );


        zone.addEventListener(
            "dragleave",
            function () {

                zone.classList.remove(
                    "drag-over"
                );

            }
        );


        zone.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                zone.classList.remove(
                    "drag-over"
                );


                if (!draggedCard) {
                    return;
                }


                const existing =
                    zone.querySelector(
                        ".flow-card"
                    );


                /*
                If the target already contains
                a card, send that card back
                to the card bank.
                */

                if (existing) {

                    cardBank.appendChild(
                        existing
                    );

                }


                zone.appendChild(
                    draggedCard
                );

            }
        );

    });


/* =========================
   Allow Return to Bank
   ========================= */

cardBank.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

    }
);


cardBank.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();


        if (draggedCard) {

            cardBank.appendChild(
                draggedCard
            );

        }

    }
);


/* =========================
   Compare
   ========================= */

document
    .getElementById(
        "compareButton"
    )
    .addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "suggestedSection"
                )
                .classList.add(
                    "visible"
                );


            document
                .getElementById(
                    "suggestedSection"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================
   Reset
   ========================= */

document
    .getElementById(
        "resetButton"
    )
    .addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(
                    ".flow-card"
                )
                .forEach(card => {

                    cardBank.appendChild(
                        card
                    );

                });


            document.getElementById(
                "teamExplanation"
            ).value = "";


            document.getElementById(
                "importantDecision"
            ).value = "";


            document.getElementById(
                "comparisonResponse"
            ).value = "";


            document
                .getElementById(
                    "suggestedSection"
                )
                .classList.remove(
                    "visible"
                );

        }
    );


/* =========================
   Start
   ========================= */

buildCardBank();