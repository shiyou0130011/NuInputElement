import {NuInputElement} from "./modules/nu-input-element.js"
/**
 * @element nu-month-input
 * @slot select-icon The calendar icon.
 * 
 * @attribute lang Same as the attribute of the same name as any element. Also, the date string displayed can be formated by this attribute.
 * 	For example, 
 * 		when value is <q>2020-01</q> and lang is <q>ja-JP-u-ca-japanese</q>, it will shows <q>令和2年1月</q>;
 * 		when lang is <q>zh-Hant-TW-u-ca-roc</q>, it will shows <q>民國109/1/1</q>;
 * 		when lang attribute is <q>pt-BR</q>, it will shows <q>janeiro de 2020</q>
 */
class NuMonthInput extends NuInputElement{
	toString(){return `[object NuMonthInput]`}
	#defaultValue = "---- --"
	/** The local for formating date */
	#formatSetting = {
		year: "numeric",
		month: "long"
	}
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

				margin: 0em;
				padding: 1px 2px;
				background-color: field;
				border-width: 2px;
				border-style: inset;
				border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
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
			#main:hover #clear-btn{
				color: var(--clear-btn-color);
			}
			#select-icon{
				user-select: none;
				cursor: default;
			}

			::slotted([slot=select-icon]){
				user-select: none;
				background-color: transparent !important;
			}

			#calendar{
				display: none
			}

		</style>
		<div id="main">
			<span id="display-value">----  --</span>
			<button id="clear-btn" type="button">⨯</button>
			<div id="select-icon"><slot name="select-icon">&#x1F4C5;</slot></div>
		</div>
		<div id="calendar">
			<div>
				<input type="number" min="0" max="9999" id="calendar-year" />
			</div>
			<div id="calendar-month-buttons">
			</div>
		</div>
		`
		shadowRoot.appendChild(document.importNode(temp.content, true))

		// add buttons
		for(let m = 1; m <= 12; m++){
			let btn = document.createElement("button")
			btn.setAttribute("value", m)
			btn.classList.add("month-btn")

			let lang = this.#formatter.resolvedOptions().locale

			btn.innerHTML = new Intl.DateTimeFormat(lang, {month: "long"}).format(new Date(2000, m - 1))
			shadowRoot.querySelector("#calendar-month-buttons").appendChild(btn)
		}
		


		// setup event
		shadowRoot.querySelector("#clear-btn").addEventListener("click", function(){
			currentElement.removeAttribute("value")
			currentElement.value = null
		})

	}

	get value(){
		if(this.#year === null || this.#month === null){
			return ""
		}
		return `0000${this.#year}`.substr(-4) + "-" `00${this.#month}`.substr(-2)
	}
	set value( newValue ){
		if(!newValue){
			this.removeAttribute("value")
		}
		if((newValue instanceof String || (typeof newValue) == "string") &&
		   (newValue.match(/\d{4}-\d{2}/) || newValue.match(/\d{4}-\d{2}-\d{2}((T| )[\d:\.Z\+]*|)/))){
			this.setAttribute("value", newValue)
		}
	}

	static get observedAttributes() {
		return [... super.observedAttributes, "max", "min", "lang"]
	}

	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue)
		switch(name){
			case "value":
				if(!newValue){
					this.#year = null
					this.#month = null
					this.shadowRoot.querySelector("#display-value").innerHTML = this.#defaultValue
					return 
				}
		
				if(newValue.match(/\d{4}-\d{2}/) || newValue.match(/\d{4}-\d{2}-\d{2}((T| )[\d:\.Z\+]*|)/)){
					this.#year = Number(newValue.substring(0, 4))
					this.#month = Number(newValue.substring(5, 8))
		
					this.shadowRoot.querySelector("#display-value").innerHTML = this.#formatter.format(
						new Date(this.#year, this.#month - 1)
					)		
				}
				break
			case "lang":
				try{
					this.#formatter = new Intl.DateTimeFormat(newValue, this.#formatSetting)
				}catch(e){
					console.error(newValue, "is not legel language")
				}

				if(this.#year !== null && this.#month != null){
					this.shadowRoot.querySelector("#display-value").innerHTML = this.#formatter.format(
						new Date(this.#year, this.#month - 1)
					)
				}
				shadowRoot.querySelectorAll("#calendar-month-buttons button").forEach(function(btn){
					btn.innerHTML = new Intl.DateTimeFormat(newValue, {month: "long"}).format(new Date(2000, btn.value - 1))
				})
				
				break

		}
	}
}

customElements.define("nu-month-input", NuMonthInput)
