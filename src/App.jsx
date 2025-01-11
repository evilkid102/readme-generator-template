import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    installation: '',
    usage: '',
    contribution: '',
    license: '',
  });

  const [generatedReadme, setGeneratedReadme] = useState('');

  // Function to generate README content
  const generateReadme = (e) => {
    e.preventDefault();

    const { projectName, description, installation, usage, contribution, license } = formData;

    let readmeContent = `# ${projectName}\n\n`;
    readmeContent += `## Description\n${description}\n\n`;

    if (installation) {
      readmeContent += `## Installation\n${installation}\n\n`;
    }

    if (usage) {
      readmeContent += `## Usage\n${usage}\n\n`;
    }

    if (contribution) {
      readmeContent += `## Contribution\n${contribution}\n\n`;
    }

    if (license) {
      readmeContent += `## License\nThis project is licensed under the ${license} License.\n\n`;
    }

    setGeneratedReadme(readmeContent);
  };

  // Function to download the README content as a .md file
  const downloadReadme = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md';
    link.click();
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>README Generator</h1>

      <form onSubmit={generateReadme}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Installation Instructions</label>
          <textarea
            name="installation"
            value={formData.installation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Usage Instructions</label>
          <textarea
            name="usage"
            value={formData.usage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Contribution Guidelines</label>
          <textarea
            name="contribution"
            value={formData.contribution}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>License</label>
          <input
            type="text"
            name="license"
            value={formData.license}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Generate README</button>
      </form>

      {generatedReadme && (
        <div>
          <h2>Your README:</h2>
          <pre>{generatedReadme}</pre>
          <button onClick={downloadReadme}>Download README</button>
        </div>
      )}
    </div>
  );
}

export default App;