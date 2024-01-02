(()=>{"use strict";var t={659:()=>{class t extends HTMLElement{#t=null;#e=null;static get observedAttributes(){return["name","value","disabled","readonly"]}set disabled(t){!0===t||1===t||"string"==typeof t&&"disabled"==t.toLowerCase()?this.setAttribute("disabled","disabled"):this.removeAttribute("disabled")}set readonly(t){!0===t||1===t||"string"==typeof t&&"readonly"==t.toLowerCase()?this.setAttribute("readonly","readonly"):this.removeAttribute("readonly")}get disabled(){return null!=this.getAttribute("disabled")&&(""===this.getAttribute("disabled")||"disabled"==(this.getAttribute("disabled")||"").toLowerCase())}get readonly(){return null!=this.getAttribute("readonly")&&(""===this.getAttribute("readonly")||"readonly"==(this.getAttribute("readonly")||"").toLowerCase())}toString(){return"[object NuInputElement]"}connectedCallback(){let t=this;this.#e=function(e){e.formData.append(t.name,t.value)};let e=this;for(;e&&(e=e.parentNode,e);)if("FORM"==e.tagName){this.#t=e,e.addEventListener("formdata",this.#e);break}}disconnectedCallback(){this.#t&&this.#t.removeEventListener("formdata",this.#e)}}customElements.define("nu-time-input",class extends t{toString(){return"[object NuTimeInputElement]"}constructor(){super();let t=this,e=this.attachShadow({mode:"open"}),n=document.createElement("template");n.innerHTML='\n\t\t<style>\n\t\t\t:host{\n\t\t\t\t--selection-selected-bg-color: rgb(0, 117, 155);\n\t\t\t\t--selection-selected-color: white;\n\t\t\t\t--selection-hover-bg-color: rgb(178, 213, 255);\n\t\t\t\t--selection-hover-color: white;\n\t\t\t\twriting-mode: horizontal-tb;\n\t\t\t\ttext-rendering: auto;\n\t\t\t\tletter-spacing: normal;\n\t\t\t\tword-spacing: normal;\n\t\t\t\tline-height: normal;\n\t\t\t\ttext-transform: none;\n\t\t\t\ttext-indent: 0px;\n\t\t\t\ttext-shadow: none;\n\t\t\t\ttext-align: start;\n\t\t\t\tappearance: auto;\n\t\t\t\tbackground-color: field;\n\t\t\t\tmargin: 0em;\n\t\t\t\tpadding: 1px 2px;\n\t\t\t\tborder-width: 2px;\n\t\t\t\tborder-style: inset;\n\t\t\t\tborder-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tcursor: default;\n\t\t\t}\n\t\t\t#main #mask{\n\t\t\t\tdisplay: none\n\t\t\t}\n\t\t\t#main.disabled{\n\t\t\t\tposition: relative\n\t\t\t}\n\t\t\t#main.disabled #mask, #main.readonly #mask{\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\n\t\t\t\tdisplay: block;\n\n\t\t\t\tposition: absolute;\n\t\t\t}\n\t\t\t#main.disabled #mask{\n\t\t\t\tbackground-color: rgba(153, 153, 153, .75);\n\t\t\t}\n\t\t\t#main.readonly #mask{\n\t\t\t\tbackground-color: rgba(245, 245, 245, .75);\n\t\t\t}\n\n\t\t\t#main{\n\t\t\t\tposition: relative;\n\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\t\t\t#hour, #minutes{\n\t\t\t\tborder-style: hidden;\n\t\t\t\tborder-width: 0;\n\t\t\t\toutline-style: none;\n\t\t\t\toutline-width: 0;\n\t\t\t\twidth: 1.2em;\n\t\t\t}\n\t\t\t#time-colon{\n\t\t\t\tpadding: 0 .25em;\n\t\t\t}\n\t\t\t#time-select-icon{\n\t\t\t\tfont-size: 80%;\n\t\t\t}\n\t\t\t#time-select{\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 100%;\n\t\t\t\tleft: 0;\n\t\t\t\t\n\t\t\t\tmax-height: 12rem;\n\t\t\t\tjustify-content: space-around;\n\t\t\t\t\n\t\t\t\tbackground-color: white;\n\t\t\t\tbox-shadow: 1px 1px 6px #999;\n\t\t\t}\n\t\t\t#time-select[data-hide=true]{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t#time-select[data-hide=false]{\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\t\t\t#hour-selection, #minute-selection{\n\t\t\t\toverflow-y: scroll;\n\t\t\t\twidth: 8rem;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t\t.select-option{\n\t\t\t\theight: 1rem;\n\t\t\t\tpadding-top: .5rem;\n\t\t\t\tpadding-bottom: .5rem;\n\t\t\t}\n\t\t\t.select-option:hover{\n\t\t\t\tbackground-color: var(--selection-hover-bg-color);\n\t\t\t\tcolor: var(--selection-hover-color);\n\t\t\t}\n\t\t\t.select-option.selected, .select-option.selected:hover{\n\t\t\t\tbackground-color: var(--selection-selected-bg-color);\n\t\t\t\tcolor: var(--selection-selected-color);\n\t\t\t\tfont-weight: bolder\n\t\t\t}\n\t\t</style>\n\t\t<div id="main">\n\t\t\t<input id="hour" placeholder="- -" maxlength="2" data-max="24" data-min="0"/>\n\t\t\t<span id="time-colon">:</span>\n\t\t\t<input id="minutes" placeholder="- -" maxlength="2" data-max="60" data-min="0"/>\n\t\t\t<div id="time-select-icon"><slot name="select-icon">&#x1F551;</slot></div>\n\t\t\t\x3c!-- time select --\x3e\n\t\t\t<div id="time-select" data-hide="true">\n\t\t\t\t<div id="hour-selection"></div>\n\t\t\t\t<div id="minute-selection"></div>\n\t\t\t</div>\n\t\t\t<div id="mask"></div>\n\t\t</div>\t\n\t\t',e.appendChild(document.importNode(n.content,!0));for(let t=0;t<24;t++){let n=document.createElement("div");n.innerHTML=`000${t}`.substr(-2),n.dataset.value=t,n.dataset.textValue=`000${t}`.substr(-2),n.classList.add("select-option"),e.querySelector("#hour-selection").appendChild(n)}for(let t=0;t<60;t++){let n=document.createElement("div");n.innerHTML=`000${t}`.substr(-2),n.dataset.value=t,n.dataset.textValue=`000${t}`.substr(-2),n.classList.add("select-option"),e.querySelector("#minute-selection").appendChild(n)}this.addEventListener("focusout",(function(t){})),e.querySelectorAll("input").forEach((function(t){t.addEventListener("input",(function(){this.value=this.value.replace(/[^\d]/g,"")})),t.addEventListener("focusout",(function(){this.value=("000"+this.value).substr(-2)})),t.addEventListener("keydown",(function(t){let n=Number(this.value);switch(t.keyCode){case 38:this.value=n+1;break;case 40:this.value=n-1;break;case 37:return void("minutes"==this.id&&0==this.selectionStart&&(e.getElementById("hour").focus(),e.getElementById("hour").selectionStart=-1,e.getElementById("hour").selectionEnd=-1));case 39:"hour"==this.id&&2==this.selectionStart&&(e.getElementById("minutes").selectionStart=0,e.getElementById("minutes").selectionEnd=0,e.getElementById("minutes").focus());default:return}let s=new Date((new Date).setHours(Number(e.getElementById("hour").value),Number(e.getElementById("minutes").value)));e.getElementById("hour").value=("00"+s.getHours()).substr(-2),e.getElementById("minutes").value=("00"+s.getMinutes()).substr(-2),e.getElementById("hour").dispatchEvent(new CustomEvent("updateselect")),e.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"))}))})),e.querySelector("#hour").addEventListener("updateselect",(function(){let t=this.value;e.querySelector("#hour-selection").scroll(0,e.querySelector(`#hour-selection .select-option[data-text-value="${t}"], #hour-selection .select-option[data-value="${t}"]`)?.offsetTop),e.querySelectorAll("#hour-selection .select-option").forEach((function(e){e.dataset.value==t||e.dataset.textValue==t?e.classList.add("selected"):e.classList.remove("selected")}))})),e.querySelector("#minutes").addEventListener("updateselect",(function(){let t=this.value;e.querySelector("#minute-selection").scroll(0,e.querySelector(`#minute-selection .select-option[data-text-value="${t}"], #minute-selection .select-option[data-value="${t}"]`)?.offsetTop),e.querySelectorAll("#minute-selection .select-option").forEach((function(e){e.dataset.value==t||e.dataset.textValue==t?e.classList.add("selected"):e.classList.remove("selected")}))})),e.querySelector("#time-select-icon").addEventListener("click",(function(){if(t.disabled||t.readonly)return!1;let n=e.querySelector("#time-select").dataset.hide;e.querySelector("#time-select").dataset.hide=!JSON.parse(n),e.getElementById("hour").dispatchEvent(new CustomEvent("updateselect")),e.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"))})),e.querySelectorAll("#hour-selection .select-option").forEach((function(n){n.addEventListener("click",(function(){if(t.disabled||t.readonly)return!1;e.querySelector("#time-select").dataset.hide=!0,e.getElementById("hour").value=this.innerText,e.getElementById("hour").dispatchEvent(new CustomEvent("input"))}))})),e.querySelectorAll("#minute-selection .select-option").forEach((function(n){n.addEventListener("click",(function(){if(t.disabled||t.readonly)return!1;e.querySelector("#time-select").dataset.hide=!0,e.getElementById("minutes").value=this.innerText,e.getElementById("minutes").dispatchEvent(new CustomEvent("input"))}))}))}get value(){let t=this.shadowRoot;return`${t.getElementById("hour").value||"00"}:${t.getElementById("minutes").value||"00"}`}set value(t){Date,this.setAttribute("value",t)}get name(){return this.getAttribute("name")}set value(t){this.setAttribute("name",t)}static get observedAttributes(){return[...super.observedAttributes,"max","min"]}get valueAsNumber(){let t=this.shadowRoot;return new Date(0).setUTCHours(t.getElementById("hour").value||0,t.getElementById("minutes").value||0)}set valueAsNumber(t){if("number"!=typeof t)throw"the value of valueAsDate should be number";let e=this.shadowRoot,n=new Date(t);e.getElementById("hour").value=`000${n.getHours()}`.substr(-2),e.getElementById("minutes").value=`000${n.getMinutes()}`.substr(-2)}get valueAsDate(){return new Date(this.valueAsNumber)}set valueAsDate(t){if(!(t instanceof Date))throw"the value of valueAsDate should be Date object";let e=this.shadowRoot;e.getElementById("hour").value=`000${t.getHours()}`.substr(-2),e.getElementById("minutes").value=`000${t.getMinutes()}`.substr(-2)}attributeChangedCallback(t,e,n){switch(t){case"disabled":case"readonly":""===n||(n||"").toLowerCase()==t.toLowerCase()?this.shadowRoot.getElementById("main").classList.add(t):this.shadowRoot.getElementById("main").classList.remove(t);break;case"value":if(n.match(/\d{2}:\d{2}/g)){let t=n.match(/\d{2}:\d{2}/g)[0].split(":");this.shadowRoot.getElementById("hour").value=t[0],this.shadowRoot.getElementById("minutes").value=t[1]}break;case"max":case"min":n.match(/\d{2}:\d{2}/g)}}})},155:(t,e,n)=>{n(659);class s extends HTMLElement{toString(){return"[object NuTimeRangeElement]"}static get observedAttributes(){return["start-name","end-name","start-value","end-value","classes","styles"]}constructor(){super();let t=this.attachShadow({mode:"open"}),e=document.createElement("template");e.innerHTML='\n\t\t\t<style>\n\t\t\t\t:host{\n\t\t\t\t\t--selection-selected-bg-color: rgb(0, 117, 155);\n\t\t\t\t\t--selection-selected-color: white;\n\t\t\t\t\t--selection-hover-bg-color: rgb(178, 213, 255);\n\t\t\t\t\t--selection-hover-color: white;\n\t\t\t\t\tcolor: #333;\n\n\t\t\t\t}\n\t\t\t\tdiv{\n\t\t\t\t\tdisplay: inline-flex\n\t\t\t\t}\n\t\t\t</style>\n\t\t\t<div>\n\t\t\t\t<slot id="before"></slot>\n\t\t\t\t<nu-time-input id="start" value="00:00"></nu-time-input>\n\t\t\t\t<slot name="center"><span>~</span></slot>\n\t\t\t\t<nu-time-input id="end" value="00:00"></nu-time-input>\n\t\t\t\t<slot id="after"></slot>\n\t\t\t</div>\n\t\t',t.appendChild(document.importNode(e.content,!0))}get startName(){return this.shadowRoot.getElementById("start").name}set startName(t){this.setAttribute("start-name",t)}get endName(){return this.shadowRoot.getElementById("end").name}set endName(t){this.setAttribute("end-name",t)}get startValue(){return this.shadowRoot.getElementById("start").value}set startValue(t){this.setAttribute("start-value",t)}get endValue(){return this.shadowRoot.getElementById("end").value}set endValue(t){this.setAttribute("end-name",t)}attributeChangedCallback(t,e,n){switch(t){case"start-name":this.shadowRoot.getElementById("start").setAttribute("name",n);break;case"end-name":this.shadowRoot.getElementById("end").setAttribute("name",n);break;case"start-value":(n+"").match(/\d{2}:\d{2}/)&&(this.shadowRoot.getElementById("start").value=n,this.shadowRoot.getElementById("end").min=n);break;case"end-value":(n+"").match(/\d{2}:\d{2}/)&&(this.shadowRoot.getElementById("end").value=n);break;case"classes":this.shadowRoot.getElementById("start").className=n,this.shadowRoot.getElementById("end").className=n;break;case"styles":this.shadowRoot.getElementById("start").cssText=n,this.shadowRoot.getElementById("end").cssText=n}}connectedCallback(){}disconnectedCallback(){}}customElements.define("nu-time-input-group",s)}},e={};function n(s){var a=e[s];if(void 0!==a)return a.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,n),o.exports}n(659),n(155)})();
//# sourceMappingURL=main.js.map