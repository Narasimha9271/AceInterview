const questions = [
    {
        id: 1,
        content: "Implement a function to check if a string is a palindrome.",
        languageTestCases: {
            javascript: [
                { input: "'racecar'", output: "true" },
                { input: "'hello'", output: "false" },
            ],
            python: [
                { input: "'racecar'", output: "True" },
                { input: "'hello'", output: "False" },
            ],
            cpp: [
                { input: '"racecar"', output: "true" },
                { input: '"hello"', output: "false" },
            ],
        },
    },
    // Add more questions as needed
];

module.exports = questions;
