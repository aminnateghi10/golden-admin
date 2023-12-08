import useSWR from "swr";

import callApi from "./callApi";

const useAuth = (key : string) => {
    const { data, error, isLoading } = useSWR(key, () => {
        return callApi().get('/user')
    },{ shouldRetryOnError:false })
    return {user: data, error, loading: isLoading}
}

export default useAuth;
