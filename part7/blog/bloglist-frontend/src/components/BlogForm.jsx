import { useState } from "react"

const BlogPost = ({handlePost}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) =>{
        event.preventDefault();
        handlePost({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }
        
    return(
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              title:
              <input
                type="text"
                value={title}
                onChange={(event)=>{setTitle(event.target.value)}}
                required  
              />
            </label> <br/>
            <label>
              author:
              <input
                type="text"
                value={author}
                onChange={(event)=>{setAuthor(event.target.value)}}
                required  
              />
            </label> <br/>
            <label>
              url:
              <input
                type="text"
                value={url}
                onChange={(event)=>{setUrl(event.target.value)}}
                required  
              />
            </label> <br/>
            <button type="submit">create</button>
          </form>


        </div>
    )
}

export default BlogPost