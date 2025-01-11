import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaCopy } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react"; 
import "./App.css";

function App() {
  const [sections, setSections] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [currentEmojiPicker, setCurrentEmojiPicker] = useState(null);

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      text: "",
      alignment: "left",
      tag: "p",
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  const handleEmojiClick = (emojiObject, sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, text: section.text + emojiObject.emoji } : section
      )
    );
    setCurrentEmojiPicker(null); 
  };

  const handleEmojiButtonClick = (sectionId) => {
    setCurrentEmojiPicker(currentEmojiPicker === sectionId ? null : sectionId); 
  };

  const removeSection = (id) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  const duplicateSection = (id) => {
    const section = sections.find((section) => section.id === id);
    setSections((prevSections) => [...prevSections, { ...section, id: Date.now() }]);
  };

  const updateSectionText = (id, newText) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, text: newText } : section
      )
    );
  };

  const updateAlignment = (id, newAlignment) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, alignment: newAlignment } : section
      )
    );
  };

  const updateTag = (id, newTag) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, tag: newTag } : section
      )
    );
  };

  const handleRightClick = (e, sectionId) => {
    e.preventDefault();
    setContextMenu({
      top: e.clientY,
      left: e.clientX,
      sectionId,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const openEditModal = (id) => {
    setEditingSection(id);
    closeContextMenu();
  };

  const generateReadme = () => {
    return sections
      .map(
        (section) =>
          `<${section.tag} style="text-align: ${section.alignment};">${section.text}</${section.tag}>`
      )
      .join("\n");
  };

  const downloadReadme = () => {
    const blob = new Blob([generateReadme()], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  return (
    <div className="App" onClick={closeContextMenu}>
      <h1>README Generator</h1>
      <button onClick={addSection} className="add-section-btn">
        <FaPlus /> Add Section
      </button>

      <div className="sections-container">
        {sections.map((section) => (
          <div
            key={section.id}
            className="section"
            onContextMenu={(e) => handleRightClick(e, section.id)}
          >
            <textarea
              placeholder="Enter your text here..."
              value={section.text}
              onChange={(e) => updateSectionText(section.id, e.target.value)}
            />
            <button
              onClick={() => handleEmojiButtonClick(section.id)}
              className="emoji-btn"
            >
              😊
            </button>
            {currentEmojiPicker === section.id && (
              <div className="emoji-picker">
                <EmojiPicker
                  onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject, section.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{
            top: contextMenu.top,
            left: contextMenu.left,
          }}
        >
          <button onClick={() => removeSection(contextMenu.sectionId)}>
            <FaTrash /> Delete
          </button>
          <button onClick={() => duplicateSection(contextMenu.sectionId)}>
            <FaCopy /> Duplicate
          </button>
          <button onClick={() => openEditModal(contextMenu.sectionId)}>
            <FaEdit /> Edit
          </button>
        </div>
      )}

      {editingSection && (
        <div className="edit-modal">
          <h2>Edit Section</h2>

          <div className="controls">
            <button onClick={() => updateAlignment(editingSection, "left")}>
              Left
            </button>
            <button onClick={() => updateAlignment(editingSection, "center")}>
              Center
            </button>
            <button onClick={() => updateAlignment(editingSection, "right")}>
              Right
            </button>

            <select
              value={sections.find((s) => s.id === editingSection).tag}
              onChange={(e) => updateTag(editingSection, e.target.value)}
            >
              <option value="p">Paragraph</option>
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="h4">H4</option>
              <option value="h5">H5</option>
              <option value="h6">H6</option>
            </select>
          </div>
          <button onClick={() => setEditingSection(null)}>Close</button>
        </div>
      )}

      {sections.length > 0 && (
        <div className="preview-section">
          <h2>Preview (Markdown):</h2>
          <pre className="preview-content">{generateReadme()}</pre>
          <button onClick={downloadReadme} className="download-btn">
            Download README
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
