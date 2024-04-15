export default function SlicePointerPhrase(phrase, limit) {
    if (phrase.length < limit) {
      return phrase;
    }
    let newPhrase = phrase.substring(0, limit);
    let f = newPhrase + "...";
    return f;
}