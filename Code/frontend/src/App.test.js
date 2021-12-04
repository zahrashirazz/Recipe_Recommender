import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Recipe/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Recommender/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Ingredient/i);
  expect(linkElement).toBeInTheDocument();
});
