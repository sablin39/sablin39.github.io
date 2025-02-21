FROM debian:stable-slim

RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod a+x /opt/entrypoint.sh && chmod 777 /opt/entrypoint.sh

# Install Node.js 18.17.1
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    &&npm config set registry https://registry.npmmirror.com/ \
    && npm install -g npm \
    && npm install -g hexo-cli --save

RUN addgroup --gid 1000 hexo && adduser --gid 1000 --uid 1000 hexo
USER hexo

# Set working directory
WORKDIR /home/hexo/blog


ENTRYPOINT ["/bin/bash", "-c", "source /opt/entrypoint.sh && exec \"$@\"", "--"]
