docker build -t toolbox-app .

docker run -d -p 3100:3100 --name container-toolbox-app toolbox-app
