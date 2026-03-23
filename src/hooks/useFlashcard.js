import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'flashcard_data'

const useFlashcard = () => {
  // Состояния
  const [words, setWords] = useState([])
  const [shuffledIndices, setShuffledIndices] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isFlipped, setIsFlipped] = useState(false)

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const { words: savedWords, shuffledIndices: savedIndices, currentIndex: savedIndex, isFlipped: savedFlipped } = JSON.parse(saved)
        if (Array.isArray(savedWords) && Array.isArray(savedIndices) && typeof savedIndex === 'number') {
          setWords(savedWords)
          setShuffledIndices(savedIndices)
          setCurrentIndex(savedIndex)
          setIsFlipped(savedFlipped || false)
        }
      } catch (e) {
        console.error('Failed to load from localStorage', e)
      }
    }
  }, [])

  // Сохранение в localStorage при изменении ключевых данных
  useEffect(() => {
    if (words.length > 0) {
      const data = {
        words,
        shuffledIndices,
        currentIndex,
        isFlipped
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } else {
      // Если слов нет – удаляем запись из localStorage
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [words, shuffledIndices, currentIndex, isFlipped])

  // Вспомогательные функции (без изменений)
  const shuffleArray = useCallback((arr) => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  const generateShuffledOrder = useCallback((wordList) => {
    const indices = Array.from({ length: wordList.length }, (_, i) => i)
    return shuffleArray(indices)
  }, [shuffleArray])

  const loadWords = useCallback((text) => {
    const lines = text.split(/\r?\n/)
    const newWords = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      let separator = null
      let separatorIndex = -1

      if (trimmed.includes(' – ')) {
        separator = ' – '
        separatorIndex = trimmed.indexOf(' – ')
      } else if (trimmed.includes(' - ')) {
        separator = ' - '
        separatorIndex = trimmed.indexOf(' - ')
      } else if (trimmed.includes('|')) {
        separator = '|'
        separatorIndex = trimmed.indexOf('|')
      }

      if (separator === null) continue

      const foreign = trimmed.substring(0, separatorIndex).trim()
      const ru = trimmed.substring(separatorIndex + separator.length).trim()

      if (foreign || ru) {
        newWords.push({
          foreign: foreign || '?',
          ru: ru || '?',
          id: Date.now() + Math.random() + newWords.length
        })
      }
    }

    if (newWords.length === 0) return false

    setWords(newWords)
    const newOrder = generateShuffledOrder(newWords)
    setShuffledIndices(newOrder)
    setCurrentIndex(0)
    setIsFlipped(false)
    return true
  }, [generateShuffledOrder])

  const flipCard = useCallback(() => {
    if (words.length > 0 && currentIndex !== -1) {
      setIsFlipped(prev => !prev)
    }
  }, [words.length, currentIndex])

  const nextCard = useCallback(() => {
    if (words.length === 0) return
    if (currentIndex + 1 >= shuffledIndices.length) {
      const newOrder = generateShuffledOrder(words)
      setShuffledIndices(newOrder)
      setCurrentIndex(0)
      setIsFlipped(false)
    } else {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    }
  }, [words, shuffledIndices, currentIndex, generateShuffledOrder])

  const resetCards = useCallback(() => {
    setWords([])
    setShuffledIndices([])
    setCurrentIndex(-1)
    setIsFlipped(false)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const getCurrentWord = useCallback(() => {
    if (words.length === 0 || currentIndex === -1) return null
    const realIndex = shuffledIndices[currentIndex]
    return words[realIndex]
  }, [words, shuffledIndices, currentIndex])

  return {
    words,
    currentIndex: currentIndex + 1,
    totalCards: words.length,
    isFlipped,
    flipCard,
    nextCard,
    loadWords,
    resetCards,
    getCurrentWord
  }
}

export default useFlashcard