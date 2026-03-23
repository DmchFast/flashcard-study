# Как запустить проект

## 1. Запуск

### 1.1. Первый запуск. Установка пакета gh-pages

В терминале в папке проекта и установить пакет для автоматической публикации:

```bash
cd react-project
npm install --save-dev gh-pages
```

### 1.2. Настройка vite.config.js

В файле vite.config.js в корне проекта и добавить поле base:

```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
   plugins: [react()], 
   base: '/название-репозитория/' // добавляем эту строку 
}) 
```

**⚠  Важно:**
- Замените `'/название-репозитория/'` на реальное название вашего репозитория на GitHub
- В данном случае `'/flashcard-study/'`, обязательно слеши в начале и в конце

### 1.3. Добавление скриптов в package.json

Открыть package.json и добавить эти скрипты в раздел "scripts" если их нет:

```bash
"scripts": {
   "dev": "vite",
   "build": "vite build",
   "lint": "eslint .",
   "preview": "vite preview",
   "predeploy": "npm run build", 
   "deploy": "gh-pages -d dist"
}  
```

- predeploy — автоматически создаст оптимизированную сборку перед публикацией
- deploy — опубликует содержимое папки dist на GitHub Pages

### 1.4. Сохранить изменения и запушить на GitHub

Команды:

```bash
git add . 
git commit -m "Описание изменений" 
git push  
```

### 1.5. Публикация на GitHub Pages

Публикование одной командой:

```bash
npm run deploy 
```

**Что произойдёт:**
- Автоматически создастся оптимизированная сборка проекта (папка dist)
- Создастся специальная ветка gh-pages в вашем репозитории
- Содержимое папки dist загрузится в эту ветку
- GitHub Pages автоматически опубликует сайт

Процесс займёт 1-2 минуты. В конце будет сообщение:

`Published`

---

## Последующии обновления приложения потребуют только эти команды:

```bash
git add . 
git commit -m "Описание изменений" 
git push 
npm run deploy
```

Через 1-2 минуты изменения появятся на опубликованном сайте.