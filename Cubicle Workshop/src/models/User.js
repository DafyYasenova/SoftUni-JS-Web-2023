const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
    },
});

userSchema.virtual('repeatPassword')
.set(function(value){
    if(value !== this.password){
        throw new mongoose.MongooseError('Password don\'t match!')
    }
});

userSchema.pre('save', async function(){
const hash = await bcrypt.hash(this.password, 12);
this.password = hash;

})

const User = mongoose.model('User', userSchema);

module.exports = User;