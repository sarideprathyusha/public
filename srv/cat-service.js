const cds = require('@sap/cds');

// import cf axios
//const SapCfAxios = require('sap-cf-axios').default;
const { Items } = cds.entities('my.items');


module.exports = async (srv) => {

    srv.on("READ", "Items", async (req, res) => {

        try {
            const tx = cds.transaction(req);

           


            const result = await tx.run(
                SELECT.from(Items)               
            )
            return result;

          
        }
        catch (error) {
            req.error({ code: 417, message: error.message })
        }

    });


    // function call event
    srv.on('functionEdit', async (req, res) => {
        const tx = cds.transaction(req);
        var val = req.data.ID;

         const result1 = await tx.run(
                UPDATE(Items).set({ cost: req.data.cost}).where({ ID: val })
                  

            ) .catch((error) => req.error({ code: 417, message: error.message }))
        
        
        return result1;
    });


   
}