-- PostgreSQL DB struktūros kūrimo skriptas

CREATE TABLE kategorijos (
    id SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(100) NOT NULL
);

CREATE TABLE vartotojai (
    id SERIAL PRIMARY KEY,
    vardas VARCHAR(50) NOT NULL,
    pavarde VARCHAR(50) NOT NULL,
    gim_data DATE NOT NULL,
    el_pastas VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'svecias' CHECK (role IN ('admin', 'svecias')),
    patvirtintas BOOLEAN DEFAULT FALSE,
    blokuotas BOOLEAN DEFAULT FALSE,
    passworld VARCHAR(255) NOT NULL
);

CREATE TABLE knygos (
    id SERIAL PRIMARY KEY,
    kategorija_id INTEGER REFERENCES kategorijos(id),
    autorius VARCHAR(100) NOT NULL,
    pavadinimas VARCHAR(200) NOT NULL,
    kiekis INTEGER NOT NULL
);

CREATE TABLE rezervacijos (
    vartotojas_id INTEGER REFERENCES vartotojai(id),
    knyga_id INTEGER REFERENCES knygos(id),
    rezervacija_nuo DATE NOT NULL,
    rezervacija_iki DATE NOT NULL,
    pratesimas_iki DATE,
    grazinta BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (vartotojas_id, knyga_id, rezervacija_nuo)
);

-- Indeksas paieškai pagal pg_trgm
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS knygos_pavadinimas_trgm_idx ON knygos USING gin (pavadinimas gin_trgm_ops);
