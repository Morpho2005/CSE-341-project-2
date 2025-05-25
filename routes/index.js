const router = require('express').Router();

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    //#swager.tags=['Hello World!']
    res.send('Hello World')
});

router.use('/produce', require('./produce'))

module.exports = router;