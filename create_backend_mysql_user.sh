#!/bin/bash

echo "GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';" | 
    mysql -u root -p"$MYSQL_ROOT_PASSWORD";
echo "FLUSH PRIVILEGES;" | 
    mysql -u root -p"$MYSQL_ROOT_PASSWORD";

