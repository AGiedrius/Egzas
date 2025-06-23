## Projekto struktūra

- **backend** – Node.js, Express, PostgreSQL, pg_trgm paieškai
- **frontend** – React, Bootstrap, modernus dizainas
- **db** – PostgreSQL duomenų bazės struktūra ir skriptai

## Funkcionalumas

- **Admin**: vartotojų, knygų, kategorijų, rezervacijų valdymas
- **Svecias**: registracija, autentifikacija, knygų rezervacija, paieška, pratęsimas

## Duomenų bazės struktūra

- Vartotojai (Users): ID, Vardas, Pavardė, Gim. data, El. paštas, Rolė, Patvirtintas, Blokuotas, Slaptažodis
- Knygos (Books): ID, KategorijaID, Autorius, Pavadinimas, Kiekis
- Kategorijos: ID, Pavadinimas
- Rezervacijos: VartotojasID, KnygaID, Rezervacija nuo/iki, Pratęsimas, Grąžinta
