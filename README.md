# FMKAL Studio

Next.js 16, React, TypeScript, Tailwind CSS, Three.js ve SQLite ile geliştirilmiş çok dilli portföy ve dijital stüdyo sitesi. Yönetim panelinden projeler, iletişim mesajları ve site ayarları yönetilir.

## Gereksinimler

- Node.js 22 veya üzeri ve npm
- Canlı dağıtım için Docker Engine ve Docker Compose

## Yerel Geliştirme

Bağımlılıkları kurun, ardından PowerShell'de admin parolasını tanımlayıp geliştirme sunucusunu başlatın:

```powershell
npm ci
$env:ADMIN_PASSWORD = 'benzersiz-guclu-bir-parola'
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)  
Yönetim paneli: [http://localhost:3000/admin](http://localhost:3000/admin)

`ADMIN_PASSWORD` admin girişi için zorunludur. Tanımlı değilse giriş isteği yapılandırma hatası döndürür. Gerçek parolanızı kaynak dosyalarına yazmayın veya Git'e göndermeyin. PowerShell'de verilen değer yalnızca o terminal oturumu boyunca geçerlidir. Admin oturumları 7 gün sonra sona erer; parola değiştirildiğinde mevcut oturumlar geçersiz olur.

Üretim derlemesi için:

```powershell
npm run build
```

Proje Next.js standalone çıktısı kullanır. Dockerfile gerekli statik dosyaları imaja kopyalayıp `node server.js` ile başlatır. Üretimde `next start` kullanmayın.

## Coolify ile Dağıtım

1. Git deposunu Coolify'de Docker Compose kaynağı olarak ekleyin ve depo kökündeki `docker-compose.yaml` dosyasını seçin.
2. Coolify ortam değişkenlerine `ADMIN_PASSWORD` ekleyin ve değerini secret olarak saklayın. Parolayı repoya eklemeyin. İletişim formu bildirimi gerekiyorsa `CONTACT_WEBHOOK_URL` değerini de tanımlayın.
3. Coolify domain ayarına sitenin adresini ekleyin ve uygulama portunu `3000` olarak seçin. Farklı bir domain kullanıyorsanız `docker-compose.yaml` içindeki `NEXT_PUBLIC_SITE_URL` değerini de güncelleyin.
4. Compose dosyası mevcut `coolify` adlı Docker ağını bekler. Sunucuda bu ağın bulunduğunu doğrulayın; yoksa dosyadaki dış ağ adını Coolify proxy ağınızla eşleştirin.
5. Deploy edin. SQLite verisi `fmkal-data` adlı kalıcı Docker volume'unda `/app/data/fmkal.db` yolunda tutulur. Volume'u silmek veritabanını siler; düzenli yedek alın.

İlk deploy boş bir veritabanı oluşturur ve örnek projeleri yükler. Geliştirme bilgisayarındaki `data/fmkal.db` otomatik aktarılmaz. Mevcut proje, mesaj veya ayarlarınızı korumanız gerekiyorsa ilk çalıştırmadan önce tutarlı bir SQLite yedeği alıp kalıcı volume'a aktarın.

Cloudflare Tunnel Docker'da çalışıyorsa aynı `coolify` ağına bağlayıp origin olarak `http://fmkal-web:3000` kullanın. Tunnel konteynerından `localhost:3000` kullanmayın; bu adres tunnel konteynerının kendisini gösterir.
