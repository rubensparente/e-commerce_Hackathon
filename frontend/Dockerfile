FROM node:18

WORKDIR /app

# Instalar dependências de compilação
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Copiar apenas package files primeiro (cache layer)
COPY package*.json ./

# Criar script de inicialização
RUN echo '#!/bin/sh\n\
echo "📦 Instalando dependências..."\n\
npm install --force\n\
echo "🔧 Reconstruindo TailwindCSS..."\n\
npm rebuild @tailwindcss/oxide\n\
echo "🚀 Iniciando servidor..."\n\
npm run dev -- --host 0.0.0.0\n\
' > /start.sh && chmod +x /start.sh

# Copiar código fonte
COPY . .

EXPOSE 5173

CMD ["/start.sh"]