import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BUTTON: 'button',
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
        cursor: 'move',
        marginBottom: '8px',
      }}
    >
      {label}
    </Button>
  );
}

function Tools({ selectedElement, onUpdateElement }) {
  const renderControls = () => {
    if (selectedElement?.type === 'image') {
      return (
        <>
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={selectedElement.url}
            onChange={(e) => onUpdateElement({ ...selectedElement, url: e.target.value })}
          />
          <TextField
            label="Width"
            fullWidth
            margin="normal"
            value={selectedElement.width}
            onChange={(e) => onUpdateElement({ ...selectedElement, width: e.target.value })}
          />
          <TextField
            label="Height"
            fullWidth
            margin="normal"
            value={selectedElement.height}
            onChange={(e) => onUpdateElement({ ...selectedElement, height: e.target.value })}
          />
        </>
      );
    } else if (selectedElement?.type === 'text') {
      return (
        <TextField
          label="Text"
          fullWidth
          margin="normal"
          value={selectedElement.text}
          onChange={(e) => onUpdateElement({ ...selectedElement, text: e.target.value })}
        />
      );
    } else {
      return (
        <>
          <DraggableButton label="圖片元件" />
          <DraggableButton label="文字元件" />
        </>
      );
    }
  };

  return (
    <Box width="20%" bgcolor="lightblue" p={2}>
      {renderControls()}
    </Box>
  );
}

export default Tools;

