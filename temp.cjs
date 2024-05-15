const fs = require('fs');
const path = require('path');
const stopwords = require('stopwords-iso');

// List of supported languages based on your provided list
const languages = {
    af: 'Afrikaans',
    ar: 'Arabic',
    hy: 'Armenian',
    eu: 'Basque',
    be: 'Belarusian',
    bn: 'Bengali',
    br: 'Breton',
    bg: 'Bulgarian',
    ca: 'Catalan',
    cs: 'Czech',
    zh: 'Chinese',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    en: 'English',
    eo: 'Esperanto',
    et: 'Estonian',
    fa: 'Persian',
    fi: 'Finnish',
    fr: 'French',
    ga: 'Irish',
    gl: 'Galician',
    gu: 'Gujarati',
    ha: 'Hausa',
    he: 'Hebrew',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    ku: 'Kurdish',
    la: 'Latin',
    lv: 'Latvian',
    lt: 'Lithuanian',
    mr: 'Marathi',
    ms: 'Malay',
    no: 'Norwegian',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sk: 'Slovak',
    sl: 'Slovenian',
    so: 'Somali',
    st: 'Southern Sotho',
    es: 'Spanish',
    sw: 'Swahili',
    sv: 'Swedish',
    th: 'Thai',
    tl: 'Tagalog',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    vi: 'Vietnamese',
    yo: 'Yoruba',
    zu: 'Zulu'
};

// Directory where the stopwords files will be created
const dir = path.join(__dirname, 'lda', 'lib');

// Create directory if it doesn't exist
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Function to create stopword files
const createStopwordFiles = () => {
    for (const [code, language] of Object.entries(languages)) {
        const stopWords = stopwords[code];

        if (!stopWords) {
            console.warn(`No stopwords found for language: ${language}`);
            continue;
        }

        const filePath = path.join(dir, `stopwords_${code}.js`);

        const content = `exports.stop_words = [\n    "${stopWords.join('",\n    "')}"\n];\n`;

        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error(`Error writing file for language ${language} (${code}):`, err);
            } else {
                console.log(`File created: stopwords_${code}.js`);
            }
        });
    }
};

// Execute the function to create stopword files
createStopwordFiles();
