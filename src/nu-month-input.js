import {NuInputElement} from "./modules/nu-input-element.js"
/**
 * @element nu-month-input
 * @slot select-icon The calendar icon
 */
class NuMonthInput extends NuInputElement{
	toString(){return `[object NuMonthInput]`}
	#defaultValue = "---- --"
	/** The local for formating date */
	#formatter = new Intl.DateTimeFormat(
		navigator.userLanguage || navigator.language || navigator.languages[0] || "default",
		{
			year: "numeric",
			month: "long", 
		}
	)

	#year = null
	#month = null


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

	get value(){
		if(this.#year === null || this.#month === null){
			return ""
		}
		return `0000${this.#year}`.substr(-4) + "-" `00${this.#month}`.substr(-2)
	}
	set value(v){
		if(!v){
			this.#year = null
			this.#month = null
			this.shadowRoot.querySelector("#display-value").innerHTML = this.#defaultValue
			return 
		}

		if(v.match(/\d{4}-\d{2}/) || v.match(/\d{4}-\d{2}-\d{2}((T| )[\d:\.Z\+]*|)/)){
			this.#year = Number(v.substring(0, 4))
			this.#month = Number(v.substring(5, 8))

			this.shadowRoot.querySelector("#display-value").innerHTML = this.#formatter.format(
				new Date(this.#year, this.#month - 1)
			)		
		}

	}

	static get observedAttributes() {
		return [... super.observedAttributes, "max", "min"]
	}

	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue)
		switch(name){
			case "value":
				this.value = newValue
				break
		}
	}
}

customElements.define("nu-month-input", NuMonthInput)
