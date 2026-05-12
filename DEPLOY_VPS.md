# Deploy lên VPS

## Cấu trúc
- Frontend: React build vào `dist/`
- Backend: Express server tại `server/index.js` (port 3001)
- Dữ liệu: `server/wishes.json` (tự động tạo)

## Các bước deploy

### 1. Cài Node.js trên VPS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Upload code lên VPS
```bash
# Trên máy local - build frontend trước
npm install
npm run build

# Upload lên VPS (thay your-vps-ip và /var/www/wedding)
scp -r dist server package.json public root@your-vps-ip:/var/www/wedding
```

### 3. Cài dependencies trên VPS
```bash
cd /var/www/wedding
npm install --production
```

### 4. Chạy với PM2 (khuyến nghị)
```bash
# Cài PM2
npm install -g pm2

# Chạy server
pm2 start server/index.js --name wedding

# Tự khởi động khi reboot
pm2 startup
pm2 save
```

### 5. Cấu hình Nginx (nếu dùng port 80/443)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Lưu ý
- File `server/wishes.json` lưu toàn bộ lời chúc - backup thường xuyên
- Nếu restart server, dữ liệu vẫn còn (lưu vào file)
- Log: `pm2 logs wedding`

## Kiểm tra
- API GET: `curl http://your-vps-ip:3001/api/wishes`
- API POST: `curl -X POST http://your-vps-ip:3001/api/wishes -H "Content-Type: application/json" -d '{"name":"Test","message":"Hello"}'`
