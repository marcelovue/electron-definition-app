import wrDefinition from "wordreference-definition-api"

function WordClass() {
}
WordClass.prototype.define = async function(word) {
  if (!word) throw new Error('Word is undefined')
  if (!this.word)
    this.word = word
  return await wrDefinition(word)
}

export default WordClass;
