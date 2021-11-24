const bcrypt = require('bcrypt')

module.exports = {
    bcryptHash(value,salt){
        const hashValue = bcrypt.hashSync(value,salt)
        return hashValue
    }
}