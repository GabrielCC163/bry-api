docker run --name docker-bry -e POSTGRES_PASSWORD=password -v /storage/docker/postgresql-data:/var/lib/postgresql/data -d postgres

docker exec -it docker-bry bash

psql -U postgres

\l
create database bry;
\l

