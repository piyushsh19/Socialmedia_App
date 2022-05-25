import { Component, OnInit , Input} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { faShare, faShareSquare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post: any;

  faShareSquare = faShareSquare;
  faThumbsUp = faThumbsUp

  faThumbsDown = faThumbsDown
  uid = null as any;
  upvote = 0;
  downvote = 0;

  constructor( private auth: AuthService, private db: AngularFireDatabase) { 
    this.auth.getUser().subscribe((user) =>{
      this.uid = user?.uid;
    })
  }

  ngOnInit(): void {
  }

  upvotePost(){
    console.log("Upvote");
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote:1,
    })
  }
  DownvotePost(){
    console.log("Downvote");
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote:1,
    })
  }

  getInstaUrl(){
    return`https://instagram.com/${this.post.instaId}`
  }

}
