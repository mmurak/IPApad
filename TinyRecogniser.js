class TinyRecogniser {
    constructor(dictDef) {
        this.master = {};
        for (const keySymbol in dictDef) {
            let strokeDef = dictDef[keySymbol];
            strokeDef.forEach((eachSet) => {
                let val = "";
                eachSet.forEach((aStroke) => {
                    val += aStroke + ":";
                    if (!(val in this.master)) {
                        this.master[val] = [];
                    }
                    this.master[val].push([keySymbol, eachSet.length]);
                });
            });
        }
        for (const entry in this.master) {
            let sorted = this.master[entry].sort((a,b) => { return a[1] - b[1]; });
            let formatted = sorted.map((val) => { return val[0]; });
            this.master[entry] = formatted;
        }
    }
    getCandidates(strokeString) {    // each stroke must be followed by  colon (:)
        if (strokeString in this.master) {
            return this.master[strokeString];
        } else {
            return [];
        }
    }
}

