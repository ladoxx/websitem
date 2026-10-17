# FMKAL Studio

Next.js 16, React, TypeScript, Tailwind CSS, Three.js ve SQLite ile geliştirilmiş çok dilli portföy ve dijital stüdyo sitesi. Yönetim panelinden projeler, iletişim mesajları ve site ayarları yönetilir.

## Gereksinimler

- Node.js 22 veya üzeri ve npm
- Canlı dağıtım için Docker Engine ve Docker Compose

## Yerel Geliştirme

Bağımlılıkları kurun, PowerShell'de ilk kurulum için rastgele bir kurulum anahtarı üretin ve geliştirme sunucusunu başlatın:

```powershell
npm ci
$generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$bytes = New-Object byte[] 32
$generator.GetBytes($bytes)
$env:ADMIN_SETUP_TOKEN = [Convert]::ToBase64String($bytes)
Remove-Item Env:ADMIN_PASSWORD -ErrorAction SilentlyContinue
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)  
Yönetim paneli: [http://localhost:3000/admin](http://localhost:3000/admin)

İlk açılışta `/admin` sayfasında kurulum anahtarını ve yeni admin parolasını girin. Parola en az 10 karakter olmalıdır; SQLite veritabanına scrypt hash olarak kaydedilir ve kurulum yalnızca bir kez yapılabilir. `ADMIN_SETUP_TOKEN` en az 32 karakter olmalı ve gizli tutulmalıdır. Kurulum tamamlandıktan sonra bu değişkeni kaldırabilirsiniz. `ADMIN_PASSWORD` tanımlıysa web kurulumu atlanır ve bu env değeriyle giriş yapılır. Gerçek parolanızı veya kurulum anahtarınızı kaynak dosyalarına yazmayın ya da Git'e göndermeyin. Admin oturumları 7 gün sonra sona erer.

Üretim derlemesi için:

```powershell
npm run build
```

Proje Next.js standalone çıktısı kullanır. Dockerfile gerekli statik dosyaları imaja kopyalayıp `node server.js` ile başlatır. Üretimde `next start` kullanmayın.

## Coolify ile Dağıtım

1. Git deposunu Coolify'de Docker Compose kaynağı olarak ekleyin ve depo kökündeki `docker-compose.yaml` dosyasını seçin.
2. Coolify'de `ADMIN_PASSWORD` değerini boş bırakın veya kaldırın. En az 32 karakterlik rastgele bir `ADMIN_SETUP_TOKEN` değerini secret olarak ekleyin. İletişim formu bildirimi gerekiyorsa `CONTACT_WEBHOOK_URL` değerini de tanımlayın.
3. Coolify domain ayarına sitenin adresini ekleyin ve uygulama portunu `3000` olarak seçin. Farklı bir domain kullanıyorsanız `docker-compose.yaml` içindeki `NEXT_PUBLIC_SITE_URL` değerini de güncelleyin.
4. Compose dosyası mevcut `coolify` adlı Docker ağını bekler. Sunucuda bu ağın bulunduğunu doğrulayın; yoksa dosyadaki dış ağ adını Coolify proxy ağınızla eşleştirin.
5. Deploy edin. SQLite verisi `fmkal-data` adlı kalıcı Docker volume'unda `/app/data/fmkal.db` yolunda tutulur. Volume'u silmek veritabanını siler; düzenli yedek alın.

Deploy tamamlandıktan sonra `/admin` sayfasını açıp `ADMIN_SETUP_TOKEN` değerini ve belirlemek istediğiniz admin parolasını girin. İlk kurulumdan sonra setup token'ını Coolify ortam değişkenlerinden kaldırıp yeniden deploy edin. Admin parolası hash'li biçimde kalıcı SQLite volume'unda saklanır.

İlk deploy boş bir veritabanı oluşturur ve örnek projeleri yükler. Geliştirme bilgisayarındaki `data/fmkal.db` otomatik aktarılmaz. Mevcut proje, mesaj veya ayarlarınızı korumanız gerekiyorsa ilk çalıştırmadan önce tutarlı bir SQLite yedeği alıp kalıcı volume'a aktarın.

Cloudflare Tunnel Docker'da çalışıyorsa aynı `coolify` ağına bağlayıp origin olarak `http://fmkal-web:3000` kullanın. Tunnel konteynerından `localhost:3000` kullanmayın; bu adres tunnel konteynerının kendisini gösterir.
