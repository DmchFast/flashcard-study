import React from 'react'
import { Card, Typography, Empty, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const Flashcard = ({ word, isFlipped, onFlip, hasWords }) => {
  if (!hasWords) {
    return (
      <Card
        style={{
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: '#fafafa'
        }}
      >
        <Empty
          description="Нет загруженных слов"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
          Загрузите текстовый файл с карточками для начала обучения
        </Text>
      </Card>
    )
  }

  if (!word) return null

  // Разные градиенты для передней и задней стороны
  const frontGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  const backGradient = 'linear-gradient(135deg, #4ecf44 0%, #4e9249 100%)'

  return (
    <Card
      hoverable
      onClick={onFlip}
      style={{
        minHeight: 400,
        cursor: 'pointer',
        background: isFlipped ? backGradient : frontGradient,
        transition: 'background 0.3s ease',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <QuestionCircleOutlined style={{ fontSize: 32, color: 'rgba(255,255,255,0.7)' }} />
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          {isFlipped ? word.foreign : word.ru}
        </Title>
        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
          {isFlipped
            ? 'Нажмите "Далее" для следующего слова'
            : 'Нажмите на карточку, чтобы увидеть перевод'}
        </Text>
      </Space>
    </Card>
  )
}

export default Flashcard