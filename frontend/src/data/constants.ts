export const STORAGE_KEY = "glyph-grid-v8";
export const SUPABASE_ENABLED = false;
export const KANJI_BASE_URL = "https://raw.githubusercontent.com/allenlu2009/japanese-learning-datasets/main/kanji";
export const KANJI_FALLBACK_URL = "https://raw.githubusercontent.com/allenlu2009/japanese-learning-datasets/master/kanji";
export const KANJI_LEVELS = ["n5", "n4", "n3", "n2", "n1"];
export const DEFAULT_ACCENT = "#ff5705";
export const ACCENT_PRESETS = [DEFAULT_ACCENT, "#ffffff", "#61dafb", "#22c55e", "#f59e0b", "#a855f7"];

export const GROUPED_VARIANTS: any = {
  japanese: {
    hiragana: [
      ["a", "i", "u", "e", "o"],
      ["ka", "ki", "ku", "ke", "ko"],
      ["sa", "shi", "su", "se", "so"],
      ["ta", "chi", "tsu", "te", "to"],
      ["na", "ni", "nu", "ne", "no"],
      ["ha", "hi", "fu", "he", "ho"],
      ["ma", "mi", "mu", "me", "mo"],
      ["ya", null, "yu", null, "yo"],
      ["ra", "ri", "ru", "re", "ro"],
      ["wa", null, null, null, "wo"],
      ["n", null, null, null, null],
    ],
    katakana: [
      ["a", "i", "u", "e", "o"],
      ["ka", "ki", "ku", "ke", "ko"],
      ["sa", "shi", "su", "se", "so"],
      ["ta", "chi", "tsu", "te", "to"],
      ["na", "ni", "nu", "ne", "no"],
      ["ha", "hi", "fu", "he", "ho"],
      ["ma", "mi", "mu", "me", "mo"],
      ["ya", null, "yu", null, "yo"],
      ["ra", "ri", "ru", "re", "ro"],
      ["wa", null, null, null, "wo"],
      ["n", null, null, null, null],
    ],
    hiraganaDakuten: [
      ["ga", "gi", "gu", "ge", "go"],
      ["za", "ji", "zu", "ze", "zo"],
      ["da", "dji", "dzu", "de", "do"],
      ["ba", "bi", "bu", "be", "bo"],
      ["pa", "pi", "pu", "pe", "po"],
    ],
    yoon: [
      ["kya", null, "kyu", null, "kyo"],
      ["sha", null, "shu", null, "sho"],
      ["cha", null, "chu", null, "cho"],
      ["nya", null, "nyu", null, "nyo"],
      ["hya", null, "hyu", null, "hyo"],
      ["mya", null, "myu", null, "myo"],
      ["rya", null, "ryu", null, "ryo"],
    ],
  },
  devanagari: {
    vowels: [["a", "aa", "i", "ii", "u", "uu", "ri", "e", "ai", "o", "au"]],
    consonants: [
      ["ka", "kha", "ga", "gha", "nga"],
      ["ca", "cha", "ja", "jha", "nya"],
      ["tta", "ttha", "dda", "ddha", "nna"],
      ["ta", "tha", "da", "dha", "na"],
      ["pa", "pha", "ba", "bha", "ma"],
      ["ya", "ra", "la", "va", "sha"],
      ["ssa", "sa", "ha", null, null],
    ],
    matras: [["aa", "i", "ii", "u", "uu", "e", "ai", "o", "au", "virama"]],
  },
  thai: {
    vowels: [["a", "aa", "i", "ii", "ue", "uee", "u", "uu", "e", "ae", "o", "ai", "ai2", "am"]],
  },
  hebrew: {
    letters: [
      ["aleph", "bet", "gimel", "dalet", "he"],
      ["vav", "zayin", "chet", "tet", "yod"],
      ["kaf", "lamed", "mem", "nun", "samekh"],
      ["ayin", "pe", "tsadi", "qof", "resh"],
      ["shin", "tav", null, null, null],
    ],
    niqqud: [
      ["sheva", "hiriq", "tsere", "segol"],
      ["patah", "qamats", "holam", "qubuts"],
      ["dagesh", "shuruk", null, null],
    ],
  },
};

export const ROW_SHAPES: any = {
  cyrillic: { russian: { columns: 11, orientation: "row" } },
  arabic: {
    letters: { columns: 7, orientation: "row" },
    harakat: { columns: 2, orientation: "column" },
  },
  thai: { consonants: { columns: 11, orientation: "row" } },
};

export const LOCAL_DATA: any = {
  japanese: {
    hiragana: [
      { label: "あ", meta: "a", ipa: "a" }, { label: "い", meta: "i", ipa: "i" }, { label: "う", meta: "u", ipa: "ɯ" }, { label: "え", meta: "e", ipa: "e" }, { label: "お", meta: "o", ipa: "o" },
      { label: "か", meta: "ka", ipa: "ka" }, { label: "き", meta: "ki", ipa: "ki" }, { label: "く", meta: "ku", ipa: "kɯ" }, { label: "け", meta: "ke", ipa: "ke" }, { label: "こ", meta: "ko", ipa: "ko" },
      { label: "さ", meta: "sa", ipa: "sa" }, { label: "し", meta: "shi", ipa: "ɕi" }, { label: "す", meta: "su", ipa: "sɯ" }, { label: "せ", meta: "se", ipa: "se" }, { label: "そ", meta: "so", ipa: "so" },
      { label: "た", meta: "ta", ipa: "ta" }, { label: "ち", meta: "chi", ipa: "tɕi" }, { label: "つ", meta: "tsu", ipa: "tsɯ" }, { label: "て", meta: "te", ipa: "te" }, { label: "と", meta: "to", ipa: "to" },
      { label: "な", meta: "na", ipa: "na" }, { label: "に", meta: "ni", ipa: "ni" }, { label: "ぬ", meta: "nu", ipa: "nɯ" }, { label: "ね", meta: "ne", ipa: "ne" }, { label: "の", meta: "no", ipa: "no" },
      { label: "は", meta: "ha", ipa: "ha" }, { label: "ひ", meta: "hi", ipa: "çi" }, { label: "ふ", meta: "fu", ipa: "ɸɯ" }, { label: "へ", meta: "he", ipa: "he" }, { label: "ほ", meta: "ho", ipa: "ho" },
      { label: "ま", meta: "ma", ipa: "ma" }, { label: "み", meta: "mi", ipa: "mi" }, { label: "む", meta: "mu", ipa: "mɯ" }, { label: "め", meta: "me", ipa: "me" }, { label: "も", meta: "mo", ipa: "mo" },
      { label: "や", meta: "ya", ipa: "ja" }, { label: "ゆ", meta: "yu", ipa: "jɯ" }, { label: "よ", meta: "yo", ipa: "jo" },
      { label: "ら", meta: "ra", ipa: "ɾa" }, { label: "り", meta: "ri", ipa: "ɾi" }, { label: "る", meta: "ru", ipa: "ɾɯ" }, { label: "れ", meta: "re", ipa: "ɾe" }, { label: "ろ", meta: "ro", ipa: "ɾo" },
      { label: "わ", meta: "wa", ipa: "wa" }, { label: "を", meta: "wo", ipa: "o" }, { label: "ん", meta: "n", ipa: "ɴ" },
    ],
    katakana: [
      { label: "ア", meta: "a", ipa: "a" }, { label: "イ", meta: "i", ipa: "i" }, { label: "ウ", meta: "u", ipa: "ɯ" }, { label: "エ", meta: "e", ipa: "e" }, { label: "オ", meta: "o", ipa: "o" },
      { label: "カ", meta: "ka", ipa: "ka" }, { label: "キ", meta: "ki", ipa: "ki" }, { label: "ク", meta: "ku", ipa: "kɯ" }, { label: "ケ", meta: "ke", ipa: "ke" }, { label: "コ", meta: "ko", ipa: "ko" },
      { label: "サ", meta: "sa", ipa: "sa" }, { label: "シ", meta: "shi", ipa: "ɕi" }, { label: "ス", meta: "su", ipa: "sɯ" }, { label: "セ", meta: "se", ipa: "se" }, { label: "ソ", meta: "so", ipa: "so" },
      { label: "タ", meta: "ta", ipa: "ta" }, { label: "チ", meta: "chi", ipa: "tɕi" }, { label: "ツ", meta: "tsu", ipa: "tsɯ" }, { label: "テ", meta: "te", ipa: "te" }, { label: "ト", meta: "to", ipa: "to" },
      { label: "ナ", meta: "na", ipa: "na" }, { label: "ニ", meta: "ni", ipa: "ni" }, { label: "ぬ", meta: "nu", ipa: "nɯ" }, { label: "ね", meta: "ne", ipa: "ne" }, { label: "の", meta: "no", ipa: "no" },
      { label: "ハ", meta: "ha", ipa: "ha" }, { label: "ヒ", meta: "hi", ipa: "çi" }, { label: "フ", meta: "fu", ipa: "ɸɯ" }, { label: "ヘ", meta: "he", ipa: "he" }, { label: "ホ", meta: "ho", ipa: "ho" },
      { label: "マ", meta: "ma", ipa: "ma" }, { label: "ミ", meta: "mi", ipa: "mi" }, { label: "ム", meta: "mu", ipa: "mɯ" }, { label: "メ", meta: "me", ipa: "me" }, { label: "モ", meta: "mo", ipa: "mo" },
      { label: "ヤ", meta: "ya", ipa: "ja" }, { label: "ユ", meta: "yu", ipa: "jɯ" }, { label: "ヨ", meta: "yo", ipa: "jo" },
      { label: "ラ", meta: "ra", ipa: "ɾa" }, { label: "り", meta: "ri", ipa: "ɾi" }, { label: "る", meta: "ru", ipa: "ɾɯ" }, { label: "れ", meta: "re", ipa: "ɾe" }, { label: "ろ", meta: "ro", ipa: "ɾo" },
      { label: "ワ", meta: "wa", ipa: "wa" }, { label: "ヲ", meta: "wo", ipa: "o" }, { label: "ン", meta: "n", ipa: "ɴ" },
    ],
    hiraganaDakuten: [
      { label: "が", meta: "ga", ipa: "ɡa" }, { label: "ぎ", meta: "gi", ipa: "ɡi" }, { label: "ぐ", meta: "gu", ipa: "ɡɯ" }, { label: "げ", meta: "ge", ipa: "ɡe" }, { label: "ご", meta: "go", ipa: "ɡo" },
      { label: "ざ", meta: "za", ipa: "za" }, { label: "じ", meta: "ji", ipa: "dʑi" }, { label: "ず", meta: "zu", ipa: "zɯ" }, { label: "ぜ", meta: "ze", ipa: "ze" }, { label: "ぞ", meta: "zo", ipa: "zo" },
      { label: "だ", meta: "da", ipa: "da" }, { label: "ぢ", meta: "dji", ipa: "dʑi" }, { label: "づ", meta: "dzu", ipa: "zɯ" }, { label: "で", meta: "de", ipa: "de" }, { label: "ど", meta: "do", ipa: "do" },
      { label: "ば", meta: "ba", ipa: "ba" }, { label: "び", meta: "bi", ipa: "bi" }, { label: "ぶ", meta: "bu", ipa: "bɯ" }, { label: "べ", meta: "be", ipa: "be" }, { label: "ぼ", meta: "bo", ipa: "bo" },
      { label: "ぱ", meta: "pa", ipa: "pa" }, { label: "ぴ", meta: "pi", ipa: "pi" }, { label: "ぷ", meta: "pu", ipa: "pɯ" }, { label: "ぺ", meta: "pe", ipa: "pe" }, { label: "ぽ", meta: "po", ipa: "po" },
    ],
    yoon: [
      { label: "きゃ", meta: "kya", ipa: "kʲa" }, { label: "きゅ", meta: "kyu", ipa: "kʲɯ" }, { label: "きょ", meta: "kyo", ipa: "kʲo" },
      { label: "しゃ", meta: "sha", ipa: "ɕa" }, { label: "しゅ", meta: "shu", ipa: "ɕɯ" }, { label: "しょ", meta: "sho", ipa: "ɕo" },
      { label: "ちゃ", meta: "cha", ipa: "tɕa" }, { label: "ちゅ", meta: "chu", ipa: "tɕɯ" }, { label: "ちょ", meta: "cho", ipa: "tɕo" },
      { label: "にゃ", meta: "nya", ipa: "nʲa" }, { label: "にゅ", meta: "nyu", ipa: "nʲɯ" }, { label: "にょ", meta: "nyo", ipa: "nʲo" },
      { label: "ひゃ", meta: "hya", ipa: "ça" }, { label: "ひゅ", meta: "hyu", ipa: "çɯ" }, { label: "ひょ", meta: "hyo", ipa: "ço" },
      { label: "みゃ", meta: "mya", ipa: "mʲa" }, { label: "みゅ", meta: "myu", ipa: "mʲɯ" }, { label: "みょ", meta: "myo", ipa: "mʲo" },
      { label: "りゃ", meta: "rya", ipa: "ɾʲa" }, { label: "りゅ", meta: "ryu", ipa: "ɾʲɯ" }, { label: "りょ", meta: "ryo", ipa: "ɾʲo" },
    ],
  },
  arabic: {
    letters: [
      { label: "ا", meta: "alif", ipa: "ʔaː" }, { label: "ب", meta: "ba", ipa: "b" }, { label: "ت", meta: "ta", ipa: "t" }, { label: "ث", meta: "tha", ipa: "θ" }, { label: "ج", meta: "jim", ipa: "d͡ʒ" },
      { label: "ح", meta: "ha", ipa: "ħ" }, { label: "خ", meta: "kha", ipa: "x" }, { label: "د", meta: "dal", ipa: "d" }, { label: "ذ", meta: "dhal", ipa: "ð" }, { label: "ر", meta: "ra", ipa: "r" },
      { label: "ز", meta: "zay", ipa: "z" }, { label: "س", meta: "sin", ipa: "s" }, { label: "ش", meta: "shin", ipa: "ʃ" }, { label: "ص", meta: "sad", ipa: "sˤ" }, { label: "ض", meta: "dad", ipa: "dˤ" },
      { label: "ط", meta: "ta", ipa: "tˤ" }, { label: "ظ", meta: "za", ipa: "ðˤ" }, { label: "ع", meta: "ayn", ipa: "ʕ" }, { label: "غ", meta: "ghayn", ipa: "ɣ" }, { label: "ف", meta: "fa", ipa: "f" },
      { label: "ق", meta: "qaf", ipa: "q" }, { label: "ك", meta: "kaf", ipa: "k" }, { label: "ل", meta: "lam", ipa: "l" }, { label: "م", meta: "mim", ipa: "m" }, { label: "ن", meta: "nun", ipa: "n" },
      { label: "ه", meta: "ha", ipa: "h" }, { label: "و", meta: "waw", ipa: "w" }, { label: "ي", meta: "ya", ipa: "j" },
    ],
    harakat: [
      { label: "َ", meta: "fatha", ipa: "a" }, { label: "ِ", meta: "kasra", ipa: "i" }, { label: "ُ", meta: "damma", ipa: "u" }, { label: "ً", meta: "tanwin fatha", ipa: "an" },
      { label: "ٍ", meta: "tanwin kasra", ipa: "in" }, { label: "ٌ", meta: "tanwin damma", ipa: "un" }, { label: "ْ", meta: "sukun", ipa: "∅" }, { label: "ّ", meta: "shadda", ipa: "geminate" },
    ],
  },
  cyrillic: {
    russian: [
      { label: "А", meta: "a", ipa: "a" }, { label: "Б", meta: "be", ipa: "b" }, { label: "В", meta: "ve", ipa: "v" }, { label: "Г", meta: "ge", ipa: "ɡ" }, { label: "Д", meta: "de", ipa: "d" },
      { label: "Е", meta: "ye", ipa: "je" }, { label: "Ё", meta: "yo", ipa: "jo" }, { label: "Ж", meta: "zhe", ipa: "ʐ" }, { label: "З", meta: "ze", ipa: "z" }, { label: "И", meta: "i", ipa: "i" },
      { label: "Й", meta: "short i", ipa: "j" }, { label: "К", meta: "ka", ipa: "k" }, { label: "Л", meta: "el", ipa: "ɫ" }, { label: "М", meta: "em", ipa: "m" }, { label: "Н", meta: "en", ipa: "n" },
      { label: "О", meta: "o", ipa: "o" }, { label: "П", meta: "pe", ipa: "p" }, { label: "Р", meta: "er", ipa: "r" }, { label: "С", meta: "es", ipa: "s" }, { label: "Т", meta: "te", ipa: "t" },
      { label: "У", meta: "u", ipa: "u" }, { label: "Ф", meta: "ef", ipa: "f" }, { label: "Х", meta: "kha", ipa: "x" }, { label: "Ц", meta: "tse", ipa: "ts" }, { label: "Ч", meta: "che", ipa: "tɕ" },
      { label: "Ш", meta: "sha", ipa: "ʂ" }, { label: "Щ", meta: "shcha", ipa: "ɕː" }, { label: "Ъ", meta: "hard sign", ipa: "separator" }, { label: "Ы", meta: "y", ipa: "ɨ" }, { label: "Ь", meta: "soft sign", ipa: "palatalization" },
      { label: "Э", meta: "e", ipa: "ɛ" }, { label: "Ю", meta: "yu", ipa: "ju" }, { label: "Я", meta: "ya", ipa: "ja" },
    ],
  },
  thai: {
    consonants: [
      { label: "ก", meta: "ko kai", ipa: "k" }, { label: "ข", meta: "kho khai", ipa: "kʰ" }, { label: "ฃ", meta: "kho khuat", ipa: "kʰ" }, { label: "ค", meta: "kho khwai", ipa: "kʰ" },
      { label: "ฆ", meta: "kho rakhang", ipa: "kʰ" }, { label: "ง", meta: "ngo ngu", ipa: "ŋ" }, { label: "จ", meta: "cho chan", ipa: "tɕ" }, { label: "ฉ", meta: "cho ching", ipa: "tɕʰ" },
      { label: "ช", meta: "cho chang", ipa: "tɕʰ" }, { label: "ซ", meta: "so so", ipa: "s" }, { label: "ญ", meta: "yo ying", ipa: "j" }, { label: "ฎ", meta: "do chada", ipa: "d" },
      { label: "ฏ", meta: "to patak", ipa: "t" }, { label: "ฐ", meta: "tho than", ipa: "tʰ" }, { label: "ฑ", meta: "tho montho", ipa: "tʰ" }, { label: "ฒ", meta: "tho phuthao", ipa: "tʰ" },
      { label: "ณ", meta: "no nen", ipa: "n" }, { label: "ด", meta: "do dek", ipa: "d" }, { label: "ต", meta: "to tao", ipa: "t" }, { label: "ถ", meta: "tho thung", ipa: "tʰ" },
      { label: "ท", meta: "tho thahan", ipa: "tʰ" }, { label: "ธ", meta: "tho thong", ipa: "tʰ" }, { label: "น", meta: "no nu", ipa: "n" }, { label: "บ", meta: "bo baimai", ipa: "b" },
      { label: "ป", meta: "po pla", ipa: "p" }, { label: "ผ", meta: "pho phueng", ipa: "pʰ" }, { label: "ฝ", meta: "fo fa", ipa: "f" }, { label: "พ", meta: "pho phan", ipa: "pʰ" },
      { label: "ฟ", meta: "fo fan", ipa: "f" }, { label: "ภ", meta: "pho samphao", ipa: "pʰ" }, { label: "ม", meta: "mo ma", ipa: "m" }, { label: "ย", meta: "yo yak", ipa: "j" },
      { label: "ร", meta: "ro ruea", ipa: "r" }, { label: "ล", meta: "lo ling", ipa: "l" }, { label: "ว", meta: "wo waen", ipa: "w" }, { label: "ศ", meta: "so sala", ipa: "s" },
      { label: "ษ", meta: "so ruesi", ipa: "s" }, { label: "ส", meta: "so suea", ipa: "s" }, { label: "ห", meta: "ho hip", ipa: "h" }, { label: "ฬ", meta: "lo chula", ipa: "l" },
      { label: "อ", meta: "o ang", ipa: "ʔ" }, { label: "ฮ", meta: "ho nokhuk", ipa: "h" },
    ],
    vowels: [
      { label: "ะ", meta: "a", ipa: "a" }, { label: "า", meta: "aa", ipa: "aː" }, { label: "ิ", meta: "i", ipa: "i" }, { label: "ี", meta: "ii", ipa: "iː" }, { label: "ึ", meta: "ue", ipa: "ɯ" },
      { label: "ื", meta: "uee", ipa: "ɯː" }, { label: "ุ", meta: "u", ipa: "u" }, { label: "ู", meta: "uu", ipa: "uː" }, { label: "เ", meta: "e", ipa: "e" }, { label: "แ", meta: "ae", ipa: "ɛ" },
      { label: "โ", meta: "o", ipa: "o" }, { label: "ใ", meta: "ai", ipa: "aj" }, { label: "ไ", meta: "ai2", ipa: "aj" }, { label: "ำ", meta: "am", ipa: "am" },
    ],
  },
  devanagari: {
    vowels: [
      { label: "अ", meta: "a", ipa: "ə" }, { label: "आ", meta: "aa", ipa: "aː" }, { label: "इ", meta: "i", ipa: "ɪ" }, { label: "ई", meta: "ii", ipa: "iː" }, { label: "उ", meta: "u", ipa: "ʊ" },
      { label: "ऊ", meta: "uu", ipa: "uː" }, { label: "ऋ", meta: "ri", ipa: "rɪ" }, { label: "ए", meta: "e", ipa: "eː" }, { label: "ऐ", meta: "ai", ipa: "ɛː" }, { label: "ओ", meta: "o", ipa: "oː" }, { label: "औ", meta: "au", ipa: "ɔː" },
    ],
    consonants: [
      { label: "क", meta: "ka", ipa: "k" }, { label: "ख", meta: "kha", ipa: "kʰ" }, { label: "ग", meta: "ga", ipa: "ɡ" }, { label: "घ", meta: "gha", ipa: "ɡʱ" }, { label: "ङ", meta: "nga", ipa: "ŋ" },
      { label: "च", meta: "ca", ipa: "t͡ʃ" }, { label: "छ", meta: "cha", ipa: "t͡ʃʰ" }, { label: "ज", meta: "ja", ipa: "d͡ʒ" }, { label: "झ", meta: "jha", ipa: "d͡ʒʱ" }, { label: "ञ", meta: "nya", ipa: "ɲ" },
      { label: "ट", meta: "tta", ipa: "ʈ" }, { label: "ठ", meta: "ttha", ipa: "ʈʰ" }, { label: "ड", meta: "dda", ipa: "ɖ" }, { label: "ढ", meta: "ddha", ipa: "ɖʱ" }, { label: "ण", meta: "nna", ipa: "ɳ" },
      { label: "त", meta: "ta", ipa: "t̪" }, { label: "थ", meta: "tha", ipa: "t̪ʰ" }, { label: "द", meta: "da", ipa: "d̪" }, { label: "ध", meta: "dha", ipa: "d̪ʱ" }, { label: "न", meta: "na", ipa: "n" },
      { label: "प", meta: "pa", ipa: "p" }, { label: "फ", meta: "pha", ipa: "pʰ" }, { label: "ब", meta: "ba", ipa: "b" }, { label: "भ", meta: "bha", ipa: "bʱ" }, { label: "म", meta: "ma", ipa: "m" },
      { label: "य", meta: "ya", ipa: "j" }, { label: "र", meta: "ra", ipa: "r" }, { label: "ल", meta: "la", ipa: "l" }, { label: "व", meta: "va", ipa: "ʋ" }, { label: "श", meta: "sha", ipa: "ʃ" },
      { label: "ष", meta: "ssa", ipa: "ʂ" }, { label: "स", meta: "sa", ipa: "s" }, { label: "ह", meta: "ha", ipa: "ɦ" },
    ],
    matras: [
      { label: "ा", meta: "aa", ipa: "aː" }, { label: "ि", meta: "i", ipa: "ɪ" }, { label: "ी", meta: "ii", ipa: "iː" }, { label: "ु", meta: "u", ipa: "ʊ" }, { label: "ू", meta: "uu", ipa: "uː" },
      { label: "े", meta: "e", ipa: "eː" }, { label: "ै", meta: "ai", ipa: "ɛː" }, { label: "ो", meta: "o", ipa: "oː" }, { label: "ौ", meta: "au", ipa: "ɔː" }, { label: "्", meta: "virama", ipa: "∅" },
    ],
  },
  hebrew: {
    letters: [
      { label: "א", meta: "aleph", ipa: "ʔ" }, { label: "ב", meta: "bet", ipa: "b/v" }, { label: "ג", meta: "gimel", ipa: "ɡ" }, { label: "ד", meta: "dalet", ipa: "d" }, { label: "ה", meta: "he", ipa: "h" },
      { label: "ו", meta: "vav", ipa: "v/w" }, { label: "ז", meta: "zayin", ipa: "z" }, { label: "ח", meta: "chet", ipa: "χ" }, { label: "ט", meta: "tet", ipa: "t" }, { label: "י", meta: "yod", ipa: "j" },
      { label: "כ", meta: "kaf", ipa: "k/x" }, { label: "ל", meta: "lamed", ipa: "l" }, { label: "מ", meta: "mem", ipa: "m" }, { label: "נ", meta: "nun", ipa: "n" }, { label: "ס", meta: "samekh", ipa: "s" },
      { label: "ע", meta: "ayin", ipa: "ʕ/ʔ" }, { label: "פ", meta: "pe", ipa: "p/f" }, { label: "צ", meta: "tsadi", ipa: "ts" }, { label: "ק", meta: "qof", ipa: "k/q" }, { label: "ר", meta: "resh", ipa: "r/ʁ" },
      { label: "ש", meta: "shin", ipa: "ʃ/s" }, { label: "ת", meta: "tav", ipa: "t" },
    ],
    niqqud: [
      { label: "ְ", meta: "sheva", ipa: "ə/∅" }, { label: "ִ", meta: "hiriq", ipa: "i" }, { label: "ֵ", meta: "tsere", ipa: "e" }, { label: "ֶ", meta: "segol", ipa: "e" },
      { label: "ַ", meta: "patah", ipa: "a" }, { label: "ָ", meta: "qamats", ipa: "a/o" }, { label: "ֹ", meta: "holam", ipa: "o" }, { label: "ֻ", meta: "qubuts", ipa: "u" },
      { label: "ּ", meta: "dagesh", ipa: "stop/geminate" }, { label: "וּ", meta: "shuruk", ipa: "u" },
    ],
  },
};

export const LANGUAGE_DEFINITIONS: any = {
  japanese: { label: "Japanese", variants: [{ id: "hiragana", label: "Hiragana" }, { id: "katakana", label: "Katakana" }, { id: "hiraganaDakuten", label: "Hiragana Dakuten" }, { id: "yoon", label: "Yoon" }, { id: "kanji", label: "Kanji" }] },
  arabic: { label: "Arabic", variants: [{ id: "letters", label: "Letters" }, { id: "harakat", label: "Harakat" }] },
  cyrillic: { label: "Cyrillic", variants: [{ id: "russian", label: "Russian" }] },
  thai: { label: "Thai", variants: [{ id: "consonants", label: "Consonants" }, { id: "vowels", label: "Vowels" }] },
  devanagari: { label: "Devanagari", variants: [{ id: "vowels", label: "Vowels" }, { id: "consonants", label: "Consonants" }, { id: "matras", label: "Matras" }] },
  hebrew: { label: "Hebrew", variants: [{ id: "letters", label: "Letters" }, { id: "niqqud", label: "Niqqud" }] },
};
