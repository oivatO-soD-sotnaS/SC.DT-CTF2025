FROM golang:1.24

# Instala dependências necessárias
RUN apt-get update && apt-get install -y \
    net-tools curl nmap

# Cria o usuário e grupo 'gogsuser'
RUN addgroup --system gibberish && \
    adduser --system --ingroup gibberish --home /home/gibberish gibberish

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia dependências antes para aproveitar cache
COPY go.mod go.sum ./
RUN go mod download

# Copia o código restante
COPY . .

# Configura o chisel
COPY chisel /usr/local/bin/chisel

RUN rm -rf chisel
RUN mv gogs-repositories/ /home/gibberish/gogs-repositories

# Muda permissões da pasta para o novo usuário
RUN chown -R gibberish:gibberish /usr/src/app

RUN chmod +x /home/gibberish/gogs-repositories/malefic-gibberish/movimento_lateral.sh

# Troca para o novo usuário
USER gibberish

# Compila o binário
RUN go build -v -o gogs

# Executa o Gogs como usuário não-root
CMD ["./gogs", "web"]
