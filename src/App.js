import React, { useState } from "react";
import { Box } from "@mui/material";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tools from "./components/Tools";
import Content from "./components/Content"; // Import the Content component
import "./App.css";

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

  const handleSelectElement = (element, index) => {
    setSelectedElement(element ? { ...element, index } : null);
  };

  const handleUpdateElement = (updatedElement) => {
    const newElements = [...elements];
    newElements[selectedElement.index] = updatedElement;
    setElements(newElements);
    setSelectedElement(updatedElement);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        className="App"
        display="flex"
        width="100%"
        height="100vh"
        overflow="auto"
      >
        <Tools selectedElement={selectedElement} onUpdateElement={handleUpdateElement} />
        <Content onSelectElement={handleSelectElement} />
      </Box>
    </DndProvider>
  );
}

export default App;

