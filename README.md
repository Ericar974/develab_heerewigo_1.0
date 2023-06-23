# Welcome to Heerwigo repo
## Prerequis :
docker
## Commandes :

## SET UP :
### create a .env file with .env.exemple
### put the db file in api/database folder ( named heerewigo_db.sql , you will need one, found on our discord )
### docker compose up --build
### docker exec -it heer-db bash
### mysql -u root -p
### ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';

# Start and Down :
### start app: docker compose up --build
### close app: docker compose down

### go on http://localhost/      for app 
### go on http://localhost:3000/ for api
