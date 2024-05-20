import React from 'react';
import { Box } from '@mui/material';
import { useDrop } from 'react-dnd';

const ItemTypes = {
  BUTTON: 'button',
};

function Content({ onSelectElement, elements, setElements }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BUTTON,
    drop: (item) => {
      const newElement = item.label === '圖片元件'
        ? { type: 'image', url: 'https://example.com/avatar.png', width: '100px', height: '100px' }
        : { type: 'text', text: 'I am the best candidate!' };
      setElements((prevElements) => [...prevElements, newElement]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleElementClick = (index, e) => {
    e.stopPropagation(); // Prevent event bubbling
    onSelectElement(elements[index], index);
  };

  const handleContentClick = (e) => {
    onSelectElement(null);
  };

  return (
    <Box
      ref={drop}
      width="80%"
      bgcolor="lightcoral"
      display="flex"
      flexDirection="column"
      style={{ position: 'relative', minHeight: '100vh' }}
      onClick={handleContentClick}
      data-content-background="true"
    >
      <Box component="header" bgcolor="grey" p={1} style={{ position: 'fixed', width: '80%', zIndex: 1000 }}>
        Fixed Header
      </Box>
      <Box mt={3} pt={2} style={{ flex: 1, overflow: 'auto' }}>
        {isOver ? 'Release to drop' : 'Main Content'}
        <Box mt={2}>
          {elements.map((element, index) => (
            <Box
              key={index}
              p={1}
              mb={1}
              border="1px solid black"
              onClick={(e) => handleElementClick(index, e)}
              style={{ cursor: 'pointer' }}
            >
              {element.type === 'image' ? (
                <img src={element.url} alt="avatar" style={{ width: element.width, height: element.height }} />
              ) : (
                <p>{element.text}</p>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Content;
