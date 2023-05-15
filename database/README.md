Put an export of heerewigo database format :( heerewigo_db.sql)

connect to db : docker exec -it mysql-db bash
then : mysql -u root -p

do a backup : docker exec mysql-db /usr/bin/mysqldump -u root --password=root heerewigo_db> ./database/heerewigo_db.sql