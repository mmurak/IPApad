document.addEventListener("DOMContentLoaded", () => {

	class GlobalManager {
		constructor() {
			this.autoCopy = document.getElementById("AutoCopy");
			this.copy = document.getElementById("Copy");
			this.textarea = document.getElementById("Textarea");
			this.popup = document.getElementById("CandidatePopup");
			this.container = this.textarea.parentElement; // .TextareaContainer
			this.master = {};
			this.selectedIndex = 0;
			const param = new URLSearchParams(window.location.search).get("reg");
			if (param != null) {
				const bindArray = param.split("\n");
				for (let line of bindArray) {
					let ar = line.split(/\s+/);
					const entry = ar.shift();
					this.master[entry] = ar;
				}
			}
		}
	}
	const G = new GlobalManager();

	// Only when the popup is activated
	G.container.addEventListener("keydown", (evt) => {
		if (G.popup.style.display == "block") {
			const eventCh = evt.key;
			let idx = G.selectedIndex;
			switch (eventCh) {
				case "ArrowUp" :
					evt.preventDefault();
					G.popup.children[G.selectedIndex].querySelector('.hiddenCheckbox').checked = false;
					idx--;
					if (idx < 0) idx = 0;
					G.popup.children[idx].querySelector('.hiddenCheckbox').checked = true;
					G.selectedIndex = idx;
					break;
				case "ArrowDown" :
					evt.preventDefault();
					G.popup.children[G.selectedIndex].querySelector('.hiddenCheckbox').checked = false;
					idx++;
					if (idx >= G.popup.children.length) idx = G.popup.children.length - 1;
					G.popup.children[idx].querySelector('.hiddenCheckbox').checked = true;
					G.selectedIndex = idx;
					break;
				case "Enter" :
					evt.preventDefault();
					const valsel = G.popup.children[G.selectedIndex].querySelector('.listCandidate').textContent;
					popupValueSelected(valsel);
					break;
				default :
					G.popup.style.display = "none";
			}
		}
	});

	G.container.addEventListener("keyup", (evt) => {
		if (evt.key == "Escape") {
			G.popup.style.display = "none";
			return;
		}
		const pt = G.textarea.selectionStart - 1;
		if (pt < 0) {
			G.popup.style.display = "none";
			return;
		}
		if (G.autoCopy.checked) {
			copyToClipboard();
		}
		const ch = G.textarea.value.substr(pt, 1).toLowerCase();
		popupper(ch, pt);
	});

	G.popup.addEventListener("focus", (evt) => {
		G.textarea.focus();
	});

	G.popup.addEventListener("click", (evt) => {
		evt.preventDefault();
		const selectedLi = evt.target.closest('li');
		const valsel = selectedLi.textContent;
		popupValueSelected(valsel);
	});

	G.autoCopy.addEventListener("click", (evt) => {
		if (G.autoCopy.checked) {
			G.copy.disabled = true;
		} else {
			G.copy.disabled = false;
		}
		G.textarea.focus();
	});

	G.copy.addEventListener("click", (evt) => {
		evt.preventDefault();
		copyToClipboard();
		G.textarea.focus();
	});

	function popupValueSelected(valsel) {
		const pt = G.textarea.selectionStart;
		G.textarea.value = G.textarea.value.substr(0, pt - 1) + valsel + G.textarea.value.substring(pt);
		G.textarea.selectionStart = G.textarea.selectionEnd = pt + valsel.length - 1;
		G.popup.style.display = "none";
		G.textarea.focus();
	}

	function popupper(ch, cursorPos) {
		if (G.popup.style.display == "block") return;
		if (ch in G.master) {
			const candidates = G.master[ch];
			const coord = getCoordinates(G.textarea.value, ch, cursorPos);
			G.popup.innerHTML = "";
			for (cand of candidates) {
				const elem = document.createElement("input");
				elem.type = "checkbox";
				elem.className = "hiddenCheckbox";
				const lab = document.createElement("label");
				lab.textContent = cand;
				lab.appendChild(elem);
				lab.className = "listCandidate";
				const item = document.createElement("li");
				item.appendChild(lab);
				G.popup.appendChild(item);
			}
			G.selectedIndex = 0;
			G.popup.size = candidates.length;
			const style = window.getComputedStyle(G.textarea);
			const fontSize = parseFloat(style.getPropertyValue("font-size"));
			G.popup.style.top = `${coord[0] + fontSize/6}px`;
			G.popup.style.left = `${coord[1]}px`;
			const cb = G.popup.children[0].querySelector('.hiddenCheckbox');
			cb.checked = true;
			G.popup.style.display = "block";
		} else {
			G.popup.style.display = "none";
		}
	}

	// Get coordinates for the popup
	function getCoordinates(text, ch, pos) {
		const str = text.substr(0, pos);
		const lines = str.split("\n")
		const rowNo = lines.length;
		const colNo = lines[rowNo-1].length;
		// y-axis
		const textAreaStyle = window.getComputedStyle(G.textarea);
		const lineHeight = parseFloat(textAreaStyle.lineHeight) || 24;
		const topPosition = (rowNo * lineHeight) + G.textarea.offsetTop - G.textarea.scrollTop;

		// x-axis
		const tempCanvas = document.createElement("canvas");
		const tempContext = tempCanvas.getContext("2d");
		const fontWeight = textAreaStyle.fontWeight || 'normal';
		const fontSize = textAreaStyle.fontSize || '16px';
		const fontFamily = textAreaStyle.fontFamily || 'sans-serif';
		tempContext.font = `${fontWeight} ${fontSize} ${fontFamily}`;
		const widthPosition = tempContext.measureText(lines[rowNo-1] + ch).width;

		return [topPosition, widthPosition];
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(G.textarea.value);
	}

	G.textarea.focus();
});
