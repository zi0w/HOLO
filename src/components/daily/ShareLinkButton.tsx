import Share from "@/assets/images/daily/share.svg";
import { copyToClipboard } from "@/lib/utils/daily/clipboard";

type ShareLinkButtonProps = {
  link: string;
};

const ShareLinkButton = ({ link }: ShareLinkButtonProps) => {
  const handleShare = () => {
    copyToClipboard(link);
  };

  return (
    <button onClick={handleShare}>
      <Share />
    </button>
  );
};

export default ShareLinkButton;
