import { Configuration, AuthApi } from '#/auth'
import { BookingApi } from '#/bookings'
import { CheckingApi } from '#/checking'
import { NotificationsApi } from '#/notifications'
import { PaymentsApi } from '#/payments'
import { RoomsApi } from '#/rooms'
import { SupportApi } from '#/support'

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

  const configuration: Configuration = new Configuration({
    accessToken
  })

  const authApi: AuthApi = new AuthApi(configuration)
  const bookingApi: BookingApi = new BookingApi(configuration)
  const checkingApi: CheckingApi = new CheckingApi(configuration)
  const notificationsApi: NotificationsApi = new NotificationsApi(configuration)
  const paymentsApi: PaymentsApi = new PaymentsApi(configuration)
  const roomsApi: RoomsApi = new RoomsApi(configuration)
  const supportApi: SupportApi = new SupportApi(configuration)

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
