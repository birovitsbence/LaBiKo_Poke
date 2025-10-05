FROM idomi27/vue:26
WORKDIR /app
COPY . .
RUN pnpm install --dangerously-allow-all-builds
CMD ["pnpm", "run", "dev", "--host"]