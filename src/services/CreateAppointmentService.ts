import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRespository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentsRespository;

  public constructor(appointmentsRepository: AppointmentsRespository) {
    this.appointmentRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already  booked');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
