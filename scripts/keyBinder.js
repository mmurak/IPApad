document.addEventListener("DOMContentLoaded", () => {

	class GlobalManager {
		constructor() {
			this.textarea = document.getElementById("Textarea");
			this.smartIPABnd = document.getElementById("SmartIPABnd");
			this.openSmartPad = document.getElementById("OpenSmartPad");
			this.defaultMaster = [
				"a ɑ ɒ ɐ æ α",
				"b ʙ β ɓ ɞ",
				"c ɔ ç ɶ ɕ č",
				"d ɖ ɗ ḍ ð d̪ ʤ",
				"e ə ɚ ɘ ẹ ɛ ɜ ε ɝ",
				"f ɸ ʄ ɟ",
				"g ɠ ɡ ɢ ʛ ɣ ˠ",
				"h ħ ɦ ɥ ʜ ɧ ʰ",
				"i ɪ ɨ",
				"j ɟ ʝ ǰ ʲ",
				"l ʟ ɭ ɮ ɫ ɬ",
				"m ɱ ɯ ɰ ʍ",
				"n ɴ ŋ ɲ ɳ ⁿ",
				"o ʘ ø ɵ ɸ θ œ",
				"p ɸ",
				"r ʀ ʁ ɾ ɹ ɺ ɻ ɽ",
				"s ʂ ʃ ʄ",
				"t ʈ ʧ θ ð",
				"u ʊ ʉ",
				"v ʋ ⱱ ʌ",
				"w w ɯ ɰ ʷ",
				"x χ",
				"y ʏ ʎ ŷ",
				"z ʒ ʐ ʑ",
				"1 | ǀ ‖ ǁ ǂ",
				"2 ʔ ʕ ʡ ʢ",
				"3 ɛ ɜ ʒ ɝ ɞ",
				"8 ˈ ˌ ː ˑ .  ̆ | ‖ ‿",
				"0 ø ʘ ɵ",
				"= ‖ ǁ ǂ",
				"/  ̋  ́",
				"' ˑ ˈ",
				"\\  ̏  ̀",
			];
		}
	}
	const G = new GlobalManager();

	G.smartIPABnd.addEventListener("click", (evt) => {
		G.textarea.value = "";
		for (item of G.defaultMaster) {
			const bindings = item.split("");
			G.textarea.value += item + "\n";
		}
		G.textarea.selectionStart = G.textarea.selectionEnd = 0;
		G.textarea.focus();
	});

	G.openSmartPad.addEventListener("click", (evt) => {
		const arr = G.textarea.value.split("\n");
		const trimmedArr = arr.map(line => line.trim());
		const param = trimmedArr.join("\n");
		const encodedParam = encodeURIComponent(param);
		let url = window.location.href.replace("keyBinder.html", "smartPad.html");
		window.open(url + "?reg=" + encodedParam, "SmartPad");
	});

	G.textarea.focus();
});
