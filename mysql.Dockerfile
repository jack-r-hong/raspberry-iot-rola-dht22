FROM ibex/debian-mysql-server-5.7 

COPY ./create_backend_mysql_user.sh /docker-entrypoint-initdb.d