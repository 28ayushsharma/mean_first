import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector:'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    ngOnInit(){
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.myForm = new FormGroup({
            firstName : new FormControl(null, Validators.required),
            lastName : new FormControl(null, Validators.required),
            email : new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$')
            ]),
            password : new FormControl(null, Validators.required),
        });
    }

    onSubmit(){
        console.log(this.myForm);
        this.myForm.reset();
    }
}