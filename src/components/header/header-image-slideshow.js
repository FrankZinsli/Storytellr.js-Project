import "./header-image-slideshow.scss"

export default class HeaderImageSlideshow {
    constructor(obj) {
        this.id = obj.id;
        this.autoplay = obj.autoplay;
        this.slideshowElement = document.getElementById(this.id)
        this.autoplay && this.createHeaderImageSlideshow(this.autoplay, this.id, this.slideshowElement)
    }
    createHeaderImageSlideshow(autoplayTime, slideshowID, slideshowElement){
        let slideshow, slides, newIndex, x, i, src, focusLeft, focusTop;
        let autoSlideIndex = 0

        slideshow = document.getElementById(slideshowID)
        slides = slideshow.getElementsByClassName('story-header-image')

        for (x = 0;  x < slides.length; x++){
            if (x === 0) {
                src = (slides[x].firstElementChild.attributes.src.nodeValue)
                focusLeft = slides[x].getElementsByTagName('img')[0].getAttribute('data-story-focus-left') || '50%'
                focusTop = slides[x].getElementsByTagName('img')[0].getAttribute('data-story-focus-top') || '50%'
                console.log(focusTop, focusLeft)

                slideshowElement.style.cssText = "background-image: url('" + src + "'); background-position: " + focusLeft + " " + focusTop + ";"
            }
            slides[x].style.display = "none"
        }

        let animationDelay = autoplayTime/1000;
        setInterval(function (){
            for (i = 0; i < slides.length; i++) {
                if (slides[i].classList.contains('story-header-image-active')) {
                    autoSlideIndex = i
                }
                slides[i].style.opacity = 0;
                slides[i].style.display = "none";
                slides[i].className = slides[i].className.replace(" story-header-image-active", "")
            }
            autoSlideIndex++
            if(autoSlideIndex > slides.length-1){
                newIndex = 0
                autoSlideIndex = 0
            } else{
                newIndex = autoSlideIndex
            }


            src = (slides[newIndex].firstElementChild.attributes.src.nodeValue)
            focusLeft = slides[newIndex].getElementsByTagName('img')[0].getAttribute('data-story-focus-left') || '50%'
            focusTop = slides[newIndex].getElementsByTagName('img')[0].getAttribute('data-story-focus-top') || '50%'

            slideshowElement.style.cssText = "background-image: url(" + src + "); background-position: " + focusLeft + " " + focusTop + "; animation-delay: " + animationDelay + "s;"
            animationDelay = animationDelay + (autoplayTime)/1000;

        }, autoplayTime)
    }
}


