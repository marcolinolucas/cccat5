FROM postgres:11.7-alpine

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres
ENV PGDATA /data/postgres

COPY ./init.sql /docker-entrypoint-initdb.d/