const mongoose = require('mongoose');
require('dotenv').config();

// Update your role to admin
async function updateAdminRole() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-heritage');
    
    const User = require('./src/models/User');
    
    // Update your role to admin
    const result = await User.updateOne(
      { email: 'getahunasefa277@gmail.com' },
      { role: 'admin' }
    );
    
    console.log('Update result:', result);
    console.log('✅ Your role has been updated to admin!');
    
    // Verify the update
    const user = await User.findOne({ email: 'getahunasefa277@gmail.com' });
    console.log('Updated user:', { name: user.name, email: user.email, role: user.role });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating role:', error);
    process.exit(1);
  }
}

updateAdminRole();
