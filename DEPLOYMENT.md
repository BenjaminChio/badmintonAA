# 羽毛球AA計算器 - 部署指南

本文檔提供了將羽毛球AA計算器部署到不同Web服務器環境的指南。

## 本地開發環境

### 安裝依賴

```bash
pip install -r requirements.txt
```

### 運行開發服務器

```bash
python app.py
```

應用將在 http://127.0.0.1:5000 上運行。

## 生產環境部署

### 使用Gunicorn (Linux/macOS)

1. 安裝Gunicorn:

```bash
pip install gunicorn
```

2. 啟動應用:

```bash
gunicorn wsgi:app
```

默認情況下，Gunicorn會在 http://127.0.0.1:8000 上運行。

### 使用Waitress (Windows)

1. 安裝Waitress:

```bash
pip install waitress
```

2. 創建一個啟動文件 `waitress_server.py`:

```python
from waitress import serve
from app import get_app

app = get_app()

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8000)
```

3. 運行服務器:

```bash
python waitress_server.py
```

### 部署到Heroku

1. 確保你有一個 `Procfile` (已包含在項目中):

```
web: gunicorn wsgi:app
```

2. 創建一個Heroku應用:

```bash
heroku create your-app-name
```

3. 部署應用:

```bash
git push heroku main
```

### 部署到其他平台

- **PythonAnywhere**: 使用WSGI配置指向 `wsgi.py` 文件
- **AWS Elastic Beanstalk**: 使用提供的WSGI配置
- **Google Cloud Run**: 使用Dockerfile和Cloud Build

## 環境變數配置

應用使用以下環境變數:

- `FLASK_ENV`: 設置為 `development` 或 `production`
- `DEBUG`: 設置為 `True` 或 `False`
- `SECRET_KEY`: 用於會話安全的密鑰

## 安全注意事項

在生產環境中:

1. 將 `DEBUG` 設置為 `False`
2. 設置一個強密碼作為 `SECRET_KEY`
3. 使用HTTPS保護所有流量
4. 考慮添加速率限制以防止濫用