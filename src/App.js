import React, { useState } from "react";
import { Box } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tools from "./components/Tools";
import Content from "./components/Content";
import "./App.css";

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

  const handleSelectElement = (element, index) => {
    console.log({ element, index });
    if (index !== undefined) {
      setSelectedElement(element ? { ...element, index } : null);
    }
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
        <Box width="20%" bgcolor="lightblue" p={2}>
          <Tools
            selectedElement={selectedElement}
            onUpdateElement={handleUpdateElement}
          />
        </Box>
        <Box width="80%">
          <Box
            component="header"
            bgcolor="grey"
            p={1}
            style={{ position: "fixed", width: "80%", zIndex: 1000 }}
          >
            Fixed Header
          </Box>
          <Content
            onSelectElement={handleSelectElement}
            elements={elements}
            setElements={setElements}
          />
        </Box>
      </Box>
    </DndProvider>
  );
}

export default App;
