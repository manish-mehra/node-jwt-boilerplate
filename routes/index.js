const router = require('express').Router()

router.get('/', (req, res)=>
    res.send('test route')
)


module.exports = router