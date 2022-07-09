import useSWR from 'swr';

const fether = () => false;
const useLoadding = () => useSWR('/loadding', fether);

export { useLoadding };
export default useLoadding;
