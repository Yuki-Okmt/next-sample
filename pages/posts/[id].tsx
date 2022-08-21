// 型を利用するためにインポート
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router' // next/routerからuseRouterというフックを取り込む

type PostProps = {
    id: string;
}

const Post: NextPage<PostProps> = (props) => {
    const { id } = props;
    const router = useRouter();

    if (router.isFallback) {
        // フォールバックページ向けの表示を返す
        return <div>Loading...</div>
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
                <p>{`/posts/${id}に対するページです`}</p>
            </main>
        </div>
    )
}

// getStaticPathsは生成したいページのパスパラメータの組み合わせを返す
// このファイルはpages/posts/[id].tsxなので、パスパラメータとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
    // それぞれのページのパスパラメータをまとめたもの
    const paths = [
        {
            params: {
                id: '1',
            },
        },
        {
            params: {
                id: '2',
            },
        },
        {
            params: {
                id: '3',
            },
        },
    ]
    // fallbackをfalsenいすると、pathsで定義されたページ以外は404ページを表示する
    return { paths, fallback: false }
}

// getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps> = async (context) => {

    console.log(context);
    // context.paramasにパスパラメータの値が入っている
    // context.paramas['id']は string | string[]型なので
    // 値が配列かどうかで場合わけをする
    const params = context.params!['id'] as string | string[];
    const id = Array.isArray(params) ? params[0] : params;

    return {
        props: {
            id,
        },
    }
}

export default Post;