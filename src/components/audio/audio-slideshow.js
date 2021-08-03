import "./audio-slideshow.scss"
import setAttributes from "../../helpers/set-attributes";

export default class AudioSlideshow {
    constructor(obj) {
        this.id = obj.id
        this.audioSlideshow = document.getElementById(this.id)
        this.storyAudios = this.audioSlideshow.getElementsByClassName('story-audio-slideshow-container')
        this.count = obj.count || false
        this.count && this.createAudioCount(this.storyAudios)
        this.createAudioController(this.storyAudios)
        AudioSlideshow.showCurrentAudio(this.id, '')
    }
    createAudioCount(storyAudio){
        let captions, captionContent, newCaptionContent;
        captions = this.audioSlideshow.getElementsByClassName("story-audio-slideshow-caption")

        for (let i = 0; i < storyAudio.length; i++){
            captionContent = captions[i].innerText
            newCaptionContent = ( '(' + (i+1) + ' / ' + storyAudio.length + ') ' + captionContent)
            captions[i].innerText = newCaptionContent
        }
    }

    createAudioController(storyAudio){
        let divElement, spanElement, audioContainer;
        audioContainer = this.audioSlideshow.getElementsByClassName("story-audio-slideshow")

        for (let i = 0; i < storyAudio.length; i++){
            divElement = document.createElement('div')
            setAttributes(divElement, {
                "class" : "story-audio-controllers",
            })

            for (let i = 0; i < storyAudio.length; i++){
                spanElement = document.createElement('span')
                setAttributes(spanElement, {
                    "class" : "story-audio-controller story-audio-controller-"+i,
                    "onclick" : '$story.AudioSlideshow.showCurrentAudio(' + '"' + this.id + '", ' + (i) + ')'
                })
                divElement.appendChild(spanElement)
            }
            audioContainer[i].parentNode.insertBefore(divElement, audioContainer[i].nextSibling)
        }
    }

    static showCurrentAudio(slideshowID, index){
        let defaultIndex, slideshow, audioSlides, controlls, controllsNew;

        defaultIndex = 0
        if (index === ''){
            index = defaultIndex
        }

        slideshow = document.getElementById(slideshowID)
        audioSlides = slideshow.getElementsByClassName('story-audio-slideshow-container')
        controlls = slideshow.querySelectorAll('*[class^="story-audio-controller"]')
        controllsNew = slideshow.getElementsByClassName('story-audio-controller-'+[index])

        for (let i = 0; i < audioSlides.length; i++) {
            audioSlides[i].style.display = "none";
        }
        audioSlides[index].style.display = "block";
        for (let i = 0; i < controlls.length; i++) {
            controlls[i].className = controlls[i].className.replace(" active-audio-controller", "")
        }
        for (let i = 0; i < controllsNew.length; i++) {
            controllsNew[i].className += " active-audio-controller";
        }
    }
}
