import { Configuration as AuthConfiguration, AuthApi } from '#/auth'
import { Configuration as BookingConfiguration, BookingApi } from '#/bookings'
import { Configuration as CheckingConfiguration, CheckingApi } from '#/checking'
import { Configuration as NotificationsConfiguration, NotificationsApi } from '#/notifications'
import { Configuration as PaymentsConfiguration, PaymentsApi } from '#/payments'
import { Configuration as RoomsConfiguration, RoomsApi } from '#/rooms'
import { Configuration as SupportConfiguration, SupportApi } from '#/support'

export interface ApiServices {
  authApi: AuthApi
  bookingApi: BookingApi
  checkingApi: CheckingApi
  notificationsApi: NotificationsApi
  paymentsApi: PaymentsApi
  roomsApi: RoomsApi
  supportApi: SupportApi
}

export function useServices() {
  const accessToken = localStorage.getItem('jwtToken') || undefined

  const authConfiguration: AuthConfiguration = new AuthConfiguration({
    accessToken
  });
  const bookingConfiguration: BookingConfiguration = new BookingConfiguration({
    accessToken
  });
  const checkingConfiguration: CheckingConfiguration = new CheckingConfiguration({
    accessToken
  });
  const notificationsConfiguration: NotificationsConfiguration = new NotificationsConfiguration({
    accessToken
  });
  const paymentsConfiguration: PaymentsConfiguration = new PaymentsConfiguration({
    accessToken
  });
  const roomsConfiguration: RoomsConfiguration = new RoomsConfiguration({
    accessToken
  });
  const supportConfiguration: SupportConfiguration = new SupportConfiguration({
    accessToken
  });

  const authApi: AuthApi = new AuthApi(authConfiguration)
  const bookingApi: BookingApi = new BookingApi(bookingConfiguration)
  const checkingApi: CheckingApi = new CheckingApi(checkingConfiguration)
  const notificationsApi: NotificationsApi = new NotificationsApi(notificationsConfiguration)
  const paymentsApi: PaymentsApi = new PaymentsApi(paymentsConfiguration)
  const roomsApi: RoomsApi = new RoomsApi(roomsConfiguration)
  const supportApi: SupportApi = new SupportApi(supportConfiguration)

  return {
    authApi,
    bookingApi,
    checkingApi,
    notificationsApi,
    paymentsApi,
    roomsApi,
    supportApi
  }
}
