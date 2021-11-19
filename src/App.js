import React, {useState} from 'react';
import './App.css';
import FileForm from './components/FileForm';
import Results from './components/Results';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');
  const [count, setCount] = useState(0);
  const [processedFile, setProcessedFile] = useState({});

  const resultProcessor = (searchInput, replaceInput, countInput, result) => {
    if (searchInput.length === 0){
      alert("Please enter a search parameter");
      return;
    }
    setSearch(searchInput);
    setReplace(replaceInput);
    setCount(countInput);
    setIsSubmitted(true);
    let newFile = new Blob([result], {type: 'text/plain'});
    setProcessedFile(newFile);
  }

  const downloadHandler = () => {
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(processedFile);
    downloadLink.download = 'processedFile';
    downloadLink.click();
  }

  return (
    <div className="App">
      <header className="App-header">
        Text File Transformer (for Growers)
      </header>
      <FileForm resultHandler={resultProcessor} />
      {isSubmitted ? <Results searchVal={search} replaceVal={replace} countVal={count} downloadHandler={downloadHandler} /> : <p style={{maxWidth: '500px', margin: '0 auto'}}>Upload your file above, input your search and replace parameters, and click "Find and replace"</p>}
    </div>
  );
}

export default App;
