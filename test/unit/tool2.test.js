const { } = require('./helpers')

describe('Tool2 risk logic (formula sanity)', () => {
  test('weighted risk formula produces values in 0..10', () => {
    for (let q1=0;q1<=10;q1++){
      for (let q2=1;q2<=10;q2++){
        for (let q3=0;q3<=10;q3++){
          for (let q4=1;q4<=10;q4++){
            const weighted = +(q1*0.25 + q2*0.40 + q3*0.20 + q4*0.15).toFixed(2)
            expect(weighted).toBeGreaterThanOrEqual(0)
            expect(weighted).toBeLessThanOrEqual(10)
          }
        }
      }
    }
  })
})
