import {NuInputElement} from "./modules/nu-input-element.js"
/**
 * @element nu-month-input
 * @slot select-icon The calendar icon
 */
class NuMonthInput extends NuInputElement{
	toString(){return `[object NuMonthInput]`}
	#defaultValue = "---- --"
	constructor() {
		super()

		let currentElement = this
		let shadowRoot = this.attachShadow({mode: 'open'})
		let temp = document.createElement("template")
		temp.innerHTML =`
		<style>
			:host{
				display: inline-block;

				--clear-btn-color: #5eb3ce;
			}
			#main{
				display: flex;
			}
			#display-value{
				flex-grow: 1;
				flex-shrink: 0;
			}
			#clear-btn, #select-icon{
				flex-grow: 0;
				flex-shrink: 0;
			}
			#clear-btn{
				background-color: transparent;
				border: 0 hidden;

				color: transparent;
			}
			:host:hover #clear-btn{
				color: var(--clear-btn-color)
			}


		</style>
		<div id="main">
			<span id="display-value">----  --</span>
			<button id="clear-btn" type="button">⨯</button>
			<div id="select-icon"><slot name="select-icon">&#x1F4C5;</slot></div>
		</div>
		`
		shadowRoot.appendChild(document.importNode(temp.content, true))
	}


	static get observedAttributes() {
		return [... super.observedAttributes, "max", "min"]
	}

	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue)
	}
}

customElements.define("nu-month-input", NuMonthInput)
