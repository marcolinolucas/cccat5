import pgPromise from "pg-promise"

const pgp = pgPromise();

const db = pgp('postgres://postgres:postgres@localhost:5432/test_patterns');

export default db;