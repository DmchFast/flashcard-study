import React from 'react'
import { Layout, Typography, Space, message } from 'antd'
import { BookOutlined } from '@ant-design/icons'
import UploadSection from './components/UploadSection'
import Flashcard from './components/Flashcard'
import Stats from './components/Stats'
import useFlashcard from './hooks/useFlashcard'

const { Header, Content, Footer } = Layout
const { Title } = Typography

function App() {
  const {
    words,
    currentIndex,
    totalCards,
    isFlipped,
    flipCard,
    nextCard,
    loadWords,
    resetCards,
    getCurrentWord
  } = useFlashcard()

  const [messageApi, contextHolder] = message.useMessage()

  const handleFileUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      const success = loadWords(content)
      if (success) {
        messageApi.success(`Загружено ${words.length} карточек`)
      } else {
        messageApi.error('Ошибка формата файла. Используйте разделитель " – ", " - " или "|"')
      }
    }
    reader.readAsText(file, 'UTF-8')
    return false
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Header
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px'
        }}
      >
        <Space>
          <BookOutlined style={{ fontSize: 28, color: 'white' }} />
          <Title level={3} style={{ margin: 0, color: 'white' }}>
            Flashcard Study
          </Title>
        </Space>
      </Header>

      <Content style={{ padding: '48px 24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <UploadSection
            onUpload={handleFileUpload}
            onReset={resetCards}
            hasWords={words.length > 0}
          />

          <Flashcard
            word={getCurrentWord()}
            isFlipped={isFlipped}
            onFlip={flipCard}
            hasWords={words.length > 0}
          />

          <Stats
            currentIndex={currentIndex}
            totalCards={totalCards}
            onNext={nextCard}
            hasWords={words.length > 0}
          />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: '#f5f5f5',
          color: 'rgba(0,0,0,0.45)'
        }}
      >
        Формат файла: каждая строка содержит слово – перевод (можно использовать –, - или |)
      </Footer>
    </Layout>
  )
}

export default App