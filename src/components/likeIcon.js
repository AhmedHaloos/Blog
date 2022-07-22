



const LikeIcon = ({post, handleLikePost})=>{

    
    return(
        <>
        {
            
            <div  className= {post.isLiked? 'btn-like liked-state': 'btn-like'}
            onClick = {()=>{handleLikePost(post.id)}}><i className="fa-solid fa-thumbs-up"></i></div>
        }
        </>
    )

}
export default LikeIcon;