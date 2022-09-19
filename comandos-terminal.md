# deletar diretório node_modules

rm -rf node_modules

# copiar diretório

cp -r rooter_dir root_dest

# restaurar as dependências garantindo as versões e pacotes

npm ci
