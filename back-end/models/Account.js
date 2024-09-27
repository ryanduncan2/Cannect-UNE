import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// TODO: disallow whitespace and other illegal username characters.
const accountSchema = new mongoose.Schema(
{
    public_id:
    {
        type: String,
        require: true,
        unique: true
    },
    username: 
    {
        type: String,
        require: true,
        unique: true
    },
    email:
    {
        type: String,
        require: true,
        unique: true
    },
    password:
    {
        type: String,
        require: true
    },
    permission_level:
    {
        type: Number,
        require: true
    }
}, { collection: 'accounts' });

// Static Methods

accountSchema.statics.login = async function(username, password)
{
    if (!password)
    {
        throw Error('Invalid Password');
    }

    if (!username)
    {
        throw Error('Invalid Username');
    }

    const user = await this.findOne({ username });

    if (user)
    {
        const auth = await bcrypt.compare(password, user.password);
    
        if (auth && password)
        {
            return user;
        }

        throw Error('Invalid Password');
    }

    throw Error('Invalid Username');
}

const Account = mongoose.model('Account', accountSchema);

export { Account };