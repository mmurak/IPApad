class TinyRecogniser {
    constructor(dictDef) {
        this.master = {};
        for (const keySymbol in dictDef) {
            let strokeDef = dictDef[keySymbol];
            for (const eachSet of strokeDef) {
                let val = "";
                for (const aStroke of eachSet) {
                    val += aStroke + ":";
                    if (!(val in this.master)) {
                        this.master[val] = "";
                    }
                    this.master[val] += keySymbol + ":";
                }
            }
        }
    }
    getCandidates(strokeString) {    // each stroke must be followed by  colon (:)
        if (strokeString in this.master) {
            return this.master[strokeString].split(":");
        } else {
            return [];
        }
    }
}

