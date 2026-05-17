-- =====================================================================
-- Seed app-buggee-42
-- Importer apres CREATE DATABASE app_buggee :
--   mysql -u root -p app_buggee < db/seed.sql
-- =====================================================================

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Compte test : test@test.com / password123
-- Compte admin : admin@test.com / admin123
INSERT INTO users (email, password) VALUES
  ('test@test.com',  '$2a$10$8Wd4Tw98V40dJVZd1X5mAeFG5I3oDLc49YFZuK0ubytnc/90NcIsu'),
  ('admin@test.com', '$2a$10$2H3pjCUJHOKKEdzIMO1L9OgbtS3bmkD/YOdJWESaoeKi0HYB25di.');

INSERT INTO products (name, price, stock) VALUES
  ('Clavier mecanique',  89.90, 12),
  ('Souris ergonomique',  45.00, 30),
  ('Ecran 27 pouces',    349.99,  5),
  ('Casque audio USB',    79.50, 18),
  ('Webcam Full HD',      59.00, 22);
