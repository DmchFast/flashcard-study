import React from 'react'
import { Upload, Button, Space, Typography, Card } from 'antd'
import { UploadOutlined, ReloadOutlined, FileTextOutlined } from '@ant-design/icons'

const { Text } = Typography

const UploadSection = ({ onUpload, onReset, hasWords }) => {
  const uploadProps = {
    beforeUpload: onUpload,
    accept: '.txt,.csv',
    showUploadList: false,
    maxCount: 1
  }

  return (
    <Card
      style={{
        marginBottom: 32,
        textAlign: 'center',
        background: '#f5f5f5',
        border: 'none'
      }}
    >
      <Space size="large" wrap>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} type="primary" size="large">
            Загрузить файл
          </Button>
        </Upload>

        {hasWords && (
          <Button icon={<ReloadOutlined />} onClick={onReset} size="large">
            Сбросить
          </Button>
        )}

        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0 12px' }}>
          <FileTextOutlined style={{ marginRight: 8 }} />
          <Text type="secondary">Формат: слово – перевод  или  слово | перевод</Text>
        </div>
      </Space>
    </Card>
  )
}

export default UploadSection