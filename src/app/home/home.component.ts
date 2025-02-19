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
import { PostDTO } from '../models/dto/post-dto';
import { ImageService } from '../services/image.service';
import { ImageDTO } from '../models/dto/image-dto';
import { forkJoin } from 'rxjs';
import { TagDTO } from '../models/dto/tag-dto';
import { TagService } from '../services/tag.service';
import { UserDto } from '../models/dto/user-dto';
import { FollowerService } from '../services/follower.service';
import { FollowerDTO } from '../models/dto/follower-dto';

interface PostResponse {
  id: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchQuery = '';
  isDarkMode = false;
  currentUser: User = new User();
  username: string;
  token: string;
  posts: PostsFollowingUsers[];
  newPost = '';
  comments: CommentPostDto[];
  activePostId: number | null = null;
  newComment: string = '';

  //post
  newPostContent: string = '';
  newPostTags: string = '';
  newImageUrl: string = '';
  imageUrls: string[] = [];
  isSubmitting: boolean = false;

  suggestedUsers: UserDto[];
  isFollowing: { [key: number]: boolean } = {};
  showAll: boolean = false;

  private fecha = new Date();

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private imageService: ImageService,
    private tagService: TagService,
    private followService: FollowerService
  ) {}

  ngOnInit() {
    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem('username') || '';
    }

    this.userSession();

    setTimeout(() => {
      this.postService.getPostsUsersFollowing(this.currentUser.username).subscribe({
        next: (data) => {
          this.posts = data;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      this.getSuggestedUsers();
    }, 100);
  }

  userSession() {
    this.userService.getUserSession().subscribe({
      next: (data) => {
        this.currentUser = data;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  commentsPost(post_id: number) {
    this.commentService.commentsPost(post_id).subscribe({
      next: (data) => {
        this.comments = data;
        console.log(data);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  postUsersFollowing() {
    this.postService.getPostsUsersFollowing(this.currentUser.username).subscribe({
      next: (data) => {
        this.posts = data;
        console.log(data);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute(
      'data-bs-theme',
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  toggleComments(postId: number) {
    if (this.activePostId === postId) {
      this.activePostId = null;
    } else {
      this.activePostId = postId;
      this.commentsPost(postId);
    }
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  addComment(postId: number) {
    console.log('Comentario a enviar:', this.newComment);

    const fixedPostId = postId;
    const fixedUserId = this.currentUser.id;

    setTimeout(() => {
      console.log('ID del usuario dentro de setTimeout:', fixedUserId);

      const newCommentDTO = new CommentDTO();
      const year = this.fecha.getFullYear();
      const month = (this.fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = this.fecha.getDate().toString().padStart(2, '0');

      newCommentDTO.comment = this.newComment;
      newCommentDTO.created_at = `${year}-${month}-${day}`;
      newCommentDTO.post_comment_id = fixedPostId;
      newCommentDTO.user_comment_id = fixedUserId;

      console.log('ID del usuario luego:', newCommentDTO.user_comment_id);

      this.commentService.addComment(newCommentDTO).subscribe({
        next: (data) => {
          this.ngOnInit();
        },
        error: (err: any) => {
          console.error(err);
        },
      });

      this.commentsPost(fixedPostId);
    }, 1);
  }

  //post
  addImageUrl() { 
    if (!this.newImageUrl.trim()) {
      return;
    }
 
    try {
      new URL(this.newImageUrl);
    } catch {
      return;
    }
 
    if (this.imageUrls.includes(this.newImageUrl)) {
      return;
    }
 
    this.imageUrls.push(this.newImageUrl);
 
    this.newImageUrl = '';
  }

  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }

  createPost() { 
    if (
      !this.newPostContent ||
      this.newPostContent.length < 5 ||
      this.newPostContent.length > 500
    ) {
      console.error(
        'El contenido del post debe tener entre 5 y 500 caracteres.'
      );
      return;
    }

    const newPostDTO: PostDTO = new PostDTO();
    newPostDTO.content = this.newPostContent;
    newPostDTO.created_at = new Date().toISOString().split('T')[0];
    newPostDTO.user_posts_id = this.currentUser.id;

    const imagesToAdd = [...this.imageUrls];
    const tagsToAdd = this.newPostTags
      ? this.newPostTags.split(',').map((tag) => tag.trim())
      : [];

    this.postService.addPost(newPostDTO).subscribe({
      next: (response: PostResponse) => {
        if (response?.id) {
          const postId = response.id;
          const observables = [];

          if (imagesToAdd.length > 0) {
            const newImages: ImageDTO[] = imagesToAdd.map((imageUrl) => ({
              image: imageUrl,
              post_image_id: postId,
            }));
            observables.push(this.imageService.addImage(newImages));
          }

          if (tagsToAdd.length > 0) {
            const newTags: TagDTO[] = tagsToAdd.map((tagText) => ({
              tag: tagText,
              post_tag_id: postId,
            }));
            observables.push(this.tagService.addTag(newTags));
          }

          if (observables.length > 0) {
            forkJoin(observables).subscribe({
              next: () => this.handleSuccess(),
              error: (err) =>
                console.error('Error al agregar imágenes/tags:', err),
            });
          } else {
            this.handleSuccess();
          }
        } else {
          console.error('Error: No se recibió un ID de post válido.');
        }
      },
      error: (err) => {
        console.error('Error al crear el post:', err);
      },
    });
  }

  getSuggestedUsers() {
    this.userService.getUsersNotFollowing(this.currentUser.id).subscribe({
      next: (data) => {
        this.suggestedUsers = data;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  followUser(userId: number) {
    const newFollow: FollowerDTO = new FollowerDTO();

    newFollow.created_at = new Date().toISOString().split('T')[0];
    newFollow.user_follower_id = this.currentUser.id;
    newFollow.user_following_id = userId;

    this.followService.addFollow(newFollow).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  private handleSuccess() {
    this.resetForm();
    this.ngOnInit();
  }

  private resetForm() {
    this.newPostContent = '';
    this.imageUrls = [];
    this.newImageUrl = '';
    this.newPostTags = '';
  }
}
