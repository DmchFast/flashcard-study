import React from 'react'
import { Button, Progress, Space, Typography, Card } from 'antd'
import { RightOutlined, TrophyOutlined } from '@ant-design/icons'

const { Text } = Typography

const Stats = ({ currentIndex, totalCards, onNext, hasWords }) => {
  if (!hasWords) return null

  const progress = totalCards > 0 ? (currentIndex / totalCards) * 100 : 0
  const isLastCard = currentIndex === totalCards

  return (
    <Card style={{ borderRadius: 12, marginTop: 24 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <TrophyOutlined style={{ fontSize: 20, color: '#faad14' }} />
            <Text strong>
              Карточка {currentIndex} из {totalCards}
            </Text>
          </Space>
          <Text type="secondary">{Math.round(progress)}% завершено</Text>
        </div>

        <Progress
          percent={Math.round(progress)}
          status="active"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
        />

        <Button
          type="primary"
          size="large"
          icon={<RightOutlined />}
          onClick={onNext}
          block
          style={{ height: 48, fontSize: 16, fontWeight: 500 }}
        >
          {isLastCard ? 'Начать новый круг' : 'Следующая карточка'}
        </Button>

        {isLastCard && (
          <Text type="success" style={{ textAlign: 'center', display: 'block' }}>
            Поздравляем! Вы прошли все карточки. Начните новый круг для повторения.
          </Text>
        )}
      </Space>
    </Card>
  )
}

export default Stats