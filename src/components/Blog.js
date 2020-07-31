import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , updateAll }) => {
  const [show, setShow] = useState(false)
  const [blogEntry, setBlogEntry] = useState(blog)
  // const [likes, setLikes] = useState(blog.likes)
  const toggleShow = () => {
    setShow(!show)
  }

  const hideWhenShow = { display: show ? 'none' : '' }
  const renderWhenShow = { display: show ? '' : 'none' }

  const handleLike = async () => {
    try{
      updateAll()
      blog.likes = blogEntry.likes
      blog.likes = blog.likes+1
      await blogService.update(blog)
      setBlogEntry({ ...blog })
      // setLikes(blog.likes)
      updateAll()
    }
    catch (exception){
      console.log(exception)
    }
  }

  const handleRemove = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)){
      try{
        await blogService.remove(blog)
        updateAll()
      }catch(exception){
        console.log(exception)
      }
    }
  }

  return (
    <div>
      <div id = "simple" className="blog" style={hideWhenShow}>
        {blogEntry.title} {blogEntry.user.name}
        <button onClick={toggleShow}>view</button>
      </div>
      <div id = "detail" className="blog" style={renderWhenShow}>
        <p className="line">
          {blogEntry.title} <button onClick={toggleShow}>hide</button>
        </p>
        <p className="line">{blogEntry.url}</p>
        <p className="line">{blogEntry.likes} <button onClick={handleLike}>like</button></p>
        <p className="line">{blogEntry.user.name}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
