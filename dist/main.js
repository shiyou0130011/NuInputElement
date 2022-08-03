(()=>{"use strict";var t={659:()=>{class t extends HTMLElement{#t=null;#e=null;toString(){return"[object NuInputElement]"}connectedCallback(){let t=this;this.#e=function(e){e.formData.append(t.name,t.value)};let e=this;for(;e&&(e=e.parentNode,e);)if("FORM"==e.tagName){this.#t=e,e.addEventListener("formdata",this.#e);break}}disconnectedCallback(){this.#t&&this.#t.removeEventListener("formdata",this.#e)}}customElements.define("nu-time-input",class extends t{toString(){return"[object NuTimeInputElement]"}constructor(){super();let t=this.attachShadow({mode:"open"}),e=document.createElement("template");e.innerHTML='\n\t\t<style>\n\t\t\t:host{\n\t\t\t\t--selection-selected-bg-color: rgb(0, 117, 155);\n\t\t\t\t--selection-selected-color: white;\n\t\t\t\t--selection-hover-bg-color: rgb(178, 213, 255);\n\t\t\t\t--selection-hover-color: white;\n\t\t\t\twriting-mode: horizontal-tb;\n\t\t\t\ttext-rendering: auto;\n\t\t\t\tletter-spacing: normal;\n\t\t\t\tword-spacing: normal;\n\t\t\t\tline-height: normal;\n\t\t\t\ttext-transform: none;\n\t\t\t\ttext-indent: 0px;\n\t\t\t\ttext-shadow: none;\n\t\t\t\ttext-align: start;\n\t\t\t\tappearance: auto;\n\t\t\t\tbackground-color: field;\n\t\t\t\tmargin: 0em;\n\t\t\t\tpadding: 1px 2px;\n\t\t\t\tborder-width: 2px;\n\t\t\t\tborder-style: inset;\n\t\t\t\tborder-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tcursor: default;\n\t\t\t}\n\t\t\t#main{\n\t\t\t\tposition: relative;\n\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\t\t\t#hour, #minutes{\n\t\t\t\tborder-style: hidden;\n\t\t\t\tborder-width: 0;\n\t\t\t\toutline-style: none;\n\t\t\t\toutline-width: 0;\n\t\t\t\twidth: 1.2em;\n\t\t\t}\n\t\t\t#time-colon{\n\t\t\t\tpadding: 0 .25em;\n\t\t\t}\n\t\t\t#time-select-icon{\n\t\t\t\tfont-size: 80%;\n\t\t\t}\n\t\t\t#time-select{\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 100%;\n\t\t\t\tleft: 0;\n\t\t\t\tbackground-color: white;\n\t\t\t\tmax-height: 12rem;\n\t\t\t\tjustify-content: space-around;\n\t\t\t}\n\t\t\t#time-select[data-hide=true]{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t#time-select[data-hide=false]{\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\t\t\t#hour-selection, #minute-selection{\n\t\t\t\toverflow-y: scroll;\n\t\t\t\twidth: 8rem;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t\t.select-option{\n\t\t\t\theight: 1rem;\n\t\t\t\tpadding-top: .5rem;\n\t\t\t\tpadding-bottom: .5rem;\n\t\t\t}\n\t\t\t.select-option:hover{\n\t\t\t\tbackground-color: var(--selection-hover-bg-color);\n\t\t\t\tcolor: var(--selection-hover-color);\n\t\t\t}\n\t\t\t.select-option.selected, .select-option.selected:hover{\n\t\t\t\tbackground-color: var(--selection-selected-bg-color);\n\t\t\t\tcolor: var(--selection-selected-color);\n\t\t\t\tfont-weight: bolder\n\t\t\t}\n\t\t</style>\n\t\t<div id="main">\n\t\t\t<input id="hour" placeholder="- -" maxlength="2" data-max="24" data-min="0"/>\n\t\t\t<span id="time-colon">:</span>\n\t\t\t<input id="minutes" placeholder="- -" maxlength="2" data-max="60" data-min="0"/>\n\t\t\t<span id="time-select-icon">&#x1F551;</span>\n\t\t\t\x3c!-- time select --\x3e\n\t\t\t<div id="time-select" data-hide="true">\n\t\t\t\t<div id="hour-selection"></div>\n\t\t\t\t<div id="minute-selection"></div>\n\t\t\t</div>\n\t\t</div>\t\n\t\t',t.appendChild(document.importNode(e.content,!0));for(let e=0;e<24;e++){let n=document.createElement("div");n.innerHTML=`000${e}`.substr(-2),n.dataset.value=e,n.dataset.textValue=`000${e}`.substr(-2),n.classList.add("select-option"),t.querySelector("#hour-selection").appendChild(n)}for(let e=0;e<60;e++){let n=document.createElement("div");n.innerHTML=`000${e}`.substr(-2),n.dataset.value=e,n.dataset.textValue=`000${e}`.substr(-2),n.classList.add("select-option"),t.querySelector("#minute-selection").appendChild(n)}this.addEventListener("focusout",(function(t){})),t.querySelectorAll("input").forEach((function(e){e.addEventListener("input",(function(){console.log(this.value),this.value=this.value.replace(/[^\d]/g,"")})),e.addEventListener("focusout",(function(){this.value=("000"+this.value).substr(-2)})),e.addEventListener("keydown",(function(e){let n=Number(this.value);switch(e.keyCode){case 38:this.value=n+1;break;case 40:this.value=n-1;break;case 37:return void("minutes"==this.id&&0==this.selectionStart&&(t.getElementById("hour").focus(),t.getElementById("hour").selectionStart=-1,t.getElementById("hour").selectionEnd=-1));case 39:"hour"==this.id&&2==this.selectionStart&&(t.getElementById("minutes").selectionStart=0,t.getElementById("minutes").selectionEnd=0,t.getElementById("minutes").focus());default:return}let o=new Date((new Date).setHours(Number(t.getElementById("hour").value),Number(t.getElementById("minutes").value)));t.getElementById("hour").value=("00"+o.getHours()).substr(-2),t.getElementById("minutes").value=("00"+o.getMinutes()).substr(-2),t.getElementById("hour").dispatchEvent(new CustomEvent("updateselect")),t.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"))}))})),t.querySelector("#hour").addEventListener("updateselect",(function(){let e=this.value;t.querySelector("#hour-selection").scroll(0,t.querySelector(`#hour-selection .select-option[data-text-value="${e}"], #hour-selection .select-option[data-value="${e}"]`)?.offsetTop),t.querySelectorAll("#hour-selection .select-option").forEach((function(t){t.dataset.value==e||t.dataset.textValue==e?t.classList.add("selected"):t.classList.remove("selected")}))})),t.querySelector("#minutes").addEventListener("updateselect",(function(){let e=this.value;t.querySelector("#minute-selection").scroll(0,t.querySelector(`#minute-selection .select-option[data-text-value="${e}"], #minute-selection .select-option[data-value="${e}"]`)?.offsetTop),t.querySelectorAll("#minute-selection .select-option").forEach((function(t){t.dataset.value==e||t.dataset.textValue==e?t.classList.add("selected"):t.classList.remove("selected")}))})),t.querySelector("#time-select-icon").addEventListener("click",(function(){let e=t.querySelector("#time-select").dataset.hide;t.querySelector("#time-select").dataset.hide=!JSON.parse(e),t.getElementById("hour").dispatchEvent(new CustomEvent("updateselect")),t.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"))})),t.querySelectorAll("#hour-selection .select-option").forEach((function(e){e.addEventListener("click",(function(){t.querySelector("#time-select").dataset.hide=!0,t.getElementById("hour").value=this.innerText,t.getElementById("hour").dispatchEvent(new CustomEvent("input"))}))})),t.querySelectorAll("#minute-selection .select-option").forEach((function(e){e.addEventListener("click",(function(){t.querySelector("#time-select").dataset.hide=!0,t.getElementById("minutes").value=this.innerText,t.getElementById("minutes").dispatchEvent(new CustomEvent("input"))}))}))}get value(){let t=this.shadowRoot;return`${t.getElementById("hour").value||"00"}:${t.getElementById("minutes").value||"00"}`}set value(t){Date,this.setAttribute("value",t)}get name(){return this.getAttribute("name")}set value(t){this.setAttribute("name",t)}static get observedAttributes(){return["name","value","max","min"]}get valueAsNumber(){let t=this.shadowRoot;return new Date(0).setUTCHours(t.getElementById("hour").value||0,t.getElementById("minutes").value||0)}set valueAsNumber(t){if("number"!=typeof t)throw"the value of valueAsDate should be number";let e=this.shadowRoot,n=new Date(t);e.getElementById("hour").value=`000${n.getHours()}`.substr(-2),e.getElementById("minutes").value=`000${n.getMinutes()}`.substr(-2)}get valueAsDate(){return new Date(this.valueAsNumber)}set valueAsDate(t){if(!(t instanceof Date))throw"the value of valueAsDate should be Date object";let e=this.shadowRoot;e.getElementById("hour").value=`000${t.getHours()}`.substr(-2),e.getElementById("minutes").value=`000${t.getMinutes()}`.substr(-2)}attributeChangedCallback(t,e,n){switch(t){case"value":if(n.match(/\d{2}:\d{2}/g)){let t=n.match(/\d{2}:\d{2}/g)[0].split(":");this.shadowRoot.getElementById("hour").value=t[0],this.shadowRoot.getElementById("minutes").value=t[1]}break;case"max":case"min":n.match(/\d{2}:\d{2}/g)}}})}},e={};!function n(o){var l=e[o];if(void 0!==l)return l.exports;var s=e[o]={exports:{}};return t[o](s,s.exports,n),s.exports}(659)})();
//# sourceMappingURL=main.js.map