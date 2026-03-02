-- Debug User Role Query
-- Check what role your current user has in the database

SELECT email, name, role FROM users WHERE email = 'your-email@example.com';

-- If role is not 'admin', you'll get the authentication error
-- Update the role to 'admin' for your user

UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

-- After updating, try logging out and logging back in
