const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const stationId = req.query.stationId || 'wisnu';
    
    context.log(`Getting sensor data for station: ${stationId}`);
    
    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const tableName = "SensorData";
        const tableClient = TableClient.fromConnectionString(connectionString, tableName);
        
        // Query latest data
        const results = tableClient.listEntities({
            queryOptions: {
                filter: `PartitionKey eq '${stationId}'`,
                select: ["temperature", "humidity", "soilMoisture", "timestamp", "rowKey"]
            }
        });
        
        let latest = null;
        let count = 0;
        
        for await (const entity of results) {
            count++;
            if (!latest || entity.rowKey > latest.rowKey) {
                latest = entity;
            }
        }
        
        context.log(`Found ${count} records for station ${stationId}`);
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                stationId: stationId,
                count: count,
                latest: latest || { message: "No data found" }
            }
        };
    } catch (error) {
        context.log.error('Error retrieving data:', error.message);
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                error: "Error retrieving data",
                details: error.message
            }
        };
    }
};
