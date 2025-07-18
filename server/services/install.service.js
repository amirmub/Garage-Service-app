const dbConnection = require('../config/db.config');
// import fs module
const fs = require('fs');

async function install() {
    const queryFile = __dirname + '/sql/initial-queries.sql';
    // console.log(queryFile);
    
    let queries = [];
    let finalMessage = {};
    let tempLine = '';

    // read the sql file
    const lines = await fs.readFileSync(queryFile, 'utf8').split('\n');
    const executed = await new Promise((resolve, reject) => {
        // iterate all lines
        lines.forEach((line) => {
            if (line.trim().startsWith('--')|| line.trim() === '') {
                // skip comments and empty lines
                return;
            }

            tempLine += line;
            if (line.trim().endsWith(';')) {
              const sqlQuery = tempLine.trim();
              queries.push(sqlQuery);
              tempLine = '';
            }
        });
        resolve("queries are added to the list")
        });

    for (let i = 0; i < queries.length; i++) {
        try {
            const result = await dbConnection.query(queries[i]);
            // console.log(`Table ${i + 1} Created successfully: ${queries[i]}`);
          
        } catch (error) {
          return  finalMessage.msg = `Not all table created ${i + 1}: ${error.message}`;
        }
        
    }
    // prepare the final message to controller
    if (!finalMessage.msg) {
         finalMessage.msg = "All tables created successfully";
        return finalMessage.status = 200;
    } else {
        return finalMessage.status = 500;
    }

}

module.exports = { install };