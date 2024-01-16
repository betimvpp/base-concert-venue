export const venueCapacity = 400;

// this will eventually use environment variables
export const getDbPath = (): string => {
    if (!process.env.DB_PATH) {
        throw new Error('Missing  process.env.DB_PATH');
    }
    console.log("DB_PATH", process.env.DB_PATH);
    
    return process.env.DB_PATH
}; 
