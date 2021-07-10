import "./header-image.scss"

export default class HeaderImage {
    constructor(obj) {
        this.id = obj.id;
        this.headerElement = document.getElementById(this.id)
        this.src = obj.src;
        this.focusPointLeft = obj.focusPointLeft || '50%';
        this.focusPointTop = obj.focusPointTop || '50%';
        this.greyscale = obj.greyscale || false
        this.id && this.createHeaderImage(this.headerElement, this.src, this.focusPointLeft, this.focusPointTop)
    }
    createHeaderImage(headerElement, src, focusLeft, focusTop) {
        headerElement.style.cssText = "background-image: url('" + src + "'); background-position: " + focusLeft + " " + focusTop + ";"
    }
}
