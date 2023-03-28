// todo 类型后期补充
// type ViteEnv = {
//     VITE_BASE_URL:string
// }
export const loadEnv = () => {
    return import.meta.env;
};