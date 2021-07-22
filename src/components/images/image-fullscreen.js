import "./image-fullscreen.scss"
import setAttributes from "../../helpers/set-attributes";

export default class ImageFullscreen {
    constructor(obj) {
        this.ids = obj.imageIds
        this.createLog(this.ids)
    }
    createLog(ids){
        ids.forEach(function (id) {
            let modal, img, modalContent, captionContent, close

            img = document.getElementById(id);
            modal = document.createElement("div")
            setAttributes(modal, {
                "id" : "modal-"+id,
                "class" : "story-image-zoom-modal",
                "style" :"display: none"
            })

            modal = img.parentNode.insertBefore(modal, img.nextSibling)
            close = document.createElement("span")
            setAttributes(close, {
                "id" : "closeModal-"+id,
                "class" : "story-image-zoom-close",
            })
            close = modal.appendChild(close)
            close.innerHTML = "&times;"

            modalContent = document.createElement("img")
            setAttributes(modalContent, {
                "id" : "modalContent-"+id,
                "class" : "story-image-zoom-modal-content",
                "src" : img.src,
                "alt" : img.alt
            })
            modalContent = modal.appendChild(modalContent)

            captionContent = document.createElement("div")
            setAttributes(captionContent, {
                "id" : "captionContent-"+id,
                "class" : "story-image-zoom-modal-caption"
            })
            captionContent = modal.appendChild(captionContent)

            img.onclick = function(){
                modal.style.display = "block";
                modalContent.src = this.src;
                captionContent.innerHTML = this.alt;
            }

            close.onclick = function() {
                modal.style.display = "none";
            }
        })
    }
}

