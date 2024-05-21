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
        overflow="hidden"
        border="1px solid black"
      >
        <Box
          width="20%"
          border="1px solid black"
          p={2}
          overflow="auto"
          height="100%"
        >
          <Tools
            selectedElement={selectedElement}
            onUpdateElement={handleUpdateElement}
          />
        </Box>
        <Box width="80%" border="1px solid black" overflow="hidden">
          <Box
            component="header"
            p={1}
            border="1px solid black"
            position="fixed"
            width="80%"
            fontWeight="bold"
            textAlign="center"
          >
            This is a fixed Header, no need to modify
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
