import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

function DataFetching() {
    const [data, setData] = useState();
    //GET
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery("posts", async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response.data);
        return response.data;
    });

    useEffect(() => {
        if (posts) setData(posts);
    }, [posts]);

    const getData = useCallback((id) => {
        setData((prevData) => prevData.filter((data) => data.id != id));
    }, []);

    //DELETE
    // const deletePostMutation = useMutation(async (postId) => {
    //     const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    //     console.log(response.data); // getting a 200 https status
    // });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {data &&
                data.map((post) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => getData(post.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}

export default React.memo(DataFetching);
