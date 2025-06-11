module.exports = async function (context, req) {
    const stationId = req.query.stationId || 'wisnu';
    
    // Untuk testing, return mock data dulu
    const mockData = {
        stationId: stationId,
        latest: {
            temperature: 25.5,
            humidity: 60,
            soilMoisture: 75,
            soilMoistureRaw: 2000,
            isRaining: false,
            rainIntensity: 0,
            timestamp: new Date().toISOString()
        },
        message: "Mock data - Table Storage belum disetup"
    };
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Untuk CORS
        },
        body: mockData
    };
};
