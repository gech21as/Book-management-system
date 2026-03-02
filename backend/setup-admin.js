// Admin User Setup Script
// Run this in MongoDB shell or Node.js to create an admin user

const bcrypt = require('bcryptjs');

// Admin user data
const adminUser = {
  name: 'Admin User',
  email: 'admin@heritage.com',  // Change this to your preferred admin email
  password: 'admin123',          // Change this to a secure password
  role: 'admin'
};

// Hash the password
const hashedPassword = await bcrypt.hash(adminUser.password, 10);

// Create the admin user
db.users.insertOne({
  name: adminUser.name,
  email: adminUser.email,
  password: hashedPassword,
  role: adminUser.role,
  createdAt: new Date()
});

console.log('Admin user created successfully!');
console.log('Email:', adminUser.email);
console.log('Password:', adminUser.password);
console.log('Role:', adminUser.role);

// Alternative: Update existing user to admin role
// db.users.updateOne(
//   { email: 'your-email@example.com' },
//   { $set: { role: 'admin' } }
// );
