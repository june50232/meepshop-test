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
              width: "100px",
              height: "100px",
            },
            {
              url: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph",
              width: "100px",
              height: "100px",
            },
            {
              url: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph",
              width: "100px",
              height: "100px",
            },
            {
              url: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph",
              width: "100px",
              height: "100px",
            },
            {
              url: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph",
              width: "100px",
              height: "100px",
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

  return (
    <Box
      ref={drop}
      style={{ flex: 1, overflow: "auto", height: "100%" }}
      onClick={() => onSelectElement(null)}
    >
      {elements.map((element, index) =>
        element.type === "carousel" ? (
          <Box key={index} onClick={() => onSelectElement(element, index)}>
            <Slider autoplay autoplaySpeed={3000} speed={200}>
              {element.images.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={img.url}
                  sx={{ width: img.width, height: img.height }}
                />
              ))}
            </Slider>
          </Box>
        ) : element.type === "text" ? (
          <Box key={index} onClick={() => onSelectElement(element, index)}>
            {element.text}
          </Box>
        ) : null
      )}
    </Box>
  );
}

export default Content;
