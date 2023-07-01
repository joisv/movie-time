export const shortSentence = ( sentence, word ) => {
    if (typeof sentence !== 'string') {
        return '';
      }
    const words = sentence.split(' ');
    if (words.length <= 5) {
        return sentence;
    } else {
        const shortenedWords = words.slice(0, word ? word : 10);
        const shortenedSentence = shortenedWords.join(' ');
        return `${shortenedSentence}...`;
    }
}