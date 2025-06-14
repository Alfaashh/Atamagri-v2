const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('Receiving sensor data from ESP32');
    
    // Debug log
    context.log('Environment check:', {
        hasConnectionString: !!process.env.AZURE_STORAGE_CONNECTION_STRING,
        connectionStringLength: process.env.AZURE_STORAGE_CONNECTION_STRING?.length
    });
    
    const data = req.body;
    
    if (!data || !data.stationId) {
        context.res = {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                error: "Please provide valid sensor data with stationId",
                receivedData: data
            }
        };
        return;
    }
    
    try {
        // Check connection string
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("AZURE_STORAGE_CONNECTION_STRING not found in environment variables");
        }
        
        context.log('Creating TableClient...');
        const tableName = "SensorData";
        const tableClient = TableClient.fromConnectionString(connectionString, tableName);
        
        // Create table if not exists
        try {
            await tableClient.createTable();
            context.log('Table created or already exists');
        } catch (tableError) {
            // Table already exists is OK
            if (tableError.statusCode !== 409) {
                context.log('Table creation error:', tableError.message);
            }
        }
        
        // Prepare entity
        const entity = {
            partitionKey: String(data.stationId),
            rowKey: String(Date.now()),
            temperature: Number(data.temperature) || 0,
            humidity: Number(data.humidity) || 0,
            soilMoisture: Number(data.soilMoisture) || 0,
            soilMoistureRaw: Number(data.soilMoistureRaw) || 0,
            isRaining: Boolean(data.isRaining) || false,
            rainIntensity: Number(data.rainIntensity) || 0,
            timestamp: new Date().toISOString()
        };
        
        context.log('Saving entity:', entity);
        
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
                rowKey: entity.rowKey,
                partitionKey: entity.partitionKey
            }
        };
    } catch (error) {
        context.log.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: {
                error: "Error saving data",
                details: error.message,
                type: error.name
            }
        };
    }
};
