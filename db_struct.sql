CREATE TABLE ta_auth (
    auth_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    profile_pic_url TEXT
);

CREATE TABLE tournament (
    tournament_id SERIAL PRIMARY KEY,
    host INT NOT NULL REFERENCES ta_auth(auth_id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('single', 'double')), -- single or double elimination
    url TEXT,
    description TEXT,
    game VARCHAR(255),
    start_time TIMESTAMP,
    participants INT -- total number of participants
);

CREATE TABLE participant (
    participant_id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL REFERENCES tournament(tournament_id),
    name VARCHAR(255) NOT NULL,
    seed INT -- used for seeding in the tournament
);

CREATE TABLE tournament_round (
    round_id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL REFERENCES tournament(tournament_id),
    round_number INT NOT NULL
);

CREATE TABLE tournament_match (
    match_id SERIAL PRIMARY KEY,
    round_id INT NOT NULL REFERENCES tournament_round(round_id),
    match_number INT NOT NULL,
    participant1_id INT REFERENCES participant(participant_id),
    participant2_id INT REFERENCES participant(participant_id),
    winner_id INT REFERENCES participant(participant_id),
    match_time TIMESTAMP
);

