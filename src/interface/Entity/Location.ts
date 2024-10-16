interface Location {
    id: string;
    create_at: string;
    update_at: string;
    isDeleted: boolean;
    locationCode: string;
    maxCapacity: number;
    currentCapacity: number;
    maxWeight: number;
    currentWeight: number;
    occupied: boolean;
};

export default Location;
