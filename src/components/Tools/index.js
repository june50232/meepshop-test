import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDrag } from "react-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ItemTypes = {
  BUTTON: "button",
};

function DraggableButton({ label }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BUTTON,
    item: { label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Button
      ref={drag}
      variant="outlined"
      fullWidth
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        marginBottom: "8px",
      }}
    >
      {label}
    </Button>
  );
}

function Tools({ selectedElement, onUpdateElement }) {
  return (
    <Box bgcolor="lightblue" p={2}>
      {selectedElement &&
        selectedElement.type === "carousel" &&
        selectedElement.images.map((img, index) => (
          <Box key={index} p={2}>
            Image {index + 1}
            <TextField
              label="URL"
              value={img.url}
              onChange={(e) =>
                onUpdateElement({ ...img, url: e.target.value }, index)
              }
            />
            <TextField
              label="Width"
              value={img.width}
              onChange={(e) =>
                onUpdateElement({ ...img, width: e.target.value }, index)
              }
            />
            <TextField
              label="Height"
              value={img.height}
              onChange={(e) =>
                onUpdateElement({ ...img, height: e.target.value }, index)
              }
            />
          </Box>
        ))}
      {selectedElement && selectedElement.type === "text" && (
        <ReactQuill
          theme="snow"
          value={selectedElement.text}
          onChange={(content) =>
            onUpdateElement({ ...selectedElement, text: content })
          }
        />
      )}
      {!selectedElement && (
        <>
          <DraggableButton label="圖片元件" />
          <DraggableButton label="文字元件" />
        </>
      )}
    </Box>
  );
}

export default Tools;
