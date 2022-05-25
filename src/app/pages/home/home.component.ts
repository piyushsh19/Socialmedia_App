import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { faL, fas } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
AngularFireDatabase

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [];
  posts = [];

  isLoading = false;

  constructor(private db :AngularFireDatabase, private toast : ToastrService) {

    this.isLoading =true;
    db.object('/users')
    .valueChanges()
    .subscribe((obj) =>{
      if (obj) {
        this.users = Object.values(obj)
        this.isLoading = false
      } else{
        toast.error("Non user Found");
        this.users = [];
        this.isLoading =false;
      }
    })

    db.object('/posts')
    .valueChanges().subscribe((obj) =>{
      if(obj){
        this.posts = Object.values(obj).sort((a,b) => b.date-a.date)
        this.isLoading =false
      } else {
        toast.error("No post to display")
        this.posts = []
        this.isLoading =false;
      }
    })
   }

  ngOnInit(): void {
  }

}
