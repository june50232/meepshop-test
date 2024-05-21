import React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemTypes = {
  BUTTON: "button",
};

function Content({ onSelectElement, elements, setElements }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BUTTON,
    drop: (item) => {
      console.log({ item });
      if (item.label === "圖片元件") {
        const newElement = {
          type: "carousel",
          images: [
            {
              url: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph",
              width: "300px",
              height: "300px",
            },
            {
              url: "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph",
              width: "300px",
              height: "300px",
            },
          ],
        };
        setElements((prevElements) => [...prevElements, newElement]);
      } else if (item.label === "文字元件") {
        const newElement = {
          type: "text",
          text: "I am the best candidate!",
        };
        setElements((prevElements) => [...prevElements, newElement]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleElementClick = (e, element, index) => {
    e.stopPropagation();
    onSelectElement(element, index);
  };

  return (
    <Box
      ref={drop}
      p={6}
      flex="1"
      overflow="auto"
      height="100%"
      onClick={() => onSelectElement(null)}
    >
      {}
      {elements.map((element, index) =>
        element.type === "carousel" ? (
          <Box
            key={index}
            onClick={(e) => handleElementClick(e, element, index)}
          >
            <Slider autoplay autoplaySpeed={1500} speed={200}>
              {element.images.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={img.url}
                  width={`${img.width} !important`}
                  height={img.height}
                  alt={`image-${idx}`}
                />
              ))}
            </Slider>
          </Box>
        ) : element.type === "text" ? (
          <Box
            key={index}
            onClick={(e) => handleElementClick(e, element, index)}
          >
            <div dangerouslySetInnerHTML={{ __html: element.text }} />
          </Box>
        ) : null
      )}
    </Box>
  );
}

export default Content;
