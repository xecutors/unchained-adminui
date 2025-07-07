import Image from 'next/image';

const renderImage = (data: any) =>
  data?.imageUrl ? (
    <Image alt="" src={data.imageUrl} width={1200} height={50} />
  ) : null;

export default renderImage;
