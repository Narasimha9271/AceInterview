import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode }) => {
    return (
        <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
        />
    );
};

export default CodeEditor;
