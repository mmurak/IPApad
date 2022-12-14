minimalDict = {
    "." : [['D'], ['C'], ],
    "/" : [['ABC'], ['AC'], ['ADC'], ],
    "[" : [['B', 'BC'], ['B', 'BC', 'C'], ['ABCD'], ['BA', 'BC', 'CD'], ['BA', 'BCD'], ],
    "]" : [['BADC'], ['A', 'AD', 'D'], ['BA', 'AD', 'CD'], ['BA', 'ADC'], ['A', 'AD'], ],
    "a" : [['ABCDAD'], ['BADCBAD'], ['BAD', 'ABCD'], ],
    "á" : [['ABCDAD', 'AB'], ['BAD', 'ABCD', 'AB'], ['BADCBAD', 'AB'], ],
    "à" : [['BAD', 'ABCD', 'BA'], ['BADCBAD', 'BA'], ['ABCDAD', 'BA'], ],
    "b" : [['BCBADC'], ['BCDC'], ['BC', 'CDC'], ['BC', 'BADC'], ],
    "d" : [['DCD', 'AD'], ['ABCDAD'], ['ADCD'], ['ABCD', 'AD'], ['ADABCD'], ['DCDAD'], ],
    "e" : [['CDABCD'], ['BABCD'], ],
    "é" : [['CDABCD', 'AB'], ['BABCD', 'AB'], ],
    "è" : [['CDABCD', 'BA'], ['BABCD', 'BA'], ],
    "f" : [['ABC', 'C'], ['ABC', 'CD'], ['ABC', 'B'], ['ABC', 'BA'], ],
    "h" : [['BC', 'CD'], ['BCBAD'], ['BCD'], ],
    "i" : [['C', 'B'], ['BC', 'B'], ['D', 'A'], ['AD', 'A'], ],
    "í" : [['C', 'AB'], ['D', 'AB'], ['AD', 'AB'], ['BC', 'AB'], ],
    "ì" : [['AD', 'BA'], ['BC', 'BA'], ['C', 'BA'], ['D', 'BA'], ],
    "j" : [['ADC', 'A'], ['B', 'BC'], ['A', 'ADC'], ['A', 'AD'], ],
    "k" : [['BC', 'ABCD'], ['BC', 'ABC', 'CD'], ['BC', 'ADCD'], ['BC', 'ADC', 'CD'], ['BC', 'DCD'], ['BC', 'DC', 'CD'], ],
    "l" : [['AD'], ['BC'], ],
    "m" : [['ADADAD'], ['BCBCBC'], ['BCBADAD'], ['BCBCBAD'], ],
    "n" : [['BCBAD'], ],
    "o" : [['BCDAB'], ['ABCDA'], ],
    "ó" : [['BCDAB', 'AB'], ['ABCDA', 'AB'], ],
    "ò" : [['ABCDA', 'BA'], ['BCDAB', 'BA'], ],
    "p" : [['BCBAB'], ['BCBADC'], ['BC', 'BAB'], ['BC', 'BADC'], ],
    "r" : [['BCBA'], ],
    "s" : [['ABADC'], ['ABCDC'], ],
    "t" : [['BA', 'AD'], ['BA', 'BCD'], ['BCD', 'BA'], ],
    "u" : [['BCDAD'], ],
    "ú" : [['BCDAD', 'AB'], ],
    "ù" : [['BCDAD', 'BA'], ],
    "v" : [['BCDA'], ['BC', 'ADC'], ['BCD', 'AD'], ['BAD', 'AD'], ],
    "w" : [['BCBADA'], ['BCBCDA'], ['BCDADA'], ['BCBDA'], ],
    "z" : [['BACD'], ['BADCD'], ['BABCD'], ],
    "æ" : [['BCBABAD'], ['BCBABCD'], ['BADCBAD'], ['BCD'], ['BCDACD'], ['BCDABCD'], ['BABCBAD'], ['BCBAD'], ['BCDAD'], ['BADCDAD'], ['BCDCD'], ],
    "ǽ" : [['BCBAD', 'AB'], ['BABCBAD', 'AB'], ['BCBABCD', 'AB'], ['BADCDAD', 'AB'], ['BCDABCD', 'AB'], ['BCD', 'AB'], ['BADCBAD', 'AB'], ['BCDCD', 'AB'], ['BCBABAD', 'AB'], ['BCDACD', 'AB'], ['BCDAD', 'AB'], ],
    "æ̀" : [['BADCBAD', 'BA'], ['BCBABAD', 'BA'], ['BCDACD', 'BA'], ['BCDAD', 'BA'], ['BCBAD', 'BA'], ['BABCBAD', 'BA'], ['BADCDAD', 'BA'], ['BCDCD', 'BA'], ['BCBABCD', 'BA'], ['BCDABCD', 'BA'], ['BCD', 'BA'], ],
    "ð" : [['BADCD', 'AB'], ['BADCBA', 'BA'], ['BADCD', 'BA'], ['BADCBA', 'AB'], ],
    "ŋ" : [['BCBADC'], ['BAD'], ['BADC'], ['BCBAD'], ],
    "ɑ" : [['ABCDAD'], ['ABCD', 'AD'], ],
    "ɑ́" : [['ABCDAD', 'AB'], ['ABCD', 'AD', 'AB'], ],
    "ɑ̀" : [['ABCD', 'AD', 'BA'], ['ABCDAD', 'BA'], ],
    "ɒ" : [['BCBADC'], ['BC', 'BADC'], ],
    "ɒ́" : [['BCBADC', 'AB'], ['BC', 'BADC', 'AB'], ],
    "ɒ̀" : [['BC', 'BADC', 'BA'], ['BCBADC', 'BA'], ],
    "ɔ" : [['BADC'], ],
    "ɔ́" : [['BADC', 'AB'], ],
    "ɔ̀" : [['BADC', 'BA'], ],
    "ə" : [['BADCBA'], ['BADCD'], ],
    "ə́" : [['BADCD', 'AB'], ['BADCBA', 'AB'], ],
    "ə̀" : [['BADCBA', 'BA'], ['BADCD', 'BA'], ],
    "ɚ" : [['BADCBA'], ['BADCD'], ],
    "ɚ́" : [['BADCD', 'AB'], ['BADCBA', 'AB'], ],
    "ɚ̀" : [['BADCBA', 'BA'], ['BADCD', 'BA'], ],
    "ɜ" : [['BABADC'], ['BADCDC'], ],
    "ɜ́" : [['BABADC', 'AB'], ['BADCDC', 'AB'], ],
    "ɜ̀" : [['BABADC', 'BA'], ['BADCDC', 'BA'], ],
    "ɜ˞" : [['BABADC', 'A'], ['BADCDC', 'DA'], ['BADCDC', 'D'], ],
    "ɜ́˞" : [['BADCDC', 'DA', 'AB'], ['BADCDC', 'D', 'AB'], ['BABADC', 'A', 'AB'], ],
    "ɜ̀˞" : [['BADCDC', 'D', 'BA'], ['BABADC', 'A', 'BA'], ['BADCDC', 'DA', 'BA'], ],
    "ɛ" : [['ABCDCD'], ['ABABCD'], ],
    "ɛ́" : [['ABABCD', 'AB'], ['ABCDCD', 'AB'], ],
    "ɛ̀" : [['ABCDCD', 'BA'], ['ABABCD', 'BA'], ],
    "ɡ" : [['ABCD', 'ADC'], ['ABCD', 'AD'], ['ABCDAD'], ['ABCDADC'], ],
    "ɪ" : [['B', 'BC', 'C'], ['BA', 'AD', 'CD'], ['A', 'AD', 'D'], ['BC'], ['BA', 'BC', 'CD'], ['AD'], ],
    "ɫ" : [['AD', 'CD'], ['BC', 'BA'], ['BC', 'CD'], ['AD', 'BA'], ],
    "ɯ" : [['BCBCDAD'], ['BCDADAD'], ],
    "ɱ" : [['BCBADADC'], ['BCBCBADC'], ['BCDADAD'], ],
    "ɹ" : [['CDAD'], ],
    "ɻ" : [['CDAD'], ],
    "ɾ" : [['CBA'], ],
    "ʃ" : [['ABC'], ['ADC'], ],
    "ʊ" : [['BCDA'], ],
    "ʊ́" : [['BCDA', 'AB'], ],
    "ʊ̀" : [['BCDA', 'BA'], ],
    "ʌ" : [['CBCD'], ['CDAD'], ['CBAD'], ],
    "ʌ́" : [['CBCD', 'AB'], ['CDAD', 'AB'], ['CBAD', 'AB'], ],
    "ʌ̀" : [['CBCD', 'BA'], ['CDAD', 'BA'], ['CBAD', 'BA'], ],
    "ʒ" : [['BABADC'], ['BADCDC'], ],
    "ʔ" : [['BABC'], ['BAD'], ['BADC'], ],
    "ˈ" : [['B'], ['A'], ],
    "ˌ" : [['D'], ['C'], ],
    "ː" : [['A', 'D'], ['B', 'C'], ],
    "θ" : [['ABCDA', 'BA'], ['ABCDA', 'CD'], ['BCDAB', 'CD'], ['BCDAB', 'BA'], ],
};
