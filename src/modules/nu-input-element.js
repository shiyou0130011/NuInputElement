export class NuInputElement extends HTMLElement{
	#form = null
	#formDataEventHandler = null
	toString(){return `[object NuInputElement]`}
	connectedCallback(){
		let elm = this
		this.#formDataEventHandler = function(e){
			e.formData.append(elm.name, elm.value)
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
