import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRepository = new AppointmentsRepository();

const appointmentsRouter = Router();
appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepository.all();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
