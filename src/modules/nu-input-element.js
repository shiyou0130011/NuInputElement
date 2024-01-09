export class NuInputElement extends HTMLElement{
	#form = null
	#formDataEventHandler = null

	constructor() {
		super()
		this.role = "input"
	}
	
	static get observedAttributes() {
		return ["name", "value", "disabled", "readonly", "nonce"]
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

	
	toString(){return `[object NuInputElement]`}
	connectedCallback(){
		let elm = this
		this.#formDataEventHandler = function(e){
			if(e instanceof FormDataEvent){
				e.formData.append(elm.name, elm.value)
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

	attributeChangedCallback(name, oldValue, newValue){
		switch(name){
			case "nonce":
				this.shadowRoot.querySelectorAll("style, script").forEach(function(elem){
					elem.setAttribute("nonce", newValue)
				})
				break
		}
	}
}
