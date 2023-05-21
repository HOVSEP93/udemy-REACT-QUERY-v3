import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  // Mutation Delete
  const deleteMutation = useMutation((postId) => deletePost(postId));

  // Mutation Delete
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  if (isError)
    return (
      <>
        <h1>Ops something get wrong...❌👎🏼❌</h1>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>There are error</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Loading...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Here We Go!</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && (
        <p style={{ color: "red" }}>There are error</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Loading...</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Here We Go!</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
