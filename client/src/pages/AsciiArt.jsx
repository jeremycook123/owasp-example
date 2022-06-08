import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const AsciiArtPage = () => {
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');

    async function createArt() {
        var URL = "http://localhost:8080/asciiart";
        var token = window.localStorage.getItem("user");
        console.log("t1:" + token);
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },
          body: JSON.stringify({text: text})
        });

        const stdout = await response.json();
        let base64ToString = Buffer.from(stdout.output, "base64").toString();
        console.log(base64ToString);
        setOutput(base64ToString);
    };

    function handleClick(event) {
        event.preventDefault();
        createArt();
    }

    return (
        <>
            <TextField 
                id="outlined-basic" 
                label="Text" 
                variant="outlined"
                value={text}
                onInput={ e=>setText(e.target.value) }
            />
            <Button variant="contained" onClick={handleClick}>Generate</Button>
            <pre>
                <code>
                   {output}
                </code>
            </pre>
        </>
    );
}