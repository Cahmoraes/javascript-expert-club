import { Payment } from './events/payment.js'
import { Shipment } from './observers/shipment.js'
import { Marketing } from './observers/marketing.js'
import { PaymentSubject } from './subjects/paymentSubject.js'

const subject = new PaymentSubject()
const payment = new Payment(subject)

const marketing = new Marketing()
const shipment = new Shipment()

subject.subscribe(marketing)
subject.subscribe(shipment)

payment.creditCard({ userName: 'Caique Moraes', id: Date.now() })

subject.unsubscribe(marketing)

payment.creditCard({ userName: 'Thomas Moraes', id: Date.now() })
