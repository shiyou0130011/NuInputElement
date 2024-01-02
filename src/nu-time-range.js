import "./nu-time-input.js"
/**
 * @element nu-time-input-group
 * @slot before
 * @slot center the block between 2 time inputs. Default is <span>~</span>
 * @slot after the block after the end time
 * 
 * @attribute start-name
 * @attribute end-name 
 * @attribute start-value
 * @attribute end-value
 * @attribute classes the class used in both time inputs
 * @attribute styles the CSS styles used in both time inputs
 * 
 */
class NuTimeRangeElement extends HTMLElement{
	toString(){return `[object NuTimeRangeElement]`}
	static get observedAttributes() {
		return [
			"start-name", "end-name", "start-value", "end-value",
			"classes", "styles"
		]
	}
	constructor() {
		super()
		let currentElement = this
		let shadowRoot = this.attachShadow({mode: 'open'})
		let temp = document.createElement("template")
		temp.innerHTML = `
			<style>
				:host{
					--selection-selected-bg-color: rgb(0, 117, 155);
					--selection-selected-color: white;
					--selection-hover-bg-color: rgb(178, 213, 255);
					--selection-hover-color: white;
					color: #333;

				}
				div{
					display: inline-flex
				}
			</style>
			<div>
				<slot id="before"></slot>
				<nu-time-input id="start" value="00:00"></nu-time-input>
				<slot name="center"><span>~</span></slot>
				<nu-time-input id="end" value="00:00"></nu-time-input>
				<slot id="after"></slot>
			</div>
		`;
		shadowRoot.appendChild(document.importNode(temp.content, true))
	}

	get startName(){
		return this.shadowRoot.getElementById("start").name
	}
	set startName(value){
		this.setAttribute("start-name", value)
	}
	get endName(){
		return this.shadowRoot.getElementById("end").name
	}
	set endName(value){
		this.setAttribute("end-name", value)
	}
	get startValue(){
		return this.shadowRoot.getElementById("start").value
	}
	set startValue(value){
		this.setAttribute("start-value", value)
	}
	get endValue(){
		return this.shadowRoot.getElementById("end").value
	}
	set endValue(value){
		this.setAttribute("end-name", value)
	}
	


	attributeChangedCallback(name, oldValue, newValue){
		switch(name){
			case "start-name":
				this.shadowRoot.getElementById("start").setAttribute("name", newValue)
				break
			case "end-name":
				this.shadowRoot.getElementById("end").setAttribute("name", newValue)
				break
			case "start-value":
				if((newValue + "").match(/\d{2}:\d{2}/)){
					this.shadowRoot.getElementById("start").value = newValue
					this.shadowRoot.getElementById("end").min = newValue
				}
				break 
			case "end-value":
				if((newValue + "").match(/\d{2}:\d{2}/)){
					this.shadowRoot.getElementById("end").value = newValue
				}
				break
			case "classes": 
				this.shadowRoot.getElementById("start").className = newValue
				this.shadowRoot.getElementById("end").className = newValue
				break
			case "styles": 
				this.shadowRoot.getElementById("start").cssText = newValue
				this.shadowRoot.getElementById("end").cssText = newValue
				break
		}
	}

	connectedCallback(){
	}
	disconnectedCallback(){
	}
}

customElements.define("nu-time-input-group", NuTimeRangeElement)