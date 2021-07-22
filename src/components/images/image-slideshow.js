import setAttributes from "../../helpers/set-attributes";
import "./image-slideshow.scss"

export default class ImageSlideshow {
  constructor(obj) {
    this.id = obj.id;
    this.animation = obj.animation;
    this.imageCount = obj.imageCount;
    this.arrows = obj.arrows;
    this.controller = obj.controller;
    this.autoPlay = obj.autoPlay;
    this.slideshow = document.getElementById(this.id)
    this.storyImages = this.slideshow.getElementsByClassName('story-image')
    this.imageCount && this.createImageCount(this.storyImages)
    this.arrows && this.createArrows()
    this.animation && this.createAnimation(this.animation, this.storyImages)
    this.controller && this.createController(this.storyImages.length)
    this.autoPlay && this.autoPlayer(this.autoPlay, this.id)
    ImageSlideshow.showCurrentSlide(this.id, '')
  }
  createImageCount(storyImages){
    let divElement, textNode;

    for (let i = 0; i < storyImages.length; i++){
      divElement = document.createElement('div')
      setAttributes(divElement, {
        "class" : "story-slideNumber"
      })
      textNode = document.createTextNode((i+1) + ' / ' + storyImages.length)
      divElement.appendChild(textNode)
      storyImages[i].insertBefore(divElement, storyImages[i].firstChild)
    }
  }
  createArrows(){
    let prevButton, nextButton

    prevButton = document.createElement('a')
    nextButton = document.createElement('a')
    setAttributes(prevButton, {
      "class" : "story-prevImage",
      //"id" : this.slideshow.id + '-PrevImageButton',
      "onclick" : '$story.ImageSlideshow.showNextSlide(' + '"' + this.id + '", ' + -1 + ')'
    })
    prevButton.innerHTML = "&#10094"

    setAttributes(nextButton, {
      "class" : "story-nextImage",
      //"id" : this.slideshow.id + '-NextImageButton',
      "onclick" : '$story.ImageSlideshow.showNextSlide(' + '"' + this.id + '", ' + 1 + ')'
    })
    nextButton.innerHTML = "&#10095"

    this.slideshow.appendChild(prevButton)
    this.slideshow.appendChild(nextButton)
  }
  createAnimation(animationType, storyImages){
    if(animationType === 'fade' || animationType === 'default' || animationType === ''){
      for (let i = 0; i < storyImages.length; i++){
        storyImages[i].classList.add(animationType)
      }
    }
  }
  createController(storyLength){
    let divElement, spanElement;

    if(this.controller === 'dot'){
      divElement = document.createElement('div')
      setAttributes(divElement, {
        "class" : "story-image-controllers",
      })
      for (let i = 0; i < storyLength; i++){
        spanElement = document.createElement('span')
        setAttributes(spanElement, {
          "class" : "story-image-controller-" + this.controller,
          "onclick" : '$story.ImageSlideshow.showCurrentSlide(' + '"' + this.id + '", ' + (i) + ')'
        })
        divElement.appendChild(spanElement)
        this.slideshow.appendChild(divElement)
      }
    }
  }

  static showCurrentSlide(slideshowID, index){
    let defaultIndex, slideshow, slides, controlls;

    defaultIndex = 0
    if (index === ''){
      index = defaultIndex
    }

    slideshow = document.getElementById(slideshowID)
    slides = slideshow.getElementsByClassName('story-image')
    controlls = slideshow.querySelectorAll('*[class^="story-image-controller-"]')

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].className = slides[i].className.replace(" active-slide", "")
    }

    for (let i = 0; i < controlls.length; i++) {
      controlls[i].className = controlls[i].className.replace(" active-controller", "")
    }

    slides[index].style.display = "block";
    slides[index].className += " active-slide"
    controlls[index].className += " active-controller";
  }

  static showNextSlide(slideshowID, plusMinus){
    let slideshow, activeSlide, slides, controlls, activeSlideIndex, newIndex;

    slideshow = document.getElementById(slideshowID)
    slides = slideshow.getElementsByClassName('story-image')
    controlls = slideshow.querySelectorAll('*[class^="story-image-controller-"]')

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('active-slide')) {
        activeSlideIndex = i
      }
      slides[i].style.display = "none";
      slides[i].className = slides[i].className.replace(" active-slide", "")
    }

    for (let i = 0; i < controlls.length; i++) {
      controlls[i].className = controlls[i].className.replace(" active-controller", "")
    }

    if (activeSlideIndex+(plusMinus) < 0){
        newIndex = slides.length-1
      } else if(activeSlideIndex+(plusMinus) > slides.length-1){
        newIndex = 0
      } else{
        newIndex = activeSlideIndex+(plusMinus)
      }
      slides[newIndex].style.display = "block";
      slides[newIndex].className += " active-slide"
      controlls[newIndex].className += " active-controller";
  }

  autoPlayer(autoplayTime, slideshowID){
    let slideshow, slides, controlls;

    slideshow = document.getElementById(slideshowID)
    slides = slideshow.getElementsByClassName('story-image')
    controlls = slideshow.querySelectorAll('*[class^="story-image-controller-"]')

    setInterval(function (){
      let autoSlideIndex, newIndex;
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active-slide')) {
          autoSlideIndex = i
        }
        slides[i].style.display = "none";
        slides[i].className = slides[i].className.replace(" active-slide", "")
      }

      for (let i = 0; i < controlls.length; i++) {
        controlls[i].className = controlls[i].className.replace(" active-controller", "")
      }
      autoSlideIndex++

      if (autoSlideIndex < 0){
        newIndex = slides.length-1
      } else if(autoSlideIndex > slides.length-1){
        newIndex = 0
      } else{
        newIndex = autoSlideIndex
      }

      slides[newIndex].style.display = "block";
      slides[newIndex].className += " active-slide"
      controlls[newIndex].className += " active-controller";
    }, autoplayTime)
  }
}
