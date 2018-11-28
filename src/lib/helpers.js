export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function createElement(type, value, ...attributes) {
  const ele = document.createElement(type);
  if (value && value !== '') {
    ele.appendChild(document.createTextNode(value));
  }

  if (Array.isArray(attributes)) {
    attributes.forEach((attribute) => {
      ele.setAttributeNode(attribute);
    });
  }
  // while (attributes && attributes.length > 0) {
  //   ele.setAttributeNode(attributes.pop());
  // }
  return ele;
}

export function Attr(type, value) {
  const attr = document.createAttribute(type);
  attr.value = value;

  return attr;
}

export function errorDisplay(error) {
  // betri villu meðhöndlun
  console.error(error);
}
