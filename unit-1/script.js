const button = document.getElementById("makeGraph");

button.addEventListener("click", function () {

    const input = document.getElementById("dataInput").value;

    const data = input
        .split(",")
        .map(Number)
        .filter(value => !isNaN(value));

    const graphType =
        document.getElementById("graphType").value;

    const output =
        document.getElementById("output");

    if (data.length === 0) {
        output.innerHTML = "<p>Please enter valid numerical data.</p>";
        return;
    }

    if (graphType === "dotplot") {
        drawDotplot(data, output);
    }

    if (graphType === "histogram") {
        drawHistogram(data, output);
    }

    if (graphType === "boxplot") {
        drawBoxplot(data, output);
    }

    if (graphType === "stemplot") {
        drawStemPlot(data, output);
    }

});


function drawDotplot(data, output) {

    const width = 700;
    const height = 320;

    const margin = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 30
    };

    const min = Math.min(...data);
    const max = Math.max(...data);

    const plotWidth =
        width - margin.left - margin.right;

    const baseline =
        height - margin.bottom;

    const counts = {};

    data.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });

    function xScale(value) {

        if (max === min) {
            return width / 2;
        }

        return (
            margin.left +
            ((value - min) / (max - min)) * plotWidth
        );
    }

    let svg = `
        <svg
            width="100%"
            viewBox="0 0 ${width} ${height}"
        >

        <line
            x1="${margin.left}"
            y1="${baseline}"
            x2="${width - margin.right}"
            y2="${baseline}"
            stroke="#222"
            stroke-width="2"
        />
    `;

    for (let value = min; value <= max; value++) {

        const x = xScale(value);

        svg += `
            <line
                x1="${x}"
                y1="${baseline}"
                x2="${x}"
                y2="${baseline + 8}"
                stroke="#222"
            />

            <text
                x="${x}"
                y="${baseline + 28}"
                text-anchor="middle"
                font-size="13"
            >
                ${value}
            </text>
        `;
    }

    Object.keys(counts).forEach(value => {

        const x = xScale(Number(value));

        for (let i = 0; i < counts[value]; i++) {

            const y =
                baseline - 15 - i * 22;

            svg += `
                <circle
                    cx="${x}"
                    cy="${y}"
                    r="7"
                    fill="#0277c9"
                />
            `;
        }
    });

    svg += `
        <text
            x="${width / 2}"
            y="${height - 10}"
            text-anchor="middle"
            font-size="15"
        >
            Commute Time (minutes)
        </text>

        </svg>
    `;

    output.innerHTML = `
    <h2>Dotplot</h2>

    <p>
        A dotplot displays each individual observation.
        Repeated values are stacked vertically.
    </p>

    ${svg}

    <p>
        <strong>Think about it:</strong>
        What features of the distribution are especially easy
        to see in this graph?
    </p>`;
}


function drawHistogram(data, output) {

    const width = 700;
    const height = 350;

    const margin = {
        top: 30,
        right: 30,
        bottom: 60,
        left: 60
    };

    const min = Math.min(...data);
    const max = Math.max(...data);

    const binWidth = 5;

    const start =
        Math.floor(min / binWidth) * binWidth;

    const end =
        Math.ceil(max / binWidth) * binWidth;

    const bins = [];

    for (
        let lower = start;
        lower < end;
        lower += binWidth
    ) {

        bins.push({
            lower: lower,
            upper: lower + binWidth,
            count: 0
        });
    }

    data.forEach(value => {

        let index =
            Math.floor((value - start) / binWidth);

        if (index === bins.length) {
            index--;
        }

        bins[index].count++;
    });

    const maxCount =
        Math.max(...bins.map(bin => bin.count));

    const plotWidth =
        width - margin.left - margin.right;

    const plotHeight =
        height - margin.top - margin.bottom;

    const barWidth =
        plotWidth / bins.length;

    let svg = `
        <svg
            width="100%"
            viewBox="0 0 ${width} ${height}"
        >

        <line
            x1="${margin.left}"
            y1="${height - margin.bottom}"
            x2="${width - margin.right}"
            y2="${height - margin.bottom}"
            stroke="#222"
            stroke-width="2"
        />

        <line
            x1="${margin.left}"
            y1="${margin.top}"
            x2="${margin.left}"
            y2="${height - margin.bottom}"
            stroke="#222"
            stroke-width="2"
        />
    `;

    bins.forEach((bin, i) => {

        const barHeight =
            maxCount === 0
                ? 0
                : (bin.count / maxCount) *
                  plotHeight;

        const x =
            margin.left +
            i * barWidth;

        const y =
            height -
            margin.bottom -
            barHeight;

        svg += `
            <rect
                x="${x}"
                y="${y}"
                width="${barWidth}"
                height="${barHeight}"
                fill="#0277c9"
                stroke="white"
            />

            <text
                x="${x + barWidth / 2}"
                y="${height - margin.bottom + 22}"
                text-anchor="middle"
                font-size="12"
            >
                ${bin.lower}
            </text>
        `;
    });

    svg += `
        <text
            x="${width - margin.right}"
            y="${height - margin.bottom + 22}"
            text-anchor="middle"
            font-size="12"
        >
            ${end}
        </text>

        <text
            x="${width / 2}"
            y="${height - 10}"
            text-anchor="middle"
            font-size="15"
        >
            Commute Time (minutes)
        </text>

        <text
            x="18"
            y="${height / 2}"
            text-anchor="middle"
            font-size="15"
            transform="rotate(-90 18 ${height / 2})"
        >
            Frequency
        </text>

        </svg>
    `;

    output.innerHTML = `
    <h2>Histogram</h2>

    <p>
        A histogram groups quantitative data into intervals
        and displays the frequency in each interval.
    </p>

    ${svg}

    <p>
        <strong>Think about it:</strong>
        What can you see about the shape of the distribution?
    </p>`;
}


function drawBoxplot(data, output) {

    const sorted =
        [...data].sort((a, b) => a - b);

    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    const q1 = quartile(sorted, 0.25);
    const median = quartile(sorted, 0.50);
    const q3 = quartile(sorted, 0.75);

    const width = 700;
    const height = 260;

    const margin = {
        left: 50,
        right: 50
    };

    const plotWidth =
        width - margin.left - margin.right;

    function xScale(value) {

        if (max === min) {
            return width / 2;
        }

        return (
            margin.left +
            ((value - min) / (max - min)) *
            plotWidth
        );
    }

    const y = 110;
    const boxHeight = 70;

    let svg = `
        <svg
            width="100%"
            viewBox="0 0 ${width} ${height}"
        >

        <!-- whisker line -->
        <line
            x1="${xScale(min)}"
            y1="${y}"
            x2="${xScale(max)}"
            y2="${y}"
            stroke="#222"
            stroke-width="2"
        />

        <!-- minimum -->
        <line
            x1="${xScale(min)}"
            y1="${y - 20}"
            x2="${xScale(min)}"
            y2="${y + 20}"
            stroke="#222"
            stroke-width="2"
        />

        <!-- maximum -->
        <line
            x1="${xScale(max)}"
            y1="${y - 20}"
            x2="${xScale(max)}"
            y2="${y + 20}"
            stroke="#222"
            stroke-width="2"
        />

        <!-- box -->
        <rect
            x="${xScale(q1)}"
            y="${y - boxHeight / 2}"
            width="${xScale(q3) - xScale(q1)}"
            height="${boxHeight}"
            fill="rgba(2, 119, 201, 0.15)"
            stroke="#0277c9"
            stroke-width="3"
        />

        <!-- median -->
        <line
            x1="${xScale(median)}"
            y1="${y - boxHeight / 2}"
            x2="${xScale(median)}"
            y2="${y + boxHeight / 2}"
            stroke="#0277c9"
            stroke-width="4"
        />

        <text
            x="${width / 2}"
            y="210"
            text-anchor="middle"
            font-size="15"
        >
            Commute Time (minutes)
        </text>

        <text
            x="${width / 2}"
            y="235"
            text-anchor="middle"
            font-size="13"
            fill="#5f6870"
        >
            Min = ${min},
            Q1 = ${q1},
            Median = ${median},
            Q3 = ${q3},
            Max = ${max}
        </text>

        </svg>
    `;

    output.innerHTML = `
    <h2>Boxplot</h2>

    <p>
        A boxplot summarizes a distribution using its
        minimum, first quartile, median, third quartile,
        and maximum.
    </p>

    ${svg}

    <p>
        <strong>Think about it:</strong>
        What information is easier to identify from the
        boxplot than from the other graphs?
    </p>`;
}

function drawStemPlot(data, output) {

    const sorted = [...data].sort((a, b) => a - b);

    const stems = {};

    sorted.forEach(value => {

        const stem = Math.floor(value / 10);
        const leaf = value % 10;

        if (!stems[stem]) {
            stems[stem] = [];
        }

        stems[stem].push(leaf);
    });


    let rows = "";

    Object.keys(stems).forEach(stem => {

        rows += `
            <div class="stem-row">

                <span class="stem">
                    ${stem}
                </span>

                <span class="stem-divider">
                    |
                </span>

                <span class="leaves">
                    ${stems[stem].join(" &nbsp; ")}
                </span>

            </div>
        `;
    });


    output.innerHTML = `
        <h2>Stem-and-Leaf Plot</h2>

        <p>
            A stem-and-leaf plot organizes the data while
            preserving each individual observation.
        </p>

        <div class="stem-plot">

            ${rows}

        </div>

        <p class="key">
            <strong>Key:</strong>
            1 | 5 = 15 minutes
        </p>

        <div class="question">
            <strong>Think about it:</strong>
            What information can you see in the stem-and-leaf
            plot that may be harder to see in a histogram?
        </div>
    `;
}

function quartile(sortedData, p) {

    const position =
        (sortedData.length - 1) * p;

    const lower =
        Math.floor(position);

    const upper =
        Math.ceil(position);

    if (lower === upper) {
        return sortedData[lower];
    }

    const weight =
        position - lower;

    return (
        sortedData[lower] *
        (1 - weight) +
        sortedData[upper] *
        weight
    );
}