import React from "react";
import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

describe("<Blog />", () => {
  let component;
  let blog;

  beforeEach(() => {
    blog = {
      title: "dummy blog",
      author: "Tester",
      url: "www.blog.com",
      likes: 1,
      user: { name: "Tester" },
    };
    component = render(<Blog blog={blog} />);
  });

  test("title and author", () => {
    // has author and title
    // don't have url and likes
    // component.debug()

    const simple = component.container.querySelector("#simple");
    const detail = component.container.querySelector("#detail");
    expect(simple).not.toHaveStyle("display:none");
    expect(detail).toHaveStyle("display:none");

    expect(simple).toHaveTextContent("dummy blog");
    expect(simple).toHaveTextContent("Tester");
    expect(simple).not.toHaveTextContent("like");
    expect(simple).not.toHaveTextContent("www.blog.com");

    expect(detail).toHaveTextContent("dummy blog");
    expect(detail).toHaveTextContent("Tester");
    expect(detail).toHaveTextContent("like");
    expect(detail).toHaveTextContent("www.blog.com");
  });

  test("toggle", () => {
    const view = component.getByText("view");
    fireEvent.click(view);

    const simple = component.container.querySelector("#simple");
    const detail = component.container.querySelector("#detail");
    expect(simple).toHaveStyle("display:none");
    expect(detail).not.toHaveStyle("display:none");
  });

});

describe('likes', ()=>{
    let component;
    let blog;
    
    beforeEach(() => {
      blog = {
        title: "dummy blog",
        author: "Tester",
        url: "www.blog.com",
        likes: 1,
        user: { name: "Tester" },
      };
    });

    test('likes', ()=>{
        const mockHandler = jest.fn()
        component = render(<Blog blog={blog} test={mockHandler}/>);
        const view = component.getByText("view")
        fireEvent.click(view)
        const like = component.getByText("like")
        fireEvent.click(like)
        fireEvent.click(like)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
