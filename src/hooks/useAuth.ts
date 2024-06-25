
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";

export const useAuth = () => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false //para cuando cambiemos de tab no haga un refetch
    })

    return{data, isError, isLoading}
}

