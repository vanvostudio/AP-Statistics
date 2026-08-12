const button = document.getElementById("makeGraph");

button.addEventListener("click", function () {

    const input = document.getElementById("dataInput").value;

    const data = input
        .split(",")
        .map(Number);

    const graphType =
        document.getElementById("graphType").value;

    const output =
        document.getElementById("output");

    output.innerHTML = `
        <p>You entered:</p>
        <p>${data.join(", ")}</p>
        <p>You selected: ${graphType}</p>
    `;
});