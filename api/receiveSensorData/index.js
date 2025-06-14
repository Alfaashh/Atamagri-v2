const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('Receiving sensor data from ESP32');
    
    const data = req.body;
    
    if (!data || !data.stationId) {
        context.res = {
            status: 400,
            body: "Please provide valid sensor data with stationId"
        };
        return;
    }
    
    try {
        // Connect to Table Storage
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const tableName = "SensorData";
        const tableClient = TableClient.fromConnectionString(connectionString, tableName);
        
        // Prepare entity - PENTING: gunakan camelCase untuk Azure Table
        const entity = {
            partitionKey: data.stationId,
            rowKey: new Date().getTime().toString(),
            temperature: data.temperature || 0,
            humidity: data.humidity || 0,
            soilMoisture: data.soilMoisture || 0,
            soilMoistureRaw: data.soilMoistureRaw || 0,
            isRaining: data.isRaining || false,
            rainIntensity: data.rainIntensity || 0,
            timestamp: new Date().toISOString()
        };
        
        // Save to table
        await tableClient.createEntity(entity);
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                message: "Data saved successfully",
                timestamp: entity.timestamp,
                rowKey: entity.rowKey
            }
        };
    } catch (error) {
        context.log.error('Error saving data:', error.message);
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                error: "Error saving data",
                details: error.message
            }
        };
    }
};
