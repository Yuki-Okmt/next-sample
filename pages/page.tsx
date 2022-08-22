import { NextPage } from 'next';
import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';

type BaselinkProps = React.PropsWithChildren<LinkProps> & {
    className?: string;
    children: React.ReactNode;
}

// Next.js のリンクにスタイルを適用するためのヘルパーコンポーネント
// このコンポーネントを　styled-componentsで使用すると、
// 定義したスタイルに対応する className が propsとして渡される
// このclassNameをa要素に渡す
const BaseLink = (props: BaselinkProps) => {
    const { className, children, ...rest } = props;
    return (
        <Link {...rest}>
            <a className={className}>{children}</a>
        </Link>
    )
}

const StyledLink = styled(BaseLink)`
color: #1e90ff;
font-size: 2em;
`

const Text = styled.span`
color: ${(props) => props.theme.colors.red};
font-size: ${(props) => props.theme.fontSizes[3]};
margin: ${(props) => props.theme.space[2]};
`

const Page: NextPage = () => {
    return (
        <div>
            {/* 青色のリンクを表示する */}
            <StyledLink href="/">Go to Index</StyledLink>
            <Text>Themeから参照した色を使用しています</Text>
        </div>
    )
}

export default Page;