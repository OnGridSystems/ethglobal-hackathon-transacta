import { useQuery } from "@tanstack/react-query";
import { getTokens } from "../api";

export const useTokens = () => {
    // const [tokensList, setTokensList] = React.useState(tokens)
    const { data, error, isLoading } = useQuery({
      queryKey: ['tokens'],
      queryFn: getTokens,
    });
    return {
      // tokensList,
      // setTokensList,
      asyncTokens: data,
      asyncTokensError: error,
      asyncTokensLoading: isLoading,
    };
  };