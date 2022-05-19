import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = null as any;

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) { 
    //helper method
    auth.getUser().subscribe((user) => {
      console.log("User", user);
      this.email = user?.email;
    })
  }

  ngOnInit(): void {
  }
  async handleSignout(){
    try {
      await this.auth.signOut();

      this.router.navigateByUrl("/signin");
      this.toastr.info("Logout Success");
      this.email = null;
      
    } catch (error) {
      this.toastr.error("Problem in SignOut")
    }
  }

}
