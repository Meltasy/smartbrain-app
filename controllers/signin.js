const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    console.log('Received a sign-in request.');
    if (!email || !password) {
        return res.status(400).json('The form hasn\'t been filled in correctly.');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to find user.'))
            } else {
                res.status(400).json('Wrong username or password.');
            }
    })
    .catch(err => res.status(400).json('The username or password is incorrect.'));
}

module.exports = {
    handleSignin: handleSignin
}