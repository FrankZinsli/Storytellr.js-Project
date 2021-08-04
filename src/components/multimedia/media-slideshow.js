import "./media-slideshow.scss"
import setAttributes from "../../helpers/set-attributes";

export default class MediaSlideshow {
    constructor(obj) {
        this.id = obj.id
        this.autoplay = obj.autoplay || false
        this.mediaSlideshow = document.getElementById(this.id)
        this.storyMedias = this.mediaSlideshow.getElementsByClassName('story-media-slideshow-container')
        this.createMediaController(this.storyMedias)
        MediaSlideshow.showCurrentMedia(this.id, this.autoplay, '')
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
                    "onclick" : '$story.MediaSlideshow.showCurrentMedia(' + '"' + this.id + '", ' + this.autoplay + ', ' + (i) + ')'
                })
                divElement.appendChild(spanElement)
            }
            mediaContainer[i].appendChild(divElement)
        }
    }

    static showCurrentMedia(slideshowID, autoplay, index){
        let defaultIndex, slideshow, mediaSlides, controlls, controllsNew, media;

        slideshow = document.getElementById(slideshowID)
        mediaSlides = slideshow.getElementsByClassName('story-media-slideshow-container')
        controlls = slideshow.querySelectorAll('*[class^="story-media-controller"]')
        media = slideshow.getElementsByClassName('story-media-player')

        for (let i = 0; i < mediaSlides.length; i++) {
            mediaSlides[i].style.display = "none";
            media[i].currentTime = 0
            media[i].pause();
        }

        defaultIndex = 0
        if (index === ''){
            index = defaultIndex
        } else {
            if (autoplay === true) {
                media[index].play()
            }
        }

        controllsNew = slideshow.getElementsByClassName('story-media-controller-'+[index])


        mediaSlides[index].style.display = "block";
        for (let i = 0; i < controlls.length; i++) {
            controlls[i].className = controlls[i].className.replace(" active-media-controller", "")
        }
        for (let i = 0; i < controllsNew.length; i++) {
            controllsNew[i].className += " active-media-controller";
        }
    }
}
