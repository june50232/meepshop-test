import React from "react";
import { Box, Button, TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/material/styles";
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

const TextField = styled(MuiTextField)({
  paddingBottom: "16px", // Set the padding bottom
});

function Tools({ selectedElement, onUpdateElement }) {
  const handleUpdateImg = (e, item, index) => {
    // Create a new copy of the images array
    const updatedImages = [...selectedElement.images];

    // Create a new copy of the target image and update it
    const updatedImage = { ...updatedImages[index], [item]: e.target.value };

    // Replace the old image object with the updated one
    updatedImages[index] = updatedImage;

    // Update the selectedElement object with the new images array
    onUpdateElement({
      ...selectedElement,
      images: updatedImages,
    });
  };

  return (
    <>
      {selectedElement &&
        selectedElement.type === "carousel" &&
        selectedElement.images.map((img, index) => (
          <Box key={index} p={2}>
            Image {index + 1}
            <TextField
              label="URL"
              value={img.url}
              onChange={(e) => handleUpdateImg(e, "url", index)}
            />
            <TextField
              label="Width"
              value={img.width}
              onChange={(e) => handleUpdateImg(e, "width", index)}
            />
            <TextField
              label="Height"
              value={img.height}
              onChange={(e) => handleUpdateImg(e, "height", index)}
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
    </>
  );
}

export default Tools;
