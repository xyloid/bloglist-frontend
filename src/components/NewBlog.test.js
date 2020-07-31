import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewBlog from "./NewBlog";

test('newblog', ()=>{
    const test = jest.fn()
    const component = render(<NewBlog test={test} />)

    const form = component.container.querySelector('form')

    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const title = component.container.querySelector('#title')

    fireEvent.change(author,{
        target:{
            value:"Tom"
        }
    })

    fireEvent.change(url,{
        target:{
            value:"tom.com"
        }
    })

    fireEvent.change(title,{
        target:{
            value:"ttt"
        }
    })

    fireEvent.submit(form)
    expect(test.mock.calls[0][0]).toEqual({author:"Tom",title:"ttt",url:"tom.com"})
    
}) 