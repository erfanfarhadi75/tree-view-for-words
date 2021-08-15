
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`




## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
 

## unit test
****
 2 example of unit test 
   it(`should have public var model`, () => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.componentInstance;
     expect(app.model);
   });
   it(`should have public var fileText`, () => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.componentInstance;
     expect(app.fileText);
   });

