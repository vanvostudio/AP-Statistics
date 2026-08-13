const pictures = [

    {
        value1: 15,
        value2: null,
        shade: "right",

        sample:
            "What is the probability that a value is greater than 15?"
    },

    {
        value1: 10,
        value2: null,
        shade: "left",

        sample:
            "What is the probability that a value is less than 10?"
    },

    {
        value1: 12,
        value2: 18,
        shade: "between",

        sample:
            "What is the probability that a value is between 12 and 18?"
    },

    {
        value1: 8,
        value2: 20,
        shade: "outside",

        sample:
            "What is the probability that a value is less than 8 or greater than 20?"
    }

];


let currentPicture = 0;


const graph =
    document.getElementById(
        "normalGraph"
    );


const pictureNumber =
    document.getElementById(
        "pictureNumber"
    );


const pictureTotal =
    document.getElementById(
        "pictureTotal"
    );


const studentQuestion =
    document.getElementById(
        "studentQuestion"
    );


const sampleAnswer =
    document.getElementById(
        "sampleAnswer"
    );


pictureTotal.textContent =
    pictures.length;


/* =========================
   Normal curve
   ========================= */

function normalY(x, mean, sd) {

    return Math.exp(
        -0.5 *
        Math.pow(
            (x - mean) / sd,
            2
        )
    );

}


/* =========================
   Draw picture
   ========================= */

function drawPicture() {

    const picture =
        pictures[currentPicture];


    const width = 700;
    const height = 340;

    const left = 50;
    const right = 650;

    const baseline = 270;

    const mean = 15;
    const sd = 4;


    function xScale(value) {

        const minValue = 0;
        const maxValue = 30;

        return (
            left +
            (
                (value - minValue) /
                (maxValue - minValue)
            ) *
            (right - left)
        );

    }


    function curveY(value) {

        return (
            baseline -
            normalY(
                value,
                mean,
                sd
            ) * 190
        );

    }


    let curvePath = "";


    for (
        let value = 0;
        value <= 30;
        value += 0.1
    ) {

        const x =
            xScale(value);

        const y =
            curveY(value);


        if (value === 0) {

            curvePath +=
                `M ${x} ${y}`;

        }

        else {

            curvePath +=
                ` L ${x} ${y}`;

        }

    }


    let svg = `

        <line
            x1="${left}"
            y1="${baseline}"
            x2="${right}"
            y2="${baseline}"
            stroke="#333"
            stroke-width="2"
        />

    `;


    /* -------------------------
       Shading
    ------------------------- */

    let shadedRanges = [];


    if (
        picture.shade === "right"
    ) {

        shadedRanges = [
            [picture.value1, 30]
        ];

    }


    if (
        picture.shade === "left"
    ) {

        shadedRanges = [
            [0, picture.value1]
        ];

    }


    if (
        picture.shade === "between"
    ) {

        shadedRanges = [
            [
                picture.value1,
                picture.value2
            ]
        ];

    }


    if (
        picture.shade === "outside"
    ) {

        shadedRanges = [

            [0, picture.value1],

            [picture.value2, 30]

        ];

    }


    shadedRanges.forEach(range => {

        let shadePath = `

            M
            ${xScale(range[0])}
            ${baseline}

        `;


        for (
            let value = range[0];
            value <= range[1];
            value += 0.1
        ) {

            shadePath += `

                L
                ${xScale(value)}
                ${curveY(value)}

            `;

        }


        shadePath += `

            L
            ${xScale(range[1])}
            ${baseline}

            Z

        `;


        svg += `

            <path
                d="${shadePath}"
                fill="rgba(2,119,201,0.22)"
            />

        `;

    });


    /* Curve */

    svg += `

        <path
            d="${curvePath}"
            fill="none"
            stroke="#0277c9"
            stroke-width="4"
        />

    `;


    /* Mark first value */

    svg += `

        <line
            x1="${xScale(picture.value1)}"
            y1="${baseline}"
            x2="${xScale(picture.value1)}"
            y2="${curveY(picture.value1)}"
            stroke="#333"
            stroke-width="2"
            stroke-dasharray="5 4"
        />

        <text
            x="${xScale(picture.value1)}"
            y="${baseline + 28}"
            text-anchor="middle"
            font-size="16"
        >
            ${picture.value1}
        </text>

    `;


    /* Mark second value */

    if (
        picture.value2 !== null
    ) {

        svg += `

            <line
                x1="${xScale(picture.value2)}"
                y1="${baseline}"
                x2="${xScale(picture.value2)}"
                y2="${curveY(picture.value2)}"
                stroke="#333"
                stroke-width="2"
                stroke-dasharray="5 4"
            />

            <text
                x="${xScale(picture.value2)}"
                y="${baseline + 28}"
                text-anchor="middle"
                font-size="16"
            >
                ${picture.value2}
            </text>

        `;

    }


    graph.innerHTML =
        svg;


    pictureNumber.textContent =
        currentPicture + 1;


    studentQuestion.value = "";


    sampleAnswer.innerHTML = "";

    sampleAnswer.classList.remove(
        "visible"
    );

}


/* =========================
   Reveal sample
   ========================= */

document
    .getElementById(
        "revealButton"
    )
    .addEventListener(
        "click",
        function () {

            const picture =
                pictures[currentPicture];


            sampleAnswer.innerHTML = `

                <strong>
                    One possible question:
                </strong>

                <p>
                    ${picture.sample}
                </p>

            `;


            sampleAnswer.classList.add(
                "visible"
            );

        }
    );


/* =========================
   Next picture
   ========================= */

document
    .getElementById(
        "nextButton"
    )
    .addEventListener(
        "click",
        function () {

            currentPicture++;


            if (
                currentPicture >=
                pictures.length
            ) {

                currentPicture = 0;

            }


            drawPicture();

        }
    );


/* =========================
   Start
   ========================= */

drawPicture();