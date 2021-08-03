import "./text-slideshow.scss"
import setAttributes from "../../helpers/set-attributes";

export default class TextSlideshow {
    constructor(obj) {
        this.id = obj.id
        this.textSlideshow = document.getElementById(this.id)
        this.storyTexts = this.textSlideshow.getElementsByClassName('story-text-slideshow-container')
        this.createTextController(this.storyTexts)
        TextSlideshow.showCurrentText(this.id, '')
    }

    createTextController(storyText){
        let divElement, spanElement, textContainer;
        textContainer = this.textSlideshow.getElementsByClassName("story-text-slideshow-container")

        for (let i = 0; i < storyText.length; i++){
            divElement = document.createElement('div')
            setAttributes(divElement, {
                "class" : "story-text-controllers",
            })

            for (let i = 0; i < storyText.length; i++){
                spanElement = document.createElement('span')
                setAttributes(spanElement, {
                    "class" : "story-text-controller story-text-controller-"+i,
                    "onclick" : '$story.TextSlideshow.showCurrentText(' + '"' + this.id + '", ' + (i) + ')'
                })
                divElement.appendChild(spanElement)
            }
            textContainer[i].appendChild(divElement)
        }
    }

    static showCurrentText(slideshowID, index){
        let defaultIndex, slideshow, textSlides, controlls, controllsNew;

        defaultIndex = 0
        if (index === ''){
            index = defaultIndex
        }

        slideshow = document.getElementById(slideshowID)
        textSlides = slideshow.getElementsByClassName('story-text-slideshow-container')
        controlls = slideshow.querySelectorAll('*[class^="story-text-controller"]')
        controllsNew = slideshow.getElementsByClassName('story-text-controller-'+[index])

        for (let i = 0; i < textSlides.length; i++) {
            textSlides[i].style.display = "none";
        }
        textSlides[index].style.display = "block";
        for (let i = 0; i < controlls.length; i++) {
            controlls[i].className = controlls[i].className.replace(" active-text-controller", "")
        }
        for (let i = 0; i < controllsNew.length; i++) {
            controllsNew[i].className += " active-text-controller";
        }
    }
}
