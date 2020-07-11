import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = (query, pageNum) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const url = `https://reqres.in/api/users?page=${pageNum}`;
  let cancel;

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res);
        setUsers((users) => {
          return [...new Set([...users, ...res.data.data.map((el) => el)])];
        });
        setHasMore(res.data.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
  }, [query, pageNum]);
  return { loading, error, users, hasMore };
};

export default useSearch;
