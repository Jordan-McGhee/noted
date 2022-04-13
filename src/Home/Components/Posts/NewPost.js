import "./NewPost.css"

const NewPost = () => {
    return (
        <form className = "home-newPost">
            <input 
                type = "text"
                name = "new-post"
            />
            <button>POST</button>
        </form>
    )
}

export default NewPost