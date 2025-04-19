export const getVenues = async () => {
    const lat = 33.957409;
    const long = -83.376801;
    const radius = 10;

    try {
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?latlong=${lat},${long}&radius=${radius}&unit=miles&apikey=TRSZNWWbUl0gUBrCYFU3HKWK9L9FvEce`);
        const data = await res.json();
      
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



// hide data and make lat and long non static