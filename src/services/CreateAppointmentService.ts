import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const findAppointment = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointment) {
            throw new Error('This appointment is already booked');
        }

        const appointment = await appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
