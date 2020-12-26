import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointmentsRepository: Appointment[];

    constructor() {
        this.appointmentsRepository = []
    }

    public all(): Appointment[] {
        const appointments = this.appointmentsRepository;

        return appointments;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date});

        this.appointmentsRepository.push(appointment);

        return appointment;
      };

    public findByDate(date: Date): Appointment | null {
        const appointment = this.appointmentsRepository.find(appointment => isEqual(appointment.date, date));

        return appointment || null;
    };
};

export default AppointmentsRepository;
