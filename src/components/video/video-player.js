import "./video-player.scss"
import setAttributes from "../../helpers/set-attributes";

export default class VideoPlayer {
    constructor(obj) {
        // initial values
        this.urlOptions = '';
        this.id = obj.id;
        if (obj.youtube) {
            this.youtube = {
                videoId: obj.youtube.videoId,
                autoplay: obj.youtube.autoplay || false,
                allowFullScreen: obj.youtube.allowFullScreen || true,
                controls: obj.youtube.controls !== false,
                end: obj.youtube.end || false,
                loop: obj.youtube.loop || false,
                mute: obj.youtube.mute || false,
                start: obj.youtube.start || false,
                modestbranding: obj.youtube.modestbranding || false,
            }
        }
        else if (obj.vimeo) {
            this.vimeo = {
                videoId: obj.vimeo.videoId,
                autopause: obj.vimeo.autopause || false,
                autoplay: obj.vimeo.autoplay || false,
                controls: obj.vimeo.controls !== false,
                loop: obj.vimeo.loop || false,
                muted: obj.vimeo.muted || false,
                quality: obj.vimeo.quality || 'auto',
                allowFullScreen: obj.vimeo.allowFullScreen || false,
                background: obj.vimeo.background || false
            }
        }

        /*Die automatische Wiedergabe ist nur erlaubt, wenn durch den Benutzer erlaubt, die Seite vom Benutzer aktiviert wurde oder das Medium stummgeschaltet ist.*/
        if (this.youtube && document.getElementById(this.id)) {
            this.youtube.autoplay && this.addUrlOptionYt('autoplay=1&origin='+window.location.origin)
            this.youtube.loop && this.addUrlOptionYt('playlist='+this.youtube.videoId+'&loop=1')
            !this.youtube.controls && this.addUrlOptionYt('controls=0')
            this.youtube.modestbranding && this.addUrlOptionYt('modestbranding=1')
            this.youtube.start && this.addUrlOptionYt('start='+this.youtube.start)
            this.youtube.end && this.addUrlOptionYt('end='+this.youtube.end)
            this.youtube.mute && this.addUrlOptionYt('mute=1')
            this.youtube.allowFullScreen && this.addUrlOptionYt(' allowfullscreen')
            this.createYoutubePlayer(this.id, this.youtube.videoId, this.urlOptions)
        }
        else if (this.vimeo && document.getElementById(this.id) && this.vimeo.background === false) {
            this.vimeo.autopause && this.addUrlOptionVimeo('autopause=1')
            this.vimeo.autoplay && this.addUrlOptionVimeo('autoplay=1')
            this.vimeo.loop && this.addUrlOptionVimeo('loop=1')
            !this.vimeo.controls && this.addUrlOptionVimeo('controls=0')
            this.vimeo.muted && this.addUrlOptionVimeo('muted=1')
            this.vimeo.quality && this.addUrlOptionVimeo('quality='+this.vimeo.quality)
            this.createVimeoPlayer(this.id, this.vimeo.videoId, this.urlOptions)
        }
        else if (this.vimeo && document.getElementById(this.id) && this.vimeo.background === true) {
            this.addUrlOptionVimeo('background=1')
            this.addUrlOptionVimeo('autoplay=1')
            this.addUrlOptionVimeo('loop=1')
            this.addUrlOptionVimeo('byline=0')
            this.addUrlOptionVimeo('title=0')
            this.createVimeoPlayer(this.id, this.vimeo.videoId, this.urlOptions)
        }
    }

    addUrlOptionYt(option) {
        if (this.urlOptions === '') {
            this.urlOptions = this.urlOptions.concat('?'+option)
        }
        else {
            this.urlOptions = this.urlOptions.concat('&'+option)
        }
    }

    addUrlOptionVimeo(option) {
        if (this.urlOptions === '') {
            this.urlOptions = this.urlOptions.concat('?'+option)
        } else {
            this.urlOptions = this.urlOptions.concat('&'+option)
        }
    }

    createYoutubePlayer(player_id, player_video_id, player_url_options) {
        let embedUrl = "http://www.youtube.com/embed/"+player_video_id+player_url_options
        let videoWrapper = document.getElementById(player_id)
        let videoContainer = document.createElement("div")
        setAttributes(videoContainer, {
            "class" : "story-video-container",
        })
        videoWrapper.appendChild(videoContainer)
        let iframeContainer = document.createElement("iframe")
        if (this.youtube.allowFullScreen) {
            setAttributes(iframeContainer, {
                "allowfullscreen" : "allowfullscreen",
                "mozallowfullscreen" : "mozallowfullscreen",
                "msallowfullscreen" : "msallowfullscreen",
                "oallowfullscreen" : "oallowfullscreen",
                "webkitallowfullscreen" : "webkitallowfullscreen",
            })
        }
        setAttributes(iframeContainer, {
            "class" : "story-youtube-player",
            "src" : embedUrl,
            "style": "width:100%; height: 100%"
        })
        videoContainer.appendChild(iframeContainer)
    }

    createVimeoPlayer(player_id, player_video_id, player_url_options) {
        let embedUrl = "https://player.vimeo.com/video/"+player_video_id+player_url_options

        let videoWrapper = document.getElementById(player_id)
        let videoContainer = document.createElement("div")
        setAttributes(videoContainer, {
            "class" : "story-video-container",
        })

        videoWrapper.insertBefore(videoContainer, videoWrapper.firstChild)
        let iframeContainer = document.createElement("iframe")

        if (this.vimeo.allowFullScreen) {
            setAttributes(iframeContainer, {
                "allowfullscreen" : "allowfullscreen",
                "mozallowfullscreen" : "mozallowfullscreen",
                "msallowfullscreen" : "msallowfullscreen",
                "oallowfullscreen" : "oallowfullscreen",
                "webkitallowfullscreen" : "webkitallowfullscreen",
            })
        }
        if (this.vimeo.background) {
            setAttributes(iframeContainer, {
                "frameborder" : "0",
                "allowfullscreen" : "allowfullscreen",
                "mozallowfullscreen" : "mozallowfullscreen",
                "msallowfullscreen" : "msallowfullscreen",
                "oallowfullscreen" : "oallowfullscreen",
                "webkitallowfullscreen" : "webkitallowfullscreen",
                "title" : "vimeo-header-player",
                "class" : "story-vimeo-header-player",
                "src" : embedUrl,
            })
        } else {
            setAttributes(iframeContainer, {
                "title" : "vimeo-player",
                "class" : "story-vimeo-player",
                "src" : embedUrl,
                "style": "width:100%; height: 100%",
            })
        }
        videoContainer.appendChild(iframeContainer)
    }
}
