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
 * @attribute nonce The nonce attribute used in both time inputs
 * 
 */
class NuTimeRangeElement extends HTMLElement{
	#form = null
	#formDataEventHandler = null
	toString(){return `[object NuTimeRangeElement]`}
	static get observedAttributes() {
		return [
			"start-name", "end-name", "start-value", "end-value",
			"classes", "styles",
			"disabled", "readonly",
			"nonce",
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
	set disabled(d){
		if(d === true || d === 1 || (("string" == typeof d) && d.toLowerCase() == "disabled") ){
			this.setAttribute("disabled", "disabled")
		}else{
			this.removeAttribute("disabled")
		}
	}

	set readonly(r){
		if(r === true || r === 1 || (("string" == typeof r) && r.toLowerCase() == "readonly") ){
			this.setAttribute("readonly", "readonly")
		}else{
			this.removeAttribute("readonly")
		}
	}

	get disabled(){
		return this.getAttribute("disabled") != null && (this.getAttribute("disabled") === "" || (this.getAttribute("disabled") || "").toLowerCase() == "disabled")
	}
	get readonly(){
		return this.getAttribute("readonly") != null && (this.getAttribute("readonly") === "" || (this.getAttribute("readonly") || "").toLowerCase() == "readonly")
	}
	set nonce(n){
		this.setAttribute("nonce", "n")
	}
	get nonce(){
		return this.getAttribute("nonce")
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
			case "readonly":
			case "disabled":
				this.shadowRoot.getElementById("start").setAttribute(name, newValue)
				this.shadowRoot.getElementById("end").setAttribute(name, newValue)
				break
			case "nonce":
				this.shadowRoot.querySelectorAll("style, script, nu-time-input").forEach(function(elem){
					elem.setAttribute("nonce", newValue)
				})
				break
		}
	}

	connectedCallback(){
		let elm = this
		this.#formDataEventHandler = function(e){
			if(e instanceof FormDataEvent){
				if(elm.startName && elm.endName){
					e.formData.append(elm.startName, elm.startValue)
					e.formData.append(elm.endName, elm.endValue)
				}
			}
		}
		let a = this
		while (a) {
			a = a.parentNode
			
			if(!a){
				break
			}
			if (a.tagName == "FORM"){
				this.#form = a
				a.addEventListener("formdata", this.#formDataEventHandler)
				break
			}
		}
	}
	disconnectedCallback(){
		if(!this.#form){
			return
		}
		this.#form.removeEventListener("formdata", this.#formDataEventHandler)
	}
}

customElements.define("nu-time-input-group", NuTimeRangeElement)
