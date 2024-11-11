export interface Appointment {
    id:                     number;
    health_professional_id: number;
    patient_id:             number;
    date:                   Date;
    start_time:             string;
    end_time:               string;
    status:                 string;
    created_at:             Date;
    updated_at:             Date;
    health_professional:    HealthProfessional;
}

export interface HealthProfessional {
    id:           number;
    user_id:      number;
    specialty_id: number;
    description:  string;
    created_at:   Date;
    updated_at:   Date;
    specialty:    Specialty;
    user:         User;
}

export interface Specialty {
    id:         number;
    name:       string;
    created_at: null;
    updated_at: null;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    created_at:        null;
    updated_at:        Date;
    role:              string;
}