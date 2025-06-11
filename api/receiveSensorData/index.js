module.exports = async function (context, req) {
    context.log('Receiving sensor data from ESP32');
    
    const data = req.body;
    
    // Validasi data
    if (!data || !data.stationId) {
        context.res = {
            status: 400,
            body: "Please provide valid sensor data with stationId"
        };
        return;
    }
    
    // Tambahkan timestamp
    data.timestamp = new Date().toISOString();
    
    // Untuk testing dulu, return success
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            message: "Data received successfully",
            timestamp: data.timestamp,
            received: data
        }
    };
    
    // TODO: Nanti tambahkan code untuk save ke Table Storage
};
