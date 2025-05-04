CREATE DATABASE chrisrecommend;

CREATE TABLE genome_scores (
  movieID INT NOT NULL,
  tagID INT NOT NULL,
  relevance DOUBLE PRECISION NOT NULL
);

CREATE TABLE genome_tags (
  tagID INT PRIMARY KEY,
  tag VARCHAR(1000) NOT NULL
);

CREATE TABLE rating_explicit (
  userID INT NOT NULL,
  tmdbID INT NOT NULL,
  rating DOUBLE PRECISION NOT NULL,
  timestamp VARCHAR(50)
);

CREATE TABLE ml_youtube (
  youtubeID VARCHAR(100) NOT NULL,
  movieID INT NOT NULL
);

CREATE TABLE movies (
  movieID SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  release_year VARCHAR(20),
  overview VARCHAR(2000),
  custom_add BOOLEAN DEFAULT FALSE
);

CREATE TABLE movie_imdb_tmdb (
  movieID INT NOT NULL,
  imdbID INT,
  tmdbID INT NOT NULL UNIQUE
);

CREATE TABLE genres (
  genreID INT PRIMARY KEY,
  genre_name VARCHAR(45) NOT NULL
);

CREATE TABLE movie_genres (
  movieID INT NOT NULL,
  genreID INT NOT NULL
);

CREATE TABLE users (
  userID SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  email VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE rating_implicit (
  userID INT NOT NULL,
  tmdbID INT NOT NULL,
  interaction INT NOT NULL,
  timestamp VARCHAR(50)
);

CREATE TABLE user_movielist (
  userID INT NOT NULL,
  tmdbID INT NOT NULL
);

CREATE TABLE daily_update (
  tmdbID INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE models_type (
  modelID INT PRIMARY KEY,
  modelType VARCHAR(45) NOT NULL
);

CREATE TABLE user_recommendations (
  userID INT NOT NULL,
  tmdbID INT NOT NULL,
  modelID INT NOT NULL,
  timestamp TIMESTAMP
);

-- Foreign Key Constraints
ALTER TABLE user_recommendations
    ADD CONSTRAINT ur_userID_fk FOREIGN KEY (userID) REFERENCES users (userID)
    ON DELETE CASCADE;
ALTER TABLE user_recommendations
    ADD CONSTRAINT ur_tmdbID_fk FOREIGN KEY (tmdbID) REFERENCES movie_imdb_tmdb (tmdbID)
    ON DELETE CASCADE;
ALTER TABLE user_recommendations
    ADD CONSTRAINT ur_modelID_fk FOREIGN KEY (modelID) REFERENCES models_type (modelID)
    ON DELETE CASCADE;

ALTER TABLE genome_scores
    ADD CONSTRAINT gs_tagID_fk FOREIGN KEY (tagID) REFERENCES genome_tags (tagID)
    ON DELETE CASCADE;

ALTER TABLE genome_scores
    ADD CONSTRAINT gs_movieID_fk FOREIGN KEY (movieID) REFERENCES movies (movieID)
    ON DELETE CASCADE; 

ALTER TABLE movie_genres
    ADD CONSTRAINT mg_movieID_fk FOREIGN KEY (movieID) REFERENCES movies (movieID)
    ON DELETE CASCADE;

ALTER TABLE movie_genres
    ADD CONSTRAINT mg_genreID_fk FOREIGN KEY (genreID) REFERENCES genres (genreID)
    ON DELETE CASCADE;

ALTER TABLE ml_youtube
    ADD CONSTRAINT ml_movieID_fk FOREIGN KEY (movieID) REFERENCES movies (movieID)
    ON DELETE CASCADE;

ALTER TABLE rating_explicit
    ADD CONSTRAINT rs_tmdbID_fk FOREIGN KEY (tmdbID) REFERENCES movie_imdb_tmdb (tmdbID)
    ON DELETE CASCADE;

ALTER TABLE rating_explicit
    ADD CONSTRAINT rs_userID_fk FOREIGN KEY (userID) REFERENCES users (userID)
    ON DELETE CASCADE;
    
ALTER TABLE rating_implicit
    ADD CONSTRAINT rss_tmdbID_fk FOREIGN KEY (tmdbID) REFERENCES movie_imdb_tmdb (tmdbID)
    ON DELETE CASCADE;

ALTER TABLE rating_implicit
    ADD CONSTRAINT rss_userID_fk FOREIGN KEY (userID) REFERENCES users (userID)
    ON DELETE CASCADE; 
    
ALTER TABLE movie_imdb_tmdb
    ADD CONSTRAINT mit_movie_fk FOREIGN KEY (movieID) REFERENCES movies (movieID)
    ON DELETE CASCADE; 
    
ALTER TABLE user_movielist
    ADD CONSTRAINT uml_user_fk FOREIGN KEY (userID) REFERENCES users (userID)
    ON DELETE CASCADE; 

ALTER TABLE user_movielist
    ADD CONSTRAINT uml_tmdb_fk FOREIGN KEY (tmdbID) REFERENCES movie_imdb_tmdb (tmdbID)
    ON DELETE CASCADE;

ALTER TABLE daily_update
    ADD CONSTRAINT du_tmdb_fk FOREIGN KEY (tmdbID) REFERENCES movie_imdb_tmdb (tmdbID)
    ON DELETE CASCADE;

-- Views
CREATE VIEW content_based_view AS
SELECT um.userID, m.movieID, mit.tmdbID, m.title, m.release_year, m.overview, g.genre_name
FROM user_movielist um
JOIN movie_imdb_tmdb mit ON mit.tmdbID = um.tmdbID
JOIN movies m ON m.movieID = mit.movieID
JOIN movie_genres mg ON mg.movieID = m.movieID
JOIN genres g ON g.genreID = mg.genreID;

CREATE VIEW train_content_data AS
SELECT movieID, title, release_year, overview, tmdbID 
FROM movies
JOIN movie_imdb_tmdb USING (movieID);