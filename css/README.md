base.css
    variables
    reset
    body
    typography
    links
    basic inheritance

layout.css
    .container
    header
    nav
    main
    footer
    .hero
    .intro
    .activity
    .activity-grid
    responsive layout

components.css
    button
    textarea
    select
    .question
    .unit-card
    .controls
    .feedback
    reusable cards

activities/
    distribution-grid.css
        .card-bank
        .distribution-card
        .mini-plot
        .gameboard
        .board-cell

    probability-matching.css
        .question-card
        .answer-select
        .formula-bank
        .formula-card
        .score

    stem-plot.css
        .stem-plot
        .stem-row
        .stem
        .stem-divider
        .leaves
        .key


body
│
├── header
│   └── .container
│       └── nav
│
├── .hero / .intro
│   └── .container
│
├── main
│   └── .container
│       └── .activity
│           └── .activity-grid
│               ├── main content
│               └── aside
│
└── footer
    └── .container