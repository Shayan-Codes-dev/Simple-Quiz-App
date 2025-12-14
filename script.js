// Function to safely escape HTML characters
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
}

$(document).ready(function () {

    const quizData = [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlinks Text Mark Language",
                "None of these"
            ],
            answer: 0
        },
        {
            question: "Which language is used for styling web pages?",
            options: ["HTML", "JQuery", "CSS", "PHP"],
            answer: 2
        },
        {
            question: "Which symbol is used for jQuery?",
            options: ["#", "$", "%", "&"],
            answer: 1
        },
        {
            // Note: Fixed an issue with original data
            question: "Which one of these is NOT a primitive data type in JavaScript?",
            options: ["String", "Boolean", "Object", "Number"],
            answer: 2
        },
        {
            // These options will be escaped in loadQuestion for safety
            question: "What is the correct way to link an external JavaScript file called 'script.js'?",
            options: [
                "<script src='script.js'>",
                "<script href='script.js'>",
                "<link rel='javascript' href='script.js'>",
                "<script name='script.js'>"
            ],
            answer: 0
        },
        {
            question: "In CSS, what property is used to change the background color of an element?",
            options: [
                "color",
                "background-color",
                "bg-color",
                "background"
            ],
            answer: 1
        },
        {
            // These options will be escaped in loadQuestion for safety
            question: "Which HTML element is used to specify a footer for a document or section?",
            options: [
                "<bottom>",
                "<footer>",
                "<section>",
                "<end>"
            ],
            answer: 1
        },
        {
            question: "Which of the following CSS selectors has the highest specificity?",
            options: [
                "Type selector (e.g., h1)",
                "Class selector (e.g., .main)",
                "ID selector (e.g., #header)",
                "Universal selector (e.g., *)"
            ],
            answer: 2
        },
        {
            question: "What is the output of the following JavaScript code?\n\nfunction example() { \n  let x = 10; \n  if (true) { \n    let x = 20; \n    console.log(x); \n  } \n  console.log(x); \n}\nexample();",
            options: [
                "20, 20",
                "20, 10",
                "10, 20",
                "An error will occur"
            ],
            answer: 1
        },
        {
      question: "Which function in PHP is used to open an external file for reading or writing?",
      options: [
        "readfile()",
        "file_get_contents()",
        "fopen()",
        "load_file()"
      ],
      answer: 2
    }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    loadQuestion();

    function loadQuestion() {
        answered = false;
        $("#nextBtn").prop('disabled', true);

        $("#question").text(quizData[current].question);
        $("#options").html("");

        quizData[current].options.forEach((opt, i) => {
            // FIX APPLIED HERE: Escape the option text before inserting it into the div
            const safeOpt = escapeHTML(opt);

            $("#options").append(`
                <div class="option" data-index="${i}">
                    ${safeOpt}
                </div>
            `);
        });

        $("#progressText").text(`Question ${current + 1} / ${quizData.length}`);
        $("#progressBar").css("width", ((current + 1) / quizData.length) * 100 + "%");
    }

    // ... (The rest of your code: click handler, nextBtn click, showResult, is fine) ...
    // Note: I did not include the other functions for brevity, but they should remain unchanged.

    $(document).on("click", ".option", function () {
        if (answered) return;
        answered = true;
        $("#nextBtn").prop('disabled', false);

        let selected = $(this).data("index");
        let correct = quizData[current].answer;

        if (selected === correct) {
            $(this).addClass("correct");
            score++;
        } else {
            $(this).addClass("wrong");
            $(".option[data-index='" + correct + "']").addClass("correct");
        }
    });

    $("#nextBtn").click(function () {
        if (!answered) return;

        current++;
        if (current < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        $(".quiz-box").html(`
            <h3 class="text-center">🎉 Quiz Completed</h3>
            <p class="text-center mt-3">Score: <strong>${score} / ${quizData.length}</strong></p>
            <div class="text-center mt-4">
                <button class="btn btn-light" onclick="location.reload()">Restart Quiz</button>
            </div>
        `);
    }
});