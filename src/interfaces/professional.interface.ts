export interface Professional {
    id:             number;
    user_id:        number;
    specialty_id:   number;
    description:    string;
    created_at:     Date;
    updated_at:     Date;
    specialty:      Specialty;
    availabilities: Availability[];
}

export interface Availability {
    id:                     number;
    date:                   Date;
    available_from:         string;
    available_to:           string;
    health_professional_id: number;
    created_at:             Date;
    updated_at:             Date;
}

export interface Specialty {
    id:         number;
    name:       string;
    created_at: null;
    updated_at: null;
}