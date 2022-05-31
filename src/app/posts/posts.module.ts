import { PostsListComponent } from './posts-list/posts-list.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selector';
import { PostsEffects } from './state/posts.effects';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes =[
    {path:'',component: PostsListComponent,children:[
        {path:'add',component: AddPostComponent},
        {path:'edit/:id',component: EditPostComponent},
    ]},
]
@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent
    ],
    imports:[CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature(POST_STATE_NAME,postsReducer),
        EffectsModule.forFeature([PostsEffects])
    ]
})

export class PostsModule {}