export const SAMPLE_WORDS = ['VESKO', 'BORIS', 'SASHO', 'GOSHO', 'TOSHO', 'ALEKS']

export function getRandomWord() {
    const number = Math.random() * SAMPLE_WORDS.length + 1;
    return SAMPLE_WORDS[number];
}

