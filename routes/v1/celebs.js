const express = require('express');
const router = express.Router();
const sqlExec = require('../../lib/sqlExecute')

router.get('/', async function (req, res, next) {
    var response = await sqlExec(res, req, next, {
        sql: `select * from celebs where age > ?`,
        values: [21]
    });
    return res
        .status(200)
        .json({
            data: response
        })
});

router.get('/:id', async function (req, res, next) {
    try {
        var celebsid = req.params?.id
        var response = await sqlExec(res, req, next, {
            sql: `select id, name from celebs where id = ?`,
            values: [celebsid]
        });
        return res
            .status(200)
            .json({
                data: response
            })
    } catch (error) {
        console.log(error, error)
    }
});

router.post('/tambah', async function (req, res, next) {
    try {
        var {name, age, page} = req.body;
        var query_maxid = await sqlExec(req, res, next, {
            sql : `select max(id) as max_id from celebs`
        })

        var nextid = (query_maxid[0]?.max_id) + 1;
        var query_add = await sqlExec(req, res, next,{
            sql : `insert into celebs (id, name, age, x) values (?,?,?,?)`,
            values: [nextid, name, age, page]
        });
        return res
            .status(200)
            .json({
                messege:"succes"
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                messege: "error " + error
            })
    }
});

router.put('/edit', async function (req, res, next) {
    try {
        var {id, name, age, page} = req.body;

        var edit_query = await sqlExec(req, res, next,{
            sql : `update celebs set ? where id = ?`,
            values: [
                {
                    name:name,
                    age:age,
                    x:page
                },
                id
            ]
        });
        return res
            .status(200)
            .json({
                messege:"succes"
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                messege: "error " + error
            })
    }
})
module.exports = router;