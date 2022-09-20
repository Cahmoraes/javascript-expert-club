import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import { Payment } from '../src/events/payment.js'
import { Marketing } from '../src/observers/marketing.js'
import { Shipment } from '../src/observers/shipment.js'
import { PaymentSubject } from '../src/subjects/paymentSubject.js'

describe('Teste Suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  })

  test('#PaymentSubject notify Observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn(),
    }

    const data = 'hello world'
    const expected = data
    subject.subscribe(observer)
    subject.notify(data)

    expect(observer.update).toBeCalledWith(expected)
  })

  test('#PaymentSubject should not notify unsubscribed Observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn(),
    }

    const data = 'hello world'

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name,
    )

    const data = { userName: 'caiquemoraes', id: Date.now() }
    payment.creditCard(data)

    expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data)
  })

  test('#All should notify subscribers after a credit car payment', () => {
    const subject = new PaymentSubject()
    const marketing = new Marketing()
    const shipment = new Shipment()

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)
    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { userName: 'caiquemoraes', id: Date.now() }

    payment.creditCard(data)

    expect(shipmentSpy).toHaveBeenCalledWith(data)
    expect(marketingSpy).toHaveBeenCalledWith(data)
  })
})
