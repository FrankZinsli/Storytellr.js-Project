export default function setAttributs(element, attributes){
  for(var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
