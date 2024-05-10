import { it, vi, expect, describe } from 'vitest'
import { getPriceInCurrency, getShippingInfo, renderPage, submitOrder } from '../src/mocking'
import { getExchangeRate } from '../src/libs/currency'
import { getShippingQuote } from '../src/libs/shipping'
import { trackPageView } from '../src/libs/analytics'
import { charge } from '../src/libs/payment'

vi.mock('../src/libs/currency')
vi.mock('../src/libs/shipping')
vi.mock('../src/libs/analytics')
vi.mock('../src/libs/payment')
describe('test suite', () => {
    // it('test case', () => {
    //     const greet = vi.fn()
    //     // greet.mockResolvedValue('Hello')
    //     greet.mockImplementation(name => 'Hello ' + name)
    //     // greet().then(result => console.log(result))
    //     const result = greet('Mosh')
    //     console.log(result)

    //     greet()
    //     expect(greet).toHaveBeenCalledOnce()
    // })

    it('mocks sending a text', () => {
        // sendText(message) {}

        const sendText = vi.fn()

        sendText.mockReturnValue("Hey now. You're an all star!")
        // sendText("Hey now. You're an all star!")
        sendText("Hey now. You're an all star!")
        expect(sendText).toHaveBeenCalledWith("Hey now. You're an all star!")
        expect(sendText).toHaveBeenCalled()
    })
})

describe('getPriceInCurrency', () => {
    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5)
        const price = getPriceInCurrency(10, 'AUD')

        expect(price).toBe(15)
    })
})

describe('getShippingInfo', () => {
    it('should get Shipping cost', () => {
        vi.mocked(getShippingQuote).mockReturnValue({cost: 10, estimatedDays: 2})
        const shippingCost = getShippingInfo('Tennesse')

        // expect(shippingCost).toBe(`Shipping Cost: $10 (2 Days)`)
        expect(shippingCost).toMatch(/shipping cost: \$10 \(2 days\)/i)
    })

    it('should return shipping unavailable if quote cannot be found', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null)
        const result =  getShippingInfo('London')
        expect(result).toMatch(/unavailable/i)
    })
})

describe('renderPage', () => {
    it('should return correct content', async () => {
        const result = await renderPage()

        expect(result).toMatch(/content/i)
    })

    it('should call analythics', async () => {
        await renderPage()

        expect(trackPageView).toHaveBeenCalledWith('/home')
    })
})

describe('submitOrder', () => {
    // it('should assert that function was called with correct parameters', async () => {
    //     const creditCard = {
    //         creditCardNumber: '777'
    //     }
    //     const order = {
    //         totalAmount: 244
    //     }
    //     await submitOrder(creditCard, order)
    // })

    const creditCard = {
        creditCardNumber: '777'
    }
    const order = {
        totalAmount: 244
    }

    it('should charge the customer', async () => {
       
        vi.mocked(charge).mockResolvedValue({ status: 'success'})

        await submitOrder(order, creditCard)

        expect(charge).toBeCalledWith(creditCard,order.totalAmount)
    })

    it('should return success when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success'})

        const result = await submitOrder(order,creditCard)

        expect(result).toEqual({ success: true})
    })

    it('should return success when payment is failed', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed'})

        const result = await submitOrder(order,creditCard)

        expect(result).toEqual({ success: false, error: 'payment_error'})
    })
})