const TODO_REMINDERS_DISABLED = true

export async function sendAppointmentReminder(appointmentId: string) {
  if (TODO_REMINDERS_DISABLED) {
    console.log('[TODO] Reminders disabled — appointment:', appointmentId)
    return
  }
  // 1. Fetch appointment + client + barber
  // 2. Send email via Resend with details + cancel/reschedule links
  // 3. Set reminderSent = true
}
