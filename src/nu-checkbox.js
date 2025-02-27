import {NuInputElement} from "./modules/nu-input-element.js"

class NuCheckboxElement extends NuInputElement{
	toString(){return `[object NuTimeInputElement]`}
	constructor() {
		super()
		let currentElement = this
		let shadowRoot = this.attachShadow({mode: 'open'})
		let temp = document.createElement("template")

		temp.innerHTML =``
		shadowRoot.appendChild(document.importNode(temp.content, true))
	}
}


customElements.define("nu-checkbox", NuCheckboxElement)
