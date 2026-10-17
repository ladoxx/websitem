# FMKAL.com — Dağıtım ve Kurulum Kılavuzu (Coolify & Homelab)

Bu proje, **Furkan Mert Kalyon (FMKAL)** için özel olarak tasarlanmış, **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Three.js (3D Luminous Digital Globe)** ve **Framer Motion** ile güçlendirilmiş bağımsız bir dijital stüdyo web sitesidir.

---

## 🏗️ 1. Mimari ve Güvenlik Yapısı

```
[ İnternet / Ziyaretçi ]
          │
          ▼
   [ Cloudflare Edge ] (DDoS Koruma, CDN, Otomatik SSL)
          │
          ▼  (Şifreli Güvenli Tünel - Sıfır Port Açma)
   [ Cloudflare Tunnel (cloudflared) ]
          │
          ▼
   [ Homelab / Coolify Sunucusu ]
          │
          ▼
   [ Docker Konteynerı: fmkal-web (Port 3000) ]
```

* **Sıfır Port Açma:** Ev modeminizden dışarıya hiçbir port (80, 443 vb.) açmanız gerekmez.
* **IP Gizliliği:** Ev IP adresiniz dışarıya asla sızmaz; `fmkal.com` yalnızca Cloudflare IP'leri üzerinden yanıt verir.
* **İzole Konteyner:** Web sitesi izole bir Docker konteynerında çalıştığı için homelab'deki diğer servislerinize temas edemez.

---

## 2. Coolify ile canlıya alma

### Yöntem A: GitHub / GitLab ile Otomatik Dağıtım (Önerilen)

1. Bu klasörü kendi GitHub hesabınıza bir repo olarak yükleyin:
   ```bash
   git init
   git add .
   git commit -m "feat: FMKAL cinematic brand website"
   git branch -M main
   git remote add origin https://github.com/<kullanici-adiniz>/fmkal.git
   git push -u origin main
   ```
2. **Coolify Panelinize** gidin.
3. **Projects -> New Resource -> Public/Private Repository** seçin.
4. `fmkal` reponuzu bağlayın ve Compose dosyasını (`docker-compose.yaml`) kullanın.
5. Coolify ortam değişkenlerinde `ADMIN_PASSWORD` değerini boş bırakın veya kaldırın. En az 32 karakterlik rastgele `ADMIN_SETUP_TOKEN` değerini secret olarak ekleyin. İsteğe bağlı olarak `CONTACT_WEBHOOK_URL` ekleyin.
6. Coolify domain ayarına `https://fmkal.com` girin ve uygulama portunu `3000` seçin.
7. Compose yapılandırması `coolify` adlı mevcut Docker ağını bekler. Ağ yoksa bu ağı oluşturun veya Compose dosyasındaki dış ağ adını Coolify proxy ağınızla eşleştirin.
8. Deploy edin. SQLite verisi `fmkal-data` adlı kalıcı Docker volume'unda saklanır; volume'u silmek veritabanını siler. Düzenli yedek alın.

> İlk deploy yeni bir SQLite veritabanı oluşturur ve örnek projeleri yükler; geliştirme bilgisayarındaki `data/fmkal.db` otomatik taşınmaz. Mevcut proje, mesaj veya ayar verilerini kullanacaksanız deploy öncesi veritabanını tutarlı bir SQLite yedeğiyle alın ve ilk çalıştırmadan önce Coolify volume'una aktarın.

---

## 🔒 3. Cloudflare Tunnel Ayarları

Eğer Cloudflare Zero Trust (Tunnels) kullanıyorsanız:

1. **Cloudflare Zero Trust Dashboard -> Networks -> Tunnels** yolunu izleyin.
2. Tünelinizin **Public Hostname** sekmesine yeni bir yönlendirme ekleyin:
   * **Subdomain:** `@` (veya boş bırakarak doğrudan `fmkal.com`)
   * **Domain:** `fmkal.com`
   * **Type:** `HTTP`
   * **URL:** `http://fmkal-web:3000`. `cloudflared` konteynerı da `coolify` Docker ağına bağlı olmalıdır. `localhost:3000` kullanmayın; bu, cloudflared konteynerının kendisini gösterir.
3. **Save** dediğiniz anda siteniz tüm dünyada `https://fmkal.com` üzerinden güvenle yayına girecektir.

---

## ⚙️ 4. Ortam Değişkenleri (`.env`)

İletişim formundan gelen mesajların e-posta veya anlık webhook (Telegram / Discord / n8n) ile size ulaşması için Coolify üzerinde şu değişkenleri tanımlayabilirsiniz:

| Değişken | Açıklama | Örnek Değer |
| :--- | :--- | :--- |
| `PORT` | Uygulama Portu | `3000` |
| `NODE_ENV` | Çalışma Modu | `production` |
| `NEXT_PUBLIC_SITE_URL` | Sitenin tam adresi | `https://fmkal.com` |
| `CONTACT_EMAIL` | Taleplerin düşeceği e-posta | `iletisim@fmkal.com` |
| `ADMIN_PASSWORD` | İsteğe bağlı önceden belirlenmiş admin parolası; webden ilk kurulum için boş bırakın | Varsayılan olarak boş |
| `ADMIN_SETUP_TOKEN` | Web üzerinden ilk admin parolasını belirlemek için tek kullanımlık kurulum anahtarı | En az 32 rastgele karakter, Coolify secret |
| `SQLITE_DB_PATH` | SQLite dosyasının yolu | `/app/data/fmkal.db` |
| `CONTACT_WEBHOOK_URL` | *(Opsiyonel)* Discord / Telegram / n8n Bildirim Webhook'u | `https://discord.com/api/webhooks/...` |

İlk deploy öncesinde `ADMIN_PASSWORD` boş olmalı ve `ADMIN_SETUP_TOKEN` Coolify secret olarak tanımlanmalıdır. `/admin` sayfasında bu token ile yeni admin parolasını bir kez belirleyin. Parola scrypt hash'i olarak SQLite volume'unda saklanır. Kurulumdan sonra `ADMIN_SETUP_TOKEN` değerini Coolify'den kaldırıp yeniden deploy edin. Parolayı veya token'ı repoya ya da Docker imajına koymayın. Mevcut oturum çerezleri 7 gün sonra sona erer.

---

## 💻 5. Yerel Test ve Geliştirme

Yerel makinenizde projeyi test etmek veya düzenlemek isterseniz:

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Üretim derlemesi oluştur
npm run build

# Üretim sunucusunu çalıştır
npm run start
```
Tarayıcınızda `http://localhost:3000` adresinden görüntüleyebilirsiniz.
