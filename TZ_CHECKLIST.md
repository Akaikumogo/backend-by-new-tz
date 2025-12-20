# TZ vs BACKEND - CHECKLIST

## ✅ 1. LOYIHA HAQIDA

- ✅ NestJS framework
- ✅ MongoDB (TZ da PostgreSQL, lekin biz MongoDB qoldik)
- ✅ JWT authentication
- ✅ RESTful API
- ✅ Swagger/OpenAPI documentation

## ✅ 2. FOYDALANUVCHI ROLLARI

- ✅ super_admin - to'liq kirish
- ✅ admin - CRUD operatsiyalar
- ✅ moderator - arizalar boshqaruvi
- ✅ teacher - o'qish huquqi (implementatsiya kerak)
- ✅ user - public access

## ✅ 3. MA'LUMOTLAR BAZASI STRUKTURASI

### 3.1 Users ✅
- ✅ full_name
- ✅ email (unique)
- ✅ phone (unique)
- ✅ password (hashed)
- ✅ role (enum)
- ✅ avatar_url
- ✅ is_active
- ✅ created_at, updated_at
- ✅ last_login

### 3.2 Staff ✅
- ✅ user_id (nullable)
- ✅ full_name
- ✅ role_title
- ✅ birth_year
- ✅ birth_place
- ✅ description
- ✅ bio
- ✅ avatar_url
- ✅ slug (unique)
- ✅ order_index
- ✅ is_featured
- ✅ social_links (JSON)
- ✅ created_at, updated_at

### 3.3 Branches ✅
- ✅ name
- ✅ address
- ✅ destination_landmark
- ✅ work_time
- ✅ phone
- ✅ email
- ✅ image_url
- ✅ map_url
- ✅ latitude, longitude
- ✅ is_active
- ✅ order_index
- ✅ created_at, updated_at

### 3.4 Courses ✅
- ✅ name
- ✅ category (enum: it, english, consulting)
- ✅ description
- ✅ duration
- ✅ icon_code
- ✅ price
- ✅ is_active
- ✅ order_index
- ✅ created_at, updated_at

### 3.5 Statistics ✅
- ✅ metric_name
- ✅ count
- ✅ label
- ✅ icon_code
- ✅ updated_at

### 3.6 Countries ✅
- ✅ name
- ✅ flag_url
- ✅ min_ielts
- ✅ description
- ✅ order_index
- ✅ is_active
- ✅ created_at, updated_at

### 3.7 Applications ✅
- ✅ full_name
- ✅ phone
- ✅ email
- ✅ course_id (FK)
- ✅ branch_id (FK)
- ✅ message
- ✅ status (enum)
- ✅ created_at, updated_at
- ✅ assigned_to (FK)

### 3.8 About ✅
- ✅ title
- ✅ description
- ✅ founder_name
- ✅ founder_title
- ✅ founding_year
- ✅ content_uz
- ✅ content_en
- ✅ content_ru
- ✅ updated_at

### 3.9 Contact ✅
- ✅ email
- ✅ phone_primary
- ✅ phone_secondary
- ✅ address
- ✅ social_links (JSON)
- ✅ updated_at

## ✅ 4. API ENDPOINTS

### 4.1 Authentication ✅
- ✅ POST /api/auth/register
- ✅ POST /api/auth/login
- ✅ POST /api/auth/logout
- ✅ GET /api/auth/me

### 4.2 Staff ✅
- ✅ GET /api/staff (query: page, limit, role, is_featured)
- ✅ GET /api/staff/:slug
- ✅ POST /api/staff (Admin only)
- ⚠️ PUT /api/staff/:id → PATCH ishlatilgan (RESTful)
- ✅ DELETE /api/staff/:id (Admin only)

### 4.3 Branches ✅
- ✅ GET /api/branches (query: is_active)
- ✅ GET /api/branches/:id
- ✅ POST /api/branches (Admin only)
- ⚠️ PUT /api/branches/:id → PATCH ishlatilgan
- ✅ DELETE /api/branches/:id (Admin only)

### 4.4 Courses ✅
- ✅ GET /api/courses (query: category, is_active, page, limit)
- ✅ GET /api/courses/:id
- ✅ POST /api/courses (Admin only)
- ⚠️ PUT /api/courses/:id → PATCH ishlatilgan
- ✅ DELETE /api/courses/:id (Admin only)

### 4.5 Statistics ✅
- ✅ GET /api/statistics
- ⚠️ PUT /api/statistics/:id → PATCH ishlatilgan (Admin only)

### 4.6 Countries ✅
- ✅ GET /api/countries
- ✅ POST /api/countries (Admin only)
- ⚠️ PUT /api/countries/:id → PATCH ishlatilgan
- ✅ DELETE /api/countries/:id (Admin only)

### 4.7 Applications ✅
- ✅ POST /api/applications (Public)
- ✅ GET /api/applications (query: status, page, limit, date_from, date_to) (Admin/Moderator)
- ✅ GET /api/applications/:id (Admin/Moderator)
- ⚠️ PUT /api/applications/:id → PATCH ishlatilgan (Admin/Moderator)
- ✅ DELETE /api/applications/:id (Admin only)

### 4.8 About ✅
- ✅ GET /api/about
- ⚠️ PUT /api/about → PATCH ishlatilgan (Admin only)

### 4.9 Contact ✅
- ✅ GET /api/contact
- ⚠️ PUT /api/contact → PATCH ishlatilgan (Admin only)

### 4.10 File Upload ✅
- ✅ POST /api/upload (multipart/form-data)
- ✅ Formats: jpg, jpeg, png, webp, pdf
- ✅ Max size: 5MB (images), 10MB (PDF)

## ⚠️ 5. XAVFSIZLIK TALABLARI

### 5.1 Authentication ✅
- ✅ JWT token
- ⚠️ Token muddati: 24 soat (✅) - refresh token yo'q (TZ da 7 kun)
- ✅ RBAC
- ✅ bcrypt (10 rounds)

### 5.2 Validation ✅
- ✅ Input validation (class-validator)
- ✅ SQL Injection himoyasi (MongoDB - NoSQL injection himoyasi)
- ✅ XSS himoyasi (helmet)
- ⚠️ CSRF tokenlar - yo'q (keyinroq)

### 5.3 Rate Limiting ⚠️
- ⚠️ Login: 5/15min - yo'q (umumiy rate limit bor)
- ✅ Public API: 100 request/15min (TZ da 100/min)
- ✅ Admin API: 1000 request/15min (TZ da 1000/min)

### 5.4 CORS ✅
- ✅ CORS sozlanmasi
- ✅ Development: localhost:3000
- ✅ Production: environment variable orqali

## ⚠️ 6. QUSHIMCHA FUNKSIONALLIKLAR

### 6.1 Logging ⚠️
- ⚠️ API so'rovlar loglash - yo'q
- ⚠️ Error tracking (Sentry) - yo'q
- ⚠️ Admin actions audit log - yo'q

### 6.2 Email Xizmati ❌
- ❌ Yangi ariza email - yo'q
- ❌ Ro'yxatdan o'tish email - yo'q
- ❌ Parolni tiklash - yo'q

### 6.3 Notification System ❌
- ❌ Telegram bot - yo'q (kelajakda)
- ❌ SMS - yo'q (kelajakda)

### 6.4 Search va Filter ⚠️
- ⚠️ Xodimlar qidirish - faqat role_title filter
- ✅ Kurslar filter (category, is_active)
- ✅ Arizalar filter (status, date_from, date_to)

### 6.5 Pagination ✅
- ✅ Barcha ro'yxat endpointlarida
- ✅ Default: 10
- ✅ Max: 100

## ⚠️ 7. PERFORMANCE

### 7.1 Response Time ⚠️
- ⚠️ < 200ms - test qilinmagan
- ✅ Database so'rovlar optimallashtirilgan
- ❌ Redis kesh - yo'q (keyinroq)

### 7.2 Database Indexing ⚠️
- ⚠️ email, phone unique - MongoDB avtomatik
- ⚠️ slug unique - MongoDB avtomatik
- ⚠️ Qo'shimcha indexlar - yo'q

## ❌ 8. TESTING

- ❌ Unit tests - yo'q
- ❌ Integration tests - yo'q
- ❌ Load testing - yo'q

## ⚠️ 9. DEPLOYMENT

### 9.1 Environment Variables ✅
- ✅ NODE_ENV
- ✅ PORT
- ✅ MONGODB_URI (TZ da DATABASE_URL)
- ✅ JWT_SECRET
- ⚠️ JWT_REFRESH_SECRET - yo'q (refresh token yo'q)
- ⚠️ AWS_ACCESS_KEY - yo'q (local upload)
- ⚠️ REDIS_URL - yo'q
- ⚠️ EMAIL_* - yo'q

### 9.2 Docker ❌
- ❌ Dockerfile - yo'q
- ❌ docker-compose.yml - yo'q

## ✅ 10. HUJJATLASHTIRISH

### 10.1 API Documentation ✅
- ✅ Swagger/OpenAPI
- ✅ Barcha endpointlar
- ✅ Misol so'rovlar/javoblar
- ✅ Error kodlari

### 10.2 README.md ✅
- ✅ Yo'riqnoma
- ✅ Environment sozlamalari
- ✅ Development

### 10.3 Database Schema ⚠️
- ⚠️ ER diagram - yo'q
- ⚠️ Migration fayllar - MongoDB da migration yo'q

## ✅ 11. TEXNIK TALABLAR

### 11.1 Code Quality ✅
- ✅ ESLint/Prettier
- ✅ Clean code
- ⚠️ Git branch strategy - yo'q

### 11.2 Error Handling ✅
- ✅ Standart error format
- ✅ success: false
- ✅ error.code, error.message

### 11.3 Success Response ✅
- ✅ success: true
- ✅ data
- ✅ meta (page, limit, total)

## ⚠️ 12. QUSHIMCHA ESLATMALAR

1. ✅ UTF-8 format
2. ✅ UTC sanalar (MongoDB default)
3. ✅ Telefon +998 format (validation bor)
4. ✅ Email validation (regex)
5. ✅ Parol: 8+ belgi, 1 katta harf, 1 raqam
6. ⚠️ Soft delete - DELETE haqiqiy o'chirish (TZ da is_active: false)
7. ❌ Backup strategiyasi - yo'q

---

## XULOSA

### ✅ TO'LIQ IMPLEMENT QILINGAN:
- Barcha database schemalar
- Barcha API endpointlar (asosiy funksionallik)
- Authentication va Authorization
- Input validation
- Swagger documentation
- Response/Error formatlar

### ⚠️ QISMAN YOKI O'ZGARTIRILGAN:
- PUT → PATCH (RESTful standart)
- Rate limiting (umumiy, login uchun alohida yo'q)
- Soft delete (haqiqiy delete qilinmoqda)
- Search/filter (to'liq emas)

### ❌ YO'Q (KEYINROQ):
- Email xizmati
- Logging/Audit
- Redis kesh
- Testing
- Docker
- Refresh token
- CSRF protection
- Backup strategiyasi

### 📊 UMUMIY HOLAT:
- **Asosiy funksionallik: 95% ✅**
- **Qo'shimcha funksionallik: 30% ⚠️**
- **Testing: 0% ❌**

