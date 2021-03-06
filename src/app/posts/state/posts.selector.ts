import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { PostState } from "./posts.state";

export const POST_STATE_NAME = "posts";

const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) =>{
    return state.posts;
})

// export const getPostById = createSelector(getPostsState, (state, props) =>{
//     return state.posts.find((post) => post.id === props.id);
// })

export const getPostById = createSelector(
    getPosts, 
    getCurrentRoute,
    (posts, route: RouterStateUrl) =>{
        return posts ? posts.find((post)=> post.id === route.params['id']) : null;
    }
)