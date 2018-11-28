/**
 * Tæmir elementið sem er gefið
 * @param {*} element
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Smíðar element
 * @param {*} type
 * @param {*} value
 * @param  {...any} attributes
 */
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

/**
 * Function sem býr til attribute
 * @param {*} type
 * @param {*} value
 */

export function Attr(type, value) {
  const attr = document.createAttribute(type);
  attr.value = value;

  return attr;
}

/**
 * Function sem sýnir error message
 * @param {*} error
 */

export function errorDisplay(error) {
  // betri villu meðhöndlun
  console.error(error);
}
