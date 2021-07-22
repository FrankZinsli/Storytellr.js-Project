import "./table-of-contents.scss"
import setAttributes from "../../helpers/set-attributes";

export default class TocGenerator {
    constructor(obj) {
        this.id = obj.id;
        this.listType = obj.listType;
        this.navLink = obj.navLink;
        this.tocElement = document.getElementById(this.id);
        this.id && this.createToc(this.tocElement, this.listType, this.navLink);
    }

    createToc (tocElement, listType, navLink) {
        let listTypeElement, liElement, tmpLiElement, tmpLiTypeElement, navLinkElement, lichildElement, allTocElements, tocListTypeElement

        if (listType === 'ul') {
            listTypeElement = document.createElement('ul')
        } else if (listType === 'ol') {
            listTypeElement = document.createElement('ol')
        } else {
            return console.error('Wrong listType', listType)
        }

        setAttributes(listTypeElement, {
            "class" : "story-toc-list-"+listType
        })

        tocListTypeElement = tocElement.appendChild(listTypeElement)

        allTocElements = document.querySelectorAll("[class*='story-toc-element-']")
        allTocElements.forEach(function(item){
            if (item.classList.contains('story-toc-element-1')) {
                navLink ? liElement = TocGenerator.createNavLink(item, tocListTypeElement) : liElement = document.createElement('li').innerHTML = item.innerHTML
            } else if (item.classList.contains('story-toc-element-2')) {
                if (tocListTypeElement.lastChild.localName !== 'ol' && tocListTypeElement.lastChild.localName !== 'ul') {
                    tmpLiTypeElement = document.createElement(listType)
                }
                navLink ? tmpLiElement = TocGenerator.createNavLink(item, tocListTypeElement) : tmpLiElement = document.createElement('li').innerHTML = item.innerHTML
                lichildElement = tmpLiTypeElement.appendChild(tmpLiElement)
                liElement = lichildElement.parentElement
            }
            tocListTypeElement.appendChild(liElement)
        });
    }

    static createNavLink (item, tocListTypeElement) {
        let tempLiElement, createNavTag, linkText;

        tempLiElement = document.createElement('li')
        createNavTag = document.createElement('a')
        linkText = document.createTextNode(item.innerHTML);

        createNavTag.appendChild(linkText);
        createNavTag.title = item.innerHTML;
        createNavTag.href = "#"+item.id;
        tempLiElement = tocListTypeElement.appendChild(tempLiElement)
        tempLiElement.appendChild(createNavTag)
        return tempLiElement
    }
}


