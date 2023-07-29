class GlobalManager {
    constructor() {
        this.displayArea = document.getElementById("displayArea");
        this.vowelsAndSuprasegmentals = document.getElementById("VandSSection");
        this.consonantsPulmonic = document.getElementById("CPulmonSection");
        this.consonantsNonPulmonicAndOther = document.getElementById("CNPulmonAndOSection");
        this.diacritics = document.getElementById("DiacriticSection");
        this.tonesAndAccents = document.getElementById("TandASection");
        this.customPadPanel = document.getElementById("CustomPadSection");
        this.customizableKeypad = document.getElementById("customizableKeypad");
        this.customDialogBox = document.getElementById("customDialogBox");
        this.customizeTable = document.getElementById("customizeTable");
        this.charmDisplayArea = document.getElementById("charmDisplayArea");
        this.consonantList = "pbtdʈɖcɟkɡqɢʔmɱnɳɲŋɴʙrʀⱱɾɽɸβfvθðszʃʒʂʐçʝxɣχʁħʕhɦɬɮʋɹɻjɰlɭʎʟʘǀǃǂǁɓɗʄɠʛʼʍwɥʜʢʡɕʑɺɧg";  // with g
        this.vowelList = "iyɨ\ʉɯuɪʏʊeøɘɵɤoəɛœɜɞʌɔæɐaɶɑɒɚ";  // with ɚ
        this.supraList = "ˈˌːˑ̆|‖. ‿/[]()";  // with /, [, ], ( and )
        this.combinationList = "\u{300}\u{301}\u{361}\u{35c}\u{30a}\u{32c}\u{2b0}\u{339}\u{31c}\u{31f}\u{320}\u{308}\u{33d}\u{329}\u{32f}\u{2de}\u{324}\u{330}\u{33c}\u{2b7}\u{2b2}\u{2e0}\u{2e4}\u{334}\u{31d}\u{31e}\u{318}\u{319}\u{32a}\u{33a}\u{33b}\u{303}\u{207f}\u{2e1}\u{31a}";
        this.rowSplitter = "\u{02}";
        this.colSplitter = "\u{01}";
        this.dottedCircle = "\u{25cc}";
        this.undefKey = "-";
        this.keyboardLayout = "p\x01b\x01t\x01d\x01k\x01ɡ\x01m\x01n\x01ŋ\x01h\x02f\x01v\x01θ\x01ð\x01s\x01z\x01ʃ\x01ʒ\x01-\x01u\x02j\x01w\x01l\x01ɹ\x01ʔ\x01-\x01i\x01ə\x01ɚ\x01ʊ\x02/\x01AA\x01GA\x01˞\x01ˡ\x01ʰ\x01ɪ\x01ɜ\x01ɜ˞\x01o\x02[\x01ˈ\x01ˌ\x01̊\x01˞ɫ\x01̚\x01e\x01ɛ\x01ʌ\x01ɔ\x02]\x01ː\x01.\x01̬\x01ⁿ\x01SP\x01æ\x01a\x01ɑ\x01ɒ";
    }
}
let G = new GlobalManager();

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        e.preventDefault();
        dialogCanceled();
    }
});

G.displayArea.addEventListener("input", function() {
    autoCopy();
});

initializeParameter();

customPadClick();

function initializeParameter() {
    let parm = location.search;
    if (parm != "") {
        parm = parm.substring(4);
        G.keyboardLayout = decodeURI(parm);
    }
}

function allVanish() {
    G.vowelsAndSuprasegmentals.style.display = "none";
    G.consonantsPulmonic.style.display = "none";
    G.consonantsNonPulmonicAndOther.style.display = "none";
    G.diacritics.style.display = "none";
    G.tonesAndAccents.style.display = "none";
    G.customPadPanel.style.display = "none";
}

function vsClick() {
    allVanish();
    G.vowelsAndSuprasegmentals.style.display = "block";
    imageMapResize();
    G.displayArea.focus();
}

function cpClick() {
    allVanish();
    G.consonantsPulmonic.style.display = "block";
    imageMapResize();
    G.displayArea.focus();
}

function cnpoClick() {
    allVanish();
    G.consonantsNonPulmonicAndOther.style.display = "block";
    imageMapResize();
    G.displayArea.focus();
}

function diaClick() {
    allVanish();
    G.diacritics.style.display = "block";
    imageMapResize();
    G.displayArea.focus();
}

function taClick() {
    allVanish();
    G.tonesAndAccents.style.display = "block";
    imageMapResize();
    G.displayArea.focus();
}

function customPadClick() {
    allVanish();
    buildUpCustomKeyPad();
    G.customPadPanel.style.display = "block";
    G.displayArea.focus();
}

function colorClass(col) {
    let className = "ipaCh";
    if (G.vowelList.indexOf(col) >= 0) {
        className += " vwl";
    } else if (G.supraList.indexOf(col) >= 0) {
        className += " sps";
    } else if (G.consonantList.indexOf(col) >= 0) {
        className += " csn";
    } else {
        className += " non";
    }
    return className;
}

function adhocAccentCombinationProcessor(col, key) {
    if (col == "GA") {
        col = "\u{300}";
        key.className = "ipaCh sps";
    } else if (col == "AA") {
        col = "\u{301}";
        key.className = "ipaCh sps";
    }
    if (col == "ɜ˞") {
        key.className = "ipaCh vwl";
    }
    if (G.combinationList.indexOf(col) >= 0) {
        key.value = G.dottedCircle + col;
    } else {
        key.value = col;
    }
}

function buildUpCustomKeyPad() {
    G.customizableKeypad.innerHTML = "";
    let keyRows = G.keyboardLayout.split(G.rowSplitter);
    for (const row of keyRows) {
        let newRow = G.customizableKeypad.insertRow(-1);
        let keyCols = row.split(G.colSplitter);
        for (let col of keyCols) {
            let newCell = newRow.insertCell(-1);
            if (col == G.undefKey) {
                continue;
            }
            let key = document.createElement("input");
            key.type = "button";
            key.className = colorClass(col);
            key.value = col;
            adhocAccentCombinationProcessor(col, key);
            key.onclick = ss0;
            newCell.appendChild(key);
        }
    }
}

function ss0(obj) {
    let val = obj.target.value;
    val = (val == "SP") ? " " : val;
    val = (val.substr(0, 1) == G.dottedCircle) ? val.substring(1) : val;
    ss(val);
}

function ss(obj) {
    let selStart = G.displayArea.selectionStart;
    let selEnd = G.displayArea.selectionEnd;
    let data = G.displayArea.value;
    G.displayArea.value = data.substring(0, selStart) + obj + data.substring(selEnd);
    G.displayArea.selectionStart = G.displayArea.selectionEnd = selStart + obj.length;
    autoCopy();
    G.displayArea.focus();
}

function allclear() {
    G.displayArea.value = "";
    autoCopy();
}

function copyToClipboard(val) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(val);
    } else {
        document.execCommand("copy");
    }
}
function autoCopy() {
    let saveStart = G.displayArea.selectionStart;
    let saveEnd = G.displayArea.selectionEnd;
    G.displayArea.select();
    document.execCommand("copy");
    G.displayArea.selectionStart = saveStart;
    G.displayArea.selectionEnd = saveEnd;
}

function customize() {
    G.customizeTable.innerHTML = "";
    for (let i = 0; i < G.customizableKeypad.rows.length; i++) {
        let newRow = G.customizeTable.insertRow(-1);
        for (let j = 0; j < G.customizableKeypad.rows[i].cells.length; j++) {
            let newCell = newRow.insertCell(-1);
            let inArea = document.createElement("input");
            inArea.type = "text";
            inArea.className = "deftd";
            let datum = G.customizableKeypad.rows[i].cells[j].firstChild;
            if (datum) {
                let d = datum.value;
                if (d.indexOf(G.dottedCircle) >= 0) {
                    let dc = d.substring(1);
                    if (dc == "\u{300}") {
                        inArea.value = "GA";
                    } else if (dc == "\u{301}") {
                        inArea.value = "AA";
                    } else {
                        inArea.value = d.substring(1);
                    }
                } else {
                    inArea.value = d;
                }
            } else {
                inArea.value = G.undefKey;
            }
            newCell.appendChild(inArea);
        }
    }
    G.charmDisplayArea.innerHTML = "";
    G.customDialogBox.style.display = "block";
}

function dialogCanceled() {
    G.customDialogBox.style.display = "none";
}

function dialogSaved() {
    G.customizableKeypad.innerHTML = "";
    for (let i = 0; i < G.customizeTable.rows.length; i++) {
        let newRow = G.customizableKeypad.insertRow(-1);
        for (let j = 0; j < G.customizeTable.rows[i].cells.length; j++) {
            let newCell = newRow.insertCell(-1);
            let col = G.customizeTable.rows[i].cells[j].firstChild.value;
            if (col == G.undefKey) {
                continue;
            }
            let key = document.createElement("input");
            key.type = "button";
            key.className = colorClass(col);
            adhocAccentCombinationProcessor(col, key);
            key.onclick = ss0;
            newCell.appendChild(key);
        }
    }
    G.keyboardLayout = buildUpInternalLayout();
    G.customDialogBox.style.display = "none";
}

function buildUpInternalLayout() {
    result = "";
    for (let i = 0; i < G.customizeTable.rows.length; i++) {
        for (let j = 0; j < G.customizeTable.rows[i].cells.length; j++) {
            let datum = G.customizeTable.rows[i].cells[j].firstChild.value;
            result += (datum != "") ? datum : G.undefKey;
            result += G.colSplitter;
        }
        result = result.substring(0, result.length-1);
        result += G.rowSplitter;
    }
    return result.substring(0, result.length-1);
}

function dialogDisplayCharm() {
    let charm = location.host + location.pathname + "?kl=" + encodeURI(buildUpInternalLayout());
    copyToClipboard(charm);
    G.charmDisplayArea.innerHTML = "Customized URL was copied to clipboard.";
}
