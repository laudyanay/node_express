const {createDBPool} = require('../config/db')

const sqlExec = (req, res, next, {sql, timeout, values}) => {
    console.log("sqlExec", sql, values)
    return new Promise((resolve, reject) => {
        const DB = createDBPool();
        DB.query({
            sql : sql || null,
            timeout : 10000 || null,
            values : values || null
        }, (error, result) => {
            if(error){
                return reject(error);
            }else{
                return resolve(result);
            }
        })
    })
}
module.exports = sqlExec