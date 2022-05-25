import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireStorage }  from '@angular/fire/compat/storage';


import { AngularFireDatabase} from '@angular/fire/compat/database';
import { imageConfig } from 'src/util/config';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit { 

  locationName: string | undefined;
  description: string | undefined  ;
  picture: string = null as any;

  user = null as any;
  uploadPercent: number =null as any;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    ) { 
      auth.getUser().subscribe((user) =>{
        this.db.object(`/users/${user?.uid}`)
        .valueChanges()
        .subscribe((user) => {
          this.user = user;
        })
      })
    }

  ngOnInit(): void {
  }

  onSubmit(){
    const uid = uuidv4();

    this.db.object(`/posts/${uid}`)
    .set({
      id: uid,
      locationName: this.locationName,
      description: this.description,
      picture: this.picture,
      by: this.user.name,
      instaId: this.user.instaUsername,
      date: Date.now()
    })
    .then( () =>{
      this.toastr.success("Post addes")
      this.router.navigateByUrl('/')
    })
    .catch((err) => {
      this.toastr.error("Opsss")
    })
  // }
  // async uploadFile(event){

  //   const file = event.target.files[0];
  //    let resizedImage = await readAndCompressImage(file, imageConfig)

  //    const filePath = file.name;
  //    const fileRef =this.storage.ref(filePath);

  //    const task = this.storage.upload(filePath,resizedImage);

  //    task.percentageChanges().subscribe((percentage) => {
  //      this.uploadPercent =percentage
  //    })

  //    task.snapshotChanges().pipe(finalize(()=>{
  //      fileRef.getDownloadURL().subscribe((url) =>{
  //        this.picture = url;
  //        this.toastr.success("Upload successfull ")
  //      })
  //    })).subscribe()

  }
}
