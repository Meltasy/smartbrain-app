const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    console.log('Received a profile request.');
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('No user found.');
        }
    })
    .catch(err => res.status(400).json('Error finding user.'))
}

module.exports = {
    handleProfileGet
}