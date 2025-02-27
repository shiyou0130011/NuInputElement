import {NuInputElement} from "./modules/nu-input-element.js"

class NuCheckboxElement extends NuInputElement{
	toString(){return `[object NuTimeInputElement]`}
	constructor() {
		super()
		let currentElement = this
		let shadowRoot = this.attachShadow({mode: 'open'})
		let temp = document.createElement("template")

		temp.innerHTML =`
		<style>
			:host{
				--label-font-size: 1rem;
			
				--checkbox-width: 2.5rem;
				--checkbox-height: var(--label-font-size);
				--checkbox-outline-size: 0.2rem;
				--checkbox-background: gray;
				--checkbox-inner-background: white;
				
				--checkbox-text-space: .5rem;
			}

			#checkbox-content{
				display: flex;
				column-gap: var(--checkbox-text-space);
				height: var(--checkbox-height);
				
				align-items: center;
			}
			#checkbox-outer{
				width: var(--checkbox-width);
				background-color: var(--checkbox-background);
				height: var(--checkbox-height);
				
				outline-width: var(--checkbox-outline-size);
				outline-style: solid;
				outline-offset: 0;
				outline-color: var(--checkbox-background);
				
				
				border-radius: var(--checkbox-height);
			}
			#checkbox-inner{
				background-color: var(--checkbox-inner-background);
				height: var(--checkbox-height);
				width: var(--checkbox-height);
				display: block;
				border-radius: 50%;
				
				margin-left: 0;
				
				transition: margin .5s;
			}
			label{
				font-size: var(--label-font-size);
				font-family: sans-serif
			}
			::slotted([slot=label]){
				font-size: var(--label-font-size);
				font-family: sans-serif
			}
			input[type=checkbox]{
				display: none
			}
			
			input[type=checkbox]:checked ~ #checkbox-outer #checkbox-inner{
				margin-left: auto;		
			}
			
		</style>
		<div id="checkbox-content">
			<input type="checkbox" id="cb"/>
			<div id="checkbox-outer">
				<span id="checkbox-inner"></span>
			</div>
			<label for="cb">
				<slot name="label"></slot>
			</label>
		</div>
		`
		shadowRoot.appendChild(document.importNode(temp.content, true))
	}

	static get observedAttributes() {
		return [... super.observedAttributes, "checked"]
	}

	set checked(value){
		let result = value == "checked" || value === true || value === 1
		if(result){
			this.setAttribute("checked", "")
		}else{
			this.removeAttribute("checked")
		}
	}
	get checked(){
		return this.shadowRoot.querySelector("checkbox").checked
	}

	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue)

		switch(name){
			case "checked": 
				let checked = newValue == "checked" || newValue === ""
				this.shadowRoot.querySelector("checkbox").checked = checked

				break
		}
	}
}


customElements.define("nu-checkbox", NuCheckboxElement)
