import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { PostsFollowingUsers } from '../models/dto/posts-following-users';
import { CommonModule } from '@angular/common';
import { CommentService } from '../services/comment.service';
import { CommentPostDto } from '../models/dto/comment-post-dto';
import { CommentDTO } from '../models/dto/comment-dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchQuery = "";
  isDarkMode = false;
  currentUser: User = new User;
  username: string;
  token: string;
  posts: PostsFollowingUsers[];
  newPost = ""
  comments: CommentPostDto[];
  activePostId: number | null = null;
  newComment: string = "";

  private fecha = new Date();

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService
  ){}

  ngOnInit() {
    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem('username') || '';
    }

    this.userSession();

    this.postService.getPostsUsersFollowing().subscribe({
      next: (data) => {this.posts = data},
      error: (err:any) => {console.error(err)}
    })
  }

  userSession(){
      this.userService.getUserSession(this.username).subscribe({
        next: (data) => { this.currentUser = data},
        error: (err: any) => { console.error(err); }
      });
  }

  commentsPost(post_id: number){
    this.commentService.commentsPost(post_id).subscribe({
      next: (data) => {this.comments = data; console.log(data)},
      error: (err:any) => {console.error(err)}
    })
  }

  postUsersFollowing(){
    this.postService.getPostsUsersFollowing().subscribe({
      next: (data) => {this.posts = data; console.log(data)},
      error: (err:any) => {console.error(err)}
    })
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light")
    this.applyTheme()
  }

  applyTheme() {
    document.documentElement.setAttribute("data-bs-theme", this.isDarkMode ? "dark" : "light")
  }

  toggleComments(postId: number) {
    if (this.activePostId === postId) {
        this.activePostId = null;  
    } else {
        this.activePostId = postId;  
        this.commentsPost(postId);
    }
  }

  addComment(postId: number) {
    console.log("Comentario a enviar:", this.newComment);

    const fixedPostId = postId;
    const fixedUserId = this.currentUser.id; // Guardamos el ID correcto

    setTimeout(() => {
      console.log("ID del usuario dentro de setTimeout:", fixedUserId); // Ahora será constante

      const newCommentDTO = new CommentDTO();
      const year = this.fecha.getFullYear();
      const month = (this.fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = this.fecha.getDate().toString().padStart(2, '0');

      newCommentDTO.comment = this.newComment;
      newCommentDTO.created_at = `${year}-${month}-${day}`;
      newCommentDTO.post_comment_id = fixedPostId;
      newCommentDTO.user_comment_id = fixedUserId; 

      console.log("ID del usuario luego:", newCommentDTO.user_comment_id);

      this.commentService.addComment(newCommentDTO).subscribe({
        next: (data) => {},
        error: (err: any) => { console.error(err); }
      });

      this.commentsPost(fixedPostId);
    }, 1);
  }


}
