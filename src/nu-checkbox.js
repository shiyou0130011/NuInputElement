import {NuToggleInputElement} from "./modules/nu-toggle-input-element.js"

/**
 * An element which is similar as Apple’s toggle element (https://developer.apple.com/design/human-interface-guidelines/toggles).
 * 
 * @attribute name  Same as the attribute of the same name as input
 * @attribute value Same as the attribute of the same name as input
 * 
 * @element nu-checkbox
 * @csspart --label-font-size
 * @csspart --checkbox-width
 * @csspart --checkbox-height
 * @csspart --checkbox-outline-size
 * @csspart --checkbox-background
 * @csspart --checkbox-inner-background
 * @csspart --checkbox-text-space
 * @csspart --checkbox-checked-background
 * @csspart --checkbox-checked-inner-background
 */
class NuCheckboxElement extends NuToggleInputElement{
	toString(){return `[object NuCheckboxElement]`}
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

				--checkbox-checked-background: darkgreen;
				--checkbox-checked-inner-background: var(--checkbox-inner-background);
			}

			main label{
				display: flex;
				column-gap: var(--checkbox-text-space);
				height: var(--checkbox-height);
				
				align-items: center;
			}
			#checkbox-outer{
				display: block;
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
			main{
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
			
			input[type=checkbox]:checked ~ label #checkbox-outer #checkbox-inner{
				margin-left: auto;		
			}

			input[type=checkbox]:checked ~ label #checkbox-outer{
				background-color: var(--checkbox-checked-background);
				outline-color: var(--checkbox-checked-background);
			}
			input[type=checkbox]:checked ~ label #checkbox-outer #checkbox-inner{
				background-color: var(--checkbox-checked-inner-background)
			}
		</style>
		<main id="checkbox-content">
			<input type="checkbox" id="cb"/>
			<label for="cb">
				<span id="checkbox-outer">
					<span id="checkbox-inner"></span>
				</span>
				<slot name="label"></slot>
			</label>
		</main>
		`
		shadowRoot.appendChild(document.importNode(temp.content, true))
		currentElement.role = "checkbox"	
	}

	static get observedAttributes() {
		return [... super.observedAttributes]
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
		return this.shadowRoot.querySelector("[type=checkbox]").checked
	}

	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue)

		switch(name){
			case "disabled":
			case "readonly":
				if(newValue === "" || (newValue || "").toLowerCase() == name.toLowerCase()){
					this.shadowRoot.getElementById("checkbox-content").classList.add(name)
					this.shadowRoot.querySelector("[type=checkbox]")[name] = true
				}else{
					this.shadowRoot.getElementById("checkbox-content").classList.remove(name)
					this.shadowRoot.querySelector("[type=checkbox]")[name] = false
				}
				break
			case "checked": 
				let checked = newValue == "checked" || newValue === ""
				this.shadowRoot.querySelector("checkbox").checked = checked
				this.ariaChecked = checked

				break
		}
	}
}


customElements.define("nu-checkbox", NuCheckboxElement)
