docker run \
  --name postgres \
  -e POSTGRES_USER=cahmoraes
  -e POSTGRES_PASSWORD="senha01"
  -e POSTGRES_DB=heroes \
  -p 5432:5432
  -d \
  postgres