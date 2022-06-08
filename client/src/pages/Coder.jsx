import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Button from "@mui/material/Button";

export const CoderPage = () => {
    const [code, setCode] = useState(
`number_list = [x ** 2 for x in range(10) if x % 2 == 0]
print(number_list)`
    );

    const [output, setOutput] = useState('');

    async function runCode() {
        var URL = "http://localhost:8080/execute";
        var token = window.localStorage.getItem("user");
        console.log("t1:" + token);
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },
          body: JSON.stringify({code: code})
        });

        const stdout = await response.json();
        let base64ToString = Buffer.from(stdout.output, "base64").toString();
        console.log(base64ToString);
        setOutput(base64ToString);
    };

    function handleClick(event) {
        event.preventDefault();
        runCode();
    }

    return (
        <>
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />
            <Button variant="contained" onClick={handleClick}>Run</Button>
            <div style={{whiteSpace: 'pre-line'}}>{output}</div>
        </>
    );
}