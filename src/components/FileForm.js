import React, { useState } from 'react';

import './FileForm.css';

const FileForm = (props) => {
    const [uploadedFile, setUploadedFile] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [replaceInput, setReplaceInput] = useState('');

    const fileInputHandler = event => {
        setUploadedFile(event.target.files[0]);
    }

    const searchInputHandler = event => {
        setSearchInput(event.target.value);
    }

    const replaceInputHandler = event => {
        setReplaceInput(event.target.value);
    }

    const formSubmitHandler = event => {
        event.preventDefault();
        if (uploadedFile instanceof File) {
            console.log('good');
            const reader = new FileReader();
            reader.onload = () => {
                const inputText = reader.result;
                const searchRegEx = new RegExp(searchInput, "g");
                const occurances = (inputText.match(searchRegEx) || []).length;
                const outputText = inputText.replaceAll(searchInput, replaceInput);
                props.resultHandler(searchInput, replaceInput, occurances, outputText);
            }
            reader.readAsText(uploadedFile);
        }
        else{
            alert('Please upload a file');
        }
    }
    return (
        <form onSubmit={formSubmitHandler} className="fileForm">
            <label>
                Upload file
                <input name="fileUpload" type="file" accept=".txt" onChange={fileInputHandler} />
            </label>
            <label>
                Search parameter
                <textarea name="search" type="text" onChange={searchInputHandler} value={searchInput}></textarea>
            </label>
            <label>
                Replacement parameter
                <textarea name="replace" type="text" onChange={replaceInputHandler} value={replaceInput}></textarea>
            </label>
            <button type="submit">Find and replace</button>
        </form>
    )
}

export default FileForm