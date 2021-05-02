import pikachu from "./pikachu.png";

const component = () => {
  let element = document.createElement("div");

  element.innerHTML = "Hello World";
  element.style.height = "200px";
  element.style.backgroundImage = `url(${pikachu})`;

  return element;
};

document.body.appendChild(component());