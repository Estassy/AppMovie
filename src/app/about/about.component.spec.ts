import { AboutComponent } from "./about.component";

describe('AboutComponent', () => {
    let about: AboutComponent;

    beforeEach(() => {
        about = new AboutComponent()
    })

    it('should add two numbers correctly', () => {
        const result = about.add(4, 4)
        expect(result).toEqual(8)
        
        expect(about.add(1, 2)).toBe(3)
       
    })
})