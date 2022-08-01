import {NuInputElement} from "./modules/nu-input-element.js"
class NuTimeInputElement extends NuInputElement{
	toString(){return `[object ${this.constructor.name}]`}
	constructor() {
		super()
		let shadowRoot = this.attachShadow({mode: 'open'})
		let temp = document.createElement("template")
		temp.innerHTML =`
		<style>
			:host{
				--selection-selected-bg-color: rgb(0, 117, 155);
				--selection-selected-color: white;
				--selection-hover-bg-color: rgb(178, 213, 255);
				--selection-hover-color: white;
				writing-mode: horizontal-tb;
				text-rendering: auto;
				letter-spacing: normal;
				word-spacing: normal;
				line-height: normal;
				text-transform: none;
				text-indent: 0px;
				text-shadow: none;
				text-align: start;
				appearance: auto;
				background-color: field;
				margin: 0em;
				padding: 1px 2px;
				border-width: 2px;
				border-style: inset;
				border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
				display: inline-block;
				cursor: default;
			}
			#main{
				position: relative;
			}
			#hour, #minutes{
				border-style: hidden;
				border-width: 0;
				outline-style: none;
				outline-width: 0;
				width: 1.2em;
			}
			#clock{
				font-size: 80%;
			}
			#time-select{
				position: absolute;
				top: 100%;
				left: 0;
				background-color: white;
				max-height: 12rem;
				justify-content: space-around;
			}
			#time-select[data-hide=true]{
				display: none;
			}
			#time-select[data-hide=false]{
				display: flex;
			}
			#hour-selection, #minute-selection{
				overflow-y: scroll;
				width: 8rem;
				text-align: center;
			}
			.select-option{
				height: 1rem;
				padding-top: .5rem;
				padding-bottom: .5rem;
			}
			.select-option:hover{
				background-color: var(--selection-hover-bg-color);
				color: var(--selection-hover-color);
			}
			.select-option.selected, .select-option.selected:hover{
				background-color: var(--selection-selected-bg-color);
				color: var(--selection-selected-color);
				font-weight: bolder
			}
		</style>
		<div id="main">
			<input id="hour" placeholder="- -" maxlength="2" data-max="24" data-min="0"/>
			<span>:</span>
			<input id="minutes" placeholder="- -" maxlength="2" data-max="60" data-min="0"/>
			<span id="clock">&#x1F551;</span>
			<!-- time select -->
			<div id="time-select" data-hide="true">
				<div id="hour-selection"></div>
				<div id="minute-selection"></div>
			</div>
		</div>	
		`
		shadowRoot.appendChild(document.importNode(temp.content, true))
		for(let i = 0; i < 24; i++){
			let elm = document.createElement("div")
			elm.innerHTML = `000${i}`.substr(-2)
			elm.dataset.value = i
			elm.dataset.textValue = `000${i}`.substr(-2)
			elm.classList.add("select-option")
			shadowRoot.querySelector("#hour-selection").appendChild(elm)
		}
		for(let i = 0; i < 60; i++){
			let elm = document.createElement("div")
			elm.innerHTML = `000${i}`.substr(-2)
			elm.dataset.value = i
			elm.dataset.textValue = `000${i}`.substr(-2)
			elm.classList.add("select-option")
			shadowRoot.querySelector("#minute-selection").appendChild(elm)
		}

		/*
		 * Handle Event
		 * ********************************/

		this.addEventListener("focusout", function(e){
		})
		shadowRoot.querySelectorAll("input").forEach(function(input){
			input.addEventListener("input", function(){
				console.log(this.value)
				this.value = this.value.replace(/[^\d]/g, "")
			})
			input.addEventListener("focusout", function(){
				this.value = ("000" + this.value).substr(-2)
			})
			input.addEventListener("keydown", function(e){
				let value = Number(this.value)
				switch(e.keyCode){
					case 38: // up key
						this.value = value + 1
						break
					case 40: // down key
						this.value = value - 1
						break
					case 37: // left key
						if(this.id == "minutes" && this.selectionStart == 0){
							shadowRoot.getElementById("hour").focus()
							shadowRoot.getElementById("hour").selectionStart = -1
							shadowRoot.getElementById("hour").selectionEnd = -1
						}
						return

					case 39: // right key
						if(this.id == "hour" && this.selectionStart == 2){
							shadowRoot.getElementById("minutes").selectionStart = 0
							shadowRoot.getElementById("minutes").selectionEnd = 0
							shadowRoot.getElementById("minutes").focus()
						}
					default:
						return
				}
				let d = new Date((new Date).setHours(
					Number(shadowRoot.getElementById("hour").value),
					Number(shadowRoot.getElementById("minutes").value)
				))

				shadowRoot.getElementById("hour").value = ("00" + d.getHours()).substr(-2)
				shadowRoot.getElementById("minutes").value = ("00" + d.getMinutes()).substr(-2)
				shadowRoot.getElementById("hour").dispatchEvent(new CustomEvent("updateselect"))
				shadowRoot.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"))
			})
		})

		shadowRoot.querySelector("#hour").addEventListener("updateselect", function(){
			let h = this.value
			shadowRoot.querySelector("#hour-selection").scroll(
				0, 
				shadowRoot.querySelector(`#hour-selection .select-option[data-text-value="${h}"], #hour-selection .select-option[data-value="${h}"]`)?.offsetTop
			)


			shadowRoot.querySelectorAll("#hour-selection .select-option").forEach(function(elm){
				if(elm.dataset.value == h || elm.dataset.textValue == h){
					elm.classList.add("selected")
				}else{
					elm.classList.remove("selected")
				}
			})
		})
		shadowRoot.querySelector("#minutes").addEventListener("updateselect", function(){
			let h = this.value
			shadowRoot.querySelector("#minute-selection").scroll(
				0, 
				shadowRoot.querySelector(`#minute-selection .select-option[data-text-value="${h}"], #minute-selection .select-option[data-value="${h}"]`)?.offsetTop
			)

			shadowRoot.querySelectorAll("#minute-selection .select-option").forEach(function(elm){
				if(elm.dataset.value == h || elm.dataset.textValue == h){
					elm.classList.add("selected")
				}else{
					elm.classList.remove("selected")
				}
			})

		})


		shadowRoot.querySelector("#clock").addEventListener("click", function(){
			let display = shadowRoot.querySelector("#time-select").dataset.hide
			shadowRoot.querySelector("#time-select").dataset.hide = !JSON.parse(display)
			shadowRoot.getElementById("hour").dispatchEvent(new CustomEvent("updateselect"))
			shadowRoot.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"))
		})
		shadowRoot.querySelectorAll("#hour-selection .select-option").forEach(function(opt){
			opt.addEventListener("click", function(){
				shadowRoot.querySelector("#time-select").dataset.hide = !0
				shadowRoot.getElementById("hour").value = this.innerText
				shadowRoot.getElementById("hour").dispatchEvent(new CustomEvent("input"))
			})
		})
		shadowRoot.querySelectorAll("#minute-selection .select-option").forEach(function(opt){
			opt.addEventListener("click", function(){
				shadowRoot.querySelector("#time-select").dataset.hide = !0
				shadowRoot.getElementById("minutes").value = this.innerText
				shadowRoot.getElementById("minutes").dispatchEvent(new CustomEvent("input"))
			})
		})
	}

	get value(){
		let shadowRoot = this.shadowRoot
		return `${shadowRoot.getElementById("hour").value || "00"}:${shadowRoot.getElementById("minutes").value  || "00"}`
	}
	set value(data){
		if(data instanceof Date){

		}
		this.setAttribute("value", data)
	}
	get name(){
		return this.getAttribute("name")
	}
	set value(data){
		this.setAttribute("name", data)
	}

	static get observedAttributes() {
		return ["name", "value", "max", "min"]
	}
	get valueAsNumber(){
		let shadowRoot = this.shadowRoot
		return new Date(0).setUTCHours(
			shadowRoot.getElementById("hour").value || 0, 
			shadowRoot.getElementById("minutes").value || 0
		)
	}
	set valueAsNumber(timestamp){
		if (typeof timestamp != "number"){
			throw "the value of valueAsDate should be number"
		}
		let shadowRoot = this.shadowRoot
		let d = new Date(timestamp)
		shadowRoot.getElementById("hour").value = `000${d.getHours()}`.substr(-2)
		shadowRoot.getElementById("minutes").value = `000${d.getMinutes()}`.substr(-2)
	}
	get valueAsDate(){
		return new Date(this.valueAsNumber)
	}
	set valueAsDate(timestamp){
		if (!(timestamp instanceof Date)){
			throw "the value of valueAsDate should be Date object"
		}
		let shadowRoot = this.shadowRoot
		shadowRoot.getElementById("hour").value = `000${timestamp.getHours()}`.substr(-2)
		shadowRoot.getElementById("minutes").value = `000${timestamp.getMinutes()}`.substr(-2)

	}


	attributeChangedCallback(name, oldValue, newValue){
		switch(name){
			case "value":
				if(newValue.match(/\d{2}:\d{2}/g)){
					let timeDatas = newValue.match(/\d{2}:\d{2}/g)[0].split(":")

					this.shadowRoot.getElementById("hour").value = timeDatas[0]
					this.shadowRoot.getElementById("minutes").value = timeDatas[1]
				}
				break
			case "max":
				if(newValue.match(/\d{2}:\d{2}/g)){
				}
				break
			case "min":
				if(newValue.match(/\d{2}:\d{2}/g)){
				}
				break

		}
	}
}

customElements.define("nu-time-input", NuTimeInputElement)