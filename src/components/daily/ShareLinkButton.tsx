import { copyToClipboard } from "@/lib/utils/daily/clipboard"

type ShareLinkButtonProps = {
    link: string
}

const ShareLinkButton = ({link}: ShareLinkButtonProps) => {
    const handleShare = () => {
        copyToClipboard(link);
    }

    return (
        <button onClick={handleShare}>공유하기</button>
    )
}

export default ShareLinkButton