import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";


@Component({
    selector:'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent{
    myForm: FormGroup;
    
    constructor(private authService: AuthService, private router: Router){

    }

    ngOnInit(){
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.myForm = new FormGroup({
            email : new FormControl(null, [
                Validators.required
                //Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$')
            ]),
            password : new FormControl(null, Validators.required),
        });
    }

    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }
}