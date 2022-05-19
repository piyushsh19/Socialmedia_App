import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireStorageModule }  from '@angular/fire/compat/storage';

import {AngularFireDatabaseModule} from '@angular/fire/compat/database';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
