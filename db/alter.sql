\c rental_management;

ALTER TABLE users 
ADD COLUMN reset_token TEXT,
ADD COLUMN reset_token_expires_at TIMESTAMP,
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
