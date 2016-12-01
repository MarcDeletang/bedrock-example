#! /bin/bash

if [ $# -eq 0 ]
	then
	exit 0;
fi

if [ $1 == "export" ]
	then
	sudo -u postgres pg_dump -s -f db.dump $2
fi

if [ $1 == "import" ]
	then
	sudo -u postgres dropdb $2;
	sudo -u postgres createdb $2;
	sudo -u postgres psql $2 < db.dump;
fi
