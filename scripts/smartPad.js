document.addEventListener("DOMContentLoaded", () => {

	class GlobalManager {
		constructor() {
			this.autoCopy = document.getElementById("AutoCopy");
			this.copy = document.getElementById("Copy");
			this.textarea = document.getElementById("Textarea");
			this.popup = document.getElementById("CandidatePopup");
			this.container = this.textarea.parentElement; // .TextareaContainer
			this.master = {};
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
			let idx = G.popup.selectedIndex;
			switch (eventCh) {
				case "ArrowUp" :
					evt.preventDefault();
					idx--;
					if (idx < 0) idx = 0;
					G.popup.selectedIndex = idx;
					break;
				case "ArrowDown" :
					evt.preventDefault();
					idx++;
					if (idx >= G.popup.length) idx = G.popup.length - 1;
					G.popup.selectedIndex = idx;
					break;
				case "Enter" :
					evt.preventDefault();
					popupValueSelected();
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
		popupValueSelected();
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

	function popupValueSelected() {
		const valsel = G.popup[G.popup.selectedIndex].value;
		const pt = G.textarea.selectionStart;
		G.textarea.value = G.textarea.value.substr(0, pt - 1) + valsel + G.textarea.value.substring(pt);
		G.textarea.selectionStart = G.textarea.selectionEnd = pt + valsel.length - 1;
		G.popup.style.display = "none";
	}

	function popupper(ch, cursorPos) {
		if (G.popup.style.display == "block") return;
		if (ch in G.master) {
			const candidates = G.master[ch];
			const coord = getCoordinates(G.textarea.value, ch, cursorPos);
			G.popup.innerHTML = "";
			for (cand of candidates) {
				const elem = document.createElement("option");
				elem.value = cand;
				elem.innerHTML = cand;
				G.popup.appendChild(elem);
			}
			G.popup.selectedIndex = 0;
			G.popup.size = candidates.length;
			G.popup.style.top = `${coord[0]}px`;
			G.popup.style.left = `${coord[1]}px`;
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
		const topPosition = (rowNo * lineHeight) + G.textarea.offsetTop;

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
