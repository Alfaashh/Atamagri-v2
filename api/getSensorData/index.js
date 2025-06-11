const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const stationId = req.query.stationId || 'wisnu';
    
    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const tableName = "SensorData";
        const tableClient = TableClient.fromConnectionString(connectionString, tableName);
        
        // Query latest data
        const results = tableClient.listEntities({
            queryOptions: {
                filter: `PartitionKey eq '${stationId}'`,
                select: ["temperature", "humidity", "soilMoisture", "timestamp"]
            }
        });
        
        let latest = null;
        for await (const entity of results) {
            if (!latest || entity.timestamp > latest.timestamp) {
                latest = entity;
            }
        }
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                stationId: stationId,
                latest: latest || { message: "No data found" }
            }
        };
    } catch (error) {
        context.log.error('Error:', error);
        context.res = {
            status: 500,
            body: "Error retrieving data"
        };
    }
};
