FROM php:8.3-cli

# ---------------------------------------
# Variables básicas
# ---------------------------------------
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    NODE_ENV=production

# ---------------------------------------
# Dependencias del sistema + PHP extensions
# ---------------------------------------
RUN apt-get update && apt-get install -y \
    git unzip zip curl ca-certificates \
    libzip-dev libonig-dev \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libxml2-dev libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo pdo_mysql pdo_pgsql pgsql \
        zip mbstring xml gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------------------
# Node.js 18 LTS (sin repos, sin DockerHub)
# ---------------------------------------
RUN curl -fsSL https://nodejs.org/dist/v18.20.1/node-v18.20.1-linux-x64.tar.xz -o /tmp/node.tar.xz \
    && mkdir -p /usr/local/node \
    && tar -xJf /tmp/node.tar.xz -C /usr/local/node --strip-components=1 \
    && ln -s /usr/local/node/bin/* /usr/local/bin/ \
    && rm /tmp/node.tar.xz

# ---------------------------------------
# Composer (binario oficial, anti rate-limit)
# ---------------------------------------
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer

# ---------------------------------------
# Workdir
# ---------------------------------------
WORKDIR /var/www/html

# ---------------------------------------
# Composer deps (cache eficiente)
# ---------------------------------------
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

# ---------------------------------------
# Frontend deps (cache eficiente)
# ---------------------------------------
COPY package.json package-lock.json* ./
RUN if [ -f package.json ]; then npm install; fi

# ---------------------------------------
# Código fuente
# ---------------------------------------
COPY . .

# ---------------------------------------
# Build frontend
# ---------------------------------------
RUN if [ -f package.json ]; then npm run build; fi

# ---------------------------------------
# Permisos Laravel
# ---------------------------------------
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# ---------------------------------------
# Run
# ---------------------------------------
EXPOSE 8080
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} -t public"]
