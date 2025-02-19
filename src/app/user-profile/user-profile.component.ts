import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { PostUserDto } from '../models/dto/post-user-dto';
import { CommonModule } from '@angular/common';
import { FollowerService } from '../services/follower.service';
import { FollowersUserDto } from '../models/dto/followers-user-dto';
import { FollowsDto } from '../models/dto/follows-dto';
import { ImageService } from '../services/image.service';
import { TagService } from '../services/tag.service';
import { PostDTO } from '../models/dto/post-dto';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  currentUser: User = new User;
  followers: FollowersUserDto=new FollowersUserDto;
  followersList: FollowsDto [];
  followingList: FollowsDto [];

  user: any = {};
  userPosts: PostUserDto[];
  isEditing: boolean = false;
  isCurrentUser: boolean = false;
  isDarkMode = false;

  tagsString: string = '';
  
  editForm = {
    name: '',
    bio: '',
    photo_profile: ''
  };

  editPostForm = {
    id: 0,
    content: '',
    images: [] as { id: number, image: string }[],  
    tags: [] as { id: number, tag: string }[]  
  };

  newImageUrl: string = '' ;
  editModal: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private followerService: FollowerService,
    private imageService: ImageService,
    private tagService: TagService
  ) {this.isCurrentUser = true;}

  ngOnInit() {
    this.userSession();
    this.loadUserPosts();
    setTimeout(()=>{
      this.getFollowersUser(this.currentUser.id);
    },100)
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light")
    this.applyTheme()
  }

  applyTheme() {
    document.documentElement.setAttribute("data-bs-theme", this.isDarkMode ? "dark" : "light")
  }

  userSession(){
    this.userService.getUserSession().subscribe({
      next: (data) => { this.currentUser = data},
      error: (err: any) => { console.error(err); }
    });
  }

  loadUserProfile(userId: number) {
    
  }

  loadUserPosts() {
    this.postService.getPostsUser().subscribe({
        next: (data) => {
            this.userPosts = data.map(post => ({
                ...post,
                images: post.image || '',  // Si no hay imágenes, se usa una cadena vacía
                tags: post.tag || ''       // Si no hay tags, se usa una cadena vacía
            }));
        },
        error: (err: any) => { console.error(err); }
    });
}


  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editForm = {
        name: this.user.name,
        bio: this.user.bio || '',
        photo_profile: this.user.photo_profile || ''
      };
    }
  }

  updateProfile() {
    this.userService.updateUser(this.currentUser, this.currentUser.id).subscribe({
      next: (data)=>{console.log(data); this.isEditing=false},
      error: (err:any)=>{console.error(err)}
    })
  }

  getFollowersUser(id: number){
    this.followerService.getFollowersUser(id).subscribe({
      next: (data)=>{this.followers = data},
      error: (err:any)=>{console.error(err)}
    })
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: (data)=>{console.log(data)},
      error: (err:any)=>{console.error(err)}
    })
  }

  addImageToEdit() {
    if (this.newImageUrl.trim() !== "") {
      this.editPostForm.images.push({ id: -1, image: this.newImageUrl.trim() }); // ID temporal
      this.newImageUrl = ""; // Limpiar input
    }
}

  removeImageFromEdit(index: number) {
    this.editPostForm.images.splice(index, 1);
  } 

  preparePostEdit(post: PostUserDto) {
    this.editPostForm = {
      id: post.id,
      content: post.content,
      images: [],  // Ahora será una lista de objetos con {id, image}
      tags: [],  // Ahora será una lista de objetos con {id, tag}
    };
    

    // Cargar imágenes
    this.imageService.getImagesPost(post.id).subscribe({
      next: (images) => {
        this.editPostForm.images = images.map(img => ({ id: img.id, image: img.image }));
      },
      error: (err) => console.error(err)
    });

    // Cargar tags correctamente
    this.tagService.getTagsPost(post.id).subscribe({
      next: (tags) => {
        this.editPostForm.tags = tags.map(tag => ({ id: tag.id, tag: tag.tag }));
      },
      error: (err) => console.error(err)
    });
  }

  onTagsChange(tagsString: string) {
    this.tagsString = tagsString; // Actualizar la vista
    this.editPostForm.tags = tagsString.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map((tag, index) => ({ id: index, tag })); // Crear IDs temporales
  }


  updatePost() {

    const updatedPost : PostDTO = new PostDTO;

    updatedPost.id = this.editPostForm.id;
    updatedPost.content = this.editPostForm.content;
    updatedPost.created_at = new Date().toISOString().split('T')[0];
    updatedPost.user_posts_id = this.currentUser.id;
  
    this.postService.updatePost(updatedPost.id, updatedPost).subscribe(response => {
      console.log("Post actualizado con éxito");
    });
  }
    
  getUserFollowers(){
    this.followerService.getUserFollowers(this.currentUser.id).subscribe({
      next: (data)=>{this.followersList = data},
      error: (err:any)=>{console.error(err)}
    })
  }

  getUserFollowing(){
    this.followerService.getUserFollowing(this.currentUser.id).subscribe({
      next: (data)=>{this.followingList = data},
      error: (err:any)=>{console.error(err)}
    })
  }

  unfollowUser(id: number) {
    console.log("seguidor: ", this.currentUser.id);
    console.log("siguiendo: ", id);
    this.followerService.deleteFollow(this.currentUser.id, id).subscribe({
      next: (data)=>{},
      error: (err:any)=>{console.error(err)}
    })
  }

  trackByPost(index: number, post: PostUserDto): number {
    return post.id;  
  }
  
}
