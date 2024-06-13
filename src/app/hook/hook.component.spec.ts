import { HookComponent } from "./hook.component";

describe('HookComponent', () => {
    let about: HookComponent;

    beforeEach(() => {
        about = new HookComponent()
    })

    it('should create', () => {
        expect(about).toBeTruthy()
      })
    
})