const datasets = {

    "symmetric":
        [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8],

    "right-skew":
        [2, 2, 2, 3, 3, 3, 4, 4, 5, 6, 8, 11],

    "left-skew":
        [1, 4, 6, 7, 8, 8, 9, 9, 9, 10, 10, 10],

    "wide":
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

    "narrow":
        [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7],

    "bimodal":
        [2, 2, 3, 3, 3, 4, 8, 8, 9, 9, 9, 10],

    "gap":
        [2, 2, 3, 3, 4, 4, 9, 9, 10, 10],

    "outlier":
        [3, 4, 4, 5, 5, 5, 6, 6, 7, 13],

    "high-center":
        [7, 8, 8, 9, 9, 9, 10, 10, 11]

};


/* --------------------------------
   Draw mini dotplots
-------------------------------- */

document
    .querySelectorAll(".mini-plot")
    .forEach(plot => {

        const type =
            plot.dataset.plot;

        drawMiniDotplot(
            datasets[type],
            plot
        );

    });


function drawMiniDotplot(data, container) {

    const width = 260;
    const height = 100;

    const margin = 15;
    const baseline = 80;

    const min = Math.min(...data);
    const max = Math.max(...data);


    const counts = {};

    data.forEach(value => {

        counts[value] =
            (counts[value] || 0) + 1;

    });


    function xScale(value) {

        if (max === min) {
            return width / 2;
        }

        return (
            margin +
            ((value - min) /
            (max - min)) *
            (width - 2 * margin)
        );

    }


    let svg = `

        <svg
            viewBox="0 0 ${width} ${height}"
            aria-label="Distribution dotplot"
        >

            <line
                x1="${margin}"
                y1="${baseline}"
                x2="${width - margin}"
                y2="${baseline}"
                stroke="#333"
                stroke-width="1.5"
            />

    `;


    Object.keys(counts).forEach(value => {

        const x =
            xScale(Number(value));

        for (
            let i = 0;
            i < counts[value];
            i++
        ) {

            const y =
                baseline - 10 - i * 13;

            svg += `

                <circle
                    cx="${x}"
                    cy="${y}"
                    r="5"
                    fill="#0277c9"
                />

            `;

        }

    });


    svg += `
        </svg>
    `;


    container.innerHTML = svg;

}


/* --------------------------------
   Drag and drop
-------------------------------- */

let draggedCard = null;


/* Remember which card is being dragged */

document
    .querySelectorAll(".distribution-card")
    .forEach(card => {

        card.addEventListener(
            "dragstart",
            function () {

                draggedCard = card;

                setTimeout(() => {
                    card.style.opacity = "0.4";
                }, 0);

            }
        );


        card.addEventListener(
            "dragend",
            function () {

                card.style.opacity = "1";

                draggedCard = null;

            }
        );

    });


/* Board cells */

document
    .querySelectorAll(".board-cell")
    .forEach(cell => {

        cell.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                cell.classList.add(
                    "drag-over"
                );

            }
        );


        cell.addEventListener(
            "dragleave",
            function () {

                cell.classList.remove(
                    "drag-over"
                );

            }
        );


        cell.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();

                cell.classList.remove(
                    "drag-over"
                );


                if (!draggedCard) {
                    return;
                }


                const originalParent =
                    draggedCard.parentElement;

                const existingCard =
                    cell.querySelector(
                        ".distribution-card"
                    );


                /* Empty square */

                if (!existingCard) {

                    cell.appendChild(
                        draggedCard
                    );

                }


                /* Occupied square:
                   switch places */

                else if (
                    existingCard !== draggedCard
                ) {

                    originalParent.appendChild(
                        existingCard
                    );

                    cell.appendChild(
                        draggedCard
                    );

                }

            }
        );

    });
/* --------------------------------
   Allow cards to return to bank
-------------------------------- */

const cardBank =
    document.getElementById("cardBank");


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


/* --------------------------------
   Reset
-------------------------------- */

const resetButton =
    document.getElementById("resetButton");


resetButton.addEventListener(
    "click",
    function () {

        const cards =
            document.querySelectorAll(
                ".distribution-card"
            );


        cards.forEach(card => {

            cardBank.appendChild(card);

        });


        document.getElementById(
            "reasoning"
        ).value = "";


        document.getElementById(
            "comparison"
        ).value = "";

    }
);





const saveReflection =
    document.getElementById("saveReflection");

const saveMessage =
    document.getElementById("saveMessage");

const savedResponse =
    document.getElementById("savedResponse");


saveReflection.addEventListener(
    "click",
    function () {

        const reasoning =
            document.getElementById("reasoning").value;

        const comparison =
            document.getElementById("comparison").value;


        // Save in browser

        localStorage.setItem(
            "reasoning",
            reasoning
        );

        localStorage.setItem(
            "comparison",
            comparison
        );


        // Show confirmation

        saveMessage.textContent =
            "Your response appears below.";


        // Print responses underneath

        savedResponse.innerHTML = `
            <h3>Your Response</h3>

            <p>
                <strong>Organization:</strong>
                ${reasoning}
            </p>

            <p>
                <strong>Comparison:</strong>
                ${comparison}
            </p>
        `;

    }
);