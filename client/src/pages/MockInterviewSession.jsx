import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import { questions } from "../data/questions";

const MockInterviewSession = () => {
    const { interviewId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const questionId = queryParams.get("questionId");
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [output, setOutput] = useState("");

    useEffect(() => {
        const selectedQuestion = questions.find(
            (q) => q.id === parseInt(questionId)
        );
        setCurrentQuestion(selectedQuestion);
    }, [questionId]);

    const handleRunCode = async () => {
        const response = await fetch(
            "http://localhost:5000/code-execution/execute",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id:
                        language === "javascript"
                            ? 63
                            : language === "python"
                            ? 71
                            : 54,
                    stdin: currentQuestion.languageTestCases[language]
                        .map((tc) => tc.input)
                        .join("\n"),
                }),
            }
        );
        const data = await response.json();
        setOutput(data.stdout || data.stderr);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Mock Interview Session</h1>
            {currentQuestion && (
                <div>
                    <h2 className="text-xl font-bold">Question</h2>
                    <p>{currentQuestion.content}</p>
                    <CodeEditor
                        language={language}
                        code={code}
                        setCode={setCode}
                    />
                    <button
                        onClick={handleRunCode}
                        className="bg-green-500 text-white mt-2 px-4 py-2"
                    >
                        Run Code
                    </button>
                    {output && (
                        <div className="mt-4">
                            <h2 className="text-xl font-bold">Output</h2>
                            <pre>{output}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MockInterviewSession;
