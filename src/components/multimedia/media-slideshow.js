import "./media-slideshow.scss"
import setAttributes from "../../helpers/set-attributes";

export default class MediaSlideshow {
    constructor(obj) {
        this.id = obj.id
        this.mediaSlideshow = document.getElementById(this.id)
        this.storyMedias = this.mediaSlideshow.getElementsByClassName('story-media-slideshow-container')
        this.createMediaController(this.storyMedias)
        MediaSlideshow.showCurrentMedia(this.id, '')
    }

    createMediaController(storyMedia){
        let divElement, spanElement, mediaContainer;
        mediaContainer = this.mediaSlideshow.getElementsByClassName("story-media-slideshow-container")

        for (let i = 0; i < storyMedia.length; i++){
            divElement = document.createElement('div')
            setAttributes(divElement, {
                "class" : "story-media-controllers",
            })

            for (let i = 0; i < storyMedia.length; i++){
                spanElement = document.createElement('span')
                setAttributes(spanElement, {
                    "class" : "story-media-controller story-media-controller-"+i,
                    "onclick" : '$story.MediaSlideshow.showCurrentMedia(' + '"' + this.id + '", ' + (i) + ')'
                })
                divElement.appendChild(spanElement)
            }
            mediaContainer[i].appendChild(divElement)
        }
    }

    static showCurrentMedia(slideshowID, index){
        let defaultIndex, slideshow, mediaSlides, controlls, controllsNew, media;

        defaultIndex = 0
        if (index === ''){
            index = defaultIndex
        }

        slideshow = document.getElementById(slideshowID)
        mediaSlides = slideshow.getElementsByClassName('story-media-slideshow-container')
        controlls = slideshow.querySelectorAll('*[class^="story-media-controller"]')
        controllsNew = slideshow.getElementsByClassName('story-media-controller-'+[index])
        media = slideshow.getElementsByClassName('story-media-image-player')

        for (let i = 0; i < mediaSlides.length; i++) {
            mediaSlides[i].style.display = "none";
            media[i].pause();
        }
        mediaSlides[index].style.display = "block";
        for (let i = 0; i < controlls.length; i++) {
            controlls[i].className = controlls[i].className.replace(" active-media-controller", "")
        }
        for (let i = 0; i < controllsNew.length; i++) {
            controllsNew[i].className += " active-media-controller";
        }
    }
}
