# Étape 1 : Build de l'app React avec Vite
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Étape 2 : Serveur web avec Nginx
FROM nginx:alpine

# Copie du build vers le dossier nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie d'un fichier de conf Nginx basique (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
