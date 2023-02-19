// pages/users/[id].tsx

import {GetStaticPropsContext} from "next";
import axios from "axios";
import {useRouter} from "next/router";

interface User {
    id: number,
    name: string,
    username: string,
    email: string
}

interface UserDetailPageProps {
    user: User
}

export const UserDetailPage = ({user}: UserDetailPageProps) => {
    // fallback이 true일 경우 주석 제거

    // const router = useRouter();
    // // fallback version
    // if (router.isFallback) {
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }
    return (
        <div>
            {user.id} / {user.name} / {user.email}
        </div>
    )
}

export const getStaticPaths = async () => {

    const {data: users}: { data: User[] } = await axios.get('https://jsonplaceholder.typicode.com/users');
    // 유저 리스트에서 5명.
    const partialUserList = users.slice(0, 5);
    const paths = partialUserList.map(user => ({params: {id: user.id.toString()}}));

    return {
        paths,
        fallback: false,
        // fallback: true,
        // fallback: 'blocking',
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params?.id || '';

    await sleep(1000);

    const {data: user}: { data: User } =
        await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    return {
        props: {
            user
        }
    }
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export default UserDetailPage;
