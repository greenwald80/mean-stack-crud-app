// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EmployeeCreateComponent } from './employee-create.component';

// describe('EmployeeCreateComponent', () => {
//   let component: EmployeeCreateComponent;
//   let fixture: ComponentFixture<EmployeeCreateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ EmployeeCreateComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EmployeeCreateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  employeeForm?: FormGroup;
  //employeeForm: any;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e: any) {
    // this.employeeForm.get('designation').setValue(e, {
    //   onlySelf: true,
    // });
    let designation = this.employeeForm.get('designation')
    designation.setValue(e, {onlySelf: true });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      this.apiService.createEmployee(this.employeeForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
